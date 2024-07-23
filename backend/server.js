const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const db = require('./db/connection');

app.use(express.json());

// Sample route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM dailytask';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.post('/api/addTasks', (req, res) => {
  const { title, defaultTime } = req.body;

  // Validate the input data
  if (!title || defaultTime === undefined) {
    return res.status(400).json({ error: 'Title and defaultTime are required' });
  }

  // Insert data into the database
  const query = 'INSERT INTO dailytask (title, defaultMinutes) VALUES (?, ?)';

  db.query(query, [title, defaultTime], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Task added successfully', taskId: result.insertId });
  });
});

app.post('/api/updateTaskStatus', (req, res) => {
  const { taskID, spentMinutes, isCompleted } = req.body;
  const todayDate = new Date().toISOString().split('T')[0];
  const query = 'INSERT INTO taskrecords (taskID, spentMinutes, completionDate) VALUES (?, ?, ?)';
  db.query(query, [taskID, spentMinutes, todayDate ], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Task Updated successfully', taskId: result.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
