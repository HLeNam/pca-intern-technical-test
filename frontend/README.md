# User Management - Frontend

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui, Radix UI, Lucide React
- **State Management & Data Fetching:** TanStack React Query
- **Tables Data Grid:** TanStack React Table
- **Forms & Validation:** React Hook Form, Zod
- **HTTP Client:** Axios

## Project Structure

```text
src/
├── api/                    # Axios instances and API service functions
│   ├── axios.ts
│   └── users.api.ts
├── assets/                 # App assets (images, fonts, etc.)
├── components/             # Reusable & Feature specific Components
│   ├── ui/                 # Primitive components (shadcn/ui)
│   ├── users/              # User-management specific components
│   │   ├── DeleteUserDialog.tsx
│   │   ├── SignUpDialog.tsx
│   │   ├── UpdateUserDialog.tsx
│   │   ├── UserTable.tsx
│   │   └── ...
│   ├── Header.tsx
│   └── ModeToggle.tsx
├── constants/              # Global constants
├── contexts/               # React Context APIs
├── hooks/                  # Custom React Hooks
├── lib/                    # Utility functions (tailwind merge, utils)
├── providers/              # Root and app-level providers 
├── types/                  # TypeScript interface definitions
├── App.tsx                 # Application component tree root
├── index.css               # Global tailwind imports
└── main.tsx                # Javascript entry point
```

## Features Implemented

- **User Listing:** Displays a table of users fetched from the backend.
- **Select Users:** Checkboxes available to select single or multiple users.
- **Add User:** A popup form to create a new user with validation (email format, required fields).
- **Delete User:** Confirmation dialog before deleting a user, with automatic table refresh.
- **Export Users:** Exports selected users' data in CSV format, complete with loading indicators during the operation.

## Prerequisites

- Node.js
- Docker (Optional, if you wish to run the frontend in a container)

## Getting Started

### 1. Configure environment variables

Clone the repository and navigate to the frontend directory:

```bash
cd frontend
cp .env.example .env
```

Ensure the `.env` file points to the correct backend API URL. By default, it looks like this:

```env
VITE_API_URL=http://localhost:3000
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The application will start, usually at `http://localhost:5173`. Open this URL in your browser to view the application.

## Running with Docker

You can easily build a Docker image and run the frontend inside a lightweight Nginx container.

### 1. Build the Docker image

```bash
docker build -t user-management-frontend .
```

### 2. Run the Docker container

```bash
docker run -d -p 5173:80 --name frontend-app user-management-frontend
```

The application will now be available at `http://localhost:5173`. 
*(Note: Ensure your backend is running and accessible to the frontend container. If using a container network or `docker-compose`, ensure the `VITE_API_URL` environment variable properly maps to the backend service location upon build).*

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds the production bundle.
- `npm run lint`: Runs ESLint to find code issues.
- `npm run format`: Formats code using Prettier.
- `npm run preview`: Previews the production build locally.

## Design Decisions & Assumptions

- **Component Architecture:** We chose `shadcn/ui` for high-quality, accessible building blocks, combined with `Tailwind CSS` for rapid styling and consistent design system.
- **Data Fetching:** Standardized on `React Query` for robust server-state management including caching, loading states, and automatic UI synchronization after queries/mutations.
- **Single Page Application:** Following the prompt's request, no routing (`react-router`) is included. All main operations (Listing, Add, Delete) happen seamlessly on the single view using dialogs/modals.
- **Table Handling:** Leveraged `TanStack React Table` for efficient, headless data grid management including selection states for the export function.
