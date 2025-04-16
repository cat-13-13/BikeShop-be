# 🚲 BikeShop Backend

Este repositorio contiene el backend de **BikeShop**, una plataforma de ecommerce para bicicletas personalizables y otros productos deportivos. Desarrollado con **Node.js**, **Express** y **MongoDB**, permite a los usuarios personalizar productos, gestionar su carrito y realizar compras. También incluye funcionalidades específicas para administradores.

---

## 📁 Estructura del Proyecto

```
backend/ 
├── config/ # Configuración de base de datos y middlewares 
├── controllers/ # Lógica de negocio para cada entidad 
├── middlewares/ # Middlewares para autenticación y autorización 
├── models/ # Definición de esquemas de Mongoose 
├── routes/ # Endpoints organizados por entidad 
├── app.js # Punto de entrada del servidor 
├── package.json
```

## 🧠 Funcionalidades Principales

### Usuarios

- Registro e inicio de sesión con JWT
- Verificación de sesión
- Gestión del perfil
- Añadir productos personalizados al carrito
- Comprar productos y registrar historial de compra

### Administradores

- Crear, editar y eliminar productos
- Definir partes personalizables, opciones, precios condicionales y restricciones
- Controlar el stock de cada opción

---

## 🧩 Modelo de Datos

Los productos se componen de múltiples partes personalizables, cada una con opciones que pueden tener:

- Precio adicional
- Precios condicionales según otras selecciones
- Restricciones de combinación
- Control de stock individual

Usuarios tienen:

- Carrito (`cart[]`)
- Historial de compras (`purchasedProduct[]`)

---

## 🔐 Autenticación y Roles

- JWT para autenticación
- Middleware `isAuthenticated` protege rutas privadas
- Middleware `isAdmin` limita acceso a administradores

---

## 🔄 Endpoints

### Auth

| Método | Ruta            | Descripción             |
|--------|-----------------|-------------------------|
| POST   | `/auth/signup`  | Registro                |
| POST   | `/auth/login`   | Login                   |
| GET    | `/auth/verify`  | Verificación de sesión |

### Productos

| Método | Ruta                                      | Descripción               | Rol        |
|--------|-------------------------------------------|---------------------------|------------|
| GET    | `/product/getAllProducts`                 | Obtener todos los productos | Público  |
| GET    | `/product/getOneProduct/:product_id`      | Obtener producto por ID   | Público    |
| POST   | `/product/saveProduct`                    | Crear producto            | Admin      |
| PUT    | `/product/editProduct/:product_id`        | Editar producto           | Admin      |
| DELETE | `/product/deleteProduct/:product_id`      | Eliminar producto         | Admin      |

### Usuarios

| Método | Ruta                                          | Descripción                     | Requiere Token |
|--------|-----------------------------------------------|----------------------------------|----------------|
| GET    | `/user/getAllUsers`                           | Listar usuarios                 | No             |
| GET    | `/user/getOneUser/:user_id`                   | Obtener usuario por ID          | No             |
| POST   | `/user/cart/:user_id/:product_id`             | Añadir producto al carrito      | Sí             |
| PUT    | `/user/cart/:user_id/:cart_item_id`           | Editar producto del carrito     | Sí             |
| DELETE | `/user/cart/:user_id/:cart_item_id`           | Eliminar producto del carrito   | Sí             |
| POST   | `/user/buyProducts/:user_id`                  | Realizar compra                 | Sí             |
| PUT    | `/user/editUser/:user_id`                     | Editar usuario                  | Sí             |
| DELETE | `/user/deleteUser/:user_id`                   | Eliminar cuenta                 | Sí             |

---

## ⚙️ Instalación

```bash
git clone https://github.com/tu-usuario/bikeshop-backend.git
cd backend
npm install
```

## Configura las variables de entorno en un archivo .env:

```env
PORT=5005
MONGODB_URI=mongodb://localhost:27017/bikeshop
JWT_SECRET=tu_clave_secreta
```

## ▶️ Ejecución
```bash
npm run dev
```
El backend se ejecutará en http://localhost:5005.

## 📌 Notas Técnicas
- El cálculo de precios (incluidos condicionales) se hace en el frontend, pero el backend valida y guarda toda la información de la compra.

- Se utiliza mongoose para definir los modelos.

## 🛣️ Roadmap Futuro
- Integración con pasarela de pago (Stripe)

- Filtros avanzados de productos

- Gestión avanzada de stock (alertas, stock mínimo)


## 📬 Contacto
Para dudas o contribuciones, contacta a Marcus o al equipo de desarrollo en catalinaf97@gmail.com.

