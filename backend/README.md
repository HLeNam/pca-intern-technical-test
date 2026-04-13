# User Management - Backend

Built with **NestJS**, **TypeORM**, and **PostgreSQL**.

API doc: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Validation:** class-validator, class-transformer

## Project Structure

```
src/
├── common/
│   ├── dto/                        # Shared DTOs (api-response, paginate)
│   ├── exceptions/                 # Custom exceptions
│   ├── filters/                    # Global exception filters
│   ├── helpers/                    # Response & Swagger helpers
│   ├── interceptors/               # Response transform interceptor
│   ├── interfaces/                 # Shared interfaces
│   ├── pipes/                      # Validation pipe
│   └── transforms/                 # Reusable class-transformer helpers
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── env.validation.ts           # Environment variable validation
│   └── typeorm.config.ts
├── modules/
│   ├── export/
│   │   ├── dto/
│   │   ├── export.controller.ts
│   │   ├── export.service.ts
│   │   └── export.module.ts
│   └── users/
│       ├── dto/
│       ├── entities/
│       ├── interfaces/
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── app.module.ts
└── main.ts
```

## Prerequisites

- Node.js
- Docker & Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HLeNam/pca-intern-technical-test.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.development
```

`.env.example`:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=myapp
DB_SYNC=true
DB_LOGGING=true

FRONTEND_URL=http://localhost:5173
```

### 4. Start the database

```bash
docker-compose up -d
```

### 5. Run migrations

```bash
npm run migration:run
```

### 6. Seed the database (Optional)

To seed the database with 100 sample users:

```bash
npm run seed
```

This command will:

- Clear existing users
- Generate 100 random users with faker data
- Hash passwords using bcrypt
- Insert all users into the database

**Note:** Default password for all seeded users is `password123`

### 7. Start the application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The server will be running at `http://localhost:3000`.

## Running with Docker

Build and start all stack (backend + database):

```bash
docker-compose up -d --build
```

Stop:

```bash
docker-compose down
```

Stop and delete data:

```bash
docker-compose down -v
```

## API Endpoints

### Users

| Method   | Endpoint     | Description                                 |
| -------- | ------------ | ------------------------------------------- |
| `GET`    | `/users`     | Get all users (pagination, sorting, search) |
| `POST`   | `/users`     | Create a new user                           |
| `PATCH`  | `/users/:id` | Update a user                               |
| `DELETE` | `/users/:id` | Soft delete a user                          |

### Export

| Method | Endpoint            | Description                  |
| ------ | ------------------- | ---------------------------- |
| `POST` | `/export/users/csv` | Export selected users as CSV |

### GET /users — Query Parameters

| Parameter   | Type   | Default     | Description                                                      |
| ----------- | ------ | ----------- | ---------------------------------------------------------------- |
| `page`      | number | 1           | Page number                                                      |
| `limit`     | number | 10          | Items per page (max 100)                                         |
| `sortBy`    | string | `createdAt` | Field to sort by (`firstName`, `lastName`, `email`, `createdAt`) |
| `sortOrder` | string | `DESC`      | Sort direction (`ASC`, `DESC`)                                   |
| `search`    | string | -           | Search by first name, last name, or email                        |

## Response Format

**Success:**

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "errors": {},
  "timestamp": "2026-03-21T10:00:00.000Z",
  "path": "/users"
}
```

**Success with pagination:**

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-02T00:00:00.000Z"
    }
  ],
  "errors": {},
  "timestamp": "2026-03-21T10:00:00.000Z",
  "path": "/users",
  "metadata": {
    "totalItems": 100,
    "totalPages": 10,
    "currentPage": 1,
    "itemsPerPage": 10
  }
}
```

**Error:**

```json
{
  "success": false,
  "message": "A user with this email already exists",
  "timestamp": "2026-04-13T11:10:56.275Z",
  "path": "/users"
}
```

**Validation Error:**

```json
{
  "success": false,
  "message": "Validation failed",
  "timestamp": "2026-04-13T11:10:56.274Z",
  "path": "/users",
  "errors": {
    "email": ["Email must be a valid email address"]
  }
}
```

## Design Decisions

**Soft Delete**
Users are never permanently deleted. Instead, a `deleted` flag is set to `true`. This preserves data integrity and allows the same email to be reused after deletion.

**Email Uniqueness**
A partial unique index (`WHERE deleted = false`) is applied at the database level, allowing the same email to be reused after a user is soft deleted.

**Consistent Response Format**
All API responses follow a unified structure with `success`, `message`, `data`, `errors`, `timestamp`, and `path` fields, making frontend integration straightforward.

## Assumptions

- Authentication and authorization are out of scope for this assignment.
- Password encryption is not required as per the assignment brief.
- The `deleted` field follows the sample data structure provided in the brief.
