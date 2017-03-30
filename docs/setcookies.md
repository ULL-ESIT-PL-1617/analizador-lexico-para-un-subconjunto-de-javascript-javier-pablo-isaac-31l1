# Set-Cookie

La cabecera **Set-Cookie** de una respuesta `HTTP` es usada para enviar cookies
desde el servidor al cliente. Para más información acerca de las HTTP cookies,
accede al capítulo: [Las cookies HTTP](./http-cookies.md).

## Sintáxis

```
Set-Cookie: <nombre-cookie>=<valor-cookie>
Set-Cookie: <nombre-cookie>=<valor-cookie>; Expires=<fecha>
Set-Cookie: <nombre-cookie>=<valor-cookie>; Max-Age=<digito_distinto_cero>
Set-Cookie: <nombre-cookie>=<valor-cookie>; Domain=<valor-dominio>
Set-Cookie: <nombre-cookie>=<valor-cookie>; Path=<valor-ruta>
Set-Cookie: <nombre-cookie>=<valor-cookie>; Secure
Set-Cookie: <nombre-cookie>=<valor-cookie>; HttpOnly

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax

// Se pueden especificar mútltiples directivas:
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

```


## Directivas

Las cookies comienzan con una pareja nombre-valor:

#### Directiva obligatoria

* `<nombre-cookie>=<valor-cookie>`:

  * El **nombre de una cookie** puede contener cualquier tipo de caracteres a
excepción de: [caracteres de control](https://es.wikipedia.org/wiki/Carácter_de_control),
espacios, tabuladores, y caracteres de separación:  `( ) < > @ , ; : \ " /  [ ] ? = { }`.

  * El **valor de una cookie** puede ser especificado usando comillas dobles
  y cualquier tipo de caracteres [US-ASCII](http://www.columbia.edu/kermit/ascii.html).

  * **__Secure- prefijo**: cookies con un nombre que comience por
  `__Secure-` deben proceder de una página segura `HTTPS` y tener activado
  el modo `secure`.

  * **__Host- prefijo**: cookies con un nombre que comience por
  `__Host-`: deben proceder de una página segura `HTTPS`, tener activado
  el modo `secure`, no deben tener un dominio especificado y la ruta debe
  ser `/`.

```
Set-Cookie: ejemplocookie=38afes7a9we8;
```
#### Directivas opcionales

* `Expires=<date>`: establece el tiempo de vida máximo de una cookie en el formato `HTTP-date`, pulsa [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Date)
para más información. Por defecto, el tiempo de vida de una cookie viene
determinado por la sesión. Al finalizar la sesión, la cookie será eliminada.
Sin embargo, algunos navegadores permiten restaurar la sesión y, por tanto,
las cookies no se eliminarán.


```
Set-Cookie: ejemplocookie=38afes7a9we8;
Expires=Sat, 12-Mar-2017 23:59:00 GMT;
```

* `Max-Age=<digito_distinto_cero>`: número de segundos que tarda la cookie
en expirar.

```
Set-Cookie: ejemplocookie=38afes7a9we8;
Max-Age=120;
```

* `Domain=<valor-dominio>`: especifica el dominio al que será enviada la
cookie. De no especificar el dominio, será enviada al dominio actual del
documento, pero no a los subdominios. Si un dominio es especificado, sus
subdominios también están incluidos.

```
Set-Cookie: ejemplocookie=38afes7a9we8;
Domain=ejemplo.org;
```

* `Path=<valor-ruta>`: especifica una ruta que debe existir para poder
enviar la cabecera de la cookie.

```
Set-Cookie: ejemplocookie=38afes7a9we8;
path=/docs;
```

* `Secure`: a una cookie segura solo será enviada al servidor cuando se
produzca una solicitud usando SSL y HTTPS.

* `HttpOnly`: no son accesibles por medio de JavaScript a través del
`Document.cookie`.

## Compatibilidad

Para ver la compatibilidad de las características anteriormente descritas
en distintos navegadores, puedes seguir [este enlace](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#Browser_compatibility).

## Ejemplos

#### Cookie de sesión

Las cookies de sesión son eliminadas al finalizar la sesión.
```
Set-Cookie: cookieDeSesion=123d;
```

#### Cookie permanente

Las cookies permanentes expiran al alcanzar una fecha concreta.
```
Set-Cookie: cookieDeSesion=123d; Expires=Wed, 18 Nov 2018 07:28:00 GMT; Secure; HttpOnly
```

### Cookie de terceros

Una cookie de terceros es una cookie que no pertenece al dominio que se
muestra actualmente en la barra de direcciones. Normalmente se trata de
cookies de publicidad.

```
Set-Cookie: ejemploTerceros=2234lk; Domain=ejemplo.org;
```
