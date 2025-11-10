# 🔄 Invertidor de Cadenas - AI4Devs

Una aplicación web moderna y elegante para invertir cadenas de texto en tiempo real, desarrollada con JavaScript vanilla, HTML5 y CSS3.

## 📋 Descripción

Esta aplicación permite a los usuarios ingresar cualquier texto y ver instantáneamente su versión invertida. Por ejemplo, si introduces "AI4Devs", el sistema devuelve "sveD4IA". La inversión ocurre en tiempo real mientras escribes, proporcionando una experiencia fluida e interactiva.

## ✨ Características Principales

### Funcionalidad Core
- **Inversión en tiempo real**: El texto se invierte automáticamente mientras escribes, sin necesidad de presionar ningún botón
- **Manejo correcto de Unicode**: Soporta emojis y caracteres especiales correctamente
- **Botón condicional**: El botón de inversión aparece solo cuando hay más de 3 caracteres
- **Contador de caracteres**: Muestra el número de caracteres ingresados en tiempo real

### Características de UX
- **Copiar al portapapeles**: Función de copiado con un solo clic y feedback visual
- **Ejemplos predefinidos**: Chips clickeables con textos de ejemplo para probar rápidamente
- **Atajos de teclado**: 
  - `Ctrl/Cmd + Enter`: Copiar texto invertido
  - `Escape`: Limpiar el campo de texto
- **Persistencia local**: El último texto ingresado se guarda automáticamente y se recupera al recargar la página
- **Diseño responsivo**: Se adapta perfectamente a dispositivos móviles y desktop
- **Modo oscuro**: Interfaz moderna con tema oscuro por defecto

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
1. Descarga el archivo ZIP del proyecto
2. Extrae los archivos en cualquier carpeta
3. Abre el archivo `index.html` en tu navegador web favorito
4. ¡Listo! Ya puedes empezar a invertir texto

### Opción 2: Servidor Local (Opcional)
Si prefieres usar un servidor local para desarrollo:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (necesitas instalar http-server globalmente)
npm install -g http-server
http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 📁 Estructura del Proyecto

```
reverse-string-project/
│
├── index.html          # Archivo HTML principal con la estructura de la página
├── css/
│   └── styles.css      # Estilos CSS con diseño moderno y animaciones
├── js/
│   └── script.js       # Lógica JavaScript para la inversión de texto
├── assets/             # Carpeta para recursos adicionales (imágenes, etc.)
├── README.md           # Este archivo con documentación
└── prompts.md          # Información sobre el desarrollo con IA
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con:
  - Variables CSS personalizadas
  - Flexbox para layouts
  - Animaciones y transiciones suaves
  - Diseño responsivo con media queries
- **JavaScript ES6+**: 
  - Funciones arrow
  - Template literals
  - Async/await para operaciones asíncronas
  - Spread operator para manejo de arrays
  - Event listeners modernos

## 💻 Compatibilidad

La aplicación es compatible con todos los navegadores modernos:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

Para navegadores más antiguos, el código incluye fallbacks apropiados.

## 🎨 Personalización

### Cambiar Colores
Los colores se pueden personalizar fácilmente modificando las variables CSS en el archivo `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Color principal */
    --secondary-color: #8b5cf6;   /* Color secundario */
    --success-color: #10b981;     /* Color de éxito */
    /* ... más variables ... */
}
```

### Agregar Más Ejemplos
Para añadir nuevos ejemplos predefinidos, edita el HTML y agrega más botones en la sección de ejemplos:

```html
<button class="example-chip" data-text="Tu Texto">Tu Texto</button>
```

## 📝 Características Técnicas Destacadas

### Algoritmo de Inversión
El algoritmo utiliza el spread operator de ES6 para manejar correctamente caracteres Unicode y emojis:

```javascript
function reverseString(str) {
    return [...str].reverse().join('');
}
```

Esta implementación es superior a `split('')` porque maneja correctamente:
- Emojis compuestos (👨‍👩‍👧‍👦)
- Caracteres con diacríticos (é, ñ, ü)
- Caracteres de múltiples bytes

### Sistema de Estados
La aplicación maneja varios estados visuales:
- Estado vacío (placeholder)
- Estado activo (texto siendo invertido)
- Estado de éxito (texto copiado)
- Estados de hover y focus para mejor feedback

### Optimización de Rendimiento
- Event delegation donde es apropiado
- Debouncing implícito en eventos de input
- Uso eficiente del DOM con referencias cacheadas
- Animaciones GPU-aceleradas con transform

## 🤝 Contribuciones

Si deseas mejorar este proyecto, siéntete libre de:
1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para AI4Devs usando JavaScript vanilla

## 🙏 Agradecimientos

- Diseño inspirado en interfaces modernas de aplicaciones web
- Iconos emoji nativos del sistema operativo
- Fuente Inter de Google Fonts

---

**Nota**: Este proyecto fue desarrollado como ejercicio educativo para demostrar conceptos de JavaScript, manipulación del DOM y diseño web moderno.
