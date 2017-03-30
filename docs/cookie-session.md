# Cookie Session
Es una función middleware de sesión simple basado en cookies. El hecho de que las cookies pueden guardar datos en el navegador del usuario, una API de sesión puede implementarse utilizando cookies.

## Instalación y uso
Para instalar este módulo es necesario tener instalado [npm](https://docs.npmjs.com/), ya que es un módulo **Node.js** disponible a través del repositorio **npm**. El comando para instalar el módulo es el siguiente: `npm install cookie-session`

Para utilizar el módulo, hay que requerirlo y guardarlo en un objeto :
```javascript
var cookieSession = require('cookie-session')
```

## API del módulo
Este módulo dispone de una serie de métodos que se decriben a continuación.

### `cookieSession(opciones)`
Este método crea una nueva función middleware de sesión con cookies con las opciones establecidas. Esta función middleware enlazará la propiedad `session` a `req`, que provee un objeto representando la sesión cargada. Esta sesión es una nueva sesión si no se ha aportado ninguna sesión valida en la petición, o una sesión cargada desde la petición.

La función middleware añadirá automáticamente una cabecera `Set-Cookie` a las respuesta si el contenido de `req.session` fue alterado. Hay que tener en cuenta que ninguna cabecera `Set-Cookie` estará en la cabecera de respuesta (y de este modo no se creará ninguna sesión para un usuario específico), a menos que haya contenido en la sesión. De esta forma hay que asegurarse de añadir algo al campo `req.session` tan pronto como se identifique información para guardar para la sesión.

#### Opciones

##### name
El nombre de la cookie a establecer. Por defecto el nombre es `session`.

##### keys
La lista de claves utilizada para firmar y verificar los valores de las cookies. Las cookies establecidas siempre están marcadas con `key[0]`, mientras que las otras claves son válidas para verificar, permitiendo la rotación de claves.

##### secret
Una cadena que será utilizada como única clave si el campo `keys` no se provee.

##### Cookie options
Se pueden pasar otras opciones al método `cookies.get()` y `cookies.set()` para permitir el control de la seguridad, el dominio, el path y otro tipo de configuraciones.

El campo de opciones también pueden contener cualquiera de las siguientes opciones:
* `maxAge` : Es un número que representa los milisegundos a partir de la fecha proveida por la  función `Date.now()` para que se expire la cookie de sesión.
* `expires` : Es un objeto `Date` que indica la fecha de expiración de la cookie (por defecto expira al final de la sesión).
* `path` : Es una cadena que indica el path de la cookie (por defecto es `/`).
* `domain`: Una cadena que indica el dominio de la cookie (no se establece por defecto).
* `sameSite` : Es un booleano o una cadena que indica si la cookie es una cookie del "mismo sitio" ( el valor es falso por defecto). Se puede establecer a `strict`, `lax` o verdadero (que es mapeado a `strict`).
* `secure` : Es un booleano que indica si la cookie sólo se puede enviar por **HTTPS** (por defecto el valor es falso para **HTTP** y verdadero para **HTTPS**).
* `httpOnly` : Es un booleano que indica si la cookie sólo se puede enviar sobre **HTTP(S)** y que no esté disponible para el cliente Javascript (el valor es verdadero por defecto).
* `signed` : Es un booleano que indica si la cookie debe ser firmada (el valor es verdadero por defecto). Si es verdadero, otra cookie con el mismo nombre con el sufijo `.sig` concatenado puede también ser enviado con un valor `27-byte url-safe base64 SHA1`, representando el hash de __nombre-cookie=valor-cookie__ contra la primera clave **Keygrip**. Esta clave de firma es utilizada para detectar alteraciones la proxima vez que se reciba una cookie.

* `overwrite` : Es un booleano que indica si se sobrescribe cookies previamente establecidas del mismo nombre (el valor es verdadero por defecto). Si el valor es verdadero, todas las cookies establecidas durante la misma petición con el mismo nombre (sin tener en cuenta el path o el dominio) son ignoradas de la cabecera `Set-Cookie` cuando se configure la cookie.
http://expressjs-book.com/index.html%3Fp=128.html

### `req.session)`
Representa la sesión para una petición determinada.

#### Campos

###### .isChanged
Es verdadero si la sesión ha cambiado durante la petición.

###### .isNew
Es verdadero si la sesión es nueva.

###### .isPopulated
Determina si se le ha añadido datos a la sesión o está vacía

### `req.sessionOptions`
Representa las opciones de sesión para la petición actual. Estas opciones son una copia superficial de lo que se proveyó en la construcción de la función middleware y se pueden alterar cambiando el comportamiento de la cookie o cambiando la base por petición realizada.

### Destruyendo una sesión
Para destruir una sesión simplemente hay que establecerla a nula:
```javascript
req.session = null
```

## Limitaciones de uso


## Máximo tamaño de la cookie
Debido a que objeto de sesión entero está codificado y guardado en una cookie, es posible que se supere el límite de tamaño máximo de la cookie en diferentes navegadores. Se recomienda que un navegador deba permitir al menos **4096 bytes** de tamaño por cookie (medido como la suma de la longitud del nombre de la cookie, el valor y los atributos).

En la práctica este límite difiere entre los navegadores. Como regla de oro se aconseja no exceder **4093 bytes de tamaño por dominio**

Si el objeto de sesión es _suficientemente grande_ para exceder el límite del navegador cuando sea codificado, en la mayoría de casos el navegador rehusará de almacenar la cookie. Esto causará que las siguientes peticiones desde el navegador no tengan ningún tipo de información de sesión o que se utilice información de sesión antigua que sea suficientemente pequeña para no exceder el límite del cookie.

Si te das cuenta de que el objeto de sesión supera ese límite, es mejor considerar si los datos en la sesión deben ser cargados de una _base de datos_ dentro del servidor en lugar de transmitir hacia/desde el navegador con cada petición.

# Ejemplos
## Ejemplo de un contador de visitas
```javascript
var cookieSession = require('cookie-session') //Se cargar el módulo cookie-session en la variable "cookieSession".
var express = require('express') //Se carga express en la variable "express".

var app = express()  //Crea una aplicación express.

app.set('trust proxy', 1) // La aplicación express está detrás de un proxy

//Se crea una nueva función middleware de cookie session.
app.use(cookieSession({
  name: 'session',        //Nombre de la cookie : session
  keys: ['key1', 'key2'] //Lista de claves para verificar
}))

//Función que maneja el request al camino raíz.
app.get('/', function (req, res, next) {
  //Se actualiza el número de visitas cada vez que el usuario visita la página.
  req.session.views = (req.session.views || 0) + 1

  //Se escribe la actualización de nuevo en la página.
  res.end(req.session.views + ' views')
})

//Se ejecuta la aplicación en el puerto 3000.
app.listen(3000)

```

## Ejemplo para establecer el tiempo máximo de la sesión por usuario
```javascript
var cookieSession = require('cookie-session') //Se cargar el módulo cookie-session en la variable "cookieSession".
var express = require('express') //Se carga express en la variable "express".

var app = express() //Crea una aplicación express.

app.set('trust proxy', 1) // La aplicación express está detrás de un proxy.

//Se crea una nueva función middleware de cookie session.
app.use(cookieSession({
  name: 'session',     //Nombre de la cookie : session.
  keys: ['key1', 'key2'] //Lista de claves para verificar.
}))

// This allows you to set req.session.maxAge to let certain sessions
// have a different value than the default.
/*Esta función middleware permite establecer el tiempo máximo de la sesión a otro
 * valor diferente al de por defecto.
 */
app.use(function (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge //S
  next() //Se llama a la siguiente función middleware.
})

```

## Ejemplo para extender la expiración de la sesión.
Este módulo no envía un encabezado `Set-Cookie` si el contenido de la sesión no ha cambiado. Esto significa que, para extender la expiración de una sesión en el navegador del usuario (en respuesta a la actividad del usuario, por ejemplo),  se debe realizar algún tipo de modificación en la sesión.

```javascript
var cookieSession = require('cookie-session') //Se cargar el módulo cookie-session en la variable "cookieSession".
var express = require('express') //Se carga express en la variable "express".

var app = express() //Crea una aplicación express.
//Se crea una nueva función middleware de cookie session.
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
/**
*Se establece una propiedad a session llamada "nowInMinutes" que
*guarda el numero minutos desde el 1 de Enero de 1970 00:00:00 UTC. Esto se hace
*para que haya un cambio en la sesión y se pueda extender su tiempo de expiración.
*/
app.use(function (req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

app.listen(3000)


```
