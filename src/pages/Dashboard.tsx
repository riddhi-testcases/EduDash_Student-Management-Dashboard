import React, { useState, useEffect } from 'react';
import { getStudents, filterStudentsByCourse, searchStudents, getDashboardStats } from '../services/mockApi';
import { Student, Course, COURSES } from '../types';
import StudentCard from '../components/StudentCard';
import CourseFilter from '../components/CourseFilter';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookOpen, Users, Award, Plus, List, ChevronRight, ChevronLeft, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsPerPage] = useState(5);
  const [stats, setStats] = useState<any>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard statistics
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);

        // Only fetch students if user is logged in
        if (currentUser) {
          let result;
          if (searchQuery) {
            const searchResults = await searchStudents(searchQuery);
            setStudents(searchResults.slice(0, studentsPerPage));
            setTotalStudents(searchResults.length);
          } else if (selectedCourse) {
            const filteredStudents = await filterStudentsByCourse(selectedCourse as Course);
            setStudents(filteredStudents.slice(0, studentsPerPage));
            setTotalStudents(filteredStudents.length);
          } else {
            result = await getStudents(currentPage, studentsPerPage);
            setStudents(result.students);
            setTotalStudents(result.total);
          }
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCourse, searchQuery, currentPage, studentsPerPage, currentUser]);

  const handleCourseChange = (course: string | null) => {
    setSelectedCourse(course);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCourse(null);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions Panel */}
        <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentUser ? (
                <>
                  <Link
                    to="/view-all-students"
                    className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <List className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-indigo-900">View All Students</h3>
                      <p className="text-sm text-indigo-700">Browse complete student list</p>
                    </div>
                  </Link>

                  <Link
                    to="/add-student"
                    className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-green-900">Add New Student</h3>
                      <p className="text-sm text-green-700">Register a new student</p>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <List className="h-6 w-6 text-indigo-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-indigo-900">View All Students</h3>
                      <p className="text-sm text-indigo-700">Sign in to view complete list</p>
                    </div>
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-gray-600 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-900">Add New Student</h3>
                      <p className="text-sm text-gray-700">Sign in to add students</p>
                    </div>
                  </Link>
                </>
              )}

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-purple-900">Course Overview</h3>
                  <p className="text-sm text-purple-700">{Object.keys(COURSES).length} active courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">{stats.activeStudents} Active</span>
                    <span className="text-red-600">{stats.inactiveStudents} Inactive</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Average CGPA</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.averageCGPA.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Popular Course</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stats.courseStats[0].name.split(' ').map((word: string) => word[0]).join('')}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {stats.courseStats[0].students} students ({stats.courseStats[0].percentage}%)
                </div>
              </div>
            </div>

            {/* Course Distribution */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
              <div className="space-y-4">
                {stats.courseStats.map((course: any) => (
                  <div key={course.name} className="flex items-center">
                    <div className="w-48 truncate text-sm text-gray-600">{course.name}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${course.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-32 text-sm text-gray-600">
                      {course.students} students ({course.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Student List Section - Only visible when logged in */}
        {currentUser && (
          <>
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>

            <CourseFilter selectedCourse={selectedCourse} onCourseChange={handleCourseChange} />

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="large" />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? 'No results match your search criteria.' : 'No students in the database yet.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students.map(student => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;