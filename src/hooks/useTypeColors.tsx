import { useMemo } from "react";

const useTypeColors = (type: string) => {
  const selectedColor = useMemo(() => {
    const typeColors: Record<string, string> = {
      normal: "bg-[#bdbdbd]",
      fire: "bg-[#fb6d6b]",
      water: "bg-[#76bdfd]",
      electric: "bg-[#ffd86f]",
      grass: "bg-[#49d0b2]",
      ice: "bg-[#9de7f7]",
      fighting: "bg-[#d67873]",
      poison: "bg-[#b97fc9]",
      ground: "bg-[#f7c58c]",
      flying: "bg-[#a1c1f5]",
      psychic: "bg-[#f98ab3]",
      bug: "bg-[#a8d946]",
      rock: "bg-[#d5c798]",
      ghost: "bg-[#b69dd0]",
      dragon: "bg-[#9e99f8]",
      dark: "bg-[#a29288]",
      steel: "bg-[#c3cbdc]",
      fairy: "bg-[#f9aec7]",
    };

    return typeColors[type];
  }, [type]);

  return selectedColor;
};

export default useTypeColors;
