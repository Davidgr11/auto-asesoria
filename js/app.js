// Clase para representar un auto
class Auto {
    constructor(marca, modelo, anio, transmision, puertas, precio) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.transmision = transmision;
        this.puertas = puertas;
        this.precio = precio;
    }
}

// Clase para manejar el cotizador
class Cotizador {
    constructor() {
        this.autos = this.generarAutos();
        this.filtros = {
            marca: '',
            modelo: '',
            anio: '',
            transmision: '',
            puertas: ''
        };
        this.paginaActual = 1;
        this.autosPorPagina = 10;
        
        // Referencias a elementos del DOM
        this.form = document.getElementById('cotizador-form');
        this.resultados = document.getElementById('resultados');
        this.resultadosTitle = document.querySelector('.cotizador__resultados-title');
        this.resultadosGrid = document.querySelector('.cotizador__resultados-grid');
        this.spinner = document.getElementById('spinner');
        this.paginacion = document.querySelector('.cotizador__paginacion');
        
        // Referencias a los selects
        this.marcaSelect = document.getElementById('marca');
        this.modeloSelect = document.getElementById('modelo');
        this.anioSelect = document.getElementById('anio');
        this.transmisionSelect = document.getElementById('transmision');
        this.puertasSelect = document.getElementById('puertas');

        // Referencias al menú móvil
        this.menuToggle = document.querySelector('.header__menu-toggle');
        this.nav = document.querySelector('.header__nav');
        this.menuLinks = document.querySelectorAll('.header__menu-link');
        
        this.setupEventListeners();
        this.mostrarResultados(); // Mostrar todos los autos al inicio
    }

