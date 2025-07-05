# Math Trainer Application Flowchart

This document contains a flowchart diagram describing the user flow and component interaction of the Math Trainer application. You can render this diagram by pasting the code into a Mermaid.js compatible editor, such as the [Mermaid Live Editor](https://mermaid.live/).

```mermaid
graph TD
    subgraph "Browser"
        A[User visits App] --> B{index.html};
    end

    subgraph "React Application Bootstrap"
        B --> C[index.tsx<br/>ReactDOM.createRoot];
        C --> D[App.tsx];
        D --> E[AuthProvider<br/>(AuthContext.tsx)];
        E --> F[HashRouter];
        F --> G[AppRoutes];
    end

    subgraph "Authentication & Routing"
        G --> H{Is User Authenticated?<br/>(ProtectedRoute.tsx)};
        H -- No --> I[Login/SignUp Pages];
        I --> I1[Login.tsx];
        I --> I2[SignUp.tsx];
        I1 & I2 -- API Calls --> J[api.ts<br/>(Interacts with localStorage)];
        J -- On Success --> K[User Session Created];
        K --> H;
        H -- Yes --> L[Layout.tsx<br/>(Header, Nav)];
    end

    subgraph "Role-Based Dashboards"
        L --> M[Dashboard.tsx<br/>(Role Switch)];
        M -- "role: admin" --> N[AdminDashboard<br/>(UserManagement.tsx)];
        M -- "role: student" --> O[StudentDashboard.tsx];
        M -- "role: teacher" --> P[TeacherDashboard.tsx];
        M -- "role: parent" --> Q[ParentDashboard.tsx];
        
        N -- Manages Users via --> J;
        O -- Fetches Data via --> J;
    end
    
    subgraph "Student Quiz Flow"
        O -- "Start New Quiz" --> R[/quiz/select<br/>(QuizSetup.tsx)];
        R -- "Configures Quiz" --> S[constants.ts];
        R -- "Starts Quiz" --> T[/quiz/start<br/>(Quiz.tsx)];
        T -- Generates Questions --> U[utils/quizGenerator.ts];
        T -- "Quiz Ends" --> V[Saves Session via api.ts];
        V --> W[/quiz/results<br/>(QuizResults.tsx)];
        W -- "Play Again" --> R;
        W -- "Back to Dashboard" --> M;
    end
    
    subgraph "Shared Components"
        style L fill:#f0f9ff,stroke:#0ea5e9,stroke-width:2px
        style N fill:#fff7ed,stroke:#f97316,stroke-width:1px
        style O fill:#ecfdf5,stroke:#10b981,stroke-width:1px
        style P fill:#f1f5f9,stroke:#64748b,stroke-width:1px
        style Q fill:#f1f5f9,stroke:#64748b,stroke-width:1px
        X1[StyledButton.tsx]
        X2[ProgressChart.tsx]
        X3[Icons.tsx]
    end

    O --> X2;
    I1 & N & R & W --> X1;
    L & N & P & Q & W --> X3;

```
