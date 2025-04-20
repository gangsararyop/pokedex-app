"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Pokemon } from "@/features/pokemon/types";
import getPokemons from "@/features/pokemon/getPokemons";
import Pokeball from "./assets/Pokeball";
import BackArrow from "./assets/BackArrow";
import Hamburger from "./assets/Hamburger";
import PokemonList from "./components/PokemonList";

const Homepage = () => {
  const [page, setPage] = useState<number>(0);
  const [pokemons, setPokemons] = useState<{
    data: Pokemon[];
    initLoading: boolean;
    scrollLoading: boolean;
  }>({
    data: [],
    initLoading: false,
    scrollLoading: false,
  });

  const fetchPokemons = useCallback(
    async ({ limit, newPage }: { limit: number; newPage: number }) => {
      try {
        setPokemons((prev) => ({
          ...prev,
          ...(newPage > 0 ? { scrollLoading: true } : { initLoading: true }),
        }));

        const offset = newPage * limit;

        const resPokemons = await getPokemons({ limit, offset });

        setPokemons((prev) => ({
          ...prev,
          data: [...prev.data, ...resPokemons],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setPokemons((prev) => ({
          ...prev,
          initLoading: false,
          scrollLoading: false,
        }));
      }
    },
    []
  );

  useEffect(() => {
    if (!pokemons.data.length) fetchPokemons({ limit: 10, newPage: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPokemons]);

  const { ref, inView } = useInView({
    threshold: 1,
    async onChange(inView) {
      if (inView && pokemons.data.length) {
        const newPage = page + 1;

        await fetchPokemons({ limit: 10, newPage });

        setPage(newPage);
      }
    },
  });

  return (
    <div className="relative w-full h-screen max-w-[480px] mx-auto bg-white px-6">
      <div className="relative z-10 pt-10 pb-4">
        <div className="flex row items-center justify-between mb-8">
          <BackArrow />
          <Hamburger />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Pokedex</h1>
        </div>

        <PokemonList pokemons={pokemons.data} />

        {Boolean(pokemons.data.length) && <div ref={ref} />}

        {/* Component for initial loading */}
        {pokemons.initLoading && (
          <div className="animate-spin animate-infinite w-full h-[70vh] flex items-center justify-center">
            <Pokeball width="50px" height="50px" />
          </div>
        )}

        {/* Component for scroll loading */}
        {inView && pokemons.scrollLoading && (
          <div className="flex items-center justify-center animate-fade">
            <div className="animate-spin animate-infinite">
              <Pokeball width="30px" height="30px" />
            </div>
          </div>
        )}

        {/* Component for gradient bottom */}
        <div className="fixed left-0 bottom-0 w-full h-[75px] bg-white/10 backdrop-blur-xs mask-fade" />
      </div>

      {/* Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <div className="absolute -top-16 -right-24 w-64 h-w-64 animate-custom-spin">
          <Pokeball />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
