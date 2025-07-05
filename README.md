
# Math Trainer

Math Trainer is a comprehensive educational web application designed to help students improve their mathematics skills. It provides a platform for timed quizzes, progress tracking, and user management, catering to students, teachers, parents, and administrators.

The application is built as a single-page application (SPA) using **React** and **TypeScript**, with a focus on a clean user interface and a modern development workflow that requires no build step.

## ✨ Features

*   **Role-Based Access Control:** Differentiated dashboards and capabilities for four user roles:
    *   **Student:** Can take customizable quizzes and track personal progress.
    *   **Admin:** Manages all users in the system.
    *   **Teacher:** (Scaffolded) Intended to monitor class progress.
    *   **Parent:** (Scaffolded) Intended to monitor their child's performance.
*   **Customizable Quizzes:** Students can set up quizzes by choosing:
    *   **Operation:** Addition, Subtraction, or Multiplication.
    *   **Difficulty Stage:** Multiple levels of complexity for each operation.
    *   **Timer:** Adjustable time limit per question (8, 4, or 3 seconds).
*   **Interactive Quiz Interface:** A focused, full-screen experience for taking quizzes with real-time feedback.
*   **Performance Tracking:** After each quiz, students see a detailed results page. The student dashboard features a chart visualizing average scores across different math operations.
*   **User Management:** A dedicated interface for administrators to add, edit, and delete users.
*   **Responsive Design:** A mobile-first design that works seamlessly across desktops, tablets, and smartphones.
*   **Zero-Build Setup:** Runs directly in the browser using ES modules and an `importmap`, eliminating the need for complex build tools like Webpack or Vite.

## 🛠️ Tech Stack

*   **Frontend Framework:** [React 19](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Routing:** [React Router v6](https://reactrouter.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)
*   **Charting:** [Recharts](https://recharts.org/)
*   **State Management:** React Context API for authentication.
*   **Icons:** Inline SVG components.
*   **Data Persistence:** Browser `localStorage` is used to simulate a backend database.

## 🚀 Getting Started

This project is configured to run without a build process. All you need is a simple local web server.

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Edge).
*   A local web server. If you have Node.js, you can use `serve`. If you have Python, you can use its built-in HTTP server. VS Code's "Live Server" extension is also an excellent choice.

### Running the Application

1.  **Clone the repository or download the source code.**

2.  **Navigate to the project's root directory** in your terminal.

3.  **Start a local server.** Here are a few options:

    *   **Using `npx serve` (requires Node.js):**
        ```bash
        npx serve
        ```

    *   **Using Python 3:**
        ```bash
        python -m http.server
        ```

    *   **Using VS Code:**
        Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click on `index.html`, and select "Open with Live Server".

4.  **Open your browser** and navigate to the local address provided by your server (e.g., `http://localhost:3000`, `http://localhost:8000`, or `http://127.0.0.1:5500`). The application should now be running.

## 👤 User Roles & Default Credentials

The application initializes with a default administrator account. You can use this to log in and create other users.

*   **Role:** Admin
*   **Email:** `admin@mathtrainer.com`
*   **Password:** `admin`

You can sign up for other roles (Student, Teacher, Parent) through the "Sign up" page.

## 📖 How to Use

1.  **Login or Sign Up:**
    *   Use the default admin credentials above to log in as an administrator.
    *   Or, click "Sign up" to create a new account. Select the "Student" role to test the quiz functionality.

2.  **Student Flow:**
    *   After logging in as a student, you will see your dashboard.
    *   Click **"Start New Quiz"** to go to the quiz setup page.
    *   **Configure your quiz:** Choose an operation, a stage, and a timer setting.
    *   Click **"Start Quiz"** to begin.
    *   Answer the questions as they appear. The quiz will automatically advance when the timer runs out or when you submit an answer.
    *   After 10 questions, you will be taken to the **Results Page** to see your score and a breakdown of your answers.
    *   Return to the dashboard to see your aggregated performance on the chart.

3.  **Admin Flow:**
    *   After logging in as an admin, you will see the **User Management** dashboard.
    *   Here you can view all users, add new users, edit existing ones, or delete them.

## 📁 Project Structure

```
/
├── components/         # Reusable React components
│   ├── admin/
│   ├── common/
│   ├── parent/
│   ├── student/
│   ├── teacher/
│   └── Icons.tsx
├── contexts/           # React Context providers (e.g., AuthContext)
├── hooks/              # Custom React hooks (e.g., useAuth)
├── pages/              # Top-level page components for routing
├── services/           # Mock API layer (interacts with localStorage)
├── utils/              # Utility functions (e.g., quizGenerator)
├── App.tsx             # Main component with router configuration
├── constants.ts        # Application-wide constants
├── index.html          # Main HTML entry point
├── index.tsx           # React root renderer
├── metadata.json       # Application metadata
├── README.md           # This file
└── types.ts            # Global TypeScript type definitions
```