    // Configurar event listeners
    setupEventListeners() {
        // Event listeners para el cotizador
        this.marcaSelect.addEventListener('change', () => {
            this.actualizarModelos();
            this.actualizarFiltros();
        });
        this.modeloSelect.addEventListener('change', () => {
            this.actualizarAnios();
            this.actualizarFiltros();
        });
        this.anioSelect.addEventListener('change', () => this.actualizarFiltros());
        this.transmisionSelect.addEventListener('change', () => this.actualizarFiltros());
        this.puertasSelect.addEventListener('change', () => this.actualizarFiltros());

        // Event listeners para el menú móvil
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMenu();
            });
        }

        // Cerrar menú al hacer clic en un enlace
        this.menuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (this.nav && this.nav.classList.contains('active') && 
                !this.nav.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Agregar event listener para el botón de limpiar
        const limpiarBtn = document.getElementById('limpiar-filtros');
        if (limpiarBtn) {
            limpiarBtn.addEventListener('click', () => this.limpiarFiltros());
        }
    }

    // Toggle del menú móvil
    toggleMenu() {
        console.log('Toggle menu clicked'); // Debug
        if (this.nav) {
            this.nav.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
            console.log('Menu toggled:', this.nav.classList.contains('active')); // Debug
        }
    }

    // Cerrar menú móvil
    closeMenu() {
        if (this.nav) {
            this.nav.classList.remove('active');
            this.menuToggle.classList.remove('active');
        }
    }

    // Actualizar modelos disponibles según la marca seleccionada
    actualizarModelos() {
        const marcaSeleccionada = this.marcaSelect.value;
        const modelos = {
            'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Yaris'],
            'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
            'Nissan': ['Sentra', 'Altima', 'Rogue', 'X-Trail', 'Versa'],
            'Ford': ['Mustang', 'F-150', 'Explorer', 'Escape', 'Ranger'],
            'Chevrolet': ['Cruze', 'Malibu', 'Equinox', 'Silverado', 'Trailblazer'],
            'Volkswagen': ['Jetta', 'Golf', 'Tiguan', 'Passat', 'Polo'],
            'BMW': ['Serie 3', 'Serie 5', 'X3', 'X5', 'M3'],
            'Mercedes-Benz': ['Clase C', 'Clase E', 'GLC', 'GLE', 'Clase A'],
            'Audi': ['A3', 'A4', 'Q3', 'Q5', 'A6'],
            'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent']
        };

        // Limpiar opciones actuales
        this.modeloSelect.innerHTML = '<option value="">Seleccione...</option>';

        // Agregar nuevas opciones si hay una marca seleccionada
        if (marcaSeleccionada && modelos[marcaSeleccionada]) {
            modelos[marcaSeleccionada].forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                this.modeloSelect.appendChild(option);
            });
        }
    }

    // Actualizar años disponibles según la marca y modelo seleccionados
    actualizarAnios() {
        const marcaSeleccionada = this.marcaSelect.value;
        const modeloSeleccionado = this.modeloSelect.value;

        // Filtrar autos por marca y modelo
        const autosFiltrados = this.autos.filter(auto => 
            auto.marca === marcaSeleccionada && 
            auto.modelo === modeloSeleccionado
        );

        // Obtener años únicos y ordenarlos de mayor a menor
        const anios = [...new Set(autosFiltrados.map(auto => auto.anio))].sort((a, b) => b - a);

        // Limpiar opciones actuales
        this.anioSelect.innerHTML = '<option value="">Seleccione...</option>';

        // Agregar nuevas opciones
        anios.forEach(anio => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            this.anioSelect.appendChild(option);
        });
    }

    // Generar lista de 100 autos
    generarAutos() {
        const marcas = ['Toyota', 'Honda', 'Nissan', 'Ford', 'Chevrolet', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai'];
        const modelos = {
            'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Yaris'],
            'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
            'Nissan': ['Sentra', 'Altima', 'Rogue', 'X-Trail', 'Versa'],
            'Ford': ['Mustang', 'F-150', 'Explorer', 'Escape', 'Ranger'],
            'Chevrolet': ['Cruze', 'Malibu', 'Equinox', 'Silverado', 'Trailblazer'],
            'Volkswagen': ['Jetta', 'Golf', 'Tiguan', 'Passat', 'Polo'],
            'BMW': ['Serie 3', 'Serie 5', 'X3', 'X5', 'M3'],
            'Mercedes-Benz': ['Clase C', 'Clase E', 'GLC', 'GLE', 'Clase A'],
            'Audi': ['A3', 'A4', 'Q3', 'Q5', 'A6'],
            'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent']
        };

        // Precios base por marca (en pesos mexicanos)
        const preciosBase = {
            'Toyota': 450000,
            'Honda': 420000,
            'Nissan': 400000,
            'Ford': 480000,
            'Chevrolet': 460000,
            'Volkswagen': 440000,
            'BMW': 850000,
            'Mercedes-Benz': 900000,
            'Audi': 800000,
            'Hyundai': 380000
        };

        // Configuración de características por modelo
        const configuraciones = {
            // Sedanes (4 puertas)
            'Corolla': { puertas: '4', factorPrecio: 1.0 },
            'Camry': { puertas: '4', factorPrecio: 1.2 },
            'Civic': { puertas: '4', factorPrecio: 1.0 },
            'Accord': { puertas: '4', factorPrecio: 1.2 },
            'Sentra': { puertas: '4', factorPrecio: 0.9 },
            'Altima': { puertas: '4', factorPrecio: 1.1 },
            'Cruze': { puertas: '4', factorPrecio: 0.9 },
            'Malibu': { puertas: '4', factorPrecio: 1.1 },
            'Jetta': { puertas: '4', factorPrecio: 1.0 },
            'Passat': { puertas: '4', factorPrecio: 1.2 },
            'Serie 3': { puertas: '4', factorPrecio: 1.3 },
            'Serie 5': { puertas: '4', factorPrecio: 1.5 },
            'Clase C': { puertas: '4', factorPrecio: 1.3 },
            'Clase E': { puertas: '4', factorPrecio: 1.5 },
            'A3': { puertas: '4', factorPrecio: 1.2 },
            'A4': { puertas: '4', factorPrecio: 1.4 },
            'Elantra': { puertas: '4', factorPrecio: 0.9 },
            'Sonata': { puertas: '4', factorPrecio: 1.1 },

            // SUVs (4 puertas)
            'RAV4': { puertas: '4', factorPrecio: 1.2 },
            'CR-V': { puertas: '4', factorPrecio: 1.2 },
            'Rogue': { puertas: '4', factorPrecio: 1.1 },
            'X-Trail': { puertas: '4', factorPrecio: 1.1 },
            'Explorer': { puertas: '4', factorPrecio: 1.3 },
            'Escape': { puertas: '4', factorPrecio: 1.1 },
            'Equinox': { puertas: '4', factorPrecio: 1.1 },
            'Tiguan': { puertas: '4', factorPrecio: 1.2 },
            'X3': { puertas: '4', factorPrecio: 1.4 },
            'X5': { puertas: '4', factorPrecio: 1.6 },
            'GLC': { puertas: '4', factorPrecio: 1.4 },
            'GLE': { puertas: '4', factorPrecio: 1.6 },
            'Q3': { puertas: '4', factorPrecio: 1.3 },
            'Q5': { puertas: '4', factorPrecio: 1.5 },
            'Tucson': { puertas: '4', factorPrecio: 1.1 },
            'Santa Fe': { puertas: '4', factorPrecio: 1.2 },

            // Pickups (2 puertas)
            'Hilux': { puertas: '2', factorPrecio: 1.3 },
            'F-150': { puertas: '2', factorPrecio: 1.4 },
            'Ranger': { puertas: '2', factorPrecio: 1.2 },
            'Silverado': { puertas: '2', factorPrecio: 1.4 },

            // Hatchbacks (4 puertas)
            'Yaris': { puertas: '4', factorPrecio: 0.8 },
            'HR-V': { puertas: '4', factorPrecio: 1.0 },
            'Versa': { puertas: '4', factorPrecio: 0.8 },
            'Escape': { puertas: '4', factorPrecio: 1.0 },
            'Polo': { puertas: '4', factorPrecio: 0.9 },
            'M3': { puertas: '4', factorPrecio: 1.6 },
            'Clase A': { puertas: '4', factorPrecio: 1.1 },
            'Accent': { puertas: '4', factorPrecio: 0.8 }
        };

        const autos = [];
        for (let i = 0; i < 100; i++) {
            const marca = marcas[Math.floor(Math.random() * marcas.length)];
            const modelo = modelos[marca][Math.floor(Math.random() * modelos[marca].length)];
            const anio = Math.floor(Math.random() * (2024 - 2015) + 2015);
            const transmision = Math.random() > 0.5 ? 'automatico' : 'manual';
            
            // Obtener configuración específica del modelo
            const config = configuraciones[modelo] || { 
                puertas: ['2', '4'][Math.floor(Math.random() * 2)],
                factorPrecio: 1.0
            };

            // Calcular precio base según marca y modelo
            let precioBase = preciosBase[marca] * config.factorPrecio;

            // Ajustar precio según el año (autos más nuevos son más caros)
            const factorAnio = 1 + ((anio - 2015) * 0.05);

            // Ajustar precio según transmisión (automático es más caro)
            const factorTransmision = transmision === 'automatico' ? 1.1 : 1.0;

            // Calcular precio final
            const precio = Math.round(precioBase * factorAnio * factorTransmision);

            autos.push(new Auto(
                marca,
                modelo,
                anio,
                transmision,
                config.puertas,
                precio
            ));
        }
        return autos;
    }

    // Actualizar filtros y mostrar resultados
    actualizarFiltros() {
        // Actualizar filtros
        this.filtros = {
            marca: this.marcaSelect.value,
            modelo: this.modeloSelect.value,
            anio: this.anioSelect.value,
            transmision: this.transmisionSelect.value,
            puertas: this.puertasSelect.value
        };

        // Resetear página actual
        this.paginaActual = 1;

        // Mostrar spinner
        this.spinner.classList.add('active');
        this.resultados.style.display = 'none';

        // Simular carga
        setTimeout(() => {
            this.mostrarResultados();
        }, 2000);
    }

    // Filtrar autos según criterios
    filtrarAutos() {
        return this.autos.filter(auto => {
            return (
                (!this.filtros.marca || auto.marca === this.filtros.marca) &&
                (!this.filtros.modelo || auto.modelo === this.filtros.modelo) &&
                (!this.filtros.anio || auto.anio === parseInt(this.filtros.anio)) &&
                (!this.filtros.transmision || auto.transmision === this.filtros.transmision) &&
                (!this.filtros.puertas || auto.puertas === this.filtros.puertas)
            );
        });
    }

    // Crear tarjeta de auto
    crearTarjetaAuto(auto) {
        return `
            <div class="cotizador__auto-card">
                <h4 >${auto.marca} ${auto.modelo}</h4>
                <p><strong>Año:</strong> ${auto.anio}</p>
                <p><strong>Transmisión:</strong> ${auto.transmision}</p>
                <p><strong>Puertas:</strong> ${auto.puertas}</p>
                <p class="cotizador__auto-precio"><strong>Precio:</strong> $${auto.precio.toLocaleString('es-MX')}</p>
            </div>
        `;
    }

    // Mostrar resultados
    mostrarResultados() {
        const autosFiltrados = this.filtrarAutos();
        
        // Ocultar spinner
        this.spinner.classList.remove('active');
        this.resultados.style.display = 'block';

        if (autosFiltrados.length > 0) {
            this.resultadosTitle.textContent = 'Autos disponibles según tu selección';
            
            // Calcular índices para la paginación
            const inicio = (this.paginaActual - 1) * this.autosPorPagina;
            const fin = inicio + this.autosPorPagina;
            const autosPaginados = autosFiltrados.slice(inicio, fin);

            // Mostrar autos
            this.resultadosGrid.innerHTML = autosPaginados
                .map(auto => this.crearTarjetaAuto(auto))
                .join('');

            // Mostrar paginación
            this.mostrarPaginacion(autosFiltrados.length);
        } else {
            this.resultadosTitle.textContent = 'No se encontraron autos con las características deseadas';
            this.resultadosGrid.innerHTML = '';
            this.paginacion.innerHTML = '';
        }
    }

    // Mostrar paginación
    mostrarPaginacion(totalAutos) {
        const totalPaginas = Math.ceil(totalAutos / this.autosPorPagina);
        
        let paginacionHTML = '';
        
        // Botón anterior
        paginacionHTML += `
            <button class="cotizador__paginacion-btn" 
                    ${this.paginaActual === 1 ? 'disabled' : ''}
                    onclick="cotizador.cambiarPagina(${this.paginaActual - 1})">
                Anterior
            </button>
        `;

        // Números de página
        for (let i = 1; i <= totalPaginas; i++) {
            paginacionHTML += `
                <button class="cotizador__paginacion-btn ${i === this.paginaActual ? 'active' : ''}"
                        onclick="cotizador.cambiarPagina(${i})">
                    ${i}
                </button>
            `;
        }

        // Botón siguiente
        paginacionHTML += `
            <button class="cotizador__paginacion-btn"
                    ${this.paginaActual === totalPaginas ? 'disabled' : ''}
                    onclick="cotizador.cambiarPagina(${this.paginaActual + 1})">
                Siguiente
            </button>
        `;

        this.paginacion.innerHTML = paginacionHTML;
    }

    // Cambiar página
    cambiarPagina(nuevaPagina) {
        this.paginaActual = nuevaPagina;
        this.mostrarResultados();
    }

    // Limpiar todos los filtros
    limpiarFiltros() {
        // Resetear todos los selects
        this.marcaSelect.value = '';
        this.modeloSelect.value = '';
        this.anioSelect.value = '';
        this.transmisionSelect.value = '';
        this.puertasSelect.value = '';

        // Limpiar opciones de modelos y años
        this.modeloSelect.innerHTML = '<option value="">Seleccione...</option>';
        this.anioSelect.innerHTML = '<option value="">Seleccione...</option>';

        // Resetear filtros
        this.filtros = {
            marca: '',
            modelo: '',
            anio: '',
            transmision: '',
            puertas: ''
        };

        // Resetear página actual
        this.paginaActual = 1;

        // Mostrar spinner
        this.spinner.classList.add('active');
        this.resultados.style.display = 'none';

        // Simular carga y mostrar todos los autos
        setTimeout(() => {
            this.mostrarResultados();
        }, 2000);
    }
}

// Inicializar el cotizador cuando el DOM esté listo
let cotizador;
document.addEventListener('DOMContentLoaded', () => {
    cotizador = new Cotizador();
}); 