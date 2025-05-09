export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  cgpa: number;
  course: Course;
  semester: number;
  enrollmentDate: string;
  phoneNumber: string;
  status: 'active' | 'inactive';
}

export type Course = 
  | "Data Structures and Algorithms" 
  | "Database Management Systems" 
  | "Operating Systems" 
  | "Object-Oriented Programming" 
  | "Computer Networks" 
  | "Web Development" 
  | "Artificial Intelligence/Machine Learning";

export type CourseAbbreviation = "DSA" | "DBMS" | "OS" | "OOP" | "CN" | "WD" | "AI/ML";

export const COURSES: {[key in CourseAbbreviation]: Course} = {
  "DSA": "Data Structures and Algorithms",
  "DBMS": "Database Management Systems",
  "OS": "Operating Systems",
  "OOP": "Object-Oriented Programming",
  "CN": "Computer Networks",
  "WD": "Web Development",
  "AI/ML": "Artificial Intelligence/Machine Learning"
};

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}