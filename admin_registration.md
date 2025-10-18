# Comando para Registrar un Usuario Administrador

Para crear un usuario con permisos de administrador, necesitas especificar el `perfil_id` como `1` durante el registro. Aquí tienes el comando `curl` para hacerlo.

**Nota:** Este endpoint es público y no requiere autenticación.

---

## Registrar un Nuevo Administrador

**Comando `curl`:**
```bash
curl -X POST "https://app-8d65ab1b-f618-4541-9b29-8db68f5d70f8.cleverapps.io/api/auth/registro" \
-H "Content-Type: application/json" \
-d '{
    "nombre": "Admin",
    "apellidos": "Principal",
    "nick": "adminuser",
    "correo": "admin@example.com",
    "contraseña": "adminpass123",
    "perfil_id": 1
}'
```

**Resultado Esperado:**
- Un código de estado `201 Created`.
- Un objeto JSON con los datos del nuevo usuario administrador (sin la contraseña).

Una vez que hayas creado este usuario, puedes usar sus credenciales (`admin@example.com` y `adminpass123`) para iniciar sesión en el endpoint `POST /api/auth/login` y obtener un token de administrador.

