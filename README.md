# Performance Tracking Dashboard Frontend

Este proyecto es una aplicación de seguimiento de rendimiento desarrollada con Ionic, React y TypeScript. La aplicación permite gestionar atletas y sus métricas de rendimiento.

## Tabla de Contenidos

-   [Instalación](#instalación)
-   [Scripts Disponibles](#scripts-disponibles)
-   [Estructura del Proyecto](#estructura-del-proyecto)
-   [Configuración](#configuración)
-   [Uso](#uso)
-   [Pruebas](#pruebas)

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```sh
npm install
```

## Scripts Disponibles

En el archivo `package.json`, se definen varios scripts útiles:

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run preview`: Previsualiza la compilación de producción.
-   `npm run test.e2e`: Ejecuta las pruebas end-to-end con Cypress.
-   `npm run test.unit`: Ejecuta las pruebas unitarias con Vitest.
-   `npm run lint`: Ejecuta ESLint para analizar el código.

## Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

```
REACT_APP_BASE_URL=http://localhost:3000
```

### Configuración Vite

El archivo `vite.config.ts` contiene la configuración de Vite para el proyecto. Asegurate de que este configurado correctamente para manejar TypeScript y React

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

```sh
npm run dev
```

Para compilar la aplicación para producción, ejecuta:

```sh
npm run build
```

Para visualizar la compilación de producción, ejecuta:

`npm run preview`

## Pruebas (Work in progress)

### Unitarias

Para ejecutar las pruebas unitarias, ejecuta:

```sh
npm run test.unit
```

### End to end

Para ejecutar las pruebas end to end, ejecuta:

```sh
npm run test.e2e
```
