'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Calendar } from "@/components/ui/calendar";
import { Search } from 'lucide-react';
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

const FormSchema = z.object({
    client: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
})

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            client: undefined,
            from: undefined,
            to: undefined,
        },
    });

    function searchAction(data: z.infer<typeof FormSchema>) {
        console.log(data);
        let params = new URLSearchParams(searchParams);
        if (data.client !== undefined) {
            params.set('client', data.client);
        }
        if (data.from !== undefined) {
            params.set('from', format(data.from, 'yyyy-MM-dd'));
        }
        if (data.to !== undefined) {
            params.set('to', format(data.to, 'yyyy-MM-dd'))
        }
        startTransition(() => {
            router.replace(`/?${params.toString()}`);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(searchAction)} className="flex items-center gap-4 p-2">
                <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                        <FormItem className="relative flex items-center md:grow-0">
                            <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
                            <Input
                                {...field}
                                placeholder="Buscar cliente..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                            {isPending && <Spinner />}
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal rounded-lg",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "dd/MM/yyyy")
                                            ) : (
                                                <span>Fecha desde...</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date("1900-01-01")}
                                        initialFocus
                                        
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal rounded-lg",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "dd/MM/yyyy")
                                            ) : (
                                                <span>Fecha hasta...</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date("1900-01-01")}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )} />
                <Button size="sm" type="submit">Filtrar</Button>
            </form>
        </Form>
    );
}
