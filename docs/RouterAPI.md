# Guía de direccionamiento

## Introducción:
El **direccionamiento** hace referencia a la definición de puntos finales de aplicación (URI) y cómo responden a las solicitudes de cliente.
A continuación se muestra un código de ejemplo de una ruta muy básica:
```javascript
var express = require('express');
var app = express();

//Responde con "hola mundo" cuando se realiza una petición GET a la página web.
app.get('/', function(req, res) {
  res.send('hola mundo');
});

```
En este código, cuando nos conectemos al servidor, lo que se nos mostrará será un mensaje de "hola mundo".

## Métodos de direccionamiento
Un **método de ruta** se deriva de uno de los métodos HTTP y se adjunta a una instancia de la clase express.

El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.
```javascript
// Método de direccionamiento GET
app.get('/', function (req, res) {
  res.send('Petición GET a la página principal')
})

// Método de direccionamiento POST
app.post('/', function (req, res) {
  res.send('Petición POST a la página principal')
})
```
>Express da soporte a los siguientes métodos de direccionamiento que se corresponden con los métodos HTTP: *get*, *post*, *put*, *head*, *delete*, *options*, *trace*, *copy*, *lock*, *mkcol*, *move*, *purge*, *propfind*, *proppatch*, *unlock*, *report*, *mkactivity*, *checkout*, *merge*, *m-search*, *notify*, *subscribe*, *unsubscribe*, *patch*, *search* y *connect*.

#### Método *app.all()*
Es un método de direccionamiento especial que no se deriva de ningún método HTTP. Este método se utiliza para _cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud_.

En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a ``/secreto``, tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el módulo http.
```javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // Pasa el control al siguiente manejador.
});
```
> Se mostrará el mensaje del `console.log` cada vez que se realice cualquier método de solicitud HTTP a la ruta

## Vías de acceso de rutas
Las **vías de acceso de ruta**, en combinación con un método de solicitud, definen los puntos finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares. Algunos ejemplos de vías de acceso de ruta basadas en series se muestran a continuación:

* Esta vía de acceso de ruta coincidirá con las solicitudes a la ruta raíz, ``/``.
```javascript
app.get('/', function (req, res) {
  res.send('Estás en la ruta raíz');
});
```

* Esta vía de acceso de ruta coincidirá con las solicitudes a ``/home``.
```javascript
app.get('/home', function (req, res) {
  res.send('Estás en el home de la página web');
});
```

A continuación se muestran algunos ejemplos de vías de acceso de ruta basadas en patrones de serie.

* Esta vía de acceso de ruta coincidirá con eso y peso.
```javascript
app.get('/?peso', function(req, res) {
  res.send('?peso');
});
```

* Esta vía de acceso de ruta coincidirá con peso, ppeso, etcétera.
```javascript
app.get('/p+eso', function(req, res) {
  res.send('?peso');
});
```

A continuación se muestran los ejemplos de vías de acceso de ruta basadas en expresiones regulares (vea este  [enlance](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions) para ver expresiones regulares):

* Esta vía de acceso de ruta coincidirá con cualquier valor con una “a” en el nombre de la ruta.
```javascript
app.get(/a/, function(req, res) {
  res.send('/a/');
});
```

* Esta vía de acceso de ruta coincidirá con butterfly y dragonfly, pero no con butterflyman, dragonfly man, etc.
```javascript
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

###  Parámetros de ruta
Son segmentos de la URL que son utilizadas para capturar valores especificados en su posición en la URL. Los valores capturados están en el objeto ``req.params``, con el nombre del parámetro de ruta especificada en la URL (el nombre es la clave correspondiente).


## Manejadores de rutas
En express se puede proporcionar varias funciones de devolución de llamada que se comportan como **middleware** para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar ``next('route')`` para omitir el resto de las devoluciones de llamada de ruta. Se puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

* Una **función de devolución de llamada** individual puede manejar una ruta. Por ejemplo:

```javascript
app.get('/ejemplo/b', function (req, res, next) {
  console.log('La respuesta será enviada por la siguiente función...');
  next();
}, function (req, res) {
  res.send('Hola desde B!');
});
```

* También se puede especificar una **matriz de funciones** de devolución de llamada para manejar una ruta. Por ejemplo:

```javascript

var primera_funcion = function (req, res, next) {
  console.log('Primera función');
  next();
}

var segunda_funcion = function (req, res, next) {
  console.log('Segunda función');
  next();
}

var tercera_funcion = function (req, res) {
  res.send('Tercera funcion');
}

app.get('/ejemplo/c', [primera_funcion, segunda_funcion, tercera_funcion]);
```

* Se pueden **combinar** funciones independientes y matrices de funciones para manejar una ruta. Por ejemplo:

```javascript

var primera_funcion = function (req, res, next) {
  console.log('Primera función');
  next();
}

var segunda_funcion = function (req, res, next) {
  console.log('Segunda función');
  next();
}

app.get('/ejemplo/d', [primera_funcion, segunda_funcion], function (req, res, next) {
  console.log('La respuesta será enviada por la siguiente función');
  next();
}, function (req, res) {
  res.send('Hola desde D!');
});

```

## Métodos de respuesta
Los métodos en el objeto de respuesta (res) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

Método | Descripción
-------|-------------
*res.download()* |	Solicita un archivo para descargar.
*res.end()* |	Termina el proceso de respuesta.
*res.json()* | 	Enviar una respuesta JSON.
*res.jsonp(*) |		Enviar una respuesta JSON con soporte JSONP.
*res.redirect()* | 	Redirige una petición.
*res.render()* 	| Renderiza una vista.
*res.send()* 	| Evia una respuesta de varios tipos.S
*res.sendFile()* | 	Envía un archivo como un flujo de octetos.
*res.sendStatus()* | 	Establece el código de estado de la respuesta y envía su representación en cadena como el cuerpo de la respuesta.ç

#### app.route()
Se puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando ``app.route()``. Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos.
A continuación se muestra un ejemplo:
```javascript

app.route('/libro')
  .get(function(req, res) {
    res.send('Coge un libro al azar');
  })
  .post(function(req, res) {
    res.send('Añade un libro');
  })
  .put(function(req, res) {
    res.send('Actualiza el libro');
  });
```

## express.Router
Para crear rutas manejadores de rutas montables y modulares se puede utilizar  la clase ``express.Router``. Una instancia **Router** es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una “miniaplicación”.

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.
Para visualizar su utilidad, se crea un archivo llamado **modulo.js** en el directorio de la aplicación, con el siguiente contenido:
```javascript
var express = require('express');
var router = express.Router();

//middleware que es específico para este router.
router.use(function timeLog(req, res, next) {
  console.log('Hora: ', Date.now());
  next();
});
// Defina la página principal del route.
router.get('/', function(req, res) {
  res.send('Página principal');
});
//Define el "about" del route
router.get('/about', function(req, res) {
  res.send('Sobre la aplicación');
});

module.exports = router;
```

A continuación, se carga el módulo del direccionador en la aplicación:

```javascript
var ejemplo = require('./modulo');
...
app.use('/modulo', ejemplo)
```
La aplicación ahora podrá manejar solicitudes a ``/modulo`` y ``/modulo/about``, así como invocar la función de middleware ``timeLog`` que es específica de la ruta.
