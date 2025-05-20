### Frontend Setup (ReactJS UI)

The frontend is a ReactJS application built using Vite.

**Prerequisites (Frontend):**

* **Node.js**: LTS version recommended (which includes npm). You can download it from [nodejs.org](https://nodejs.org/).

**Setup and Running:**

1.  **Navigate to Frontend Directory**:
    Assuming your frontend code is in a sub-directory (e.g., `frontend` or `ui`) within your main project structure. Adjust the path as needed.
    ```bash
    cd <path-to-your-frontend-directory>
    ```

2.  **Install Dependencies**:
    This will install React, Vite, Tailwind CSS, and other necessary packages listed in `package.json`.
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    This command starts the Vite development server.
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173` (Vite's default port, but check your terminal output for the exact URL).

4.  **API Connection**:
    * The frontend application communicates with the backend API.
    * Ensure the backend API is running (typically at `https://localhost:8443` as configured in the backend setup).
    * API calls within the React application will be directed to this backend URL. If the URL is hardcoded, it will be in the relevant service/component files. For production deployment, you would configure this URL via environment variables or a build-time configuration.

5.  **Build for Production**:
    To create an optimized production build of the frontend:
    ```bash
    npm run build
    ```
    The output files will be placed in a `dist` directory (default for Vite).

6.  **Linting**:
    To check for code quality and style issues:
    ```bash
    npm run lint
    ```

7.  **Preview Production Build**:
    To locally preview the production build after running `npm run build`:
    ```bash
    npm run preview
    ```