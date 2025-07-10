
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

## � Deployment

This application can be easily deployed to any static hosting service since it's a frontend-only application with no backend dependencies.

### Prerequisites for Deployment

*   **Node.js** (version 16 or higher) for building the application
*   **Environment Variables** (optional): If using Gemini API features, you'll need to set the `GEMINI_API_KEY` environment variable

### Building for Production

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Build the application:**
    ```bash
    npm run build
    ```
    This creates an optimized production build in the `dist/` directory.

3.  **Preview the build locally** (optional):
    ```bash
    npm run preview
    ```

### Deployment Options

#### **Option 1: Netlify**

1.  Push your code to a Git repository (GitHub, GitLab, etc.)
2.  Connect your repository to [Netlify](https://netlify.com)
3.  Configure build settings:
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
    *   **Environment variables:** Set `GEMINI_API_KEY` if needed
4.  Deploy automatically on every push to your main branch

#### **Option 2: Vercel**

1.  Push your code to a Git repository
2.  Connect your repository to [Vercel](https://vercel.com)
3.  Vercel will automatically detect the Vite configuration
4.  Set environment variables in the Vercel dashboard if needed
5.  Deploy automatically on every push

#### **Option 3: GitHub Pages**

1.  Install the `gh-pages` package:
    ```bash
    npm install --save-dev gh-pages
    ```

2.  Add deployment script to `package.json`:
    ```json
    {
      "scripts": {
        "deploy": "npm run build && gh-pages -d dist"
      }
    }
    ```

3.  Configure `vite.config.ts` with your repository base:
    ```typescript
    export default defineConfig({
      base: '/your-repo-name/',
      // ... existing config
    });
    ```

4.  Deploy:
    ```bash
    npm run deploy
    ```

#### **Option 4: Firebase Hosting**

1.  Install Firebase CLI:
    ```bash
    npm install -g firebase-tools
    ```

2.  Initialize Firebase in your project:
    ```bash
    firebase init hosting
    ```

3.  Configure `firebase.json`:
    ```json
    {
      "hosting": {
        "public": "dist",
        "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
        "rewrites": [
          {
            "source": "**",
            "destination": "/index.html"
          }
        ]
      }
    }
    ```

4.  Build and deploy:
    ```bash
    npm run build
    firebase deploy
    ```

#### **Option 5: Other Static Hosting Services**

The built `dist/` folder can be uploaded to any static hosting service:
*   **AWS S3 + CloudFront**
*   **Azure Static Web Apps**
*   **DigitalOcean App Platform**
*   **Surge.sh**
*   **Railway**

### Environment Variables

If your deployment uses features that require the Gemini API:

1.  **Local Development:** Create a `.env` file in the root directory:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

2.  **Production:** Set the `GEMINI_API_KEY` environment variable in your hosting platform's dashboard

### Post-Deployment Notes

*   **Data Persistence:** The application uses browser `localStorage` for data storage. Each user's data is stored locally in their browser.
*   **HTTPS:** Most modern hosting platforms provide HTTPS by default, which is recommended for production applications.
*   **Custom Domain:** You can configure a custom domain through your hosting provider's dashboard.

## �📁 Project Structure

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
