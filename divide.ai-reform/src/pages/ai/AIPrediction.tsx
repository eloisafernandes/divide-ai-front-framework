import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Alert, message } from "antd";
import { useEffect, useState } from "react";
import { Piechart } from "@/components/ai/PieChartAI";
import { LoadingOutlined } from '@ant-design/icons';
import { Skeleton } from "@/components/ui/skeleton";
import { useAIPredictionData, useAIPredictionMutate } from "@/hooks/ai/aiPredictionHook";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { useGroupDataByUser } from "@/hooks/group/groupHook";
import { IAIPredictionRequest } from "@/interfaces/IAIPrediction";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { formatMoney } from "@/utils/Formatter";

export function AIPrediction() {
  const auth = useAuth();

  const { mutate } = useAIPredictionMutate();

  const { data: ListReforms, isPending } = useGroupDataByUser();
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const { data } = useAIPredictionData(selectedGroup ?? 0);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Controle do Skeleton

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (data?.prompt) {
      setInputValue(data.prompt);
    }
  }, [data?.prompt]);

  const userId = auth?.id;

  const fetchPrediction = async () => {
    if (selectedGroup !== null) {
      const request: IAIPredictionRequest = {
        userId: userId!,
        groupId: selectedGroup,
        prompt: inputValue,
      };

      setLoading(true); // Ativa o Skeleton enquanto carrega
      mutate(request, {
        onSuccess: () => setLoading(false), // Desativa o Skeleton ao terminar
        onError: () => setLoading(false),
      });
    } else {
      message.error("Please select a trip.");
    }
  };

  const handleReformChange = (value: string) => {
    setSelectedGroup(parseInt(value));
  };

  useEffect(() => {
    try {
      const cleanedData = data?.response
        ?.replace(/```json/g, "") // Remove o início do bloco de código
        ?.replace(/```/g, "") // Remove o final do bloco de código
        ?.replace(/\\r\\n/g, "") // Remove as quebras de linha escapadas (\r\n)
        ?.replace(/\\n/g, "") // Remove as quebras de linha simples (\n)
        ?.replace(/\\r/g, "") // Remove os retornos de carro (\r)
        ?.trim(); // Remove espaços extras

      if (cleanedData) {
        const parsedResponse = JSON.parse(cleanedData); // Tenta fazer o parsing
        setResponse(parsedResponse); // Atualiza o estado com a resposta
      } else {
        setResponse(null);
      }
    } catch (error) {
      setResponse(null);
      message.error("Erro ao analisar o JSON: " + error);
    }
  }, [data]);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />

      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Previsão Financeira</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            {/* Select */}
            <Select onValueChange={handleReformChange}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Selecionar reforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Reformas</SelectLabel>
                  {ListReforms?.map((reform) => (
                    <SelectItem key={reform.id} value={reform.id.toString()}>
                      {reform.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="divideDark"
              type="button"
              onClick={fetchPrediction}
              disabled={isPending}
            >
              {isPending || loading ? <LoadingOutlined spin /> :
                <div className="flex items-center">
                  <span className="mr-2">Gerar</span>
                  <Sparkles size={20} />
                </div>
              }
            </Button>
          </div>
        </div>
      </div>

      {selectedGroup !== null ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-white h-full col-span-1"
              placeholder="Descreva como será a reforma (Opicional)"
            />

            {/* Pie Chart for Expenses */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Distribuição de Custos da Reforma</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 justify-center items-center pt-0">
                {isPending || loading ? (
                  <div className="relative w-48 h-48">
                    <Skeleton className="absolute inset-0 rounded-full" />
                    <div className="absolute top-[15%] left-[15%] w-[70%] h-[70%] rounded-full bg-white"></div>
                  </div>
                ) : response?.costEstimate ? (
                  <Piechart
                    data={[
                      { categoryName: "Materiais", amount: parseFloat(response.costEstimate.materials || "0"), categoryColor: "#36A2EB" },
                      { categoryName: "Mão de obra", amount: parseFloat(response.costEstimate.labor || "0"), categoryColor: "#FFCE56" },
                    ]}
                  />
                ) : (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span>Sem dados disponíveis</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )
        :
        <div className="flex justify-center items-center h-32">
          <span>Selecione uma reforma para gerar a previsão</span>
        </div>
      }

      {/* Accordion for Phases */}
      {response?.phases && response.phases.length > 0 && (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Fases da Reforma</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending || loading ? (
              <>
                <Skeleton className="h-8 w-full rounded-xl mb-2" />
                <Skeleton className="h-8 w-full rounded-xl mb-2" />
                <Skeleton className="h-8 w-full rounded-xl mb-2" />
              </>
            ) : (
              <Accordion type="single" collapsible>
                {response.phases.map((phase: any, index: number) => (
                  <AccordionItem key={index} value={`phase-${index}`}>
                    <AccordionTrigger>{phase.phase}</AccordionTrigger>
                    <AccordionContent>
                      <p><strong>Duração:</strong> {phase.duration}</p>
                      <p><strong>Custo:</strong> {formatMoney(phase.cost)}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      )}

      {(data || isPending || loading) && (
        <>
          {isPending || loading ? (
            <>
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </>
          ) : (
            <>
              {response?.suggestions &&
                <Alert
                  message="Sugestões"
                  description={response.suggestions.join("\n") || "Sem sugestões disponíveis"}
                  type="info"
                  showIcon
                />
              }
              <Alert
                message="Dicas"
                description={response?.tips || "Sem dicas disponíveis"}
                type="success"
                showIcon
              />
            </>
          )}
        </>
      )}
    </div>
  );
}