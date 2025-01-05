import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ICardDataProps {
  title: string;
  value: string;
  icon?: JSX.Element;
  text?: string;
  route?: string;
  style?: React.CSSProperties;
}

export function CardData({ title, value, icon, text, route, style }: ICardDataProps) {
  const navigate = useNavigate();

  return (
    <Card style={style} onClick={route ? () => navigate(route) : undefined} className={route ? "cursor-pointer" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-lg font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
