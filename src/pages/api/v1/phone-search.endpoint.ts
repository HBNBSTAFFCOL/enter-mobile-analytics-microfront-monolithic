
// Este endpoint permite buscar teléfonos móviles utilizando un término de búsqueda.
 // Se espera que se proporcione el término de búsqueda como parámetro de consulta llamado "src".
 // Retorna una lista de teléfonos móviles que coinciden con el término de búsqueda en cualquier propiedad o característica.
 //
 // Parámetros de consulta admitidos:
 // - src: El término de búsqueda para buscar en los teléfonos móviles.
 //
 // Si no se proporciona el parámetro necesario "src" para la búsqueda, se devuelve un mensaje de error correspondiente.
 //
 // La respuesta del endpoint es un objeto JSON que contiene la lista de teléfonos móviles que coinciden con el término de búsqueda.



import type { APIRoute } from "astro";
import { searchMobiles } from "../../../service/fakedb.service";
import { errorCodes } from './errorCodes';


export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("src")) {
        return new Response(JSON.stringify({ error:`${errorCodes.INVALID_PARAMETERS.code} - ${errorCodes.INVALID_PARAMETERS.message}`}), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const searchTerm = searchParams.get("src")!;


    //if (!searchTerm) {
    //    return new Response(JSON.stringify({error: 'No se proporciono un parametro de busqueda'}), {
    //        status: 404,
    //        headers: { 
    //            "Content-Type": "application/json"
    //        }
    //    });
    //}

    const results = await searchMobiles(searchTerm);

    if (results.length === 0) {
        return new Response(JSON.stringify({error:`${errorCodes.NO_RESULTS_FOUND.code} - ${errorCodes.NO_RESULTS_FOUND.message}`}), {
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
};