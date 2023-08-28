# Task Management System

The Task Management System is a full-stack JavaScript application designed to manage tasks with associated tags. It provides RESTful API endpoints to perform CRUD operations on tasks and tags, allowing users to create, read, update, and delete tasks along with their tags.

## Technologies Used

- Backend Runtime - NodeJS
- Framework - ExpressJS
- Database - MongoDB
- ORM - Mongoose
- Languages - JavaScript, TypeScript
- Validator Middleware - Express-validator

## Live Demo

Test out the API of the Task Management System [here](https://task-manager-backend-maestro.vercel.app/).

<!-- Check out the live demo of the Task Management System [here](https://task-management-react.vecel.com). -->

## How to Run

To run the Task Management System locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-management
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your MongoDB database and update the `.env` file with the appropriate database URI.

5. Build and start the application:

   ```bash
   npm run build
   npm start
   ```

6. Access the application in your browser at `http://localhost:3000`.

## How It Works

The Task Management System is built using Node.js and Express.js on the backend, and it uses MongoDB to store tasks and tags. The frontend is implemented using HTML, CSS, and JavaScript.

### Features

- **Task Management:** Create, read, update, and delete tasks.
- **Tag Management:** Create, read, update, and delete tags. Tags are associated with tasks.
- **Automatic Tag Creation:** When creating or updating a task, new tags are automatically created if they don't exist in the database.
- **Tag Count:** Tags maintain a count of how many tasks are associated with them.
- **Validation:** Input data is validated and sanitized using the express-validator library.
- **RESTful API:** The application provides a set of well-defined API endpoints to interact with tasks and tags.

### API Endpoints

- `GET /tasks`: Get a list of all tasks.
- `GET /tasks/:id`: Get details of a specific task.
- `POST /tasks`: Create a new task with associated tags.
- `PUT /tasks/:id`: Update an existing task, including associated tags.
- `DELETE /tasks/:id`: Delete a task and update associated tag counts.
- `GET /tags`: Get a list of all tags.
- `GET /tags/:id`: Get details of a specific tag.
- `POST /tags`: Create a new tag.
- `PUT /tags/:id`: Update an existing tag.
- `DELETE /tags/:id`: Delete a tag and update associated task tags.

Feel free to explore the codebase for more detailed information on the implementation.

---

Enjoy using the Task Management System to organize and manage your tasks efficiently!

For any inquiries or issues, please contact [your-email@example.com](mailto:your-email@example.com).
