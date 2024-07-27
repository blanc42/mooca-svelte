export interface SignupRequest {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface CreateInstituteRequest {
    name: string;
    description?: string;
  }
  
  export interface UpdateInstituteRequest {
    name: string;
    description?: string;
  }
  
  export interface CreateTeacherRequest {
    name: string;
    description: string;
  }
  
  export interface UpdateTeacherRequest {
    name: string;
    description: string;
  }
  
  export interface CreateCourseRequest {
    name: string;
    description?: string;
    instituteIDs: number[];
    teacherIDs: number[];
  }
  
  export interface UpdateCourseRequest {
    name: string;
    description?: string;
    instituteIDs: number[];
    teacherIDs: number[];
  }

//   response types

  export interface GenericResponse {
    message?: string;
    error?: string;
  }
  
  export interface InstituteResponse {
    id: number;
    name: string;
    description: string;
    creatorID: number;
  }
  
  export interface InstituteListResponse {
    institutes: InstituteResponse[];
  }
  
  export interface TeacherResponse {
    id: number;
    name: string;
    description: string;
    creatorID: number;
  }
  
  export interface TeacherListResponse {
    teachers: TeacherResponse[];
  }
  
  export interface CourseResponse {
    id: number;
    name: string;
    description: string;
    creatorID: number;
    institutes: InstituteDetail[];
    teachers: TeacherDetail[];
  }
  
  export interface InstituteDetail {
    id: number;
    name: string;
  }
  
  export interface TeacherDetail {
    id: number;
    name: string;
  }
  
  export interface CourseListResponse {
    courses: CourseResponse[];
  }