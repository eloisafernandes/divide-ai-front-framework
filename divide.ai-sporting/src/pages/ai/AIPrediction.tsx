import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Alert, message } from "antd";
import { useEffect, useState } from "react";
import { Piechart } from "@/components/ai/PieChartAI";
import { LoadingOutlined } from "@ant-design/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useAIPredictionData, useAIPredictionMutate } from "@/hooks/ai/aiPredictionHook";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { useGroupDataByUser } from "@/hooks/group/groupHook";
import { IAIPredictionRequest } from "@/interfaces/IAIPrediction";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDateTime } from "@/utils/Formatter";

export function AIPrediction() {
  const auth = useAuth();
  const { mutate } = useAIPredictionMutate();
  const { data: ListEvents, isPending } = useGroupDataByUser();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const { data } = useAIPredictionData(selectedEvent ?? 0);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const userId = auth?.id;

  const fetchPrediction = async () => {
    if (selectedEvent !== null) {
      const request: IAIPredictionRequest = {
        userId: userId!,
        groupId: selectedEvent,
      };

      setLoading(true);
      mutate(request, {
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      });
    } else {
      message.error("Por favor, selecione um evento.");
    }
  };

  useEffect(() => {
    try {
      const cleanedData = data?.response
        ?.replace(/```json/g, "")
        ?.replace(/```/g, "")
        ?.replace(/\\r\\n/g, "")
        ?.replace(/\\n/g, "")
        ?.replace(/\\r/g, "")
        ?.trim();

      if (cleanedData) {
        const parsedResponse = JSON.parse(cleanedData);
        setResponse(parsedResponse);
      } else {
        setResponse(null);
      }
    } catch (error) {
      setResponse(null);
      message.error("Erro ao analisar o JSON: " + error);
    }
  }, [data]);

  const handleEventChange = (value: string) => {
    setSelectedEvent(parseInt(value));
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />

      <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Previsão de Eventos Esportivos</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            {/* Select */}
            <Select onValueChange={handleEventChange}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Selecionar evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Eventos</SelectLabel>
                  {ListEvents?.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
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

      {selectedEvent !== null ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Details */}
            {isPending || loading ? (
              <Skeleton className="h-48 w-full" />
            ) : response?.sportDetails ? (
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Detalhes do Evento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Local:</strong> {response.sportDetails.local}</p>
                  <p><strong>Esporte:</strong> {response.sportDetails.sport}</p>
                  <p><strong>Data e Horário:</strong> {formatDateTime(response.sportDetails.dateTime)}</p>
                  <p><strong>Participantes:</strong> {response.sportDetails.participants}</p>
                </CardContent>
              </Card>
            ) : (
              <span>Sem detalhes do evento disponíveis.</span>
            )}

            {/* Cost Distribution */}
            {isPending || loading ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Distribuição de Custos</CardTitle>
                </CardHeader>
                <CardContent>
                  {response?.costEstimate ? (
                    <Piechart
                      data={[
                        { categoryName: "Materiais", amount: response.costEstimate.materials, categoryColor: "#36A2EB" },
                        { categoryName: "Extras", amount: response.costEstimate.extras, categoryColor: "#FFCE56" },
                      ]}
                    />
                  ) : (
                    <span>Sem dados de custos disponíveis.</span>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Suggestions */}
          {isPending || loading ? (
            <Skeleton className="h-48 w-full" />
          ) : response?.suggestions ? (
            <Card>
              <CardHeader>
                <CardTitle>Sugestões</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {response.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <span>Sem sugestões disponíveis.</span>
          )}

          {/* Tips */}
          {isPending || loading ? (
            <Skeleton className="h-48 w-full" />
          ) : response?.tips ? (
            <Alert
              message="Dicas para o Evento"
              description={<ul className="list-disc pl-5">{response.tips.map((tip: string, index: number) => <li key={index}>{tip}</li>)}</ul>}
              type="success"
              showIcon
            />
          ) : (
            <span>Sem dicas disponíveis.</span>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <span>Selecione um evento para gerar a previsão</span>
        </div>
      )}
    </div>
  );
}
