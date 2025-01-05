
import { ListCardsAI } from "@/components/ai/ListCardsAI";
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Alert, message } from "antd";
import { useState } from "react";
import { Piechart } from "@/components/ai/PieChartAI";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton } from "@/components/ui/skeleton";
import { useAIPredictionData, useAIPredictionMutate } from "@/hooks/ai/aiPredictionHook";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { useTransactionDataByUser } from "@/hooks/transacion/transacionHook";

export function AIPrediction() {
  const { data } = useAIPredictionData();

  const mutation = useAIPredictionMutate();
  const isPending = mutation.isPending;

  const [inputValue, setInputValue] = useState<string>("");
  const { data: transactionsDataByUser } = useTransactionDataByUser();

  const fetchPrediction = async () => {

    const id = getUserLocalStorage()?.id;
    if(!id) return;

    if (!transactionsDataByUser || transactionsDataByUser.length === 0) {
      message.error("Nenhuma Transação cadastrada! Não é possível gerar previsão.");
      return;
    }

    mutation.mutate({ 
      userId: id,
      prompt: inputValue 
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />

      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Previsão Financeira</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              size={28}
              placeholder="Objetivo para o próximo mês"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="divideDark"
              type="button"
              onClick={fetchPrediction}
              disabled={isPending}
            >
              {isPending ? <LoadingOutlined spin /> : 
                          <div className="flex items-center">
                            <span className="mr-2">Gerar</span>
                            <Sparkles size={20} />
                          </div>
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Infos Card */}
      <ListCardsAI
        nextIncome={data?.nextIncome || null}
        nextExpenses={data?.nextExpenses || null}
        isPending={isPending}
      />

      <Card className="col-span-4 md:col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Despesas por categoria no próximo mês</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center items-center pt-10">
          {isPending ? (
                <div className="relative w-48 h-48">
                  <Skeleton className="absolute inset-0 rounded-full" />
                  <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] rounded-full bg-white"></div>
                </div>
          ) : data?.nextExpensesByCategory && data.nextExpensesByCategory.length > 0 ? (
            <Piechart
              data={data.nextExpensesByCategory}
            />
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <span>Sem dados disponíveis</span>
            </div>
          )}
        </CardContent>
      </Card>

      {(data || isPending) && (
        <>
          {isPending ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : (
            <>
              {data?.hasAnalysis && 
                <Alert
                  message="Recomendação"
                  description={data?.recomendation}
                  type="warning"
                  showIcon
                />
              }
              <Alert
                message="Resumo"
                description={data?.response}
                type="info"
                showIcon
              />
            </>
          )}
        </>
      )}
    </div>
  );
}