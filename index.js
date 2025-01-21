// Import required modules
import express from 'express';
import bodyParser from 'body-parser'; // For parsing request bodies
import path from 'path'; // For handling file paths
import morgan from 'morgan'; // For logging HTTP requests
import { fileURLToPath } from 'url'; // To get the current file path for ES Modules
import pg from 'pg';

// Get the directory name (__dirname equivalent in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express app
const app = express();

let databasejson;
let code = '-1' ;

// Setup a database
const db= new pg.Client({
    user: "postgres",  //server name
    host: "localhost", 
    database: "Quiz", //database name
    password: "1234",  // postgre sql password
    port :5432
  })

db.connect();

if(code==='-1'){
  db.query("Select * FROM defaultQuiz",(err,res)=>{
    if(err)console.error("Postgres query execution error: ",err);
    else {
      databasejson=res.rows;
    }
    db.end();
  })
}

else {
  db.query(`Select * FROM ${code}`,(err,res)=>{
    if(err)console.error("Postgres query execution error: ",err);
    else {
      databasejson=res.rows;
    }
    db.end();
  })
}



// Middleware setup
app.use(morgan('dev')); // Log requests to the console
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Static file serving (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'static', 'homepage.html'));
});

app.get('/QuizData',(req,res) => {
  console.log(databasejson);
  res.json(databasejson);
})

// Example POST route
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`Received data: Name - ${name}, Email - ${email}`);
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Sorry, page not found!');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
