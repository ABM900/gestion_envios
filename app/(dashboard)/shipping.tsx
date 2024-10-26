import { TableCell, TableRow } from '@/components/ui/table';
import { IShipping } from '@/lib/db';

export function Shipping({ shipping }: { shipping: IShipping }) {
	return (
		<TableRow>
			<TableCell className="font-medium">{shipping.Env_clientName}</TableCell>
			<TableCell>{shipping.Env_weight}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_date}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_product}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_amount} €</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_destination}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_receiver}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_phone}</TableCell>
			<TableCell className="hidden md:table-cell">{shipping.Env_address}</TableCell>
		</TableRow>
	);
}
