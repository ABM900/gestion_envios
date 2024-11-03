"use client";

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { addShipping, getShippings, IShipping } from '@/lib/db';
import { Modal } from '@/components/ui/modal';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

export default function ShippingPage({
	searchParams
}: {
	searchParams: { q: string; offset: string };
}) {
	const { toast } = useToast();
	let router = useRouter();
	const [openModal, setModalOpen] = useState<boolean>(false);
	const [newShipping, setNewShipping] = useState<IShipping>({
		Id_Env: 0,
		Env_clientName: '',
		Env_date: '',
		Env_phone: '',
		Env_receiver: '',
		Env_product: '',
		Env_amount: 0,
		Env_weight: 0,
		Env_destination: '',
		Env_address: ''
	})
	const search = searchParams.q ?? '';
	const offset = searchParams.offset ?? 0;
	const [dataLoaded, setDataLoaded] = useState<boolean>(false);
	const [shippingData, setShippingData] = useState<{
		shippings: IShipping[];
		newOffset: number | null;
		totalProducts: number;
	}>({
		shippings: [],
		newOffset: null,
		totalProducts: 0
	});

	useEffect(() => {
		getShippings(search, Number(offset)).then(result => {
			setShippingData(result)
			setDataLoaded(true)
		});
	}, [offset])

	const onAddShipping = () => {
		setModalOpen(false);
		toast({ title: "Registro creado!" });
		router.push(`/?offset=0`, { scroll: false });
	}

	return (
		<div className='overflow-hidden'>
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<div className="ml-auto flex items-center gap-2">
						<Button size="sm" className="h-8 gap-1" type='button' onClick={() => setModalOpen(true)}>
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Añadir envío
							</span>
						</Button>
					</div>
				</div>
				<TabsContent value="all">
					<ProductsTable
						shippings={shippingData.shippings}
						offset={shippingData.newOffset ?? 0}
						totalProducts={shippingData.totalProducts}
					/>
				</TabsContent>
				<Modal
					isOpen={openModal}
					onClose={() => setModalOpen(false)}
				>
					<h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Añadir envío</h1>
					<div className="mt-3 grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="client_name">Nombre del cliente</label>
							<Input id="client_name" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_clientName']: text.target.value })} />
						</div>
						<div>
							<label htmlFor="client_phone">Teléfono del cliente</label>
							<Input type="number" id="client_phone" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_phone']: text.target.value })} />
						</div>
						<div>
							<label htmlFor="receiver_name">Nombre del receptor</label>
							<Input id="receriver_name" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_receiver']: text.target.value })} />
						</div>
						<div>
							<label htmlFor="shipping_date">Fecha de envío</label>
							<Input type="date" id="shipping_date" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_date']: text.target.value })} />
						</div>
						<div className='col-span-2'>
							<label htmlFor="product_name">Nombre del producto</label>
							<Input id="product_name" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_product']: text.target.value })} />
						</div>
						<div>
							<label htmlFor="product_weight">Peso del producto</label>
							<Input type="number" id="product_weight" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_weight']: Number(text.target.value) })} />
						</div>
						<div>
							<label htmlFor="product_amount">Importe</label>
							<Input type='number' id="product_amount" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_amount']: Number(text.target.value) })} />
						</div>
						<div>
							<label htmlFor="destination">Destino</label>
							<Input id="destination" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_destination']: text.target.value })} />
						</div>
						<div>
							<label htmlFor="address">Dirección</label>
							<Input id="address" className="mt-1" onChange={(text) => setNewShipping({ ...newShipping, ['Env_address']: text.target.value })} />
						</div>
						<Button type='submit' className='col-span-2 gap-2' onClick={() => addShipping(newShipping, onAddShipping())}>
							<PlusCircle />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Crear
							</span>
						</Button>
					</div>
				</Modal>
				<Toaster />
			</Tabs>
		</div>
	);
}
