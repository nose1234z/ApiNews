# Casos de Prueba de la API de Noticias

## URL Base

Todas las URLs de los casos de prueba utilizarán la siguiente URL base:
`https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/`

---

## 1. Caso de Prueba: Inicio y Conectividad

Este caso de prueba verifica que la API esté en funcionamiento y responda correctamente a las solicitudes básicas.

### Prueba 1.1: Obtener todas las noticias (Endpoint público)

Verifica que se pueda acceder a un endpoint que no requiere autenticación.

**Comando `curl`:**
```bash
curl -X GET "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/noticias"
```

**Resultado Esperado:**
- Un código de estado `200 OK`.
- Un array de objetos JSON, donde cada objeto representa una noticia.

---

## 2. Caso de Prueba: Creación y Autenticación de Usuario

Este caso de prueba simula el registro de un nuevo usuario y su posterior inicio de sesión.

### Prueba 2.1: Registrar un nuevo usuario

**Nota:** Para registrar un usuario, primero necesitas un `perfil_id`. Suponiendo que el perfil de "Usuario" o "Periodista" tiene el `id=2`. Si no, puedes obtener los perfiles disponibles con `GET /api/perfiles`.

**Comando `curl`:**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/auth/registro" \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Nuevo",
    "apellidos": "Usuario",
    "nick": "nuevousuario",
    "correo": "nuevo@example.com",
    "contraseña": "password123",
    "perfil_id": 2
}'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- Un objeto JSON confirmando el registro.

### Prueba 2.2: Iniciar sesión con el nuevo usuario

**Comando `curl`:**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/auth/login" \
-H "Content-Type: application/json" \
-d '{
    "correo": "nuevo@example.com",
    "contraseña": "password123"
}'
```

**Resultado Esperado:**
- Un código de estado `200 OK`.
- Un objeto JSON que contiene un `token` JWT.

### Prueba 2.3: Acceder a un recurso protegido con el token de usuario

Usa el `token` obtenido en el paso anterior para crear una nueva noticia.

**Comando `curl` (reemplaza `TU_TOKEN_JWT` con el token real):**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/noticias" \
-H "Authorization: Bearer TU_TOKEN_JWT" \
-H "Content-Type: application/json" \
-d '{
    "titulo": "Mi Primera Noticia",
    "descripcion": "Contenido de la noticia creada por el nuevo usuario.",
    "categoria_id": 1,
    "estado_id": 1
}'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- El objeto JSON de la noticia recién creada.

---

## 3. Caso de Prueba: Acceso de Administrador

Este caso de prueba verifica que un usuario con rol de "admin" pueda acceder a recursos restringidos.

### Prueba 3.1: Iniciar sesión como Administrador

**Nota:** Se asume que ya existe un usuario administrador en la base de datos. Reemplaza `admin@example.com` y `adminpass` con las credenciales correctas.

**Comando `curl`:**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/auth/login" \
-H "Content-Type: application/json" \
-d '{
    "correo": "admin@example.com",
    "contraseña": "adminpass"
}'
```

**Resultado Esperado:**
- Un código de estado `200 OK`.
- Un objeto JSON que contiene un `token` JWT de administrador.

### Prueba 3.2: Acceder a un recurso solo para administradores

Usa el `token` de administrador para obtener la lista de todos los usuarios.

**Comando `curl` (reemplaza `TU_TOKEN_ADMIN_JWT` con el token real):**
```bash
curl -X GET "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/usuarios" \
-H "Authorization: Bearer TU_TOKEN_ADMIN_JWT"
```

**Resultado Esperado:**
- Un código de estado `200 OK`.
- Un array de objetos JSON con la información de todos los usuarios del sistema.

### Prueba 3.3: Intentar acceder a un recurso de administrador sin token

Verifica que el endpoint esté correctamente protegido.

**Comando `curl`:**
```bash
curl -X GET "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/usuarios"
```

**Resultado Esperado:**
- Un código de estado `401 Unauthorized` o `403 Forbidden`.
- Un mensaje de error indicando que se requiere autenticación o permisos.

---

## Listado Completo de Endpoints Adaptados

Aquí tienes una lista de todos los endpoints de la API adaptados a la nueva URL:

### Autenticación
- `POST /api/auth/login`
- `POST /api/auth/registro`

### Usuarios (Admin)
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `POST /api/usuarios`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Noticias (Público para GET, Requiere autenticación para CUD)
- `GET /api/noticias`
- `GET /api/noticias/:id`
- `POST /api/noticias`
- `PUT /api/noticias/:id`
- `DELETE /api/noticias/:id`

### Categorías (Público para GET, Admin para CUD)
- `GET /api/categorias`
- `GET /api/categorias/:id`
- `POST /api/categorias`
- `PUT /api/categorias/:id`
- `DELETE /api/categorias/:id`

### Estados (Público para GET, Admin para CUD)
- `GET /api/estados`
- `GET /api/estados/:id`
- `POST /api/estados`
- `PUT /api/estados/:id`
- `DELETE /api/estados/:id`

### Perfiles (Público)
- `GET /api/perfiles`
- `GET /api/perfiles/:id`
