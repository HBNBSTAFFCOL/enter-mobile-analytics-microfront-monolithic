
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
import { getMobileById, searchMobiles } from "../../../service/fakedb.service";


export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("mobiles")) {
        return new Response(JSON.stringify({ error: 'falta el parametro `mobiles` para comparar' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
              }
        });
    }

    const mobileIds = searchParams.get("mobiles")!.split(",");
    console.log();

    if (!mobileIds || mobileIds.length < 2) {
        return new Response(JSON.stringify({ error: 'Se deben proporcionar al menos dos IDs para comparar' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const mobilesInfo = mobileIds.map(async (mobileId) => {
        const info = await searchMobiles(mobileId);
        console.log(info)
        if (!info) {
            return { id: mobileId, error: 'No se encontró información para este móvil' };
        }
        return { id: mobileId, info };
    });

    const mobilesInformation = await Promise.all(mobilesInfo)

    return new Response(JSON.stringify({  mobilesInfo: mobilesInformation }), {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json"
        }
    });
};