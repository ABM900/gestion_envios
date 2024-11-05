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

export default function ShippingPage({
	searchParams
}: {
	searchParams: { q: string; offset: string };
}) {
	const { toast } = useToast();
	const [openModal, setModalOpen] = useState<boolean>(false);
	const search = searchParams.q ?? '';
	const offset = Number(searchParams.offset ?? "0");
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
		getShippings(search, offset).then(result => {
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
