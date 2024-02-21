// 

import type { APIRoute } from "astro";
import { searchMobiles } from "../../../service/fakedb.service";

export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;

    if (!searchParams.has("src")) {
        return new Response(JSON.stringify({ error: 'Falta el parámetro `term` para la búsqueda' }), {
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