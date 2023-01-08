---
title: Tipos primitivos en JavaScript
date: 2023-01-01
tags: ['javascript', 'primitivos']
abstract: 'En JavaScript, existen dos tipos de datos: primitivos y objetos.'
cover_html: <img src=../assets/javascript.svg alt="Logo de Javascript" />
og:image: https://neoblog.es/assets/javascript.svg
---

En JavaScript, existen dos tipos de datos: **primitivos y objetos**.

```javascript
let a = 1; // Primitivo
let b = [1, 2, 3]; // Objeto
```

Los primitivos incluyen **undefined**, **null**, **Boolean**, **Number**,
**String**, **BigInt** y **Symbol**. Estos primitivos representan datos en la
implementación más básica posible. Todo lo que no es un primitivo es un objeto,
como el propio **Object**, así como también los **Array**, **Set**, **Map**,
**Date**, **Regex**, **Promise** y cualquier otra cosa que se pueda imaginar.
Las Function también son objetos, pero tienen la particularidad de que se pueden
invocar (ejecutar).

Para determinar el tipo de dato en JavaScript, se puede utilizar el operador
typeof. Este operador tiene algunas peculiaridades, como que considera a las
funciones como objetos:

```javascript
typeof undefined; // "undefined"
typeof null; // "object"
typeof true; // "boolean"
typeof 1; // "number"
typeof "1"; // "string"
typeof Symbol(); // "symbol"
typeof {}; // "object"
typeof []; // "object"
typeof function () {}; // "function"
```

Como se puede ver, los tipos primitivos generalmente indican su tipo esperado,
pero hay una excepción: null. En este caso, el tipo es object debido a un error
histórico en el lenguaje que no se ha corregido para no romper la
retrocompatibilidad con el código existente. Según la especificación, el tipo
debería ser null ya que se trata de un tipo primitivo. Hay otro caso especial:
las funciones. Tienen su propio tipo typeof debido a que son un tipo especial de
objeto que se pueden llamar (ejecutar).

## Valores primitivos

Los valores primitivos son los valores que no son objetos. Los valores
primitivos son inmutables, lo que significa que no se pueden cambiar. Por
ejemplo, si se cambia el valor de una variable que contiene un valor primitivo,
se crea una copia del valor primitivo y se asigna a la variable. Esto significa
que los valores primitivos se pasan por valor.

```javascript
let a = 1;
let b = a;
b = 2;
console.log(a); // 1
console.log(b); // 2
```

## Valores por referencia

Los valores por referencia son los valores que son objetos. Los valores por
referencia son mutables, lo que significa que se pueden cambiar. Por ejemplo, si
se cambia el valor de una variable que contiene un valor por referencia, se
modifica el valor original. Esto significa que los valores por referencia se
pasan por referencia.

```javascript
let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a); // [1, 2, 3, 4]
console.log(b); // [1, 2, 3, 4]
```

## Comparación de valores primitivos

Los valores primitivos se comparan por valor. Esto significa que dos valores
primitivos son iguales si tienen el mismo valor. Los valores primitivos se
comparan con el operador de igualdad (==) y el operador de igualdad estricta
(===).

```javascript
1 == 1; // true
1 == "1"; // true
1 === 1; // true
1 === "1"; // false
```

## Comparación de valores por referencia

Los valores por referencia se comparan por referencia. Esto significa que dos
valores por referencia son iguales si se refieren al mismo objeto. Los valores
por referencia se comparan con el operador de igualdad (==) y el operador de
igualdad estricta (===).

```javascript
[1, 2, 3] == [1, 2, 3]; // false
[1, 2, 3] === [1, 2, 3]; // false
```

## Conclusión

En JavaScript, existen dos tipos de datos: primitivos y objetos. Los valores
primitivos son inmutables y se comparan por valor. Los valores por referencia
son mutables y se comparan por referencia. Los valores primitivos se pasan por
valor y los valores por referencia se pasan por referencia.
