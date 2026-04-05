# Ejemplo de como usar TanStack

## Antes de nada el ejemplo base desplegado con Render

Esta guía detalla el proceso de configuración de TanStack Router en una aplicación React con TypeScript, desplegada con un servidor Express en **Render**. Al tener un servidor real, el routing funciona directamente sin trucos adicionales.

Demo en vivo: [Explorar ejemplo desplegado | No voy a gastar el despliege gratis en este tal vez en un futuro]()

## Lo primero de todo que tú ya has hecho "Iniciación del Entorno :)"

```bash
    npm create vite@latest proyecto-remo -- --template react-ts
    cd proyecto-remo
    npm i
```

## Instalar TanStack

Ahora instalamos el TanStack Router y su plugin de Vite

```bash
npm install @tanstack/react-router @tanstack/router-plugin tslib
```

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Ahora configuramos vite para que siga el enturado, añadimos el pluging de TanStack

En `vite.config.ts`.

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(), // <- Aquí
    react(),
  ],
})
```

## Creanos el directotrio de las rutas
Ahora vamos a crear las rutas que es para lo que hemos hecho esto

```bash
mkdir src/routes
```

## Hacemos nuestra pequeña plantilla de css

```css
.navbar {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: white;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.nav-link {
  text-decoration: none;
  color: #333;
}

.nav-link.active {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.contenedor-principal {
  padding: 40px;
  font-family: sans-serif;
  text-align: center;
}

.titulo-grande {
  font-size: 3rem;
  color: #1a1a1a;
}
```


## Hacemos nuestro __root.tsx

### (src/routes/__root.tsx)

Este es el layout principal, es como van a salir todas las paginas.

En angular es el html del app, en el que cojemos el routerOulet con y elegimos la ruta con los routerLinks.

Aquí es el outlet y elegimos la ruta con los Links, si nos damos cuenta es lo mismo pero sin la palabra router delante.

```tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import '../estilos.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/club" className="nav-link">El Club</Link>
        <Link to="/contacto" className="nav-link">Contacto</Link>
      </nav>

      <main className="contenedor-principal">
        <Outlet />
      </main>
    </>
  ),
})
```

## Ahora vamos haciendo las paginas individuales

### (src/routes/index.tsx)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1 className="titulo-grande">PASIÓN Y TRADICIÓN</h1>
      <p>Bienvenido al Club de Remo La Cala.</p>
    </div>
  ),
})
```

### (src/routes/club.tsx)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/club')({
  component: () => (
    <div>
      <h2 className="titulo-grande">Nuestra Historia</h2>
      <p>Somos vikingos desde 2002...</p>
    </div>
  ),
})
```

## Ahora las rutas que nos ha generado nuestro tanstack automaticamente, las usamos (src/main.tsx)

```tsx
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

## Ahora lanzamos el proyecto

```bash
npm run dev
```

## Ahora para desplegar en este caso

Creamos la carpeta server

### Entramos en la carpeta y inicializamos

```bash
cd server
npm init -y
```

### Instalamos Express

```bash
npm install express
```

### Crear el index.js con el contenido de antes:

```js
const express = require('express');
const path = require('path');

const app = express();
const staticFilesPath = path.resolve(__dirname, './public');
app.use('/', express.static(staticFilesPath));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve(staticFilesPath, 'index.html'));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
```

### Cambiar el script start en package.json:

Crear la carpeta public dentro de server/ y copiar ahí el contenido de dist/ después de hacer npm run build en el proyecto principal.

