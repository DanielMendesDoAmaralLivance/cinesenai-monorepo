import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";

export const SessaoCard = () => {
  return (
    <Card className="rounded-lg min-h-[125px] w-[190px] col-span-1">
      <CardContent className="px-4 flex flex-col justify-between">
        <div className="min-h-[50px] text-sm font-medium">
          <h1>Ter, 08 Jul, 20h00</h1>
        </div>

        <div className="flex items-center flex-wrap">
          <Badge className="mr-1">Sala 1</Badge>
          <Badge>Legendado</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
