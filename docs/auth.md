# Ejemplo de autenticación de sesión en node.js con express

La **autenticación** es el proceso de verificar si un usuario es quien dice
ser. La **autorización** es el proceso de determinar si un usuario tiene los
suficientes privilegios para acceder a los recursos solicitados.

### Ejemplo

A continuación, se muestra el proceso de autenticación y autorización usando
`express.js`. El usuario tendrá que loguearse, si el proceso de login se
efectúa correctamente, el usuario será verificado y guardado en la sesión.
Una vez el usuario haya cerrado la sesión, el acceso será revocado mediante
el borrado en la sesión de su identidad.


```javascript
var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

// Middleware de autenticación y autorización

var auth = function(req, res, next) {
  if (req.session && req.session.user === "claudia" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

// Inicio de sesión
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('Fallo al iniciar sesión.');    
  } else if(req.query.username === "claudia" || req.query.password === "claudia1234") {
    req.session.user = "claudia";
    req.session.admin = true;
    res.send("Inicio de sesión satisfactorio.");
  }
});

// Cierre de sesión
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("La sesión se ha cerrado satisfactoriamente.");
});

// Acceder al contenido
app.get('/content', auth, function (req, res) {
    res.send("Solo puedes ver esto si has iniciado sesión");
});

app.listen(3000);
console.log("App ejecuntándose en http://localhost:3000");
```

**Nota**: este ejemplo lo puedes encontrar en la carpeta `/src`.


Para ejecutar el código anterior:

```bash
npm install express
npm install express-session
npm session_auth.js
```
Una vez ejecutado el programa anterior, prueba a visitar las siguientes
páginas:

* [localhost:3000/content]()
* [localhost:3000/login?username=claudia&password=claudia1234]()
* [localhost:3000/content]()
* [localhost:3000/logout]()
* [localhost:3000/content]()

### Explicación

Importamos express y express-session. A continuación, creamos una aplicación
de express y añadimos la sesión a la aplicación de express.

```javascript
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
```

El **middleware de autenticación y autorización** permite el acceso al siguiente
paso. Si el usuario es claudia y tiene permisos de administrador, podrá
acceder.

```javascript
var auth = function(req, res, next) {
  if (req.session && req.session.user === "claudia" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
```

Cuando accedemos a: [localhost:3000/login?username=claudia&password=claudia1234](),
se ejecuta el siguiente bloque de código.

```javascript
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "claudia" || req.query.password === "claudia1234") {
    req.session.user = "claudia";
    req.session.admin = true;
    res.send("login success!");
  }
});
```
En el anterior código, se comprueba el nombre de usuario y la contraseña
del mismo. Si coinciden con "claudia" y "claudia1234", se creará una sesión
**única para cada navegador y usuario**.

Al acceder a: [localhost:3000/logout]()

La sesión se borra y el usuario dejará de tener acceso a los recursos
protegidos.

```javascript
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("La sesión se ha cerrado satisfactoriamente.");
});
```

En la dirección [localhost:3000/content]() se encuentran el contenido
protegido. Se le pasa como parámetro la función `auth` que determinará
si el usuario tiene permiso para ver el contenido o no.

```javascript
app.get('/content', auth, function (req, res) {
    res.send("Solo puedes ver esto si has iniciado sesión");
});
```

Por último, la app se inicia escuchando por el puerto 3000.

```javascript
app.listen(3000);
console.log("App ejecuntándose en http://localhost:3000");
```
