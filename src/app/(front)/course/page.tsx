import FeaturesCourse from "@/components/features-course";
import { getAllCourses } from "@/lib/services/course-service";

export default async function CoursePage() {
  const { courses, error } = await getAllCourses();

  if (error) {
    return (
      <main>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-destructive">Error loading courses: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {courses.length > 0 && <FeaturesCourse courses={courses} />}
    </main>
  );
}