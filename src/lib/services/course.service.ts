import { Course, CourseApiResponse, CourseServiceResult } from './types/course.types';
import { fetchCoursesFromApi } from '../repositories/course.repository';

export async function getAllCourses(): Promise<CourseServiceResult> {
  try {
    const data: CourseApiResponse = await fetchCoursesFromApi();
    
    return {
      courses: data.data || [],
    };
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return {
      courses: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
