import { TableTransacion } from "@/components/transaction/TableTransacion"
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerNewTransaction } from "@/components/transaction/DrawerNewTransaction";


export function TransacionPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      <SheetMenu />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transações</h2>
        <div className="flex items-center space-x-2">
          <DrawerNewTransaction />
        </div>
      </div>

      <div className="p-4 flex justify-center rounded-xl border bg-card text-card-foreground shadow" >
        <TableTransacion />
      </div>
    </div>
  );
}