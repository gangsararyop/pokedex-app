import { FC, useMemo } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { PokemonStat } from "@/features/pokemon/types";

interface BaseStatsProps {
  stats: PokemonStat[];
}

// Determines the bar color based on individual stat value
const getStatColor = (value: number): string => {
  if (value >= 110) return "#16A34A";
  if (value >= 90) return "#22C55E";
  if (value >= 70) return "#84CC16";
  if (value >= 50) return "#F97316";
  return "#EF4444";
};

// Determines the bar color for total stats
const getStatTotalColor = (total: number): string => {
  if (total >= 720) return "#FACC15"; // Overpowered (Gold)
  if (total >= 650) return "#8B5CF6"; // Extremely Strong (Purple)
  if (total >= 600) return "#16A34A"; // Very Strong (Dark Green)
  if (total >= 500) return "#22C55E"; // Strong (Green)
  if (total >= 400) return "#84CC16"; // Moderate (Light Green)
  if (total >= 300) return "#F97316"; // Low (Orange)
  return "#EF4444"; // Very Low (Red)
};

// Calculates the percentage value of a stat based on its max possible value
function getStatPercentage(statName: string, value: number): number {
  const maxStats: Record<string, number> = {
    HP: 255,
    Attack: 190,
    Defense: 250,
    "Sp. Attack": 194,
    "Sp. Defense": 250,
    Speed: 200,
    Total: 780,
  };

  const max = maxStats[statName];

  return Math.round((value / max) * 100);
}

const BaseStatsContent: FC<BaseStatsProps> = ({ stats }) => {
  const formattedStats = useMemo(() => {
    let totalStat = 0;

    const newStats = stats.map(({ baseStat, stat }) => {
      const statName = stat.names.find((name) => name.language.name === "en");

      totalStat += baseStat;

      const formattedName = statName?.name?.replace("Special", "Sp.") || "";

      return {
        name: formattedName || "",
        color: getStatColor(baseStat),
        baseStat,
        percentage: getStatPercentage(formattedName, baseStat),
      };
    });

    newStats.push({
      name: "Total",
      color: getStatTotalColor(totalStat),
      baseStat: totalStat,
      percentage: getStatPercentage("Total", totalStat),
    });

    return newStats;
  }, [stats]);

  return (
    <TabsContent value="Base Stats">
      <div className="flex flex-row items-center gap-7 mb-6 animate-fade-up">
        <div className="flex flex-col gap-4 shrink-0">
          {formattedStats.map((stat) => (
            <p
              key={stat.name}
              className="text-sm font-semibold text-gray-400 shrink-0"
            >
              {stat.name}
            </p>
          ))}
        </div>

        <div className="flex flex-row items-center gap-4 w-full">
          <div className="flex flex-col gap-4">
            {formattedStats.map((stat) => (
              <p key={stat.name} className="text-sm shrink-0">
                {stat.baseStat}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-full h-full">
            {formattedStats.map((stat) => (
              <div key={stat.name} className="flex items-center h-[20px]">
                <div className="relative w-full h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <div
                    style={
                      {
                        "--stat-color": stat.color,
                        "--stat-percentage": `${stat.percentage}%`,
                      } as React.CSSProperties
                    }
                    className="absolute [width:var(--stat-percentage)] h-full [background-color:var(--stat-color)] left-0 top-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default BaseStatsContent;
