Transaction Management API

A simple Node.js and Express.js API to manage financial transactions, supporting operations like creating transactions, viewing transaction history, and updating transaction statuses.

Features

Create a new transaction (DEPOSIT/WITHDRAWAL).
Retrieve all transactions for a specific user.
Update the status of a transaction.
Get details of a specific transaction.

Prerequisites

Node.js (v16 or later)
npm (v7 or later)

Installation

Clone the repository:
git clone https://github.com/your-username/transaction-management-api.git
cd transaction-management-api
Install dependencies:
npm install
Start the server:
node app.js
The server will run at:
http://localhost:3000/

API Endpoints

1. Create a Transaction
POST /api/transactions/

Request Body:

json

{
  "amount": 100.00,
  "transaction_type": "DEPOSIT",
  "user": 1
}
Response:

json
Copy code
{
  "transaction_id": 1,
  "amount": 100.00,
  "transaction_type": "DEPOSIT",
  "status": "PENDING",
  "user": 1,
  "timestamp": "2024-11-22T12:00:00Z"
}

2. Get All Transactions for a User
   
GET /api/transactions/?user_id={user_id}

Response:

json
Copy code
{
  "transactions": [
    {
      "transaction_id": 1,
      "amount": 100.00,
      "transaction_type": "DEPOSIT",
      "status": "PENDING",
      "timestamp": "2024-11-22T12:00:00Z"
    },
    {
      "transaction_id": 2,
      "amount": 50.00,
      "transaction_type": "WITHDRAWAL",
      "status": "COMPLETED",
      "timestamp": "2024-11-21T15:00:00Z"
    }
  ]
}


3. Update a Transaction Status
   
PUT /api/transactions/{transaction_id}/

Request Body:

json

{
  "status": "COMPLETED"
}
Response:

json
{
  "transaction_id": 1,
  "amount": 100.00,
  "transaction_type": "DEPOSIT",
  "status": "COMPLETED",
  "timestamp": "2024-11-22T12:00:00Z"
}


4. Get Details of a Specific Transaction
   
GET /api/transactions/{transaction_id}/

Response:

json
{
  "transaction_id": 1,
  "amount": 100.00,
  "transaction_type": "DEPOSIT",
  "status": "COMPLETED",
  "timestamp": "2024-11-22T12:00:00Z"
}

Directory Structure

├── app.js               # Main server file
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
