import { Dispatch, FC, SetStateAction } from "react";
import Love from "@/app/home/assets/Love";
import Pokeball from "@/app/home/assets/Pokeball";
import BackArrow from "@/app/home/assets/BackArrow";

interface PokemonDetailHeaderProps {
  name: string;
  types: string[];
  number: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PokemonDetailHeader: FC<PokemonDetailHeaderProps> = ({
  name,
  types,
  number,
  setOpen,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="px-6 pt-10 absolute w-full h-full top-0 left-0">
        {/* ----- Back Button & Love Button ----- */}
        <div className="flex row items-center justify-between mb-8">
          <div onClick={() => setOpen(false)}>
            <BackArrow color="#fff" />
          </div>

          <Love />
        </div>

        {/* ----- Header ----- */}
        <div className="flex flex-row justify-between items-center">
          {/* Name */}
          <div className="animate-fade-right animate-delay-100">
            <h1 className="text-3xl font-bold text-white capitalize mb-3">
              {name}
            </h1>

            {/* Types */}
            <div className="flex flex-row space-x-2">
              {types.map((type) => (
                <div
                  key={type}
                  className={`px-4 py-0.5 w-fit rounded-3xl bg-[#ffffff59]`}
                >
                  <p className="text-[10px] text-white capitalize">{type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Number */}
          <div className="animate-fade-left animate-delay-200">
            <p className="text-sm font-bold text-white">#{number}</p>
          </div>
        </div>
      </div>

      <div className="absolute top-[155px] -right-[45px] w-[230px] h-w-[230px] animate-custom-spin">
        <Pokeball />
      </div>

      <div className="absolute -z-10 top-[200px] left-[50px] w-20 h-12 bg-[radial-gradient(#ffffff33_18%,_transparent_35%)] bg-size-[16px_16px]" />

      <div className="absolute -z-10 -top-20 -left-24 w-48 h-48 bg-[#ffffff1A] rounded-4xl -rotate-12" />
    </div>
  );
};

export default PokemonDetailHeader;
