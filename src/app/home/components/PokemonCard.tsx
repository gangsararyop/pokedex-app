import { CSSProperties, FC, useMemo } from "react";
import Image from "next/image";
import { Pokemon } from "@/features/pokemon/types";
import useTypeColors from "@/hooks/useTypeColors";
import Pokeball from "../assets/Pokeball";
import PokemonDetail from "./PokemonDetail";

interface PokemonCardProps {
  index: number;
  pokemon: Pokemon;
}

const PokemonCard: FC<PokemonCardProps> = ({ index, pokemon }) => {
  const { name, types, image } = pokemon || {};

  const typeColor = useTypeColors(types[0]);

  const pokemonNumber = useMemo(
    () => String(index + 1).padStart(4, "0"),
    [index]
  );

  return (
    <PokemonDetail number={pokemonNumber} pokemon={pokemon}>
      <div
        style={
          {
            "--card-anime-delay": `${Math.floor((index % 10) / 2) * 300}ms`,
          } as CSSProperties
        }
        className={`relative overflow-hidden w-full h-full max-w-[156px] rounded-xl ${typeColor} shadow-md animate-fade-up [animation-delay:var(--card-anime-delay)] mx-auto`}
      >
        <div className="px-3 py-2 relative z-10">
          {/* ----- Number ----- */}
          <div className="ml-auto w-fit mb-1">
            <p className="text-xs font-bold text-gray-600 opacity-20">
              #{pokemonNumber}
            </p>
          </div>

          {/* ----- Name ----- */}
          <div className="absolute z-20 left-3 top-5">
            <p className="text-sm font-bold text-white capitalize mb-1">
              {name}
            </p>

            {/* ----- Types ----- */}
            <div className="flex flex-col space-y-1">
              {types.map((type) => (
                <div
                  key={type}
                  className={`px-2 py-0.5 w-fit rounded-3xl bg-[#ffffff59]`}
                >
                  <p className="text-[8px] text-white capitalize">{type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ----- Image ----- */}
          {image && (
            <div className="relative w-[72px] h-[72px] ml-auto">
              <Image alt={name} src={image} fill />
            </div>
          )}
        </div>

        <div className="absolute -bottom-5 -right-5 w-24 h-w-24">
          <Pokeball />
        </div>
      </div>
    </PokemonDetail>
  );
};

export default PokemonCard;
