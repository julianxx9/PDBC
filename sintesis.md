# Síntesis del Proyecto: Landing Page de Producto - Lumora Mall

## Descripción General

Este proyecto consiste en una página de aterrizaje (landing page) de una sola página, diseñada para la venta de un producto específico ("Combo Embutidora + Trituradora de ajos"). La página está construida con tecnologías web fundamentales (HTML, CSS, JavaScript) y no utiliza frameworks de frontend complejos como React o Vue, lo que la hace ligera y de rápido despliegue.

La funcionalidad principal se centra en presentar el producto de manera atractiva, generar confianza y urgencia en el comprador, y capturar los datos del pedido a través de un formulario de pago contra entrega. Los pedidos se procesan enviando una notificación a un chat de Telegram mediante una función serverless de Netlify.

## Composición del Proyecto

El proyecto se estructura de la siguiente manera:

### 1. Frontend (Interfaz de usuario)

- **`index.html`**: Es el archivo principal que contiene toda la estructura de la página de producto. Incluye secciones como el carrusel de imágenes, información del producto, prueba social (reseñas, contadores), descripciones y preguntas frecuentes.
- **`style.css`**: Hoja de estilos principal que define la apariencia visual del sitio. Utiliza variables CSS para gestionar el tema (colores, fuentes, espaciado) de manera centralizada, basándose en `TemaTienda.json`.
- **`script.js`**: Archivo JavaScript que dota de interactividad a la página. Sus responsabilidades incluyen:
    - Lógica del carrusel de imágenes.
    - Contadores dinámicos (oferta y personas viendo).
    - Funcionalidad de los acordeones para FAQs y especificaciones.
    - Gestión de los modales (pop-ups) para el formulario de compra y la lista de reseñas.
    - Carga y gestión de los datos de departamentos y ciudades en el formulario.
    - Validación de los campos del formulario.
    - Envío de los datos del pedido a la función de Netlify.
- **`politica.html` y `terminos.html`**: Páginas estáticas con los textos legales de la tienda, enlazadas desde el pie de página.

### 2. Backend (Lógica del servidor)

- **`netlify/functions/send-telegram.js`**: Es una función serverless (sin servidor) de Netlify escrita en Node.js. Su única función es recibir los datos del formulario de compra desde el frontend, formatearlos en un mensaje claro y enviarlo a un chat de Telegram a través de la API de Telegram. Esto permite una gestión de pedidos sencilla y en tiempo real sin necesidad de un backend tradicional.

### 3. Activos y Multimedia

- **`multimedia/`**: Carpeta que contiene los recursos visuales del producto, como imágenes (`.webp`) y vídeos (`.webm`).
- **`LumoraMallLogo.svg`**: Logotipo principal del sitio en formato vectorial.

### 4. Configuración y Datos

- **`package.json`**: Define las dependencias de Node.js necesarias para la función de Netlify (en este caso, `node-fetch`).
- **`netlify.toml`**: Archivo de configuración para la plataforma de despliegue Netlify.
- **`TemaTienda.json`, `comentarios_base_telefono.json`, `DepartamentosCiudades.json`**: Archivos JSON que actúan como una base de datos estática para el tema, las reseñas y las ubicaciones, aunque estos datos están actualmente integrados directamente en el código (`style.css` y `script.js`).

---

## Ficha Técnica

- **Tecnologías Frontend**:
    - **HTML5**: Estructura semántica.
    - **CSS3**: Estilizado moderno con variables CSS (Custom Properties).
    - **JavaScript (Vanilla)**: Interactividad y manipulación del DOM sin frameworks.

- **Tecnologías Backend**:
    - **Node.js**: Entorno de ejecución para la función serverless.
    - **Netlify Functions**: Plataforma para el despliegue de la lógica de backend.

- **Librerías y Servicios Externos**:
    - **Google Fonts**: Para la carga de las fuentes personalizadas (`DynaPuff` y `Quicksand`).
    - **Font Awesome**: Para la iconografía del sitio.
    - **API de Telegram**: Para el envío de notificaciones de pedidos.

- **Plataforma de Despliegue**:
    - **Netlify**: Alojamiento del sitio estático y ejecución de las funciones serverless.

- **Funcionalidades Clave**:
    - Página de producto única y optimizada para la conversión.
    - Diseño responsivo (adaptable a móviles).
    - Checkout simplificado con formulario en un modal.
    - Sistema de pago contra entrega.
    - Notificación de pedidos en tiempo real a través de Telegram.
    - Contenido dinámico simulado (contadores) para generar urgencia.

## IDs en `index.html`

- `product-title`
- `countdown-timer`
- `beneficios`
- `people-watching`
- `view-all-reviews-link`
- `buy-button`
- `checkout-modal`
- `form-container`
- `close-checkout-modal`
- `checkout-form`
- `nombres`
- `nombres-error`
- `apellidos`
- `apellidos-error`
- `telefono`
- `telefono-error`
- `departamento`
- `ciudad`
- `direccion`
- `reviews-modal`
- `reviews-container`
- `close-reviews-modal`
- `reviews-list`