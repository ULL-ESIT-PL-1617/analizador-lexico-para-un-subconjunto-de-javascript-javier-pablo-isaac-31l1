# Práctica de Análisis Léxico

## Procesadores de lenguajes

## Miembros:

  * [Pablo Pastor Martín](https://0100890839.github.io)
  * [Isaac Manuel Aimán Salas](https://alu0100841565.github.io/)
  * [Javier Ramos Fernández](https://alu0100884982.github.io/)

## Enlances

* [Campus virtual de la asignatura](https://campusvirtual.ull.es/1617/course/view.php?id=1148)
* [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaanalisislexicotdop.html#recursos)

## Despliegues

* [Despliegue en Heroku](https://sleepy-atoll-21677.herokuapp.com/)
* [IAAS de Pablo](http://10.6.128.120:8082)
* [IAAS de Isaac](http://10.6.128.92:8082)
* [IAAS de Javier](http://10.6.128.95:8082)

___

TDOP, Top Down Operator Precedence

Douglas Crockford
douglas@crockford.com

2010-11-12

tdop.html contains a description of Vaughn Pratt's Top Down Operator Precedence,
and describes a parser for Simplified JavaScript in Simplified JavaScript.

index.html parses parse.js and displays its AST. The page depends on json2.js
(which is not included in this project) and on parse.js and tokens.js (which
are).

tdop.js contains a Simplified JavaScript parser. See tdop.html for commentary.

tokens.js produces an array of token objects from a string.
