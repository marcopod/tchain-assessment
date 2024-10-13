# Assessment TChain
### Autor: Marco Podesta

Este proyecto es una evaluación técnica para **TChain**, desarrollado usando **Next.js**. A continuación, se encuentran las instrucciones para configurar, ejecutar y desplegar el proyecto, junto con las variables de entorno requeridas para la integración con Stripe.

## Comenzando

### Requisitos previos
Asegúrate de tener lo siguiente instalado:
- **Node.js**: Puedes descargar la versión más reciente desde [https://nodejs.org/](https://nodejs.org/).
- **npm**: npm viene incluido con Node.js, así que debería estar disponible tras la instalación de Node.

### Instrucciones
1. **Clonar el repositorio**:
   - Ejecuta el comando: `git clone https://github.com/marcopod/tchain-assessment.git`
   - Navega al directorio del proyecto: `cd tchain-assessment`

2. **Instalar dependencias**:
   - Ejecuta el comando: `npm i`

3. **Iniciar el servidor de desarrollo**:
   - Ejecuta el comando: `npm run dev`

4. **Acceder a la aplicación**:
   - Abre tu navegador y ve a `http://localhost:3000`.

### Variables de entorno accesibles
Se necesitan las siguientes variables de entorno para la integración adecuada con la API de Stripe. Asegúrate de crear un archivo `.env.local` en la raíz de tu proyecto y establecer estas claves.

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Esta es tu clave pública de Stripe, usada para la funcionalidad de Stripe del lado del cliente.
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Q9G192L610zh1yM9Fp1Ni2xFVhPxTX5KfkZeSaAaeo9356vdhridd0EmSffZWx7h4iCw4J7bPPhNRoyPlW5tEbN00hOwGp3N3`


- **NEXT_STRIPE_PRICE_ID**: Este es el ID de precio de Stripe para el producto o servicio que estás vendiendo.
  `NEXT_STRIPE_PRICE_ID=price_1Q9GFM2L610zh1yMwpqh9DQw`

# Posibles mejoras a futuro
- Panel de Admin para separar la creación, modificación y eliminación de productos
- Integrar stripe para los pagos fuera de modo demo
- Seleccionar varios productos
- Agregar carrito de compras