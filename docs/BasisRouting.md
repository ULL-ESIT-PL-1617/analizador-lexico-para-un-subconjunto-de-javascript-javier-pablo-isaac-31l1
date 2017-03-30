# Enrutamiento básico

El enrutamiento (routing) se define como la manera en la que una aplicación responde a la petición de un cliente con respecto a una ruta y un método HTTP concreto (GET, POST, etc.).

Cada ruta puede tener más de una función manejadora de la misma, las cuales son ejecutadas cuando la ruta coincide con las que éstas esperan.

 La definición de una ruta tiene la siguiente forma:

 ```javascript
app.METODO(ruta, manejador)
 ```

En la anterior línea encontramos:

<dl>
  <dt><strong>app</strong></dt>
  <dd>Una instancia de express.</dd>
  <dt><strong>METODO</strong></dt>
  <dd>Método de petición HTTP (En minúsucula).</dd>
  <dt><strong>ruta</strong></dt>
  <dd>Ruta en el servidor.</dd>
  <dt><strong>manejador</strong></dt>
  <dd>Función que se ejecuta cuando la ruta coincide.</dd>
</dl>

Ejecutando el `ejemplo 1` obtendremos un servidor que devuelve el nombre del método que usamos al realizar la petición. Este es su código:

```javascript

// Responderá a las peticiones GET en la raíz
app.get('/', function (req, res) {
  res.send('GET')
})

// Responderá a las peticiones POST en la raíz
app.post('/', function (req, res) {
  res.send('POST')
})

// Responderá a las peticiones HEAD en la raíz
app.head('/', function (req, res) {
  res.send('HEAD')
})

//Y así sucesivamente
```
