# Cookie Module
El módulo **Cookie** define clases para abstraer el concepto de cookies, un mecanismo de administración de estado HTTP. Es compatible con las  cookies simples de sólo cadena y proporciona una abstracción para tener cualquier tipo de datos serializable como valor de cookie. Es un analizador de cookies y serializador HTTP básico para servidores HTTP.

## Instalación y uso
* Para **instalar** este módulo, es necesario ejecutar el siguiente comando: `npm install cookie`.

* Para poder utilizar este módulo en nuestro código, es necesario requerir el módulo guardándolo en un objeto Javascript.
```javascript
var cookie = require('cookie');
```

## Métodos del módulo `Cookie`
A continuación se exponen los métodos de los que dispone el módulo.

### `cookie.parse(str, opciones)`
Este método analiza una cabecera HTTP `Cookie` y retorna un objeto con todas los pares clave-valor de la cookie. El argumento `str` es la cadena que representa el valor de la cabecera `Cookie` y el argumento `options` es un objeto opcional que contiene opciones adicionales a la hora de parsear.

Un ejemplo de uso de este método sería el siguiente:
```javascript
var cookies = cookie.parse('nombre=Carlos; apellido=Gonzalez');
// { nombre: 'Carlos', apellido: 'Gonzalez' }
```
En este ejemplo se le pasa una cadena que representa una cabecera HTTP y lo que devuelve es un objeto Javascript con cada uno de los pares clave-valor.

#### Opciones del método
##### ``decode``
 Esta propiedad especifica una función que será usada para decodificar el valor de una cookie. Puesto que el valor de la cookie tiene un conjunto de caracteres limitados (y debe ser una cadena simple), esta función puede ser usada para decodificar el valor de una cookie previamente codificada a una cadena Javascript u otro objeto.

La función por defecto es la función global `decodeURIComponent`, que decodificará cualquier secuencia URL codificada a su representación en bytes.

**Nota:** Si se lanza un error desde esta función, el valor del cookie original sin decodificar será retornado como el valor de la cookie.
### `cookie.serialize(nombre, valor, opciones)`
Este método serializa una cookie con un par clave-valor en una cabecera `Set-Cookie` representada en forma de cadena. El argumento `nombre` es el nombre para la cookie; el argumento `valor` es el valor que se establece a la cookie y el argumente `opciones` es un objeto opcional que contiene opciones adicionales de serialización.
Un ejemplo de este método es el siguiente:
```javascript
var setCookie = cookie.serialize('comida', 'macarrones');
// foo=bar
```
En este caso, la cookie tiene nombre `comida` y como valor `macarrones` y, aplicando el método, se convierte en una cabecera representada en forma de cadena.

#### Opciones del método
##### ``domain``
Esta opción especifica el valor del atributo `DomainSet-Cookie`. Por defecto no se establece ningún dominio. y la mayoría de cliente considerará sólo aplicar la cookie al dominio actual. Por razones de seguridad obvias, las cookies sólo se pueden establecer en el dominio superior del recurso actual y sus subdominios, y no para otro dominio y sus subdominios.
##### ``encode``
Esta opción especifica una función que será usada para codificar el valor de una cookie. Puesto que el valor de una cookie tiene un conjunto de caracteres limitado (y debe ser una cadena simple), esta función puede ser utilizada para codificar un valor en una cadena adaptada al valor de una cookie.

La función por defecto es la función global `ecodeURIComponent`, que codificará una cadena Javascript en secuencias de bytes UTF-8 y, a continuación, codificará la URL que esté fuera del intervalo de cookies.

##### ``expires``
Especifica el objeto `Date` para que se el valor del atributo `Expires Set-Cookie`. Por defecto, no se establece ninguna expiración, y la mayoría de clientes considerará el cookie como un "cookie no persistente" y se eliminará con una determinada condición como, por ejemplo, salir de una aplicación del navegador.

##### ``httpOnly``
Especifica el valor booleano para el atributo `HttpOnly Set-Cookie`. Cuando es verdadero, el atributo `HttpOnly` se establece, en otro caso no. Por defecto, este atributo no está establecido. Este indicador se utiliza al generar una cookie para ayudar a mitigar el riesgo de que el script del cliente acceda a la cookie protegida (si el navegador lo admite).

##### ``maxAge``
Especifica el número (en segundos) el valor del atributo ` Max-Age Set-Cookie`. El valor dado será convertido en un entero redondeando por debajo. Por defecto, no se establece ningún tiempo máximo.

Nota: Si ambos atributos, `expires` y `magAge`, se establecen, el atributo `maxAge` tiene precedencia, pero es posible que no todos los clientes obedecen esto, por lo que, si ambos se establecen, deben apuntar a la misma fecha y tiempo.

##### ``path``
Especifica el valor para el atributo `Path Set-Cookie`. Por defecto, el path es considerado el "path por defecto". Este campo indica la URL que debe existir en el recurso requerido antes de enviar la cabecera Cookie. Por ejemplo:

