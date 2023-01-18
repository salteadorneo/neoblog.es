---
title: Manejo de promesas en JavaScript
publish_date: 2023-01-18 22:01:00
tags: ['javascript', 'promesas', 'async', 'await']
abstract: 'En este artículo se explica el manejo de promesas en JavaScript'
cover_html: <img src=../assets/javascript.svg alt="Logo de Javascript" />
---

## ¿Qué son las promesas?

Las promesas son un objeto que representa la terminación o el fracaso eventual
de una operación asíncrona. Una promesa se encuentra en uno de los tres estados:
`pendiente`, `cumplida` o `rechazada`. Cuando se crea una promesa, se pasa una
función a la que se le llama el ejecutor. Esta función recibe dos parámetros,
resolve y reject, que son funciones utilizadas para resolver o rechazar la
promesa. La función del ejecutor se ejecuta de forma síncrona.

## Creación de una promesa

Para crear una promesa se utiliza el constructor Promise. Este constructor
recibe como parámetro una función que se ejecuta de forma síncrona. Esta función
recibe dos parámetros, resolve y reject, que son funciones utilizadas para
resolver o rechazar la promesa.

```javascript
const promise = new Promise((resolve, reject) => {
  // ...
});
```

## Resolución de una promesa

Para resolver una promesa se utiliza la función resolve. Esta función recibe
como parámetro el valor que se quiere devolver.

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("Hola mundo");
});
```

## Promise.all()

El método Promise.all() devuelve una promesa que termina correctamente cuando
todas las promesas en el argumento iterable han sido concluídas con éxito, o
bien rechaza la petición con el motivo pasado por la primera promesa que es
rechazada.

```javascript
const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

Promise.all([
  delay(300),
  delay(500),
  delay(600),
]).then((res) => { // at 600ms
  console.log(res); // [300, 500, 600]
});
```

## Promise.allSettled()

El Promise.allSettled() toma un iterable de promesas como entrada y devuelve un
solo Promise. Esta promesa devuelta se cumple cuando se liquidan todas las
promesas de entrada (incluso cuando se pasa un iterable vacío), con una matriz
de objetos que describen el resultado de cada promesa.

```javascript
const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

Promise.allSettled([
  Promise.reject(),
  delay(300),
  delay(500),
  delay(2500),
]).then((res) => { // at 2500ms
  console.log(res);
  // [
  //   { status: 'rejected', reason: undefined },
  //   { status: 'fulfilled', value: 300 },
  //   { status: 'fulfilled', value: 500 },
  //   { status: 'fulfilled', value: 2500 }
  // ]
});
```

## Promise.any()

El Promise.any() toma un iterable de promesas como entrada y devuelve un solo
Promise. Esta promesa devuelta se cumple cuando se cumple cualquiera de las
promesas de la entrada, con este primer valor de cumplimiento. Rechaza cuando se
rechazan todas las promesas de entrada (incluso cuando se pasa un iterable
vacío), y AggregateErrorcontiene una serie de motivos de rechazo.

```javascript
const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

Promise.any([
  Promise.reject(),
  delay(300),
  delay(500),
  delay(600),
]).then((res) => { // at 300ms
  console.log(res); // 300
});
```

## Promise.race()

El método Promise.race() retorna una promesa que se cumplirá o no tan pronto
como una de las promesas del argumento iterable se cumpla o se rechace, con el
valor o razón de rechazo de ésta.

```javascript
const delay = (ms) => new Promise((res) => setTimeout(() => res(ms), ms));

Promise.race([
  delay(800),
  delay(2500),
  delay(500),
]).then((res) => { // at 500ms
  console.log(res); //500
});
```
