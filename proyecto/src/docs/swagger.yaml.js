export default {
  openapi: "3.0.0",
  info: {
    title: "API de Adopciones de Mascotas",
    version: "1.0.0",
    description: "Documentación de la API para gestionar usuarios, mascotas y adopciones",
  },
  servers: [{ url: "http://localhost:8080" }],
  paths: {
    "/api/sessions/login": {
      post: {
        summary: "Autenticar usuario",
        description: "Iniciar sesión proporcionando email y contraseña.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Usuario autenticado correctamente" },
          400: { description: "Datos incompletos" },
          404: { description: "Usuario no encontrado" },
        },
      },
    },
    "/api/pets": {
      get: {
        summary: "Obtener todas las mascotas",
        description: "Devuelve una lista de todas las mascotas registradas en la base de datos.",
        responses: {
          200: { description: "Lista de mascotas obtenida correctamente" },
          500: { description: "Error al obtener mascotas" },
        },
      },
      post: {
        summary: "Crear una nueva mascota",
        description: "Registra una nueva mascota en el sistema.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  specie: { type: "string" },
                  birthDate: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Mascota creada correctamente" },
          400: { description: "Datos incompletos" },
        },
      },
    },
    "/api/users": {
      get: {
        summary: "Obtener todos los usuarios",
        description: "Devuelve una lista con todos los usuarios registrados.",
        responses: {
          200: { description: "Usuarios obtenidos correctamente" },
          500: { description: "Error al obtener usuarios" },
        },
      },
      post: {
        summary: "Registrar un nuevo usuario",
        description: "Crea un nuevo usuario proporcionando los datos requeridos.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: { description: "Usuario creado correctamente" },
          400: { description: "Datos inválidos o incompletos" },
        },
      },
    },
    "/api/users/{uid}": {
      get: {
        summary: "Obtener un usuario por ID",
        description: "Devuelve los datos de un usuario específico por su ID.",
        parameters: [
          {
            name: "uid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Usuario encontrado" },
          404: { description: "Usuario no encontrado" },
        },
      },
      put: {
        summary: "Actualizar un usuario",
        description: "Actualiza la información de un usuario existente.",
        parameters: [
          {
            name: "uid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Usuario actualizado correctamente" },
          400: { description: "Datos inválidos" },
          404: { description: "Usuario no encontrado" },
        },
      },
      delete: {
        summary: "Eliminar un usuario",
        description: "Elimina un usuario específico por su ID.",
        parameters: [
          {
            name: "uid",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Usuario eliminado correctamente" },
          404: { description: "Usuario no encontrado" },
        },
      },
    },
  },
};
