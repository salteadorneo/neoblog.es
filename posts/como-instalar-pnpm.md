---
title: Instalando pnpm
publish_date: 2023-01-08 19:00
tags: ["pnpm", "nodejs", "javascript"]
description: Guía rápida de comandos para instalar pnpm, un manejador de paquetes, rápido y eficiente que ahorra espacio en tu disco duro.
cover_html: <img src=../assets/pnpm-no-name-with-frame.svg alt="Logo de pnpm" />
---

## Qué es pnpm

Un manejador de paquetes, rápido y eficiente que ahorra espacio en tu disco
duro.

Los archivos dentro de **node_modules** se clonan o se crean enlaces directos
desde un almacenamiento único con dirección basada en el contenido. Es
compatible con **monorepositorios**, lo que significa que puede manejar
múltiples paquetes en un solo repositorio. Por último, pnpm tiene una
**configuración estricta por defecto**, lo que significa que el código no tiene
acceso a paquetes no autorizados a través de la creación de una estructura de
directorios no plana de node_modules.

## Windows

Usando PowerShell:

```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

## Sistemas POSIX

Usando curl:

```posix
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Usando wget:

```posix
wget -qO- https://get.pnpm.io/install.sh | sh -
```

## Alpine Linux

```linux
wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
```

## Usando npm

```bash
npm install -g pnpm
```

## Usando Homebrew

```bash
brew install pnpm
```

## Usando Scoop

```bash
scoop install nodejs-lts pnpm
```
