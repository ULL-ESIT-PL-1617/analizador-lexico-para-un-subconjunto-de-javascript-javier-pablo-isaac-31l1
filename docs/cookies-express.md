# Manejo de Cookies con Express

### ¿Qué es una cookie?

Como se ha dicho anteriormente, una cookie es un pequeño pedazo de información mandado desde un sitio web y guardado en el navegador del usuario para futuros usos. Por tanto, es una forma de aportar persistencia al protocolo HTTP.

### Preparación

Tendremos que instalar un módulo de `node.js` para poder usar las cookies con `express`. Instalaremos el middleware `cookie-parser`. Para ello, pondremos en la terminal del proyecto donde trabajemos:

`$npm install cookie-parser`

### Uso de `cookie parser`

Para usarlo, tendremos, en esencia, que "importar" `cookiep-paser` con `require`. De esta forma, para usarlo, haremos lo siguiente:

```javascript

var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
```

### Sintaxis

El módulo `cookie-parser` parsea la cabecera de cookies y con la información obtenida rellena el campo `req.cookies` mediante un hash (clave, valor).

Para establecer una nueva cookie, en la respuesta se hará lo siguiente:

```javascript

app.get('/cookie', function(req,res){
  res.cookie('nombreDeLaCookie', 'Has visitado la web').send('Hola, cookie generada');
});

```

Lo que acabamos de mostrar hace lo sigiente:
1. Captura las peticiones a `/cookie`
2. A la respuesta se le carga un nuevo cookie, de nombre "nombreDeLaCookie" y valor "Has visitado la web"
3. Se envía la respuesta con un mensaje "Hola, cookie generada"

Como dijimos antes, en cada peticion (request), el módulo `cookie-parser` parsea las cookies que recibe, por tanto, una buena manera de comprobar el funcionamiento de esta función es imprimir por pantalla las cookies que se reciben, como se ve en el siguiente ejemplo:

```javascript
app.get('/', function(req, res, next){
  console.log("Cookies: ", req.cookies);
});
```

### Tiempo de vida de la cookie

Podremos establecer el tiempo de expiración de la cookie de la siguiente manera:

```javascript
res.cookie('nombreDeLaCookie', 'Has visitado la web', {expire: new Date() + 9999});
```

Como hemos visto, una forma de añadir diversas opciones a las cookies es pasando un objeto como argumento, el cual contiene dichas opciones.

### Borrado de cookies

Una cookie existente puede ser borrada de forma sencilla usando `clearCookie`. Este método recibe el nombre de la cookie que se desea eliminar.

He aquí un ejemplo:

```javascript
app.get('borrarcookie', function(req,res){
  clearCookie('nombreDeLaCookie');
  res.send('Cookie eliminada');
});
```

**Programa de ejemplo de este capítulo: ** `$ gulp manejo_de_cookies_express`
