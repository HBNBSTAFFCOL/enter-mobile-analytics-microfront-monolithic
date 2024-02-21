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