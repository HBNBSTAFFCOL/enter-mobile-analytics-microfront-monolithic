
// para su uso: http://{direccionIP}4321/api/v1/phone-filter.endpoint?{parametro}={valorParametro}
// 
// El endpoint acepta parámetros de consulta en la URL para especificar los criterios de filtrado,
// y devuelve una lista de teléfonos que cumplen con esos criterios en formato JSON.
// 

import type { APIRoute } from "astro";
import { filterMobiles } from "../../../service/fakedb.service";
import type { Mobile } from "../../../test/api/v1/dataset";
import { errorCodes } from "./errorCodes";

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    // Validar si se proporcionaron parámetros de búsqueda
    if (!searchParams || searchParams.toString().length === 0) {
        return new Response(JSON.stringify({
            error: `${errorCodes.INVALID_PARAMETERS.code} - ${errorCodes.INVALID_PARAMETERS.message}`
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    try {
        const filterOptions: Partial<Mobile> = {};
        for (const [key, value] of searchParams.entries()) {
                // @ts-ignore

            filterOptions[key] = value;
        }
                // @ts-ignore

        const results = await filterMobiles(filterOptions);

        if (results.length === 0) {
            return new Response(JSON.stringify({
                error: `${errorCodes.NO_RESULTS_FOUND.code} - ${errorCodes.NO_RESULTS_FOUND.message}: Quizás has sido demasiado estricto con los filtros`
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify(results), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({
            error: `${errorCodes.SERVER_ERROR.code}-${errorCodes.SERVER_ERROR.message}`
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
