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

app.get('/api/specialTask', (req, res) => {
  const query = 'SELECT * FROM specialtask';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.post('/api/addTasks', (req, res) => {
  const { title,
    defaultTime, 
    spentHours,
    spentMinutes,
    completed,
    state } = req.body;

  // Validate the input data
  if (!title || defaultTime === undefined) {
    return res.status(400).json({ error: 'Title and defaultTime are required' });
  }

  // Insert data into the database
  const query = 'INSERT INTO dailytask (title, defaultMinutes, spentHours, spentMinutes, completed, state) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [title, defaultTime, spentHours, spentMinutes, completed, state], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Task added successfully', taskId: result.insertId });
  });
});

app.post('/api/updateTaskStatus', (req, res) => {
  const { taskID, spentMinutes, spentHours, completed} = req.body;
  // const todayDate = new Date().toISOString().split('T')[0];
  const query = 'UPDATE dailytask SET spentMinutes = ?, spentHours = ?, completed = ? WHERE id = ?';
  db.query(query, [spentMinutes, spentHours, completed, taskID], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(201).json({ message: 'Task Updated successfully', taskId: result.insertId });
  });
});

app.post('/api/updateSpecialTask', (req, res) => {
  const {title, start, end, scheduledDate, completed} = req.body;
  // const todayDate = new Date().toISOString().split('T')[0];
  // console.log(start.slice(0,10));
  const query = 'INSERT INTO specialtask (title, start, end, scheduledDate, completed) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, start, end, scheduledDate, completed], (err, result) => {
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
