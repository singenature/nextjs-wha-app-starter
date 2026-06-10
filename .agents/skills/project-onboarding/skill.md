-----------
name: project-onboarding
description: This skill provides a structured onboarding process for new projects, guiding users through essential steps such as setting up repositories, defining project goals, and establishing communication channels. It ensures that all necessary information is collected and organized to facilitate a smooth project kickoff. "Project Onboarding" helps teams get up to speed quickly and efficiently, fostering collaboration and alignment from the start. Project Onboarding is designed to be adaptable to various project types and team structures, making it a versatile tool for any organization looking to streamline their project initiation process. How to install and Setting up: To install the "Project Onboarding" and How to start.
compatability: Use Node.js 22+
license: MIT
metadata:
  author: Supachain
  version: 1.0.0
-----------

## First Steps to Install and Set Up "Project Onboarding" 
To install and set up the "Project Onboarding" skill, follow these steps:

```bash
# Step 1: Install the skill using npm
npm install

# Step 2: Copy env
cp .env.example .env

# Step 3: Pull DB Schema
npm prisama db pull

# Step 4: Generate Prisma Client
npm prisma generate

# Step 5: Check lint
npm run lint

```

## Gotcjas
- ต้องติดตั้ง และเปิด Docker Desktop ก่อน
- ต้องติดตั้ง Node.js 22+ ก่อน
- ต้องติดตั้ง Prisma CLI ก่อน (npm install -g prisma)
- ต้องติดตั้ง dependencies ด้วย npm install ก่อน
- ต้องตั้งค่า .env ให้ถูกต้องก่อนใช้งาน

## Output
เมื่อทำการติดตั้งและตั้งค่าเรียบร้อยแล้ว คุณจะสามารถเริ่มต้นใช้งาน "Project Onboarding" ได้ทันที โดยสามารถเข้าถึงฟีเจอร์ต่าง ๆ ที่ช่วยในการจัดการและเริ่มต้นโปรเจกต์ใหม่ได้อย่างมีประสิทธิภาพ เช่น การสร้าง repository, การกำหนดเป้าหมายของโปรเจกต์ และการตั้งค่าช่องทางการสื่อสารภายในทีม.