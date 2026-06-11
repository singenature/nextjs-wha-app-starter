---
name: docker-deploy
description: >
  Use this skill to build and deploy this Next.js 16 project as a Docker
  production image. Triggers on: "build the docker image", "deploy to
  production", "run the production container", "dockerize this", "build for
  prod", "ship to docker", "run the prod container", or any request to build,
  run, or deploy the production Docker image. Covers the multi-stage Dockerfile,
  standalone output, Prisma 7 driver-adapter build, runtime env-file injection,
  migrate deploy, and host MariaDB networking specific to this project.
---

# Docker Production Deploy Guide

Build and ship this project as a single production container ที่ต่อกับ MariaDB
บน host เครื่องเดียวกัน. โครงสร้างมีอยู่แล้ว — อย่าสร้าง pipeline ใหม่:

- [Dockerfile](../../../Dockerfile) — multi-stage: `deps` → `builder` → `runner`
  บน `node:24-alpine`, รันด้วย non-root user `nextjs`, `EXPOSE 3000`,
  `CMD ["node", "server.js"]`
- [next.config.ts](../../../next.config.ts) — `output: 'standalone'` คือสิ่งที่
  ถูก copy เข้า runner stage. ห้ามลบออก ไม่งั้น `server.js` จะไม่ถูก generate
- [.env.production](../../../.env.production) — ค่า `DATABASE_URL` จริง,
  `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. **ส่งตอน runtime ผ่าน `--env-file`
  เท่านั้น ห้าม bake เข้า image**
- [.dockerignore](../../../.dockerignore) — กัน `node_modules`, `.next`,
  `.env*`, `.git` อยู่แล้ว

---

## 1. Pre-build checks

ตรวจก่อน build เสมอ:

```bash
# ตรวจ lint และ types
npm run lint
npx tsc --noEmit

# ยืนยันว่า standalone ยังเปิดอยู่ (ต้องเจอบรรทัด output: 'standalone')
# ถ้าไม่เจอ build จะไม่มี server.js ใน .next/standalone
```

ดูใน [next.config.ts](../../../next.config.ts) ว่ามี `output: 'standalone'`

---

## 2. Build image

```bash
# DATABASE_URL ปลอมถูกจัดการด้วย ARG ใน Dockerfile แล้ว (Prisma v7 driver
# adapter ไม่ต้องต่อ DB จริงตอน build) — ไม่ต้องส่ง flag เพิ่ม
docker build -t wha-app:prod .
```

ทำไมไม่ต้องส่ง `DATABASE_URL` จริงตอน build:
builder stage รัน `npx prisma generate` ด้วย dummy URL
(`mysql://build:build@localhost:3306/build`) — generate client ออกไปที่
`generated/prisma` ซึ่ง v7 driver adapter ไม่แตะ DB จริงตอน generate/build

---

## 3. Run container

```bash
# publish host:4000 → container:3000 ให้ตรงกับ BETTER_AUTH_URL ใน .env.production
docker run --rm \
  --env-file .env.production \
  -p 4000:3000 \
  --name wha-app \
  wha-app:prod
```

**networking — สำคัญ:** `DATABASE_URL` ใน [.env.production](../../../.env.production)
ชี้ไปที่ `host.docker.internal:3306` คือ MariaDB ที่รันอยู่บน host เครื่องเดียวกัน
(ดู [docs/install_mariadb_with_docker.txt](../../../docs/install_mariadb_with_docker.txt)).

- **macOS / Windows (Docker Desktop):** `host.docker.internal` ใช้ได้เลย
- **Linux:** ต้องเพิ่ม `--add-host=host.docker.internal:host-gateway`

```bash
# Linux เท่านั้น
docker run --rm \
  --env-file .env.production \
  --add-host=host.docker.internal:host-gateway \
  -p 4000:3000 \
  --name wha-app \
  wha-app:prod
```

---

## 4. Database migrations (production)

รัน migration กับ DB จริงด้วย `migrate deploy` — ใช้ migration ที่ commit ไว้แล้ว
ไม่สร้างใหม่ ไม่ถาม prompt:

```bash
# รันบน host โดยชี้ DATABASE_URL ไปที่ DB production
npx prisma migrate deploy
```

**ข้อห้ามของ project นี้:**
- ❌ **ห้ามใช้ `npx prisma db push`** (ผิดกฎ project)
- ❌ อย่าใช้ `npx prisma migrate dev` กับ production (มันจะ generate migration
  ใหม่และ reset ได้)
- ✅ ใช้ `migrate deploy` เท่านั้นกับ production

รันบน host ง่ายสุด (มี `.env` / `DATABASE_URL` ชี้ไป DB production แล้ว). ถ้าจะรัน
ใน container ต้อง `docker exec` เข้าไปและ container ต้องมี Prisma CLI — โดยปกติ
runner stage เป็น standalone ไม่มี devDependencies ฉะนั้นรันบน host สะดวกกว่า

---

## 5. Verify

```bash
# ดู log ว่า server start ที่ port 3000 ไม่มี error
docker logs -f wha-app

# หน้าแรกตอบ 200
curl -i http://localhost:4000

# API route ตอบ (contact route มีอยู่ในโปรเจกต์)
curl -i http://localhost:4000/api/contact
```

ผ่านเมื่อ: homepage 200, API ตอบกลับ, log ไม่มี Prisma connection error

---

## 6. Common gotchas

| อาการ | สาเหตุ / วิธีแก้ |
|-------|-----------------|
| `Cannot find module .../generated/prisma/client` | client gen ไป `generated/prisma` ไม่ใช่ `node_modules` — Dockerfile copy `/app/generated` มาแล้ว ถ้าแก้ path ใน Dockerfile ระวังจุดนี้ |
| `server.js not found` ตอน run | ลืม `output: 'standalone'` ใน [next.config.ts](../../../next.config.ts) → rebuild |
| DB connect timeout / `ECONNREFUSED` | บน Linux ลืม `--add-host=host.docker.internal:host-gateway` หรือ MariaDB ไม่ได้รันบน host |
| auth redirect / cookie เพี้ยน | `BETTER_AUTH_URL` ใน `.env.production` ไม่ตรงกับ port ที่ publish (ตอนนี้ตั้งไว้ `:4000`) |
| env เป็น undefined ใน container | ลืม `--env-file .env.production` ตอน `docker run` |
| DATABASE_URL build error | ไม่ต้องแก้ — เป็น dummy ARG ปกติ, ไม่กระทบ runtime |

---

## Quick reference

```bash
npm run lint && npx tsc --noEmit          # 1. ตรวจก่อน
docker build -t wha-app:prod .            # 2. build
npx prisma migrate deploy                 # 4. migrate DB production
docker run --rm --env-file .env.production -p 4000:3000 --name wha-app wha-app:prod  # 3. run
curl -i http://localhost:4000             # 5. verify
```
