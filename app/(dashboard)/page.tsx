"use client";

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getShippings, IShipping } from '@/lib/db';
import { Modal } from '@/components/ui/modal';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { AddShippingForm } from './addShipping';
import { SearchInput } from './search';

export default function ShippingPage({
	searchParams
}: {
	searchParams: { client: string; offset: string, from: string, to: string };
}) {
	const { toast } = useToast();
	const [openModal, setModalOpen] = useState<boolean>(false);
	const search = searchParams.client ?? '';
	const offset = Number(searchParams.offset ?? "0");
	const from = searchParams.from ?? '';
	const to = searchParams.to ?? '';
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

	const loadData = () => {
		getShippings(search, offset, from, to).then(result => {
			setShippingData(result)
			setDataLoaded(true)
		});
	}

	useEffect(() => loadData(), [searchParams])

	const onAddShipping = () => {
		setModalOpen(false);
		toast({ title: "Registro creado!" });
		loadData();
	}

	const onDeleteShipping = () => {
		toast({ title: "Registro eliminado!" });
		loadData();
	}

	return (
		<div className='overflow-hidden'>
			<Tabs defaultValue="all">
				<div className="flex items-center justify-between">
					<SearchInput />
					<div className="ml-auto flex items-center">
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
						offset={offset}
						totalProducts={shippingData.totalProducts}
						onDeleteAction={onDeleteShipping}
					/>
				</TabsContent>
				<Modal
					isOpen={openModal}
					onClose={() => setModalOpen(false)}
				>
					<h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Añadir envío</h1>
					<AddShippingForm onPostAction={onAddShipping} />
				</Modal>
				<Toaster />
			</Tabs>
		</div>
	);
}
