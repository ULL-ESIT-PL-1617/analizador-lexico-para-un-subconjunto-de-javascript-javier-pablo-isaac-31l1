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
*\* | Una barra invertida que precede a un caracter cambia el significado de ese caracter. Si el siguiente caracter es **especial**, la barra inversa indica que el este caracter no es especial, y si el siguiente caracter **no es especial**, entonces con la barra invertida se convierte en un caracter especial. |`*/\d/* //signifca que se busca un dígito, no la letra d`{.javascript}




## Métodos de búsqueda de patrones en cadenas
### _test_
Este método recibe una cadena por parámetro y retorna un valor booleano indicando si la cadena contiene el patrón descrito por la expresión regular que lo llama. Este método es la forma más simple de encontrar una coincidencia de una expresión regular.  

Ejemplo:
```javascript
  /perro/.test("El perro está durmiendo")); // Devuelve true
```
### _exec_
Este método, al igual que el método _test_, realiza una búsqueda de una expresión regular en una cadena determinada. No obstante, a diferencia de _test_, retorna un **array resultado** o **null**; es decir, _exec_ retorna más información ue el método _test_ sobre el resultado de la búsqueda de un patrón en la cadena.
