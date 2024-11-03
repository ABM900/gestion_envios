'use client';

import {
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Table
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Shipping } from './shipping';
import { IShipping } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductsTable({
    shippings,
    offset,
    totalProducts
}: {
    shippings: IShipping[];
    offset: number;
    totalProducts: number;
}) {
    let router = useRouter();
    let productsPerPage = 20;

    function prevPage() {
        router.back();
    }

    function nextPage() {
        router.push(`/?offset=${offset}`, { scroll: false });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Envíos</CardTitle>
                <CardDescription>
                    Controla los envíos realizados
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre de cliente</TableHead>
                            <TableHead>Peso del envío</TableHead>
                            <TableHead>Fecha del envío</TableHead>
                            <TableHead>Producto enviado</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead>Destino del envío</TableHead>
                            <TableHead>Receptor del envío</TableHead>
                            <TableHead>Teléfono del destinatario</TableHead>
                            <TableHead>Dirección del envío</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shippings.map((shipping) => {
                            return (<Shipping key={shipping.Id_Env} shipping={shipping} />)
                        })}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <form className="flex items-center w-full justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing{' '}
                        <strong>
                            {Math.min(offset, totalProducts)}-{offset}
                        </strong>{' '}
                        of <strong>{totalProducts}</strong> products
                    </div>
                    <div className="flex">
                        <Button
                            formAction={prevPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset === productsPerPage}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Prev
                        </Button>
                        <Button
                            formAction={nextPage}
                            variant="ghost"
                            size="sm"
                            type="submit"
                            disabled={offset >= totalProducts}
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    );
}
