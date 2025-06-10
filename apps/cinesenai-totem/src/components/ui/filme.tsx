import { motion } from "framer-motion";
import { Card, CardContent } from "./card";

export const Filme = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="overflow-hidden rounded-lg p-0 mb-1">
        <div className="h-[320px] w-full relative">
          <img
            src="https://www.cinemark.com.br/_next/image?url=https%3A%2F%2Fcdnim.prd.cineticket.com.br%2Fimages%2Fcms%2FmoviePoster%2FMoviePoster-ca6d7d43-4e0e-4f63-989b-ab84a4b1507e.png&w=1920&q=100"
            alt="Como Treinar o seu Dragão"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Card>
      <Card className="rounded-lg">
        <CardContent className="px-4">
          <h2 className="text-lg font-bold leading-tight uppercase">
            Como treinar o seu dragão
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Aventura</span>
              <span className="text-xs">•</span>
              <span>125m</span>
            </div>

            <div className="bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium">
              10
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
