---
title: Tipos primitivos en JavaScript
date: 2023-01-01
tags: ['javascript', 'primitivos']
abstract: En JavaScript, existen dos tipos de datos: primitivos y objetos.
---

En JavaScript, existen dos tipos de datos: *primitivos y objetos*.

Los primitivos incluyen undefined, null, Boolean, Number, String, BigInt y Symbol. Estos primitivos representan datos en la implementación más básica posible. Todo lo que no es un primitivo es un objeto, como el propio Object, así como también los Array, Set, Map, Date, Regex, Promise y cualquier otra cosa que se pueda imaginar. Las Function también son objetos, pero tienen la particularidad de que se pueden invocar (ejecutar). Para determinar el tipo de dato en JavaScript, se puede utilizar el operador typeof. Este operador tiene algunas peculiaridades, como que considera a las funciones como objetos.

Como se puede ver, los tipos primitivos generalmente indican su tipo esperado, pero hay una excepción: null. En este caso, el tipo es object debido a un error histórico en el lenguaje que no se ha corregido para no romper la retrocompatibilidad con el código existente. Según la especificación, el tipo debería ser null ya que se trata de un tipo primitivo. Hay otro caso especial: las funciones. Tienen su propio tipo typeof debido a que son un tipo especial de objeto que se pueden llamar (ejecutar).
