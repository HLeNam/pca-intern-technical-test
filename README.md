# PCA Technical Assessment - Full Stack Developer

A modern web application for user management created for the **PCA Technical Interview**, fulfilling all standard and bonus requirements with a clean UI, robust backend, and fully dockerized environment.

## Live Demo (Deployed)

The project is deployed and lives online! You can review the work instantly here without tearing up a local environment:
- **Frontend Application:** [https://your-frontend-link.com](https://your-frontend-link.com)
- **Backend API Docs (Swagger):** [https://your-backend-link.com/api/docs](https://your-backend-link.com/api/docs)

*(Note: Data is subject to reset occasionally. If the server is from a free tier, it may require a few seconds to wake up on the first request.)*

---

## Setup & Running Instructions

To test and review the application locally, you can set it up manually.

### 1. Database Setup
Ensure you have a PostgreSQL instance running. Create an empty database (e.g., `user_management`) and have the credentials ready.

### 2. Backend Application
```bash
cd backend
npm install
cp .env.example .env.development
# Make sure to update the DB variables in .env.development
npm run migration:run
npm run seed  # (Optional) generate 100 sample user rows easily
npm run start:dev
```
The Backend will run on `http://localhost:3000`.

### 3. Frontend Application
```bash
cd frontend
npm install
cp .env.example .env
# Make sure VITE_API_URL is pointing properly to your backend (default matching is fine)
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## Technical Stack

### Frontend Application
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State/Data Management:** TanStack React Query, Axios
- **Grid / Table:** TanStack React Table
- **Forms & Validation:** React Hook Form, Zod

### Backend Application
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** class-validator, class-transformer

---

## Features Implemented

✔ **User Listing:** Display all users in a cleanly formatted table, supporting global search and dynamic sorting by First Name, Last Name, and Email.  
✔ **Add User:** Dynamic pop-up dialog with immediate feedback and tight validation mapping (React Hook Form).  
✔ **Update User:** Edit existing user details easily via a dedicated modal, keeping records up to date.  
✔ **Delete User:** Safe deletion with confirmation dialog mechanisms, automatically refetching data in the background once completed.  
✔ **Export Users CSV:** Feature to select specific records and request a clean CSV file streaming directly from the backend, featuring asynchronous loading UI.

## Design Decisions & Bonus Priorities

- **Soft Delete Concept:** To prevent destructive actions permanently wiping records out of relation schemas, the `deleted: true` flag logic has been heavily utilized. The DB level uses partial unique indexing to still allow reusing an email address after a deletion.
- **RESTful Formatting:** Consistent backend response structures wrap every endpoint (`{ success, data, errors ... }`) to build highly reliable typescript contracts on the frontend.
- **Single Page Modals:** Avoided introducing complex router overhead `react-router` per the instructions, but maintained an extremely resilient modal-driven workflow for Adding, Editing, and Deleting.

---

## Local Docker Setup (Optional)

If you prefer an automated setup rather than installing dependencies manually, a unified `docker-compose.yml` has been specifically tailored to run the entire stack seamlessly.

### Prerequisites
- Docker & Docker Compose installed

### Running the Entire Project via Docker

1. Open a terminal at the root directory of this project.
2. Spin up the application stack:
   ```bash
   docker-compose up -d --build
   ```
3. Once the containers are built, running, and healthy (takes ~30s), access the services:
   - **Frontend UI:** [http://localhost:5173](http://localhost:5173)
   - **Backend API & Swagger Docs:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

*(Note: Run `docker-compose down -v` to stop the containers and wipe the database volumes when you are completely finished).*

---
*Thank you for reviewing my assessment. If there is any feedback or need for clarification, please do not hesitate to contact me.*
