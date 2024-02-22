
// para su uso: http://{direccionIP}4321/api/v1/phone-filter.endpoint?{parametro}={valorParametro}
// 
// El endpoint acepta parámetros de consulta en la URL para especificar los criterios de filtrado,
// y devuelve una lista de teléfonos que cumplen con esos criterios en formato JSON.
// 
// Parámetros de consulta admitidos:
// - priceMin: Precio mínimo del teléfono.
// - priceMax: Precio máximo del teléfono.
// - screenType: Tipo de pantalla del teléfono (por ejemplo, AMOLED, LCD).
// - screenResolution: Resolución de la pantalla del teléfono.
// - ram: Cantidad de RAM del teléfono.
// - storage: Capacidad de almacenamiento del teléfono.
// - os: Sistema operativo del teléfono.


import type { APIRoute } from "astro";
import { filterMobiles } from "../../../service/fakedb.service";
import type { Mobile } from "../../../test/api/v1/dataset";

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams || searchParams.toString().length === 0) {
        return new Response(JSON.stringify({ error: 'No se proporcionaron parámetros de búsqueda' }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    try {
        const filterOptions: Partial<Mobile> = {};
        for (const [key, value] of searchParams.entries()) {
            filterOptions[key] = value;
        }
        const results = await filterMobiles(filterOptions);

        if (results.length === 0) {
            return new Response(JSON.stringify({ error: 'No se encontró ningún teléfono con los parámetros de búsqueda proporcionados' }), {
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
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};
 