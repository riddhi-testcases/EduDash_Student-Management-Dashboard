import React from 'react';
import { Link } from 'react-router-dom';
import { Student } from '../types';
import { BookOpen, Calendar, Phone, Mail, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { currentUser } = useAuth();
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-red-500',
    'bg-indigo-500',
  ];
  
  const colorIndex = parseInt(student.id.replace(/[^0-9]/g, '')) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className={`${avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3`}>
            {student.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{student.name}</h3>
            <p className="text-gray-600 text-sm">{student.rollNumber}</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <span className={`text-white text-xs font-medium px-2.5 py-1 rounded-full ${student.cgpa >= 9 ? 'bg-green-500' : student.cgpa >= 8 ? 'bg-blue-500' : student.cgpa >= 7 ? 'bg-yellow-500' : 'bg-red-500'}`}>
              CGPA: {student.cgpa.toFixed(2)}
            </span>
            <span className={`text-white text-xs font-medium px-2.5 py-1 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
              {student.status}
            </span>
          </div>
        </div>
        
        {currentUser ? (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="truncate">{student.course}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
              <span>Semester {student.semester} • Enrolled: {student.enrollmentDate}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-indigo-600" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-indigo-600" />
                <span>{student.phoneNumber}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="truncate">{student.course}</span>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          {currentUser ? (
            <Link 
              to={`/student/${student.id}`}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
            >
              View Details →
            </Link>
          ) : (
            <Link 
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
            >
              Sign in to view details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard