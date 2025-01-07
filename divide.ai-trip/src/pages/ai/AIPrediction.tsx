import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Alert, message } from "antd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useAIPredictionData, useAIPredictionMutate } from "@/hooks/ai/aiPredictionHook";
import { useTripDataByUser } from "@/hooks/trip/tripHook";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { IAIPredictionRequest } from "@/interfaces/IAIPrediction";

import { Skeleton } from "@/components/ui/skeleton";

export function AIPrediction() {
  const auth = useAuth();
  const { mutate } = useAIPredictionMutate();

  const { data: ListTrips, isPending } = useTripDataByUser();
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);

  const { data } = useAIPredictionData(selectedTrip ?? 0);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Controle do Skeleton

  const userId = auth?.id;

  const fetchPrediction = async () => {
    if (selectedTrip !== null) {
      const request: IAIPredictionRequest = {
        userId: userId!,
        groupId: selectedTrip,
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

  const handleTripChange = (value: string) => {
    setSelectedTrip(parseInt(value));
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
            <Select onValueChange={handleTripChange}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Selecionar viagem" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Viagens</SelectLabel>
                  {ListTrips?.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id.toString()}>
                      {trip.name}
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
              {isPending ? (
                <LoadingOutlined spin />
              ) : (
                <div className="flex items-center">
                  <span className="mr-2">Gerar</span>
                  <Sparkles size={20} />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Skeleton or Response */}
      {loading && data !== null ? (
        <div className="space-y-4">
          {/* Skeleton for Title */}
          <Skeleton className="h-6 w-1/2" />

          {/* Skeleton for Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
          </div>

          {/* Skeleton for Accordion */}
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : data === null ? (
        <Alert message="Nenhuma previsão disponível, selecine alguma ou outra viagem." type="info" showIcon />
      ) : (
        response && (
          <div className="space-y-4">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {response.title}
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Card: Despesas Diárias Estimadas */}
              <Card className="bg-white shadow-lg border rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Despesas Diárias Estimadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    Hospedagem:{" "}
                    <span className="font-semibold">
                      {response.dailyExpenseEstimate.accommodation}
                    </span>
                  </p>
                  <p>
                    Refeições:{" "}
                    <span className="font-semibold">
                      {response.dailyExpenseEstimate.meals}
                    </span>
                  </p>
                  <p>
                    Transporte:{" "}
                    <span className="font-semibold">
                      {response.dailyExpenseEstimate.transportation}
                    </span>
                  </p>
                  <p>
                    Atividades:{" "}
                    <span className="font-semibold">
                      {response.dailyExpenseEstimate.activities}
                    </span>
                  </p>
                </CardContent>
              </Card>

              {/* Card: Gasto Total Estimado */}
              <Card className="bg-white shadow-lg border rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Gasto Total Estimado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    Hospedagem:{" "}
                    <span className="font-semibold">
                      {response.totalExpenseEstimate.totalDays.accommodation}
                    </span>
                  </p>
                  <p>
                    Refeições:{" "}
                    <span className="font-semibold">
                      {response.totalExpenseEstimate.totalDays.meals}
                    </span>
                  </p>
                  <p>
                    Transporte:{" "}
                    <span className="font-semibold">
                      {response.totalExpenseEstimate.totalDays.transportation}
                    </span>
                  </p>
                  <p>
                    Atividades:{" "}
                    <span className="font-semibold">
                      {response.totalExpenseEstimate.totalDays.activities}
                    </span>
                  </p>
                  <p>
                    Total por pessoa:{" "}
                    <span className="font-bold text-blue-600">
                      {response.totalExpenseEstimate.totalPerPerson}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="2">
                <AccordionTrigger className="text-xl font-semibold">
                  💡 Recomendações
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-6 list-disc [&>li]:mt-2 text-base">
                    {response.recomendations.map((rec: string, index: number) => (
                      <li key={`recomendation-${index}`}>{rec}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="3">
                <AccordionTrigger className="text-xl font-semibold">
                  🏨 Hospedagem
                </AccordionTrigger>
                <AccordionContent>
                  {response.hosting.map((item: any, index: number) => (
                    <ul
                      key={`hosting-${index}`}
                      className="ml-6 list-disc [&>li]:mt-2 text-base"
                    >
                      <li>
                        <strong>Hotel:</strong> {item.hotel}
                      </li>
                      <li>
                        <strong>Preço por noite:</strong> {item.pricePerNight}
                      </li>
                      <li>
                        <strong>Número de participantes:</strong>{" "}
                        {item.numberOfParticipants}
                      </li>
                    </ul>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="4">
                <AccordionTrigger className="text-xl font-semibold">
                  🍽️ Restaurantes
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-6 list-disc [&>li]:mt-2 text-base">
                    {response.restaurants.map(
                      (restaurant: string, index: number) => (
                        <li key={`restaurant-${index}`}>{restaurant}</li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )
      )}
    </div>
  );
}

