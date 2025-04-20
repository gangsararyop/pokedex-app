"use client";

import { FC, PropsWithChildren, useMemo, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Pokemon } from "@/features/pokemon/types";
import useTypeColors from "@/hooks/useTypeColors";
import AboutContent from "./contents/AboutContent";
import BaseStatsContent from "./contents/BaseStatsContent";
import OnProgressContent from "./contents/OnProgressContent";
import PokemonDetailTabs from "./components/PokemonDetailTabs";
import PokemonDetailImage from "./components/PokemonDetailImage";
import PokemonDetailHeader from "./components/PokemonDetailHeader";

interface PokemonDetailProps extends PropsWithChildren {
  number: string;
  pokemon: Pokemon;
}

const defaultTab = "About";

const PokemonDetail: FC<PokemonDetailProps> = ({
  children,
  number,
  pokemon,
}) => {
  const { name, image, stats, types } = pokemon;

  const typeColor = useTypeColors(types[0]);

  const ref = useRef<Record<string, HTMLButtonElement>>({});

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const refCurrent = useMemo(
    () => ref.current[selectedTab || "About"],
    [selectedTab]
  );

  return (
    <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <>{children}</>
      </DrawerTrigger>

      <DrawerOverlay className={`${typeColor} w-full max-w-[480px] mx-auto`}>
        <PokemonDetailHeader
          name={name}
          types={types}
          number={number}
          setOpen={setOpen}
        />
      </DrawerOverlay>

      <DrawerContent className="w-full h-auto max-w-[480px] mx-auto bg-white top-[250px] rounded-t-4xl">
        <div className="w-full h-full">
          <div className="w-full h-full overflow-hidden relative z-10">
            <Tabs
              className="w-full h-full"
              defaultValue={defaultTab}
              onValueChange={(value) => setSelectedTab(value)}
            >
              <PokemonDetailTabs
                ref={ref}
                refCurrent={refCurrent}
                selectedTab={selectedTab}
              />

              <div className="mt-6 px-6 h-full pb-6 overflow-y-auto">
                {/* About Content */}
                <AboutContent pokemon={pokemon} />

                {/* Base Stats Content */}
                <BaseStatsContent stats={stats} />

                {/* Evolution Content (On progress) */}
                <TabsContent value="Evolution" className="w-full h-full">
                  <OnProgressContent />
                </TabsContent>

                {/* Evolution Content (On progress) */}
                <TabsContent value="Moves" className="w-full h-full">
                  <OnProgressContent />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Pokemon Image */}
          <PokemonDetailImage open={open} name={name} image={image} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PokemonDetail;
