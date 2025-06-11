# Auto Asesoría - Website 🚗

Website dinámico, moderno y responsivo para una asesoría automotriz, que permite a los usuarios cotizar diferentes modelos de autos.

## Preview
Accede al preview [AQUÍ](https://auto-asesoria.netlify.app/).

## Características

- Diseño moderno y responsivo (mobile-first)
- Más de 50 modelos de autos disponibles
- Sistema de cotización con filtros
- Validaciones de formularios
- Mensajes de éxito y error
- Animaciones y transiciones suaves
- Menú responsive
- Diseño con metodología BEM

## Tecnologías Utilizadas

- HTML5
- SASS (SCSS)
- JavaScript (ES6+)
- Font Awesome (iconos)

## Estructura del Proyecto

```
├── index.html
├── css/
│   └── styles.css
├── scss/
│   ├── styles.scss
│   └── components/
│       ├── _header.scss
│       ├── _hero.scss
│       ├── _cotizador.scss
│       ├── _nosotros.scss
│       ├── _contacto.scss
│       └── _footer.scss
├── js/
│   ├── data.js
│   └── main.js
└── images/
    └── hero-bg.jpg
```

## Configuración

1. Clona este repositorio
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Compila los archivos SASS:
   ```bash
   npm run sass
   ```
4. Abre `index.html` en tu navegador

## Desarrollo

Para desarrollo en tiempo real con compilación automática de SASS:

```bash
npm run sass:watch
```

## Características Responsivas

- Mobile First Design
- Breakpoints

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 