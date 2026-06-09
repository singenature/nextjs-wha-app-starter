export interface Course {
  id: number;
  title: string;
  detail: string;
  picture: string;
}

export interface CourseApiResponse {
  data: Course[];
}

export interface CourseServiceResult {
  courses: Course[];
  error?: string;
}
