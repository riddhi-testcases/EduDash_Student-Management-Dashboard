import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddStudent from './pages/AddStudent';
import StudentDetail from './pages/StudentDetail';
import ViewAllStudents from './pages/ViewAllStudents';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/view-all-students" element={
                <ProtectedRoute>
                  <ViewAllStudents />
                </ProtectedRoute>
              } />
              <Route path="/add-student" element={
                <ProtectedRoute>
                  <AddStudent />
                </ProtectedRoute>
              } />
              <Route path="/student/:id" element={
                <ProtectedRoute>
                  <StudentDetail />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;