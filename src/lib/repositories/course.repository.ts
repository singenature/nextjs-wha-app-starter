import { CourseApiResponse } from '../services/types/course.types';

const API_BASE_URL = 'https://api.codingthailand.com/api';

export async function fetchCoursesFromApi(): Promise<CourseApiResponse> {
  const response = await fetch(`${API_BASE_URL}/course`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}
