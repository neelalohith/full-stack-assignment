const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(bodyParser.json())

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [];
const admins = ['admin@gmail.com','admain1@yahoo.com']

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const{username,password} = req.body
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  const existingUser = USERS.find(user => user.email == email)
  if(existingUser){
    res.status(400).send("User with such an email already exists")
  }
  else{
   const newUser = {
     email : email , 
     password: password
  };
  USERS.push(newUser)
  // return back 200 status code to the client
  res.status(200).send('Hello World!')
}
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const{email,password} = req.body
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = USERS.find(user => user.email == email)
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  if(user && user.password === password){
    const token = generateRandomToken();
    res.status(200).json({ token: token, message: 'Login successsful'})
  }
  else{
    res.status(401).send('Unauthorized email or password')
  }

  function generateRandomToken(){
    return Math.random().toString(36)
  }

  res.send('Hello World from route 2!')
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send(QUESTIONS)
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
   res.send(SUBMISSION)
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   const {solution} = req.body
   const isAccepted = Math.random() < 0.5
   const submission = {
    solution: solution,
    accepted: isAccepted
  };
  SUBMISSIONS.push(submission);
  if (isAccepted) {
    res.status(200).send('Solution accepted and stored.');
  } else {
    res.status(401).send('Solution rejected.');
  }
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
 function isAdmin(req,res,next) {
   const userEmail = req.body.email
   if(admins.includes(userEmail)){
    next();
   }
   else{
    res.status(403).send('Access denied: Only admins can perform this action.');
   }
}

app.post('/problems', isAdmin, function(req, res) {
    const { problem } = req.body
    res.status(200).send('Problem added successfully.');
  })
  

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})