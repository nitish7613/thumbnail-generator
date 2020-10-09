const express = require('express');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var jsonpatch = require('fast-json-patch');
const fs = require('fs');
const request = require('request');
const resizer = require('node-image-resizer');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/jsonpatch', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      var myobj = { Name:"Nitish", contactDetails: { city: [ ] } };
      var patches = [
                    {op:"replace", path:"/Name", value:"Kashware" },
                    {op:"add", path:"/email", value:"kashware@gmail.com" },
                    {op:"add", path:"/contactDetails/city/0", value:{ locality:"Delhi" }  }
                    ];
     jsonpatch.applyPatch( myobj, patches );
 // myobj == { Name:"Kashware", email:"kashware@gmail.com", contactDetails:{ city[ {locality:"Delhi"} ] } };
      res.send(myobj);
      res.sendStatus(200);

    }
  });
});

app.post('/api/thumbnail', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else { 
    //fixing hight and width   
const setup = { 
  all: {
    path: './',
  },
  versions:  [{
    quality: 100,
    prefix: 'thumbnail_',
    width: 50,
    height: 50
  }]
};
//asnc wait for resizing
(async () => {
  await resizer('./aspx.jpg', setup);
})();
res.sendStatus(200);
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'nitish',
    password: 'nit123'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
//Add token in header as
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(3000, () => console.log('Server started on port 3000'));