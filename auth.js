//authsession.js
"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");

let bcrypt = require("bcrypt-nodejs");
let users = {
  javisunami: bcrypt.hashSync("elgransunami")
};
app.set('port', (process.env.PORT || 8082));

let instructions = `
Visit these urls in the browser:
<ul>
  <li> <a href="/public/index.html">Acceso al libro</a> </li>
  <li> <a href="/login?username=javisunami&password=elgransunami">Autenticación</a> </li>
  <li> <a href="/logout"/a> Cerrar sesión</li>
</ul>
`;

let layout = function(x) { return x+"<br />\n"+instructions; };

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
  next();
});

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.user in users)
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    console.log('login failed');
    res.send('login failed');
  } else if(req.query.username in users  &&
            bcrypt.compareSync(req.query.password, users[req.query.username])) {
    req.session.user = req.query.username;
    req.session.admin = true;
    res.send(layout("login success! user "+req.session.user));
  } else {
    console.log(`login ${util.inspect(req.query)} failed`);
    res.send(layout(`login ${util.inspect(req.query)} failed. You are ${req.session.user || 'not logged'}`));
  }
});

app.get('/', function(req, res) {
  res.send(instructions);
});
// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send(layout("logout success!"));
});

// Get content endpoint
app.get('/public/*?',
    auth  // next only if authenticated
);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'));
console.log("app running");
