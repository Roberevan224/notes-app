# Notes App

A full-stack notes application with React frontend and Node.js/Express backend.

## Features

- ✅ Create, read, update, and delete notes
- ✅ Organize notes by categories
- ✅ Search functionality
- ✅ Real-time synchronization
- ✅ Timestamps for each note
- ✅ Responsive design
- ✅ Clean, intuitive UI

## Tech Stack

**Frontend:**
- React
- Axios (HTTP client)
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)

## Project Structure

```
notes-app/
├── frontend/          # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express API server
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/notes-app
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

## License

MIT
