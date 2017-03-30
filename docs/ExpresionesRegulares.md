# Expresiones Regulares
## ¿Qué son las expresiones regulares?
Una _expresión regular_ es una secuencia de caracteres que forma un patrón de búsqueda, principalmente utilizada para la búsqueda de patrones de cadenas de caracteres u operaciones de sustituciones.

Las expresiones regulares están disponibles en casi cualquier lenguaje de programación, pero aunque su sintaxis es relativamente uniforme, cada lenguaje usa su propio dialecto. En este documento nos centraremos en describir la sintaxis de las expresiones regulares en en el lenguaje **Javascript**, además de los fundamentos generales de las mismas.

## Creación de expresiones regulares
En Javascript una expresión regular es un objeto. Se puede crear de dos formas distintas:
* Con el constructor _RegExp_
  ```javascript
    var expresion_regular = new RegExp("[abc]*");
  ```
* Como una expresión regular _literal_, que consiste en un patrón encerrado entre dos barras.
  ```javascript
  var expresion_regular = /[abc]*/;
  ```

Las expresiones regulares **literales** se compilan cuando se carga el script. Por lo tanto, si una expresión regular no va a cambiar en la ejecución del programa, es mejor utilizar esta forma para construir una expresión regular ya que mejora el rendimiento.

Además, en las expresiones regulares literales, hay algunos caracteres que tienen un significado especial en las expresiones regulares y deben ser precedidas por una barra inversa(**\**) o por corchetes (**[]**) si se desea representar esos caracteres en sí mismos.

En cambio, el **constructor RegExp** compila expresiones regulares en tiempo de ejecución. Por lo tanto, es recomendable utilizar esta forma de construir expresiones regulares si se sabe de antemano que va a cambiar o que se va añadir a la ejecución del programa desde otra fuente.

Las expresiones regulares que se construyen con este constructor se interpretan como una cadena normal, por lo que las reglas se aplican a las barras inversas. No obstante, es necesario utilizar en el constructor **doble barra inversa** por cada una de las barras inversas que se encuentren en la expresión regular. Esto se debe hacer ya que la barra inversa es utilizada en las cadenas para escapar el siguiente caracter, por lo que, cuando se utiliza doble barra inversa, el constructor _RegEXP_ solo cogerá una sola barra inversa.

## Fundamentos de las expresiones regulares

### Caracteres especiales
Caracter | Signficado | Ejemplo
-------- | ---------- | -------
**\** | Una barra invertida que precede a un caracter cambia el significado de ese caracter. Si el siguiente caracter es **especial**, la barra inversa indica que el este caracter no es especial, y si el siguiente caracter **no es especial**, entonces con la barra invertida se convierte en un caracter especial. |``/\d/`` significa que se busca un dígito, no la letra d.
**-** | El guión entre dos caracteres permite establecer un rango de caracteres, donde el orden está determinado por el número **Unicode**. | ```/0-9/``` indica que se busca un dígito.
**\d** |  Coincide con cualquier caracter que sea un dígito. | ```/\dc/``` concide con cualquier caracter seguido de una **c**.
**\w** |	Concide con un caracter alfanumérico incluyendo el guión bajo. | ```/\waa/``` coincide con un caracter alfanumérico seguido de dos **a**.
**\s** |	Coincide con cualquier caracter en blanco (espacio, tabulación, nueva línea y similares) | ```/\w\sc/``` concide con un caracter alfanumerico seguido de un caracter en blanco y de la letra *c*.
**\D** |	Coincide con un caracter que no sea un dígito. | ```/\Dplaya/``` concide con un caracter que no sea un número seguido de la palabra **playa**.
**\W** |	Coincide con un caracter que no sea alfanumerico. | ```/\Wcoche/``` concide con un caracter que no sea un caracter alfanumérico seguido de la palabra **coche**.
**\S** |	Coincide con un caracter que no sea un caracter en blanco. | ```/pedro\Spicapiedra/``` concide con la palabra **pedro** seguido de un caracter que no sea un caracter en blanco y seguido de la palabra **picapiedra**.
**.** | Coincide con cualquier caracter excepto un caracter de nueva línea | ```/.99/``` coincide con un caracter que no sea un caracter de nueva línea seguido del número **99**
**^**(dentro de corchetes) | Caracter de **negación**. Coincide con cualquier caracter que no sea el caracter que le sigue.| ```/[^abc]/``` coincide con cualquier caracter que no sea una **a**, una **b** o una **c**.
**^**(fuera de corchetes) | Caracter que coincide con el comienzo de la entrada | ```/^Erase una vez/``` coincide con una cadena que comienze con la frase **Erase una vez**
**$** | Caracter que coincide con el final de la entrada | ```/este cuento se acabo$/``` coincide con una cadena que termine con la frase **este cuento se acabo**
**+** | Caracter de **una o más repeticiones**. Se utiliza para indicar que se quieren una o más repeticiones de una secuencia de caracteres| ```/a+/``` coincide con una cadena que tenga una o más **a**
** * ** | Caracter de **cero o más repeticiones**. Se utiliza para indicar que se quieren cero o más repeticiones de una secuencia de caracteres| ```/a*/``` coincide con una cadena que tenga una o más **a**

