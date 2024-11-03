import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IShipping, getShippingFromClient } from '@/lib/db';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from 'react';

export function Shipping({ shipping }: { shipping: IShipping }) {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [clientData, setClientData] = useState<IShipping | undefined>();

	useEffect(() => {
		if (isOpen) {
			setLoading(true);
			getShippingFromClient(shipping.Env_clientName)
				.then(result => {
					setClientData(result.shipping);
					setLoading(false);
				});
		}
	}, [isOpen]);

	return (
		<TableRow>
			<TableCell className="font-medium">
				<Popover open={isOpen} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Label>
							{shipping.Env_clientName}
						</Label>
					</PopoverTrigger>
					<PopoverContent className="w-80 ml-3">
						{isLoading ?
							(<p>Cargando...</p>)
							:
							(
								<div className="grid gap-4">
									<div className="space-y-2">
										<h4 className="font-medium leading-none">Datos del cliente</h4>
									</div>
									<div className="grid gap-2">
										<div className="grid grid-cols-3 items-center gap-4">
											<Label htmlFor="width">Nombre</Label>
											<Input
												id="width"
												defaultValue="100%"
												className="col-span-2 h-8"
												value={clientData?.Env_clientName}
												disabled={true}
											/>
										</div>
										<div className="grid grid-cols-3 items-center gap-4">
											<Label htmlFor="maxWidth">Total peso</Label>
											<Input
												id="maxWidth"
												defaultValue="300px"
												className="col-span-2 h-8"
												value={`${clientData?.Env_weight} kg`}
												disabled={true}
											/>
										</div>
										<div className="grid grid-cols-3 items-center gap-4">
											<Label htmlFor="height">Importe total</Label>
											<Input
												id="height"
												defaultValue="25px"
												className="col-span-2 h-8"
												value={`${clientData?.Env_amount} €`}
												disabled={true}
											/>
										</div>
									</div>
								</div>
							)
						}
					</PopoverContent>
				</Popover>

			</TableCell>
			<TableCell>{shipping.Env_weight}</TableCell>
			<TableCell>{shipping.Env_date}</TableCell>
			<TableCell>{shipping.Env_product}</TableCell>
			<TableCell>{shipping.Env_amount} €</TableCell>
			<TableCell>{shipping.Env_destination}</TableCell>
			<TableCell>{shipping.Env_receiver}</TableCell>
			<TableCell>{shipping.Env_phone}</TableCell>
			<TableCell>{shipping.Env_address}</TableCell>
		</TableRow>
	);
}
