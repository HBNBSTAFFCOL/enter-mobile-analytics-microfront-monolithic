
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
import { filterMobiles, type FilterOptions } from "../../../service/fakedb.service";

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    const filterOptions: FilterOptions = {};
    if (searchParams.has("priceMin")) {
        filterOptions.priceMin = parseFloat(searchParams.get("priceMin")!);
    }
    if (searchParams.has("priceMax")) {
        filterOptions.priceMax = parseFloat(searchParams.get("priceMax")!);
    }
    if (searchParams.has("screenType")) {
        filterOptions.screenType = searchParams.get("screenType")!;
    }
    if (searchParams.has("screenResolution")) {
        filterOptions.screenResolution = searchParams.get("screenResolution")!;
    }
    if (searchParams.has("ram")) {
        filterOptions.ram = searchParams.get("ram")!;
    }
    if (searchParams.has("storage")) {
        filterOptions.storage = searchParams.get("storage")!;
    }
    if (searchParams.has("os")) {
        filterOptions.os = searchParams.get("os")!;
    }

    const results = await filterMobiles(filterOptions);

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};
