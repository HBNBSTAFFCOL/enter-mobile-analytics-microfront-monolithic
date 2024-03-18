
// Este endpoint permite comparar información de múltiples teléfonos móviles utilizando sus IDs.
// Se espera que se proporcione al menos dos IDs de teléfonos móviles como parámetros de consulta.
// Retorna la información de los teléfonos móviles encontrados para los IDs proporcionados, o un mensaje de error si no se encuentra información para alguno de los IDs.
//
// Parámetros de consulta admitidos:
// - mobiles: Una lista de IDs de teléfonos móviles separados por comas para comparar.
// Si no se proporcionan los parámetros necesarios o si alguno de los IDs no tiene información asociada, se devuelve un mensaje de error correspondiente.
//
// La respuesta del endpoint es un objeto JSON que contiene la información de los teléfonos móviles encontrados para los IDs proporcionados.



import type { APIRoute } from "astro";
import { searchMobiles } from "../../../service/fakedb.service";
import { errorCodes } from './errorCodes';

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("mobiles")) {
        return new Response(JSON.stringify({ error: `${errorCodes.INVALID_PARAMETERS.code} - ${errorCodes.INVALID_PARAMETERS.message}` }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    try {
        const mobileIds = searchParams.get("mobiles")!.split(",");

        if (!mobileIds || mobileIds.length < 2) {
            return new Response(JSON.stringify({
                error: `${errorCodes.NO_VALUES_PARAMETERS.code} - ${errorCodes.NO_VALUES_PARAMETERS.message}`}), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        const mobilesInfo = [];

        for (const mobileId of mobileIds) {
            const info = await searchMobiles(mobileId);
            if (info.length === 0) {
                mobilesInfo.push({ id: mobileId, error: `${errorCodes.NO_RESULTS_FOUND.code} - ${errorCodes.NO_RESULTS_FOUND.message}` });
            } else {
                mobilesInfo.push({ id: mobileId, info });
            }
        }

        return new Response(JSON.stringify({ mobilesInfo }), {
            status: 200,
            statusText: "OK",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: `${errorCodes.SERVER_ERROR.code} - ${errorCodes.SERVER_ERROR.message}` }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
