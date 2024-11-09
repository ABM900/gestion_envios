import { param } from 'drizzle-orm';
import {
    pgEnum,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = {};

export type IShipping = {
    Id_Env: number,
    Env_clientName: string,
    Env_weight: number,
    Env_date: string,
    Env_product: string,
    Env_amount: number,
    Env_destination: string,
    Env_receiver: string,
    Env_phone: string,
    Env_address: string
};
//export const insertProductSchema = createInsertSchema(products);

export async function getShippings(
    search: string,
    offset: number,
    from: string,
    to: string
): Promise<{
    shippings: IShipping[];
    newOffset: number | null;
    totalProducts: number;
}> {
    let params = [
        search != "" ? `client=${search}` : search, 
        to != "" ? `to=${to}` : to, 
        from != "" ? `from=${from}` : from
    ];
    params = params.filter(it => it != "");
    let jsonResponse = await fetch(
        `https://gestionenvios.pidya.es/api/envios/offset/${offset}?` + params.join("&"),
        {
            method: 'GET',
            headers: { 
                "Access-Control-Allow-Origin": "*",
                'Cache-Control': 'no-cache'
            }
        }
    ).then((response) => response.json())

    return new Promise((resolve, reject) => {
        resolve({
            shippings: jsonResponse.shippings as IShipping[],
            newOffset: jsonResponse.shippings.length + offset,
            totalProducts: jsonResponse.total
        })
    });
}

export function addShipping(shipping: IShipping, onPostAction: void) {
    fetch(
        'https://gestionenvios.pidya.es/api/envios',
        {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shipping)
        }
    ).then((_) => onPostAction)
}

export async function getShippingFromClient(
    clientName: string
): Promise<{
    shipping: IShipping;
}> {
    let jsonResponse = await fetch(
        `https://gestionenvios.pidya.es/api/envios/client/${clientName}`,
        {
            method: 'GET',
            headers: { "Access-Control-Allow-Origin": "*" }
        }
    ).then((response) => response.json())

    return new Promise((resolve, reject) => {
        resolve({
            shipping: jsonResponse as IShipping
        })
    });
}

export async function deleteShipping(
    Id_Env: number,
    onPostAction:() => void
) {
    await fetch(
        `https://gestionenvios.pidya.es/api/envios/${Id_Env}`,
        {
            method: 'DELETE',
            headers: { 
                "Access-Control-Allow-Origin": "*",
                'Cache-Control': 'no-cache'
            }, 
            cache: "no-store"
        }
    ).then(response => {
        if (response.status === 204) {
            setTimeout(async () => {
                onPostAction();
            }, 1000);
        }
    })
}
