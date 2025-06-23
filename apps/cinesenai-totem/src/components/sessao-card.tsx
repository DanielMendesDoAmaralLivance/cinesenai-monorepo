import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const SessaoCard = () => {
  return (
    <Link>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card className="rounded-lg min-h-[125px] w-[190px] col-span-1">
          <CardContent className="px-4 flex flex-col justify-between">
            <div className="min-h-[35px] text-sm font-medium">
              <h1>Ter, 08 Jul, 20h00</h1>
            </div>

            <div className="flex items-center flex-wrap">
              <Badge className="mr-1 mb-1">Sala 1 (VIP)</Badge>
              <Badge className="mr-1 mb-1">LEG</Badge>
              <Badge className="mr-1 mb-1">Autismo</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
