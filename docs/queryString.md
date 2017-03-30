# Query String

Un ***query string*** (cadena de consulta) es parte de de la `URL`, conteniendo
datos que deben pasar a aplicaciones web. Normalmente, la cadena de consulta
incluye una serie de campos que son añadidos a la `URL` por parte del
navegador o de una aplicación cliente, por ejemplo, a través de un formulario
HTML.

En un principio, las páginas web era estáticas, mostrando siempre el mismo
contenido para una dirección dada. La URL, consistía en de una ruta al fichero
mostrado por el navegador:

```
www.paginadeejemplo.org/docs/main/index.html
```

Posteriormente, surgieron páginas web dinámicas. En estos casos, el servidor
crea automáticamente una página cuando esta es solicitada por parte del usuario.
Para crear dicha página, debe emplear datos o parámetros que, por lo general,
se incluyen en la `URL`. Estas direcciones suelen estar compuestas por un
nombre y un valor separados por el signo igual.

```
www.paginadeejemplo.org/docs/main/index.php?valor1=frio&valor2=calor
```

## Formularios

Uno de los usos originales del *query string*, era el de alojar el contenido de
un formulario HTML.

Tal y como vimos anteriormente, un *query string* tiene la siguiente estructura:

```
www.paginadeejemplo.org/docs/main/index.php?nombre=juan&apellido=garcia
```

En este caso, al tratarse de un formulario web, los pares `campo-valor` hacen
referencia a cada uno de los campos del formulario (nombre y apellidos en este
caso) y a su respectivos valores (juan y garcía, respectivamente).

* En cada par, el nombre del campo está separado de su valor mediante un signo
igual `=`

* Para separar los diferentes pares, se puede emplear el signo `&` o `;`.


## Codificación de la URL

Algunos caracteres no pueden formar parte de la URL y hay otros que tienen un
significado especial.

Los caracteres permitidos en una `URL` son:

* `A-Z`: letras de la A a la Z (en mayúscula).
* `a-z`: letras de la a a la z (en minúscula).
* `0-9`: números del 0 al 9.
* Otros: `-._~:/?#[]@!$&'()*+,;=.`


No está permitido el uso de espacios, sin embargo estos se pueden codificar
haciendo uso del signo `+` o de `%20`.

## Ejemplos de uso

#### Tracking

Un programa que recibe un *query string*, puede ignorar parte de él o su
totalidad. Esto permite que los *query strings* sean empleados para rastrear a
los usuarios de una manera similar a como actúan las `HTTP cookies`. Veamos un
**ejemplo** de ello:

En este ejemplo, cada vez que un usuario descarga una página, un identificador
único es añadido como cadena de consulta a todas las `URL` de los links que
se encuentran en la página. De este modo, cuando el usuario visite alguno de
esos links, la nueva página estará enlazada con la anterior.

Supongamos que el contenido de la página web es el siguiente:

```html
<a href="index.html"> Bienvenido a index.html</a>
<a href="two.html"> Bienvenido a two.html</a>
```

> (...) un identificador único es añadido como cadena de consulta a todas las `URL` de los links que
se encuentran en la página.

Supongamos que el identificador generado es: `20wec425cb13`. El resultado
sería el siguiente:

```html
<a href="index.html?20wec425cb13"> Bienvenido a index.html</a>
<a href="two.html?20wec425cb13"> Bienvenido a two.html</a>
```

La adición de esta *query string* no afecta al funcionamiento de la página.
Cuando el usuario siga el enlace `index.html?20wec425cb13`, el servidor
ignorará todo lo que vaya detrás del signo de interrogación. El servidor
enviará `index.html` y añadirá la cadena de consulta a todos sus links.


#### Formularios

Si un formulario está insertado en el HTML de la siguiente forma:

```html
<form class="example" action="index.html/prueba.cgi" method="get">
  <input type="text" name="Campo1">
  <input type="text" name="Campo2">
  <input type="submit" />
</form>
```

y el usuario escribe en el campo1 "este es el campo 1" y el campo2 "este es
el campo2" y, a continuación pulsa el botón de *submit*, el programa
`prueba.cgi`, recibirá la siguiente cadena de consulta:

```
campo1=este+es+el+campo+1&campo2=este+es+el+campo+2
```

**Nota**: En `/src/queryString.html` puede encontrar un ejemplo de formulario html.
Al rellenar los campos obligatorios y pulsar el botón de enviar, podrá
ver en la barra de direcciones cómo figuran los campos del formulario
junto con la respuesta proporcionada.
