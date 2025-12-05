# Node Drive API Documentation

Base URL: `http://localhost:5000/api`

---

## Authentication APIs

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account and automatically create a root folder for the user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Minimum 2 characters
- `email`: Valid email format
- `password`: Minimum 6 characters

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-12-04T10:00:00.000Z",
      "updatedAt": "2025-12-04T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "Validation errors",
  "errors": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Valid email format
- `password`: Minimum 6 characters

**Success Response (200):**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "Invalid credentials"
}
```

---

## Folder APIs

**Note:** All folder endpoints require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### 3. Get Folder Contents
**Endpoint:** `GET /folders?folderId=<id>`

**Description:** Get contents (subfolders and files) of a specific folder or root folder if no folderId is provided.

**Query Parameters:**
- `folderId` (optional): ID of the folder to retrieve contents from. If omitted, returns root folder contents.

**Request Example:**
```
GET /api/folders
GET /api/folders?folderId=5
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200):**
```json
{
  "message": "Folder contents retrieved successfully",
  "data": {
    "folder": {
      "id": 1,
      "name": "root",
      "parentId": null,
      "userId": 1
    },
    "subFolders": [
      {
        "id": 2,
        "name": "Documents",
        "parentId": 1,
        "userId": 1
      }
    ],
    "files": [
      {
        "id": 1,
        "name": "document.pdf",
        "folderId": 1,
        "userId": 1
      }
    ]
  }
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

### 4. Create Folder
**Endpoint:** `POST /folders`

**Description:** Create a new folder or subfolder.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Folder",
  "parentId": 1
}
```

**Validation Rules:**
- `name`: Minimum 1 character
- `parentId`: Optional. Positive integer. If omitted, creates folder in root.

**Success Response (201):**
```json
{
  "message": "Folder created successfully",
  "data": {
    "id": 3,
    "name": "New Folder",
    "parentId": 1,
    "userId": 1,
    "createdAt": "2025-12-04T10:00:00.000Z",
    "updatedAt": "2025-12-04T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Validation errors",
  "errors": [
    {
      "path": ["name"],
      "message": "Folder name must be at least 1 character long"
    }
  ]
}
```

---

### 5. Rename Folder
**Endpoint:** `PATCH /folders/:id`

**Description:** Rename an existing folder.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**URL Parameters:**
- `id`: Folder ID to rename

**Request Body:**
```json
{
  "name": "Renamed Folder"
}
```

**Request Example:**
```
PATCH /api/folders/2
```

**Validation Rules:**
- `name`: Minimum 1 character

**Success Response (200):**
```json
{
  "message": "Folder renamed successfully",
  "data": {
    "id": 2,
    "name": "Renamed Folder",
    "parentId": 1,
    "userId": 1,
    "createdAt": "2025-12-04T10:00:00.000Z",
    "updatedAt": "2025-12-04T10:05:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Folder not found or access denied"
}
```

---

### 6. Delete Folder
**Endpoint:** `DELETE /folders/:id`

**Description:** Delete a folder. (Note: Implementation should handle cascading deletes for subfolders and files)

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id`: Folder ID to delete

**Request Example:**
```
DELETE /api/folders/2
```

**Success Response (200):**
```json
{
  "message": "Folder deleted successfully",
  "data": {
    "id": 2,
    "name": "Deleted Folder",
    "parentId": 1,
    "userId": 1
  }
}
```

**Error Response (400):**
```json
{
  "message": "Folder not found or access denied"
}
```

---

## File APIs

**Note:** All file endpoints require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### 7. Upload File
**Endpoint:** `POST /files/upload?folderId=<id>`

**Description:** Upload a file to a specific folder.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Query Parameters:**
- `folderId` (optional): ID of the folder to upload file into. If omitted, uploads to root folder (folderId=0).

**Request Body (form-data):**
- `file`: The file to upload (binary)

**Request Example (Postman/Thunder Client):**
```
POST /api/files/upload?folderId=1

Body Type: form-data
- Key: file | Type: File | Value: [Select your file]
```

**cURL Example:**
```bash
curl -X POST "http://localhost:5000/api/files/upload?folderId=1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@C:/path/to/document.pdf"
```

**Success Response (201):**
```json
{
  "message": "File uploaded successfully",
  "data": {
    "id": 1,
    "name": "document.pdf",
    "url": "/storage/user_1/folder_1/document.pdf",
    "size": 102400,
    "mimeType": "application/pdf",
    "folderId": 1,
    "userId": 1,
    "createdAt": "2025-12-05T10:00:00.000Z",
    "updatedAt": "2025-12-05T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "No file uploaded"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

### 8. Download File
**Endpoint:** `GET /files/:id/download`

**Description:** Download a file by its ID.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id`: File ID to download

**Request Example:**
```
GET /api/files/5/download
```

**cURL Example:**
```bash
curl -X GET http://localhost:5000/api/files/5/download \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -o downloaded_file.pdf
```

**Success Response (200):**
- Returns the file as binary data with appropriate headers
- `Content-Type`: Based on file's mimeType
- `Content-Disposition`: attachment; filename="document.pdf"

**Error Response (404):**
```json
{
  "message": "File not found"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

### 9. Delete File
**Endpoint:** `DELETE /files/:id`

**Description:** Delete a file by its ID.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameters:**
- `id`: File ID to delete

**Request Example:**
```
DELETE /api/files/5
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:5000/api/files/5 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Success Response (200):**
```json
{
  "message": "File deleted successfully",
  "data": {
    "id": 5,
    "name": "document.pdf",
    "url": "/storage/user_1/folder_1/document.pdf",
    "folderId": 1,
    "userId": 1
  }
}
```

**Error Response (404):**
```json
{
  "message": "File not found or access denied"
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized"
}
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation error or business logic error) |
| 401 | Unauthorized (Missing or invalid token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Authentication Flow

1. **Register** a new user via `POST /auth/register`
2. Receive JWT token in response
3. **Login** via `POST /auth/login` for existing users
4. Include token in `Authorization` header for all protected endpoints:
   ```
   Authorization: Bearer <your_token>
   ```

---

## Environment Variables

Required in `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=5000
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"
```

---

## Testing with cURL

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Folders (with auth):
```bash
curl -X GET http://localhost:5000/api/folders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Folder:
```bash
curl -X POST http://localhost:5000/api/folders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Folder","parentId":1}'
```

### Rename Folder:
```bash
curl -X PATCH http://localhost:5000/api/folders/2 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Renamed Folder"}'
```

### Delete Folder:
```bash
curl -X DELETE http://localhost:5000/api/folders/2 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Database Schema

### User Table
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  folders   Folder[]
  files     File[]
}
```

### Folder Table
```prisma
model Folder {
  id         Int      @id @default(autoincrement())
  name       String
  parentId   Int?
  parent     Folder?  @relation("SubFolders", fields: [parentId], references: [id])
  subFolders Folder[] @relation("SubFolders")
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  files      File[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### File Table
```prisma
model File {
  id        Int      @id @default(autoincrement())
  name      String
  url       String
  size      Int
  mimeType  String
  folderId  Int
  folder    Folder   @relation(fields: [folderId], references: [id])
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Notes

- All timestamps are in ISO 8601 format
- JWT tokens expire based on `JWT_EXPIRES_IN` environment variable (default: 1 hour)
- Passwords are hashed using bcrypt with 10 salt rounds
- Root folder is automatically created for each user upon registration
