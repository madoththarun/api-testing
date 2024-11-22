const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// File-based storage (mock database)
const filePath = "./transactions.json";

// Helper function to read/write transactions
const readTransactions = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  return data ? JSON.parse(data) : [];
};

const writeTransactions = (transactions) => {
  fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
};

// Root endpoint
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Transaction Management API. Use /api/transactions to interact with the API."
  );
});

// POST /api/transactions/
app.post("/api/transactions", (req, res) => {
  const { amount, transaction_type, user } = req.body;

  if (!amount || !transaction_type || !user) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!["DEPOSIT", "WITHDRAWAL"].includes(transaction_type)) {
    return res.status(400).json({ error: "Invalid transaction_type." });
  }

  const transactions = readTransactions();
  const newTransaction = {
    transaction_id: transactions.length + 1,
    amount,
    transaction_type,
    user,
    status: "PENDING",
    timestamp: new Date().toISOString(),
  };

  transactions.push(newTransaction);
  writeTransactions(transactions);

  res.status(201).json(newTransaction);
});

// GET /api/transactions/
app.get("/api/transactions", (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res
      .status(400)
      .json({ error: "Query parameter user_id is required." });
  }

  const transactions = readTransactions();
  const userTransactions = transactions.filter(
    (txn) => txn.user === parseInt(user_id)
  );

  res.json({ transactions: userTransactions });
});

// GET /api/transactions/:transaction_id
app.get("/api/transactions/:transaction_id", (req, res) => {
  const { transaction_id } = req.params;

  const transactions = readTransactions();
  const transaction = transactions.find(
    (txn) => txn.transaction_id === parseInt(transaction_id)
  );

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found." });
  }

  res.json(transaction);
});

// PUT /api/transactions/:transaction_id
app.put("/api/transactions/:transaction_id", (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  if (!["COMPLETED", "FAILED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const transactions = readTransactions();
  const transaction = transactions.find(
    (txn) => txn.transaction_id === parseInt(transaction_id)
  );

  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found." });
  }

  transaction.status = status;
  writeTransactions(transactions);

  res.json(transaction);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
