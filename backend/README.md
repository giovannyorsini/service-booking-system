# Service Booking System — Backend

The backend REST API for the Service Booking System.

It is built with Node.js and Express and uses Object-Oriented JavaScript together with a layered architecture to separate HTTP handling, business logic, data access, and domain models.

## Tech Stack

- Node.js
- Express
- JavaScript
- Object-Oriented Programming
- REST API
- CORS

## Features

The current API supports:

- Creating service requests
- Retrieving all requests
- Retrieving individual requests
- Updating request information
- Updating request status
- Deleting requests
- Input validation
- Centralized error handling
- Unknown-route handling
- In-memory data storage

## Architecture

```text
src/
│
├── app.js
├── server.js
│
├── controllers/
│   └── requestController.js
│
├── data/
│   └── requestsStore.js
│
├── middlewares/
│   ├── errorHandler.js
│   └── notFound.js
│
├── models/
│   └── serviceRequest.js
│
├── routes/
│   └── requestRoutes.js
│
├── services/
│   └── requestService.js
│
└── utils/
    ├── AppError.js
    └── validation.js
```

## Request Flow

The API follows a layered request-processing flow:

```text
HTTP Request
     ↓
   Route
     ↓
 Controller
     ↓
  Service
     ↓
   Store
     ↓
   Model
```

### Routes

Define the available HTTP endpoints and map them to controllers.

### Controllers

Handle the HTTP layer and return HTTP responses.

### Services

Contain business logic, validation, normalization, and request operations.

### Data Store

Provides temporary in-memory data access.

### Models

Represent service-request entities using Object-Oriented JavaScript.

### Middleware

Provides application-wide behaviors such as unknown-route handling and centralized error responses.

### Utilities

Contains reusable application errors and validation helpers.

## API Endpoints

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/requests`     | Retrieve all service requests |
| GET    | `/requests/:id` | Retrieve one service request  |
| POST   | `/requests`     | Create a service request      |
| PATCH  | `/requests/:id` | Update a service request      |
| DELETE | `/requests/:id` | Delete a service request      |

## Service Request

A service request currently contains:

```json
{
  "id": "unique-request-id",
  "name": "John Smith",
  "address": "123 Main Street",
  "serviceType": "gutter installation",
  "status": "pending"
}
```

Supported statuses currently include:

```text
pending
completed
```

## Creating a Request

### Request

```http
POST /requests
Content-Type: application/json
```

```json
{
  "name": "John Smith",
  "address": "123 Main Street",
  "serviceType": "gutter installation"
}
```

### Response

The server returns the newly created service request with a generated ID and a default `pending` status.

## Updating a Request

The PATCH endpoint accepts supported request fields individually or together.

Example:

```http
PATCH /requests/:id
Content-Type: application/json
```

```json
{
  "name": "John Smith",
  "status": "completed"
}
```

Unsupported fields and invalid values are rejected by the service layer.

## Deleting a Request

```http
DELETE /requests/:id
```

A successful deletion returns:

```http
204 No Content
```

## Error Handling

The backend uses a centralized error-handling middleware.

Common responses include:

| Status | Meaning                     |
| ------ | --------------------------- |
| `400`  | Invalid request data        |
| `404`  | Resource or route not found |
| `500`  | Unexpected server error     |

Application-specific errors are represented by a custom `AppError` class.

## Storage

The current MVP intentionally uses an in-memory data store.

This means:

```text
Server running
    ↓
Requests exist in memory

Server restarted
    ↓
Requests are cleared
```

No database is currently required.

The storage layer is isolated from the rest of the application so that persistent storage can be introduced later without redesigning the entire API.

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the API server:

```bash
node src/server.js
```

The server runs on:

```text
http://localhost:3000
```

## Health Check

The API exposes a basic health endpoint:

```http
GET /health
```

Expected response:

```json
{
  "status": "ok"
}
```

## Future Improvements

Potential future backend improvements include:

- Persistent database storage
- Automated tests
- More request fields
- Additional request statuses
- Search and filtering
- Pagination
- Authentication and authorization
- More advanced validation
- API documentation

These improvements are intentionally deferred until they provide a meaningful benefit to the application.
