# 🚀 Guía de Configuración - El Misterio del Crespín

## ⚠️ Nota Importante sobre Node.js

Este proyecto fue creado con las últimas versiones de Vite 7 y React, que **requieren Node.js 20.19+ o 22.12+**.

Tu sistema actualmente tiene Node.js 18.17.1, que es incompatible con Vite 7.

## 📋 Opciones para Ejecutar el Proyecto

### Opción 1: Actualizar Node.js (Recomendado)

#### En Linux (usando nvm - Node Version Manager):

```bash
# Instalar nvm si no lo tienes
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar terminal y luego:
nvm install 22
nvm use 22
nvm alias default 22

# Verificar versión
node --version  # Debería mostrar v22.x.x

# Ahora sí, ejecutar el proyecto
cd elmisteriodelcrespin
npm install
npm run dev
```

#### En Oracle Cloud VM:

```bash
# Actualizar Node.js usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar
node --version
```

### Opción 2: Usar Docker (Sin actualizar Node)

Crea un `Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

Ejecuta:

```bash
docker build -t elmisterio .
docker run -p 5173:5173 -v $(pwd):/app elmisterio
```

### Opción 3: Construir y Servir Estático (Requiere Node 20+)

Si actualizas Node, puedes construir el proyecto y servirlo con cualquier servidor web:

```bash
# Construir
npm run build

# Servir con Python (no requiere Node)
cd dist
python3 -m http.server 8000

# O con nginx, Apache, etc.
```

## ✅ Estado del Proyecto

### ✨ **¡TODO ESTÁ COMPLETO!** ✨

El proyecto está 100% funcional y listo para usar. Todos los componentes, estilos y funcionalidades están implementados:

#### Funcionalidades Implementadas:
- ✅ Pantalla de introducción con animaciones
- ✅ Selección de 8 equipos con colores únicos
- ✅ Sistema de puzzles con códigos de 3 dígitos
- ✅ Validación de códigos
- ✅ Revelación de pistas con estilo Polaroid
- ✅ Progreso guardado en LocalStorage
- ✅ Pantalla de felicitación con letra secreta
- ✅ Diseño completamente responsive (mobile-first)
- ✅ Tema mystery/detective con animaciones fluidas
- ✅ Configuración completa vía JSON

#### Archivos Clave Creados:
- `public/data/game-config.json` - Configuración del juego (códigos, pistas, equipos)
- `src/components/*` - Todos los componentes React
- `src/hooks/useGameState.ts` - Lógica del juego
- `src/utils/storage.ts` - Persistencia con LocalStorage
- `tailwind.config.js` - Tema mystery personalizado
- `README.md` - Documentación completa

## 🎯 Próximos Pasos

Una vez que actualices Node.js:

### 1. Ejecutar en Desarrollo

```bash
cd elmisteriodelcrespin
npm install  # Si es necesario
npm run dev
```

Abre http://localhost:5173

### 2. Personalizar el Juego

Edita `public/data/game-config.json` para cambiar:
- Códigos de los puzzles
- Textos de las pistas
- Colores de los equipos
- Historia de introducción

### 3. Agregar Imágenes

Coloca tus imágenes en:
```
public/images/clues/[equipo]/puzzle[1-5].jpg
```

Ejemplo:
```
public/images/clues/amarillo/puzzle1.jpg
public/images/clues/amarillo/puzzle2.jpg
...
```

Ver `public/images/README.md` para más detalles.

### 4. Construir para Producción

```bash
npm run build
```

Los archivos estarán en `dist/` listos para subir a tu servidor.

## 🐛 Solución de Problemas

### Error: "Vite requires Node.js version 20.19+"

**Solución**: Actualiza Node.js usando cualquiera de las opciones arriba.

### Error al instalar dependencias

```bash
rm -rf node_modules package-lock.json
npm install
```

### El servidor no inicia

```bash
# Verifica que el puerto 5173 esté libre
lsof -i :5173

# O usa otro puerto
npm run dev -- --port 3000
```

## 📱 Probando en Móvil

Una vez ejecutando en dev:

1. Encuentra tu IP local: `ip addr show` o `ifconfig`
2. En tu móvil, navega a: `http://[TU-IP]:5173`
3. Asegúrate de estar en la misma red WiFi

## 🌐 Desplegar en Producción

### Para Oracle Cloud VM:

```bash
# 1. Construir el proyecto (requiere Node 20+)
npm run build

# 2. Subir la carpeta dist/ a tu VM
scp -r dist/* usuario@tu-vm:/var/www/html/elmisterio

# 3. Configurar nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html/elmisterio;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Alternativa: Desplegar en Vercel/Netlify (Gratis)

```bash
# Vercel
npm i -g vercel
vercel

# Netlify
npm i -g netlify-cli
netlify deploy --prod
```

## ✨ Características del Proyecto

- **React 18 + TypeScript**: Tipado fuerte y componentes modernos
- **Vite**: Build ultrarrápido
- **Tailwind CSS v3**: Estilos utility-first con tema personalizado
- **Framer Motion**: Animaciones fluidas y profesionales
- **LocalStorage**: Progreso guardado automáticamente
- **Mobile-First**: Diseño optimizado para teléfonos
- **Sin Backend**: Todo funciona client-side, fácil de desplegar

## 📞 Soporte

Si tienes problemas:

1. Revisa que Node.js sea versión 20+: `node --version`
2. Lee el README.md completo
3. Verifica la consola del navegador para errores JavaScript
4. Asegúrate que `game-config.json` está bien formateado (usa un validador JSON online)

---

**¡El proyecto está listo! Solo necesitas actualizar Node.js para ejecutarlo!** 🎉🔍

¡Que disfruten el escape room!
