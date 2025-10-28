# 🔍 El Misterio del Crespín

Una aplicación web de escape room interactivo para resolver el misterio de la desaparición de Sonia, la profesora de cerámica.

![Mystery Theme](https://img.shields.io/badge/Theme-Mystery%20Investigation-8b6f47)
![Built with React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## 📖 Descripción

Esta aplicación está diseñada para un escape room físico donde 8 equipos de estudiantes de cerámica deben resolver 5 enigmas cada uno. Al completar todos los puzzles, cada equipo recibe una letra. Juntos, formarán la palabra "POCHOCLO" que revela el secreto final.

## ✨ Características

- 🎨 **Diseño temático noir/detective** con animaciones fluidas
- 📱 **100% optimizado para móviles** (diseño mobile-first)
- 🎯 **8 equipos con colores únicos** y 5 puzzles cada uno
- 💾 **Progreso guardado** en localStorage (no se pierde al recargar)
- 🔐 **Validación de códigos** de 3 dígitos
- 🖼️ **Sistema de pistas visual** con estilo Polaroid y texto en pergamino
- 🏆 **Pantalla de felicitación** con revelación de letra secreta
- ⚙️ **Totalmente configurable** vía JSON (sin tocar código)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ (recomendado 20+)
- npm o yarn

### Instalación

```bash
# Clonar o navegar al directorio del proyecto
cd elmisteriodelcrespin

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📂 Estructura del Proyecto

```
elmisteriodelcrespin/
├── public/
│   ├── data/
│   │   └── game-config.json        # ⚙️ Configuración del juego (EDITAR AQUÍ)
│   └── images/
│       ├── intro/                  # Imagen de historia inicial
│       ├── backgrounds/            # Fondos opcionales
│       └── clues/                  # Imágenes de pistas por equipo
│           ├── amarillo/
│           ├── salmon/
│           ├── rojo/
│           ├── verde/
│           ├── blanco/
│           ├── negro/
│           ├── rosa/
│           └── violeta/
├── src/
│   ├── components/                 # Componentes React
│   │   ├── IntroStory.tsx
│   │   ├── TeamSelection.tsx
│   │   ├── PuzzleScreen.tsx
│   │   ├── CodeInput.tsx
│   │   ├── ClueReveal.tsx
│   │   ├── CongratsScreen.tsx
│   │   └── ProgressBar.tsx
│   ├── hooks/
│   │   └── useGameState.ts         # Lógica de estado del juego
│   ├── types/
│   │   └── game.types.ts           # Definiciones TypeScript
│   ├── utils/
│   │   └── storage.ts              # Funciones de localStorage
│   ├── App.tsx                     # Componente principal
│   ├── main.tsx
│   └── index.css                   # Estilos Tailwind + tema mystery
└── README.md
```

## ⚙️ Configuración

### 1. Editar Códigos y Contenido

Edita el archivo [`public/data/game-config.json`](public/data/game-config.json) para:

- ✏️ Cambiar códigos de 3 dígitos para cada puzzle
- ✏️ Modificar textos de pistas
- ✏️ Cambiar letras asignadas a cada equipo
- ✏️ Editar historia de introducción
- ✏️ Cambiar la palabra final

**Ejemplo:**

```json
{
  "teams": [
    {
      "id": "amarillo",
      "name": "Amarillo",
      "number": 1,
      "color": "#FFD700",
      "letter": "P",
      "puzzles": [
        {
          "id": 1,
          "code": "123",
          "clueImage": "/images/clues/amarillo/puzzle1.jpg",
          "clueText": "Tu pista personalizada aquí..."
        }
      ]
    }
  ],
  "finalWord": "POCHOCLO"
}
```

### 2. Agregar Imágenes

Coloca tus imágenes en la carpeta correspondiente:

```
public/images/clues/[nombre-equipo]/puzzle[1-5].jpg
```

**Ejemplo:**
```
public/images/clues/amarillo/puzzle1.jpg
public/images/clues/amarillo/puzzle2.jpg
...
public/images/clues/salmon/puzzle1.jpg
```

📚 Ver [`public/images/README.md`](public/images/README.md) para más detalles sobre imágenes.

### 3. Configuración de Equipos

Cada equipo tiene:
- **id**: Identificador único (no cambiar, usado para carpetas de imágenes)
- **name**: Nombre mostrado (puedes cambiar)
- **number**: Número del equipo 1-8 (define orden para palabra final)
- **color**: Color en hexadecimal (personalizable)
- **letter**: Letra que recibirán al terminar (forma POCHOCLO en orden)

## 🎮 Flujo del Juego

1. **Pantalla de Introducción**: Historia de Sonia y el misterio
2. **Selección de Equipo**: Los estudiantes eligen su equipo por color
3. **Puzzles (x5)**:
   - Se muestra pantalla para ingresar código de 3 dígitos
   - Los estudiantes buscan pistas en el taller físico
   - Ingresan el código encontrado
   - Si es correcto → Muestra pista para siguiente puzzle
   - Si es incorrecto → Mensaje de error, pueden reintentar
4. **Pantalla Final**: Revelación de la letra secreta del equipo
5. **Resolución Grupal**: Todos los equipos juntan sus letras para formar POCHOCLO

## 🏗️ Construcción para Producción

```bash
# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

Los archivos estáticos estarán en la carpeta `dist/`.

## 🌐 Despliegue

### Opción 1: Oracle Cloud VM (Tu caso)

```bash
# En tu VM Oracle:
# 1. Sube la carpeta dist/ completa
scp -r dist/* usuario@tu-vm:/var/www/html/

# 2. Configurar nginx (ejemplo)
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Opción 2: Vercel (Gratis, Fácil)

```bash
npm install -g vercel
vercel
```

### Opción 3: Netlify Drop

Arrastra la carpeta `dist/` a [Netlify Drop](https://app.netlify.com/drop)

## 🎨 Personalización de Estilos

Los colores y estilos del tema "mystery" están en:
- [`tailwind.config.js`](tailwind.config.js) - Colores personalizados
- [`src/index.css`](src/index.css) - Clases CSS custom

**Colores principales:**
- `mystery-darker`: Fondo oscuro (#0a0a0a)
- `amber`: Color principal dorado (#c4915c)
- `crimson`: Color de error (#8b0000)
- `parchment`: Color de pergamino (#f5ead6)

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Previsualizar build
npm run lint         # Linter
```

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Dispositivos móviles iOS 14+ y Android 8+

## 💡 Tips y Trucos

### Resetear Progreso de un Equipo

El progreso se guarda en localStorage. Para limpiar:

1. Abre DevTools (F12) en el navegador
2. Ve a Application → Local Storage
3. Elimina la clave `elmisteriodelcrespin_progress`

O programa un botón especial (solo para organizadores):

```javascript
// En consola del navegador:
localStorage.removeItem('elmisteriodelcrespin_progress');
```

### Modo de Prueba

Para probar rápidamente sin buscar códigos reales:
1. Abre `public/data/game-config.json`
2. Cambia temporalmente los códigos a algo fácil como "111", "222", etc.
3. ¡No olvides cambiarlos de vuelta antes del evento real!

### Backups

Antes del evento, haz backup de:
- ✅ `public/data/game-config.json` (configuración)
- ✅ `public/images/` (todas las imágenes)

## 🐛 Solución de Problemas

**Problema**: Imágenes no se cargan
- ✓ Verifica que los nombres de archivo en `game-config.json` coincidan exactamente
- ✓ Verifica la ruta: `/images/clues/[equipo]/puzzle[N].jpg`

**Problema**: La app no carga después de build
- ✓ Asegúrate que el servidor sirve `index.html` para todas las rutas

**Problema**: Progreso no se guarda
- ✓ Verifica que localStorage esté habilitado en el navegador
- ✓ No uses modo incógnito (no persiste localStorage)

## 📄 Licencia

Este proyecto fue creado para uso educativo en el taller de cerámica del Crespín.

## 🙏 Créditos

- **Framework**: React + Vite
- **Animaciones**: Framer Motion
- **Estilos**: Tailwind CSS
- **Tipografías**: Google Fonts (Cinzel, Special Elite, Lato)
- **Tema**: Inspirado en noir detective y escape rooms

---

**¡Que disfruten el misterio! 🔍✨**

Para preguntas o problemas, contacta al organizador del evento.
