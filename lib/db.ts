import {
    pgEnum,
} from 'drizzle-orm/pg-core';
import { json } from 'stream/consumers';

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
    offset: number
): Promise<{
    shippings: IShipping[];
    newOffset: number | null;
    totalProducts: number;
}> {
    let jsonResponse = await fetch(
        `http://localhost:8000/api/envios/offset/${offset}`,
        {
            method: 'GET',
            headers: { "Access-Control-Allow-Origin": "*" }
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
        'http://localhost:8000/api/envios',
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
