
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { Dashboard } from "@/components/home/Dashboard";
import { ListCards } from "@/components/home/ListCards";
import { Piechart } from "@/components/home/Piechart";
import { DrawerTransition } from "@/components/newTransition/DrawerTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionByMonth } from "@/hooks/transacion/transacionHook";
import { VWTransaction } from "@/types/VWTransaction";
import { useNavigate } from "react-router-dom";

export function HomePage() {
	const navigate = useNavigate();
	const { data } = useTransactionByMonth();

	return (
		<div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
			{/* Sidebar mobile */}
			<SheetMenu />
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div className="flex items-center space-x-2">
					<DrawerTransition />
				</div>
			</div>

			{/* Infos Card */}
			<ListCards data={data ?? undefined} />

			{/* Dashboard & Expenses */}
			<div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
				<Card className="col-span-4 md:col-span-4 lg:col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="flex justify-center items-center p-0">
						<Dashboard data={data ?? undefined} />
					</CardContent>
				</Card>

				<Card className="col-span-4 md:col-span-4 lg:col-span-3">
					<CardHeader>
						<CardTitle>Despesas por categoria</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-1 justify-center items-center pt-10">
						<Piechart />
					</CardContent>
					<CardFooter className="flex items-center justify-center">
						<Button variant="link" onClick={() => navigate('/')}>Ver todas</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}