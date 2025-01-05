import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { CardHistoric } from '@/components/groups/transactions/CardHistoric';

import { getUserLocalStorage } from "@/context/AuthProvider/util"
import { ListDetailTransactions } from "@/components/groups/transactions/ListDetailTransactions"
import { IDebt } from "@/interfaces/IDebt"
import { useDebtDataGroupTransaction } from "@/hooks/debt/debtHook";

export function TabHistoric({ id, idUser }: { id: number, idUser: number}) {
    const { data: debts } = useDebtDataGroupTransaction(id);
    

    return (
        <Tabs defaultValue="expenses">
            <TabsList
                className="grid w-full sm:w-[400px] md:w-[550px] lg:w-[600px] grid-cols-2 h-[40px] bg-divide text-secondary-foreground border-border"
            >
                <TabsTrigger
                    value="expenses"
                    className="h-full text-divide-dark bg-divide hover:bg-divide/90 transition-colors"
                >
                    Despesas
                </TabsTrigger>
                <TabsTrigger
                    value="members"
                    className="h-full text-divide-dark bg-divide hover:bg-divide/90 transition-colors"
                >
                    Histórico
                </TabsTrigger>
            </TabsList>

            <TabsContent value="expenses" className="w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Débitos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {Array.isArray(debts) && debts.map((debt: IDebt) => (
                            <ListDetailTransactions debt={debt} idUser={idUser} />
                        ))}
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="members">
                <Card>
                    <CardHeader>
                        <CardTitle>Histórico</CardTitle>
                        <CardDescription>
                            Confira o histórico das depesas aqui!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Array.isArray(debts) &&
                            debts
                                .slice() 
                                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) 
                                .filter((debt: IDebt) => debt.paidAt != null) 
                                .map((debt: IDebt) => (
                                    <CardHistoric key={debt.id} debt={debt} condition={"paid"} />
                                ))
                        }

                        {Array.isArray(debts) &&
                            debts
                                .slice()
                                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) 
                                .filter((debt: IDebt) => debt.createdAt)
                                .map((debt: IDebt) => (
                                    <CardHistoric key={debt.id} debt={debt} condition={"created"} />
                                ))
                        }
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}


