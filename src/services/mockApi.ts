import { Student, Course } from '../types';

// Mock data arrays
const indianFirstNames = ['Aarav', 'Aditi', 'Priya', 'Rohan', 'Anjali', 'Amit', 'Sneha', 'Vikram', 'Deepika', 'Suresh'];
const indianLastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Khan', 'Yadav', 'Reddy', 'Patel', 'Joshi', 'Chakraborty'];
const courses = ["Data Structures and Algorithms", "Database Management Systems", "Operating Systems", "Object-Oriented Programming", "Computer Networks", "Web Development", "Artificial Intelligence/Machine Learning"];

// Generate a CSE roll number
const generateRollNumber = (id: number): string => {
  return `CSE${(7000 + id).toString().padStart(4, '0')}`;
};

// Generate mock data
const generateMockData = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `student-${i + 1}`,
    name: `${indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)]} ${indianLastNames[Math.floor(Math.random() * indianLastNames.length)]}`,
    email: `student${i + 1}@example.com`,
    rollNumber: generateRollNumber(i + 1),
    cgpa: parseFloat((Math.random() * 3 + 7).toFixed(2)),
    course: courses[Math.floor(Math.random() * courses.length)],
    semester: Math.floor(Math.random() * 8) + 1,
    enrollmentDate: new Date(Date.now() - Math.random() * 126144000000).toISOString().split('T')[0],
    phoneNumber: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    status: Math.random() > 0.2 ? 'active' : 'inactive' // 80% active, 20% inactive
  }));
};

// Mock students data - new students will be added to the beginning
let mockStudents = generateMockData(20);

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all students with pagination
export const getStudents = async (page: number = 1, limit: number = 5): Promise<{ students: Student[], total: number }> => {
  await delay(800);
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    students: [...mockStudents].slice(start, end),
    total: mockStudents.length
  };
};

// Get student by ID
export const getStudentById = async (id: string): Promise<Student | undefined> => {
  await delay(500);
  return mockStudents.find(student => student.id === id);
};

// Add a new student
export const addStudent = async (student: Omit<Student, 'id' | 'status'>): Promise<Student> => {
  await delay(1000);
  const newStudent = {
    ...student,
    id: `student-${Date.now()}`,
    status: 'active',
    rollNumber: generateRollNumber(mockStudents.length + 1)
  };
  // Add new student to the beginning of the array
  mockStudents = [newStudent, ...mockStudents];
  return newStudent;
};

// Filter students by course
export const filterStudentsByCourse = async (course: Course): Promise<Student[]> => {
  await delay(500);
  return mockStudents.filter(student => student.course === course);
};

// Filter students by status
export const filterStudentsByStatus = async (status: 'active' | 'inactive'): Promise<Student[]> => {
  await delay(500);
  return mockStudents.filter(student => student.status === status);
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  await delay(500);
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === 'active').length;
  const averageCGPA = mockStudents.reduce((acc, curr) => acc + curr.cgpa, 0) / totalStudents;
  
  // Calculate course distribution
  const courseStats = courses.map(course => {
    const studentsInCourse = mockStudents.filter(s => s.course === course).length;
    const percentage = ((studentsInCourse / totalStudents) * 100).toFixed(1);
    return {
      name: course,
      students: studentsInCourse,
      percentage: percentage
    };
  }).sort((a, b) => b.students - a.students);

  return {
    totalStudents,
    activeStudents,
    inactiveStudents: totalStudents - activeStudents,
    averageCGPA,
    courseStats
  };
};

// Search students by name, roll number, or course
export const searchStudents = async (query: string): Promise<Student[]> => {
  await delay(500);
  const lowercaseQuery = query.toLowerCase();
  return mockStudents.filter(
    student => 
      student.name.toLowerCase().includes(lowercaseQuery) || 
      student.rollNumber.toLowerCase().includes(lowercaseQuery) ||
      student.course.toLowerCase().includes(lowercaseQuery)
  );
};