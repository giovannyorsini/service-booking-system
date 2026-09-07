# Service Booking System — Frontend

The frontend application for the Service Booking System.

It provides a responsive interface for creating, viewing, editing, updating, and deleting service requests through the backend REST API.

## Tech Stack

- React
- React Router
- Tailwind CSS
- Vite
- JavaScript

The interface also makes use of modern CSS techniques including:

- Mobile-first responsive design
- CSS Container Queries
- `clamp()` for fluid typography
- Flexbox
- CSS Grid
- CSS transitions and animations
- `prefers-reduced-motion`
- Responsive layouts without unnecessary fixed dimensions

## Features

The current frontend provides:

- Responsive dashboard
- Request statistics
- Request list
- Service request cards
- Request creation form
- Request details page
- Request editing
- Request deletion
- Request status management
- Loading states
- Empty states
- Error handling
- Responsive navigation
- Accessible form controls and interaction states

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── layout/
│   │   ├── AppShell/
│   │   └── Header/
│   │
│   ├── requests/
│   │   ├── RequestCard/
│   │   ├── RequestEditForm/
│   │   ├── RequestEmptyState/
│   │   ├── RequestForm/
│   │   ├── RequestList/
│   │   ├── RequestStats/
│   │   └── RequestStatus/
│   │
│   └── ui/
│       └── ConfirmDialog/
│
├── hooks/
│   └── useRequests.js
│
├── pages/
│   ├── CreateRequest/
│   ├── Dashboard/
│   ├── NotFound/
│   └── RequestDetails/
│
├── services/
│   └── api.jsx
│
├── utils/
│   └── formatters.js
│
├── App.jsx
├── index.css
└── main.jsx
```

## Component Architecture

The frontend separates reusable UI from domain-specific components.

```text
components/ui/
```

contains generic interface elements such as confirmation dialogs.

```text
components/requests/
```

contains components that understand the service-request domain.

Pages compose these components into complete user experiences.

## Data Flow

API communication is isolated inside the API service layer.

```text
Page
 ↓
useRequests
 ↓
api.jsx
 ↓
REST API
 ↓
Express Backend
```

This prevents individual UI components from having to manage raw HTTP requests directly.

## Routes

The application currently contains:

| Route           | Purpose          |
| --------------- | ---------------- |
| `/`             | Dashboard        |
| `/requests/new` | Create a request |
| `/requests/:id` | Request details  |
| `*`             | Not found page   |

## Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

The value points the frontend API service to the backend server.

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint with:

```bash
npm run lint
```

## Responsive Design

The interface follows a mobile-first approach.

Page layouts primarily use Tailwind's responsive utilities, while components can use Container Queries when their behavior should depend on their available container width rather than the viewport itself.

Fluid values are used where appropriate instead of creating excessive breakpoint-specific rules.

Example:

```text
Viewport responsiveness
        ↓
Tailwind breakpoints

Component responsiveness
        ↓
Container Queries

Fluid typography
        ↓
clamp()
```

## Accessibility

The frontend includes accessibility-oriented practices such as:

- Semantic HTML
- Explicit form labels
- Keyboard-friendly controls
- Visible focus states
- Non-color status indicators
- Reduced-motion support
- Accessible error and status messaging

## Current Limitations

The frontend depends on the backend being available and currently receives data from an in-memory backend store.

Refreshing or restarting the backend can therefore change or remove the available data.
