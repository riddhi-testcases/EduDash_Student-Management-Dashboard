# EDU Dash - Student Management Dashboard

![EDU Dash Logo](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/graduation-cap.svg)

A modern, responsive student management dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Comprehensive Dashboard**
  - Quick overview of student statistics
  - Course distribution analytics
  - Popular course tracking
  - Average CGPA monitoring

- 👥 **Student Management**
  - Add new students
  - View detailed student profiles
  - Search and filter capabilities
  - Pagination for large datasets

- 🔐 **Authentication**
  - Secure user registration
  - Email/password login
  - Protected routes
  - Role-based access control

- 📱 **Responsive Design**
  - Mobile-first approach
  - Adaptive layout
  - Smooth transitions
  - Consistent UI across devices

## Tech Stack

- **Frontend Framework**: React 18
- **Type System**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Router**: React Router v6

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edu-dash.git
   ```

2. Install dependencies:
   ```bash
   cd edu-dash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
edu-dash/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── firebase/      # Firebase configuration
│   ├── pages/         # Page components
│   ├── services/      # API and business logic
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Key Features Explained

### Dashboard Analytics
- Total student count with active/inactive status
- Average CGPA calculation
- Course distribution visualization
- Popular course tracking

### Student Management
- Comprehensive student profiles
- Course-wise filtering
- Search functionality
- Paginated student list

### Security
- Protected routes for authenticated users
- Secure data access patterns
- Input validation
- Error handling

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
