import Image from "next/image";
import { FC } from "react";

interface PokemonDetailImageProps {
  open: boolean;
  name: string;
  image: string | null | undefined;
}

const PokemonDetailImage: FC<PokemonDetailImageProps> = ({
  open,
  name,
  image,
}) => {
  return (
    <div
      className={`absolute z-10 -top-[180px] left-1/2 -translate-x-1/2 ${
        open ? "animate-fade-up" : "animate-fade-up animate-reverse"
      }`}
    >
      {image && (
        <div className="relative w-[220px] h-[220px] ml-auto">
          <Image alt={name} src={image} fill />
        </div>
      )}
    </div>
  );
};

export default PokemonDetailImage;
