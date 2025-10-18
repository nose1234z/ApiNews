# Comandos para Crear Categorías y Estados

Para ayudarte a verificar otras partes de la API, aquí tienes los comandos `curl` para crear un nuevo estado y una nueva categoría. 

**IMPORTANTE:** Estas operaciones requieren permisos de administrador. Asegúrate de haber iniciado sesión como administrador y de usar el token JWT correspondiente en la cabecera `Authorization`.

---

## 1. Crear un Nuevo Estado

**Comando `curl` (reemplaza `TU_TOKEN_ADMIN_JWT` con tu token):**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/estados" \
-H "Authorization: Bearer TU_TOKEN_ADMIN_JWT" \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Publicado",
    "abreviacion": "PUB"
}'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- Un objeto JSON representando el nuevo estado.

---

## 2. Crear una Nueva Categoría

**Comando `curl` (reemplaza `TU_TOKEN_ADMIN_JWT` con tu token):**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/categorias" \
-H "Authorization: Bearer TU_TOKEN_ADMIN_JWT" \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Deportes",
    "descripcion": "Noticias sobre eventos deportivos."
}'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- Un objeto JSON representando la nueva categoría.
