import React from 'react';
import { COURSES, CourseAbbreviation } from '../types';

interface CourseFilterProps {
  selectedCourse: string | null;
  onCourseChange: (course: string | null) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ selectedCourse, onCourseChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Filter by Course</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCourseChange(null)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            selectedCourse === null
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Courses
        </button>
        
        {Object.entries(COURSES).map(([abbr, fullName]) => (
          <button
            key={abbr}
            onClick={() => onCourseChange(fullName)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              selectedCourse === fullName
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={fullName}
          >
            {abbr}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseFilter;