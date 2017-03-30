# Utilización del middleware

Express es web framework de direccionamiento y middleware que aporta muy pocas
funcionalidades por sí mismo. Una aplicación de Express es, en esencia, un
conjunto de llamadas a funciones middleware.

## ¿Qué es una función middleware?

Las funciones middleware son funciones que se caracterizan por tener acceso al
objeto `req` y al objeto `res`, es decir, a los objetos de request y de
response. Además, tienen acceso a la siguiente función middleware (`next`)
en el **ciclo de solicitud/respuestas** de las aplicación.

Una función middleware puede realizar diferentes tareas. A continuación, se
enumeran algunas de ellas:

* Ejecutar código.
* Realizar cambios en la solicitud y los objetos de respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Realizar la invocación de la siguiente función middleware.

Para evitar que una solicitud se quede *colgada*, la función middleware que se
está ejecutando en ese momento, debe finalizar el ciclo de solicitud/respuestas
o bien invocar a la siguiente función middleware `next()`.

En una aplicación Express, existen diferentes tipos de middleware.

* **Middleware de nivel de aplicación.**
* **Middleware de nivel de direccionador.**
* **Middleware de manejo de errores.**
* **Middleware incorporado.**
* **Middleware de terceros.**

A continuación, se detallan cada uno de los tipos de middleware.

## Middleware de nivel de aplicación

Las funciones middleware de nivel de aplicación, pueden tener de forma
opcional, una vía de acceso de montaje.

Lo primero que debemos hacer para usar una función middleware es enlazarla
a un instancia del objeto aplicación. Para ello, podemos hacer uso de las
funciones `app.use()`, `app.get()`, `app.put()`, etc.

#### Ejemplo 1

En esta función podemos observar como, al no estar montada en ningún punto
determinado, cada vez que se recibe una solicitud, la función se ejecuta
mostrando por consola la hora a la que se ha recibido la solicitud.

```javascript
var app = express();

app.use(function (req, res, next) {
  console.log('Hora:', Date.now());
  next();
});
```
**Véase ejemplo3_1.js en `src/`**
#### Ejemplo 2

En Express es posible servir varias rutas en un solo middleware haciendo uso
de la notación `:string`. Este ejemplo muestra una función middleware
montada en ``/user/:name`. La función se ejecutará para cualquier tipo de
solicitud HTTP en la vía de acceso `/user/:name`.

```javascript
app.use('/user/:name', function (req, res, next) {
  console.log('user ' + req.params.name);
  next();
});
```
Es posible también usar una expresión regular para limitar la ruta:
``` javascript
get('/mongo/:prueba([a-zA-Z])', function(req, res) {
  console.log(req.params.prueba);
});
```

Cuando se visita `/user/juan` el valor de `req.params.name` será juan.

#### Ejemplo 3

Este ejemplo muestra una ruta y su función de manejador. La función maneja
las solicitudes GET que llegan a la vía de acceso /user/:id.

```javascript
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

#### Ejemplo 4

A continuación, se muestra un ejemplo de carga de una serie de funciones
middleware en un punto de montaje, con una vía de acceso de montaje.
Este ejemplo muestra una subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la vía de acceso /user/:id.

```javascript
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

#### Ejemplo 5

Los manejadores de rutas permiten definir varias rutas para una vía de
acceso. En este ejemplo, se definen dos funciones middleware para
la vía de acceso /user/:id. La segunda función no dará ningún problema, pero nunca se invocará, porque la primera finaliza el ciclo de
solicitud/respuestas.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso /user/:id.

```javascript
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

Para omitir el resto de las funciones de middleware de una pila de middleware
de direccionador, es necesario invocar `next()` para pasar el control a la
siguiente ruta. Esto solo funcionará en las funciones middleware que se hayan
cargado utilizando las funciones app.METHOD() o router.METHOD(), siendo METHOD
un método HTTP(`get`, `put`, etc).

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso /user/:id.

```javascript
app.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
  else next(); //
}, function (req, res, next) {
  res.render('regular');
});

app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```
**Véase ejemplo3_2.js en `src/`**

## Middleware de nivel de direccionador

El middleware de nivel de direccionador funciona de la misma manera que el
middleware de nivel de aplicación. La única diferencia es que está enlazado a una
instancia de `express.Router()`.

```javascript
var router = express.Router();
```

El siguiente código de ejemplo replica el funcionamineto del middleware
de aplicación que hemos descrito anteriormente. Sin embargo, para este caso
hemos hecho uso de middlewares de nivel de direccionador.

```javascript
var app = express();
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

router.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
  else next(); //
}, function (req, res, next) {
  res.render('regular');
});


router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

app.use('/', router);
```

## Middleware de manejo de errores

El middleware de manejo de errores siempre utiliza **cuatro argumentos**.

Aunque no necesite utilizar el objeto `next`, debe estar especificado.
De lo contrario, el objeto `next` se interpretará como middleware normal
y, por tanto, no podrá manejar errores.

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Se ha producido un error.');
});
````

**Nota**: Express se suministra con un manejador de errores incorporado,
que se encarga de los errores que aparecen en la aplicación. Esta función
de middleware de manejo de errores predeterminada se añade al final de la pila
de funciones de middleware.

## Middleware incorporado

La única función middleware incorporada en Express es `express.static`. Esta función
se encarga de serviro los elementos estáticos de una aplicación Express.

```javascript
express.static(ruta, [options])
```

* El argumento `ruta` especifica el directorio raíz desde el que se realiza el
servicio de activos estáticos.

El objeto `options` es opcional y puede tener diferentes propiedades. A continuación,
se muestra un ejemplo de objeto `options`:

``` javascript
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
```

Para más información sobre las propiedades del objeto `options`,
pulse [aquí](http://expressjs.com/es/guide/using-middleware.html#middleware.built-in).

**Nota**: para cada aplicación puede haber más de un directorio estático.

```javascript
app.use(express.static('public'));
app.use(express.static('photos'));
app.use(express.static('docs'));
app.use(express.static('files'));
```

**Véase ejemplo3_4.js en `src/`**

## Middleware de terceros

Los middleware de terceros son empleados para añadir funcionalidad a las
aplicaciones de Express.

Para poder utilizar los middlewares de terceros, es necesario instalar el módulo
`Node.js` necesario y cargarlo en la aplicación a nivel de aplicación o a nivel de
direccionador.

A continuación, se muestra un ejemplo de instalación y de carga de un de una función
middlware de terceros.

```bash
$ npm install slash
```

```javascript
var express = require('express');
var app = express();
var slash = require('express-slash');

app.use(slash());
```

**Véase ejemplo3_3.js en `src/`**

**Nota**: en el siguiente enlace se encuentran algunos módulos de Express.
Pulse [aquí](https://expressjs.com/es/resources/middleware.html).
