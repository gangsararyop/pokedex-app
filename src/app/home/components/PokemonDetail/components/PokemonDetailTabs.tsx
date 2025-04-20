import { FC, RefObject } from "react";
import { tabs } from "@/app/home/static";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface PokemonDetailTabsProps {
  ref: RefObject<Record<string, HTMLButtonElement>>;
  refCurrent: HTMLButtonElement;
  selectedTab: string;
}

const PokemonDetailTabs: FC<PokemonDetailTabsProps> = ({
  ref,
  selectedTab,
  refCurrent,
}) => {
  return (
    <DrawerHeader className="mt-14 py-0 px-6">
      <DrawerTitle>
        <TabsList className="relative flex flex-row items-center justify-between">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              ref={(el) => {
                if (el) ref.current[tab.value] = el;
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}

          <div
            data-tab={selectedTab}
            data-selected={selectedTab}
            style={
              {
                "--tab-left": `${refCurrent?.offsetLeft || 0}px`,
                "--tab-width": `${refCurrent?.offsetWidth || 40}px`,
              } as React.CSSProperties
            }
            className="absolute w-full h-0.5 left-0 bottom-0 after:absolute after:[width:var(--tab-width)] after:h-full after:bg-[#b5b7da] after:text-sm after:transition-all after:duration-500 after:[left:var(--tab-left)] after:top-0"
          ></div>
        </TabsList>
      </DrawerTitle>
    </DrawerHeader>
  );
};

export default PokemonDetailTabs;
