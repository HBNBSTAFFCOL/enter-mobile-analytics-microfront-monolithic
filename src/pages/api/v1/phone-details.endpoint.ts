
// Este endpoint permite obtener información detallada de un teléfono móvil por su ID.
// Se espera que se proporcione el ID del teléfono móvil como parámetro de consulta llamado "mobile".
// Retorna la información detallada del teléfono móvil correspondiente al ID proporcionado.
//
// Parámetros de consulta admitidos:
// - mobile: El ID del teléfono móvil del cual se desea obtener la información detallada.
//
// Si no se proporciona el parámetro necesario "mobile" para la búsqueda, se devuelve un mensaje de error correspondiente.
// Si el ID proporcionado no se encuentra en la base de datos, se devuelve un mensaje de error correspondiente.
//
// La respuesta del endpoint es un objeto JSON que contiene la información detallada del teléfono móvil encontrado para el ID proporcionado.
//

import type { APIRoute } from "astro";
import { getMobileById } from "../../../service/fakedb.service";
import { errorCodes } from './errorCodes';

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("mobile")) {
        return new Response(JSON.stringify({ error: `${errorCodes.INVALID_PARAMETERS.code} - ${errorCodes.INVALID_PARAMETERS.message}` }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    try {
        const mobileId = searchParams.get("mobile");

        if (!mobileId) {
            return new Response(JSON.stringify({ error: `${errorCodes.NO_VALUES_PARAMETERS.code} - ${errorCodes.NO_VALUES_PARAMETERS.message}` }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const mobile = await getMobileById(mobileId); // Utilizamos la función adaptada para obtener el móvil por su ID

        if (!mobile) {
            return new Response(JSON.stringify({ error: `${errorCodes.NO_RESULTS_FOUND.code} - ${errorCodes.NO_RESULTS_FOUND.message}` }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        return new Response(JSON.stringify({ mobile }), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: `${errorCodes.SERVER_ERROR.code} - ${errorCodes.SERVER_ERROR.message}`
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};





/* Endopint con funcion de prueba 


import type { APIRoute } from "astro";
import { getMobileById } from "../../../service/fakedb.service";
import { errorCodes } from './errorCodes';


export const GET: APIRoute = async ({ url }) => {

    const searchParams = url.searchParams;

    if (!searchParams.has("mobile")) {
        return new Response(JSON.stringify({ error: `${errorCodes.INVALID_PARAMETERS.code} - ${errorCodes.INVALID_PARAMETERS.message}` }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    try {
        const mobileId = searchParams.get("mobile");

        if (!mobileId) {
            return new Response(JSON.stringify({ error: `${errorCodes.NO_VALUES_PARAMETERS.code} - ${errorCodes.NO_VALUES_PARAMETERS.message}` }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const mobile = await getMobileById(searchParams.get("mobile")!);

        if (!mobile) {
            return new Response(JSON.stringify({ error: `${errorCodes.NO_RESULTS_FOUND.code} - ${errorCodes.NO_RESULTS_FOUND.message}` }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        return new Response(JSON.stringify({ mobile }), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: `${errorCodes.SERVER_ERROR.code} - ${errorCodes.SERVER_ERROR.message}`
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
*/