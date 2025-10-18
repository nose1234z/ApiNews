# Comando para Crear una Noticia

Aquí tienes el comando `curl` para crear una nueva noticia. 

**IMPORTANTE:** 
- Esta operación requiere que estés autenticado. Usa un token JWT (de cualquier usuario) en la cabecera `Authorization`.
- Asegúrate de que los `categoria_id` y `estado_id` que uses ya existan en la base de datos. Puedes usar los comandos que te di antes para crear nuevas categorías y estados, o usar los siguientes comandos para ver los que ya existen.

---

## 1. (Opcional) Verificar Categorías y Estados Existentes

### Obtener todas las categorías
```bash
curl -X GET "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/categorias" \
-H "Authorization: Bearer TU_TOKEN_JWT"
```

### Obtener todos los estados
```bash
curl -X GET "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/estados" \
-H "Authorization: Bearer TU_TOKEN_JWT"
```

---

## 2. Crear una Nueva Noticia

**Comando `curl` (reemplaza `TU_TOKEN_JWT` con tu token):**

**Nota:** En el siguiente ejemplo, se usan `categoria_id: 1` y `estado_id: 1`. Reemplázalos con los IDs que correspondan según tu base de datos.

```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/noticias" \
-H "Authorization: Bearer TU_TOKEN_JWT" \
-H "Content-Type: application/json" \
-d 
'{ "titulo": "Gran Victoria del Equipo Local", "descripcion": "El equipo de fútbol local ha conseguido una victoria impresionante en el partido de hoy.", "categoria_id": 1, "estado_id": 1 }'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- Un objeto JSON con los datos de la noticia recién creada.

```