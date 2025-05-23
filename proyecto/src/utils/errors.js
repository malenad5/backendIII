export const ERROR_DICTIONARY = {
    USER_ALREADY_EXISTS: "El usuario ya existe",
    INVALID_USER_DATA: "Datos de usuario incompletos",
    PET_ALREADY_ADOPTED: "La mascota ya fue adoptada",
    PET_NOT_FOUND: "Mascota no encontrada",
    USER_NOT_FOUND: "Usuario no encontrado",
};

export class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
