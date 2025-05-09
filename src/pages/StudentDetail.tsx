import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById } from '../services/mockApi';
import { Student } from '../types';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, User, Book, Calendar, Mail, Phone, Award } from 'lucide-react';

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate('/login', { state: { from: `/student/${id}` } });
      return;
    }

    const fetchStudent = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error('Student ID is required');
        
        const fetchedStudent = await getStudentById(id);
        if (!fetchedStudent) {
          setError('Student not found');
        } else {
          setStudent(fetchedStudent);
        }
      } catch (err) {
        setError('Failed to fetch student details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, currentUser, navigate]);

  if (!currentUser) {
    return null; // Prevent rendering while redirecting
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                <p>{error || 'An unknown error occurred'}</p>
              </div>
              <div className="mt-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Students
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-indigo-50">
            <div className="flex items-center">
              <div className="bg-indigo-600 p-3 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Student Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal and academic information.
                </p>
              </div>
              <div className="ml-auto">
                <span className={`text-white text-sm font-medium px-3 py-1 rounded-full ${student.cgpa >= 9 ? 'bg-green-500' : student.cgpa >= 8 ? 'bg-blue-500' : student.cgpa >= 7 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  CGPA: {student.cgpa.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <User className="h-4 w-4 mr-2 text-indigo-600" />
                  Full Name
                </dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">
                  {student.name}
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                  Email Address
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {student.email}
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                  Phone Number
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {student.phoneNumber}
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-indigo-600" />
                  Roll Number
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {student.rollNumber}
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Book className="h-4 w-4 mr-2 text-indigo-600" />
                  Course
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {student.course}
                </dd>
              </div>
              
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                  Semester
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  Semester {student.semester}
                </dd>
              </div>
              
              <div className="sm:col-span-3">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                  Enrollment Date
                </dt>
                <dd className="mt-1 text-lg text-gray-900">
                  {new Date(student.enrollmentDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex justify-end">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;