### Grupos
Los grupos, en las expresiones regulares, se denotan con paréntesis(**()**) y tienen diferentes utilidades.

* Para utilizar un elemento como ** * ** o **+** _más de una vez_, se pueden usar los grupos. Una parte de una expresión regular que está encerrado entre paréntesis cuenta como un solo elemento que se puede repetir las veces que deseemos.

Ejemplo:
```javascript
var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```
* Cuando una expresión regular contiene subexpresiones agrupadas con paréntesis, el **texto que coincida con esos grupos tambíen aparecerá en el array** que devuelva cualquiera de los métodos de testeo que devuelve información sobre un matching.

Ejemplo:
```javascript
var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
// → true
```
Si al finalizar el testeo no hay ninguna coincidencia de un grupo, el array devolverá un _undefined_ para el grupo. Además, si un solo grupo coincide varias veces en la cadea, solo la última coincidencia se introduce en el array resultado.

Ejemplo:
```javascript
console.log(/hola(aaa)?/.exec("holaaaaaaa"));
// → ["holaaaa", "aaa"]

```

* Los grupos también son útiles para **extraer partes de una cadena**.

console.log(/hola(aaa)?/.exec("holaaaaaaa"));
### Opciones de las expresiones regulares

###

## Métodos de búsqueda de patrones en cadenas
### _test_
Este método recibe una cadena por parámetro y retorna un valor booleano indicando si la cadena contiene el patrón descrito por la expresión regular que lo llama. Este método es la forma más simple de encontrar una coincidencia de una expresión regular.  

Ejemplo:
```javascript
  /perro/.test("El perro está durmiendo")); // Devuelve true
```
### _exec_
Este método, al igual que el método _test_, realiza una búsqueda de una expresión regular en una cadena determinada. No obstante, a diferencia de _test_, retorna un **array resultado** o **null**; es decir, _exec_ retorna más información ue el método _test_ sobre el resultado de la búsqueda de un patrón en la cadena.

Un método retornado por _exec_ tiene una propiedad *index* que indica dónde ha coincidido la expresión regular en la cadena. Además, este objeto es un array de cadenas, cuyo primer elemento es la coincidencia completa de la expresión regular en la cadena.

Ejemplo:
```javascript
/quick\s(brown).+?(jumps)/ig.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

### _match_
Este método, a diferencia de los anteriores, es un método de la clase **String**, no de la clase **RegExp**. Realiza una búsqueda de un determinado patrón en una cadena y retorna un array de información o nulo si no hay coincidencia. A este método se le pasa por parámetro una expresión regular.

Ejemplo:
```javascript
var str = 'For more information, see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/i;
var found = str.match(re);
```
### _search_
