
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


export const GET: APIRoute = async ({params, url}) => {
    
    const searchParams = url.searchParams;

    if(!searchParams.has("mobile")) {
        return new Response(JSON.stringify({ error: 'Falta `mobile` parámetro de búsqueda' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
              }
        })
    }

    const mobile = await getMobileById(searchParams.get("mobile")!);

    if(!mobile) {
        return new Response(JSON.stringify({ error: '`mobile` no encontrado' }), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
              }
        })
    }

    return new Response (JSON.stringify({ mobile }), {
        status: 200,
        statusText: "OK",
        headers:{ 
            "Content-Type": "application/json"
        }
    })

}