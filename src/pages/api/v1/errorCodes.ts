export const errorCodes = {
    INVALID_PARAMETERS: {
        code: 430,
        message: 'Hubo un error con los parámetros de búsqueda en la URL',
    },
    NO_VALUES_PARAMETERS:{
        code:435,
        message: 'Faltan items para realizar la peitición',
    },
    NO_RESULTS_FOUND: {
        code: 412,
        message: 'No hay resultados para tu búsqueda',
    },
    SERVER_ERROR: {
        code: 525,
        message: 'Error en el servidor al procesar la solicitud',
    },
    DATABASE_ERROR: {
        code: 550,
        message: 'Error en la base de datos al buscar la información',
    },
    FILTER_ERROR: {
        code: 460,
        message: 'Hubo un error al aplicar los filtros de búsqueda',
    },
    COMPARISON_ERROR: {
        code: 470,
        message: 'Hubo un error al comparar los dispositivos móviles',
    },
    UNAUTHORIZED_ACCESS: {
        code: 401,
        message: 'No tienes autorización para acceder a esta funcionalidad',
    },
    RATE_LIMIT_EXCEEDED: {
        code: 429,
        message: 'Se ha superado el límite de solicitudes, inténtalo de nuevo más tarde',
    },
};