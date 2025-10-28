# Instrucciones para Imágenes

Esta carpeta contiene todas las imágenes necesarias para el escape room.

## Estructura de Carpetas

```
images/
├── intro/
│   └── sonia-intro.jpg          # Imagen de introducción (historia de Sonia)
├── backgrounds/
│   ├── team-select-bg.jpg       # Fondo para selección de equipos (opcional)
│   └── puzzle-bg.jpg            # Fondo para pantalla de puzzles (opcional)
└── clues/
    ├── amarillo/
    │   ├── puzzle1.jpg
    │   ├── puzzle2.jpg
    │   ├── puzzle3.jpg
    │   ├── puzzle4.jpg
    │   └── puzzle5.jpg
    ├── salmon/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    ├── rojo/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    ├── verde/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    ├── blanco/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    ├── negro/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    ├── rosa/
    │   └── [puzzle1.jpg - puzzle5.jpg]
    └── violeta/
        └── [puzzle1.jpg - puzzle5.jpg]
```

## Formatos Soportados

- `.jpg` / `.jpeg`
- `.png`
- `.webp`

## Recomendaciones

### Para Imágenes de Pistas (clues/)
- **Tamaño recomendado**: 800x600px o similar (relación 4:3)
- **Peso**: Menos de 500KB por imagen para carga rápida en móviles
- **Contenido**: Fotografías de las pistas físicas en el taller de cerámica

### Para Imagen de Introducción (intro/)
- **Tamaño recomendado**: 1200x800px
- **Contenido**: Imagen atmosférica del taller o de Sonia (la profesora)

### Imágenes de Fondo (backgrounds/) - Opcionales
Estas son opcionales y actualmente no se usan, pero puedes agregarlas para personalizar más.

## Cómo Nombrar las Imágenes

**IMPORTANTE**: Los nombres deben coincidir exactamente con los especificados en `public/data/game-config.json`

Por ejemplo, para el equipo Amarillo:
- `public/images/clues/amarillo/puzzle1.jpg`
- `public/images/clues/amarillo/puzzle2.jpg`
- etc.

## Placeholder

Si no colocas una imagen, la aplicación mostrará un placeholder con un ícono 📷 y el nombre del archivo esperado. Esto no romperá la aplicación, solo mostrará que falta la imagen.

## Optimización de Imágenes

Para mejor rendimiento en móviles, puedes comprimir las imágenes usando:
- **Online**: TinyPNG (https://tinypng.com/)
- **Herramientas**: ImageOptim (Mac), RIOT (Windows), o `imagemagick` (Linux)

Ejemplo con imagemagick:
```bash
# Comprimir y redimensionar
convert original.jpg -resize 800x600 -quality 85 puzzle1.jpg
```

## Recursos Gratuitos para Imágenes

Si necesitas imágenes temporales o de referencia:
- **Unsplash**: https://unsplash.com/ (busca "pottery", "ceramic", "workshop")
- **Pexels**: https://pexels.com/
- **Pixabay**: https://pixabay.com/

---

¡Recuerda tomar fotos de alta calidad de las pistas reales en el taller de cerámica!
