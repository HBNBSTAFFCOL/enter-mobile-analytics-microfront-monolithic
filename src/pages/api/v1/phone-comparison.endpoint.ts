//

import type { APIRoute } from "astro";
import { string } from "astro/zod";
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
        const info = await getMobileById(mobileId);
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