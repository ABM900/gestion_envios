"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react";
import { addShipping, IShipping } from "@/lib/db";

const FormSchema = z.object({
    Id_Env: z.number(),
    Env_clientName: z.string().min(1, {
        message: "El nombre del cliente debe estar rellenado",
    }),
    Env_phone: z.string(),
    Env_receiver: z.string(),
    Env_date: z.string(),
    Env_product: z.string(),
    Env_weight: z.coerce.number(),
    Env_amount: z.coerce.number(),
    Env_destination: z.string(),
    Env_address: z.string()
})

type AddShippingFormProps = {
    onPostAction:() => void
}

export function AddShippingForm({ onPostAction }: AddShippingFormProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            Id_Env: 0,
            Env_clientName: "",
            Env_phone: "",
            Env_receiver: "",
            Env_date: "",
            Env_product: "",
            Env_weight: undefined,
            Env_amount: undefined,
            Env_destination: "",
            Env_address: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        addShipping(data as IShipping, onPostAction())
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="Env_clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del cliente</FormLabel>
                            <FormControl>
                                <Input placeholder="Pepe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono del destinatario</FormLabel>
                            <FormControl>
                                <Input placeholder="111111111" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_receiver"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del receptor</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha de envío</FormLabel>
                            <FormControl>
                                <Input placeholder="01/01/2024" {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_product"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Nombre del producto</FormLabel>
                            <FormControl>
                                <Input placeholder="Caja misteriosa" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peso del producto (kg)</FormLabel>
                            <FormControl>
                                <Input placeholder="10" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Importe (€)</FormLabel>
                            <FormControl>
                                <Input placeholder="10" {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_destination"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Destino</FormLabel>
                            <FormControl>
                                <Input placeholder="Palma de Mallorca" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Env_address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Calle del Testeo, 4" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='col-span-2 gap-2'>
                    <PlusCircle />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Crear
                    </span>
                </Button>
            </form>
        </Form>
    )
}
