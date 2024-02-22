
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

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("src")) {
        return new Response(JSON.stringify({ error: 'Falta el parámetro `src` para la búsqueda' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const searchTerm = searchParams.get("src")!;
    const results = await searchMobiles(searchTerm);

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};