##### ``sameSite``
Especifica el booleano o cadena para que sea el valor del atributo ` SameSite Set-Cookie`. Este atributo se puede utilizar para deshabilitar el uso de terceros para una cookie específica. Es establecido por el servidor al configurar la cookie y solicita al navegador que solo envíe la cookie en un contexto de primera persona, es decir, cuando estas utilizando la aplicación web directamente. Cuando otro sitio intenta solicitar algo de la aplicación web, la cookie no se envía.

  * **true** establecerá el atributo a `Strict` para la aplicación estricta en el mismo sitio. La cookie se retiene con cualquier uso de cross-site. Incluso cuando el usuario sigue un enlace a otro sitio web, la cookie no se envía.

  * **false** no establecerá el atributo .
  * **'lax'** establecerá el atributo a `Lax`. En modo laxo, se permite el uso de cross-site, sspecíficamente si la solicitud es una solicitud GET y la solicitud es de nivel superior. Nivel superior significa que la URL de la barra de direcciones cambia debido a esta navegación.
  * **'strict'** establecerá el atributo a `Strict` para la aplicación estricta en el mismo sitio.

Nota: Esta atributo no ha sido totalmente estandarizado, y puede cambiar en el futuro. Esto significa que muchos clientes pueden ignorar este atributo hasta que lo entiendan.

##### ``secure``
Especifica el valor booleano para el atributo `Secure Set-Cookie`. A diferencia de las otras opciones, esto es sólo un indicador y no tiene ningún valor adicional especificado. Una **cookie segura** sólo se enviará al servidor cuando se realice una solicitud utilizando **SSL** y el protocolo **HTTPS**. La idea de que el contenido de la cookie es de alto valor y podría ser potencialmente perjudicial para transmitir como texto claro.

Cuando el valor es verdadero, se establece el atributo. Por defecto no está establecido.


Un ejemplo que contiene una cookie con todos estos campos es el siguiente:

```
Set-Cookie: name=Nicholas; domain=nczonline.net; path=/blog; secure

```

### Ejemplo
El siguiente ejemplo usa este módulo en conjunción con un servidor HTTP con núcleo Node.js para pedir el nombre al usuario y mostrarlo en futuras visitas.

```javascript
var cookie = require('cookie');
var escapeHtml = require('escape-html');
var http = require('http');
var url = require('url');

function onRequest(req, res) {
  /* Se parsea la cadena de consulta. Se pasa como parámetro una URL en forma de cadena y retorna un objeto URL. A continuación
  * se accede a la propiedad query (objeto) del objeto URL devuelto por el método parse() para obtener la cadena de consulta.
  */
  var query = url.parse(req.url, true, true).query;
//Si el query no está vacío y la cadena de consulta tiene un nombre, entonces se entra
  if (query && query.name) {
    /* En esta sentencia se establece en la respuesta una cabecera de tipo "Set-Cookie" (utilizada para
    * enviar una cookie desde el servidor al cliente). El valor de esta cabecera se establece con el metodo cookie.serialize() , especificando el nombre
    * de la cookie como "nuombre", y el valor de esa cookie es el nombre que se le pasa a la cadena de consulta. Además se le pasa como opciones las propiedades
    * httpOnly (el script del cliente Javascript no puede acceder a la cookie) y maxAge (tiempo en segundos que persiste la cookie)
    */
    res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

      // Se redirige de vuelta tras establecer la cookie
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer || '/');  //Se establece el campo de cabecera "Location" a la misma URI desde la que se obtuvo la petición. Si no existe se pone "/".
    /*Este método avisa al servidor de que todas las cabeceras y el cuerpo de la respuesta se han enviado ; el servidor debe considerar que el mensaje
     *ha sido completado. Este método se debe llamar en cada respuesta.
     */
    res.end();
    return;
  }

  // Parsea las cookies en la petición.
  var cookies = cookie.parse(req.headers.cookie || '');

  //Coge el nombre del visitor establecido en la cookie.
  var name = cookies.name;

  res.setHeader('Content-Type', 'text/html; charset=UTF-8'); //Establece una cabecera de tipo "Content-Type" indicando el tipo de documento dentro de la página.
   //Si existe el nombre, se escribe un mensaje dándole la bienvenida de vuelta. Si no existe esta propiedad es que el visitor es nuevo.
  if (name) {
    res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
  } else {
    res.write('<p>Hello, new visitor!</p>');
  }

   //Se escribe más HTML en la respuesta
  res.write('<form method="GET">');
  res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
  res.end('</form');
}
/*Se crea un servidor http y se añade automáticamente la función "onRequest" al evento de petición, de tal forma que, cada vez que haya una petición,
 *esta función se ejecutará
 */
http.createServer(onRequest).listen(3000);

```
