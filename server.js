const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

const db = new sqlite3.Database('./db/my_database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

app.use(express.json()); 

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/api/signUp', (req, res) => {
  const { username, email, password } = req.body;

  db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (err) => {
          if (err) {
              console.error('Error inserting user:', err.message);
              res.status(500).send('Internal server error');
          } else {
              console.log('User inserted:', { username, email });
              res.send(renderWelcomePage(username, email));
          }
      }
  );  
});


app.post('/api/signIn', (req, res) => {
  const {email, password} = req.body
  // change to an IDP
  db.get(
    'SELECT 1 FROM users where email = ? and password = ?', 
    [email, password], (err, row) => {
      if(err){
        console.error("Error executing query:", err.message);
      }  
      else if(row){
        console.log("Successfully Signed in");
        res.status(200).json({
          success: true,
          message: "Signed In Successfully",
          data: {
            username: row.username,
            email: row.email,
            password: row.password
          }
        });
      }
      else{
        console.log("Invalid Sign in details, Try again!");
        res.status(401).json({
          "success": false,
          "message": "Invalid username or password"
      });
      }
    }
  )
});

app.get('/welcome', (req,res) => {
  const { username, email } = req.query;
  res.send(renderWelcomePage(username, email));
})

app.get('/api', (req, res) => {
  res.send('GET request to the homepage');
});


const renderWelcomePage = (username, email) => {
  return `
      <html>
          <head>
              <title>Welcome</title>
          </head>
          <body>
              <h1>Welcome, ${username}!</h1>
              <a href="/">Go back to Home</a>
          </body>
      </html>
  `;
};


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
