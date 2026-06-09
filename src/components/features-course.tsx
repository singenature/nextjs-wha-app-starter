import Image from "next/image";
import { Course } from "@/lib/services/types/course-types";

type Props = {
  courses: Course[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f2f4f5] px-6 py-20">
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        <h2 className="mx-auto text-center font-bold text-4xl tracking-[-0.045em] text-[#001f3e] sm:text-[2.75rem]/[1.2]">
          หลักสูตรทั้งหมด
        </h2>
        <p className="mt-3 text-pretty text-center text-lg text-[#66798b] tracking-[-0.01em] sm:text-2xl">
          เรียนรู้ทักษะใหม่ พัฒนาตัวเองสู่อนาคต
        </p>
        <div className="mt-16 grid w-full gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              className="flex w-full flex-col rounded bg-white border border-[#e6e9ec] shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.075)] transition-shadow hover:shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.1)] overflow-hidden text-start"
              key={course.title}
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#f2f4f5]">
                <Image
                  alt={course.title}
                  className="size-full object-cover"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                  loading="eager"
                />
              </div>
              <div className="px-5 py-5">
                <span className="font-semibold text-[18px] text-[#001f3e]">
                  {course.title}
                </span>
                <p className="mt-1 text-[15px] text-[#66798b] line-clamp-2">
                  {course.detail}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 rounded bg-[#e6f0ff] px-3 py-1 text-sm font-semibold text-primary">
                  ดูรายละเอียด
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCourse;
