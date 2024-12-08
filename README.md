🚀 Task Management API

This is a RESTful Task Management System API built using Node.js, Express.js, and MongoDB. It allows users to create, read, update, delete, and filter tasks.

🛠 Technologies Used
Node.js with Express.js for the server-side framework.
MongoDB as the database for storing tasks.
Mongoose for MongoDB object modeling.
Postman or curl for testing API routes. 


1.POST /tasks
Description: Create a new task in the database.

Request
{
  "title": "Sample Task",
  "description": "This is a test task",
  "status": "TODO",
  "priority": "LOW",
  "dueDate": "2023-12-15T12:00:00Z"
}

Response
{
  "title": "Sample Task",
  "description": "This is a test task",
  "status": "TODO",
  "priority": "LOW",
  "dueDate": "2023-12-15T12:00:00Z",
  "createdAt": "2023-12-08T11:00:00Z",
  "updatedAt": "2023-12-08T11:00:00Z"
}


2. GET /tasks
Description: Retrieve all tasks with optional query parameters for filtering, sorting, and pagination.

Query Parameters
status: Filter by status (TODO, IN_PROGRESS, COMPLETED).
priority: Filter by priority (LOW, MEDIUM, HIGH).
sort: Sort by a key in the format key:asc or key:desc.
limit: Limit the number of records returned.
skip: Skip a number of records for pagination.

GET http://localhost:3000/tasks?status=TODO&priority=LOW&sort=createdAt:asc&limit=5&skip=0




3. GET /tasks/:id
Description: Retrieve a single task by its ID.

Request
GET "http://localhost:3000/tasks/:id"




4. PUT /tasks/:id
Description: Update a specific task by ID.

Request
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "dueDate": "2023-12-20T12:00:00Z"
}


5. DELETE /tasks/:id
Description: Delete a task by its ID.
Request
DELETE http://localhost:3000/tasks/:id


Testing with Postman
Install Postman from https://www.postman.com/.
Import the provided Postman Collection into Postman.
You can import the postman_collection.json file under the Postman Import menu.
Run the tests for endpoints in Postman.
