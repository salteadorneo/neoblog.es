---
title: Obtener el hash code de un string en JavaScript
publish_date: 2023-01-19 00:48:00
tags: ["javascript", "hash", "string"]
description: Método para obtener el hash code recibiendo una cadena de texto
allow_iframes: true
cover_html: <img src=../assets/javascript.svg alt="Logo de Javascript" />
---

El código hash para un objeto de cadena se calcula como

`s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1`

usando aritmética numérica, donde s[i] es el i-ésimo carácter de la cadena dada,
n es la longitud de la cadena y ^ indica exponenciación. (El valor hash de la
cadena vacía es cero).

<iframe src="https://playjs.dev/ZnVuY3Rpb24gaGFzaENvZGUocykgewogICAgbGV0IGggPSAwOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSsrKQogICAgICAgIGggPSBNYXRoLmltdWwoMzEsIGgpICsgcy5jaGFyQ29kZUF0KGkpIHwgMDsKICAgIHJldHVybiBoOwp9CgpoYXNoQ29kZSgiSG9sYSBtdW5kbyIp" width="100%" height="400" />
