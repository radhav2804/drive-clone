# Node Drive

A cloud storage backend API built with Node.js, Express, TypeScript, and Prisma.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

## Setting Up Project from Scratch

If you want to create this project from scratch, follow these commands:

### 1. Initialize Node.js Project

```bash
mkdir node-drive
cd node-drive
npm init -y
```

### 2. Install Dependencies

```bash
npm install express cors dotenv bcrypt jsonwebtoken multer morgan zod @prisma/client
```

### 3. Install Dev Dependencies

```bash
npm install -D typescript ts-node nodemon @types/node @types/express @types/bcrypt @types/cors @types/jsonwebtoken @types/multer @types/morgan prisma eslint
```

### 4. Initialize TypeScript

```bash
npx tsc --init
```

### 5. Initialize Prisma

```bash
npx prisma init
```

This creates a `prisma` folder with `schema.prisma` and a `.env` file.

### 6. Configure Prisma Schema

Edit `prisma/schema.prisma` with your models (User, Folder, File, etc.)

### 7. Create Database and Run Migrations

```bash
npx prisma migrate dev --name init
```

### 8. Generate Prisma Client

```bash
npx prisma generate
```

## Setup Instructions (Existing Project)

### 1. Clone the repository and navigate to the project

```bash
cd node-drive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/node_drive"
JWT_SECRET="your-secret-key-here"
PORT=3000
```

Replace `username`, `password`, and database name with your PostgreSQL credentials.

### 4. Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Or push the schema to the database:

```bash
npx prisma db push
```

### 5. Run the Application

For development (with hot reload):

```bash
npm run dev
```

For production:

Build the project:
```bash
npm run build
```

Start the server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start the development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npx prisma studio` - Open Prisma Studio to view/edit database data
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma Client

## Project Structure

```
node-drive/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── routes/             # API routes
│   ├── schemes/            # Validation schemas
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
├── storage/                # File storage directory
└── package.json
```

## API Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **File Upload**: Multer
- **Password Hashing**: bcrypt

## Development

The server runs on `http://localhost:3000` by default (or the port specified in your `.env` file).
