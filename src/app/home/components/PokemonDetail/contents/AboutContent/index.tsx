import { FC, useMemo } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Pokemon } from "@/features/pokemon/types";
import Male from "@/app/home/assets/Male";
import Female from "@/app/home/assets/Female";

interface AboutContentProps {
  pokemon: Pokemon;
}

const AboutContent: FC<AboutContentProps> = ({ pokemon }) => {
  const {
    height,
    weight,
    species,
    abilities,
    eggGroups,
    genderRate,
    hatchCounter,
  } = pokemon;

  // Convert height from decimeters to feet-inches and centimeters
  const convertedHeight = useMemo(() => {
    // dm to feet-inches
    const dmToInches = height * 3.93701;
    const feet = Math.floor(dmToInches / 12);
    const inches = dmToInches % 12;

    // dm to cm
    const dmToCm = height * 10;

    return { feetInches: `${feet}'${inches.toFixed(1)}"`, cm: dmToCm };
  }, [height]);

  // Convert weight from hectograms to lbs and kg
  const convertedWeight = useMemo(() => {
    // hg to lbs
    const hgToLbs = (weight / 4.536).toFixed(1);

    // hg to kg
    const hgToKg = weight / 10;

    return { lbs: hgToLbs, kg: hgToKg };
  }, [weight]);

  // Convert gender rate to percentage of male and female
  const formattedGenderRate = useMemo(() => {
    const male = 100 - genderRate;
    const female = genderRate;

    return { male, female };
  }, [genderRate]);

  // Calculate the number of steps required to hatch an egg
  const stepsToHatch = useMemo(() => 255 * (hatchCounter + 1), [hatchCounter]);

  // Format abilities to a capitalized, comma-separated string
  const formattedSpecies = useMemo(() => {
    const speciesName =
      species
        .find((species) => species.language.name === "en")
        ?.genus?.split(" ") || [];

    return speciesName?.[0] || "";
  }, [species]);

  // Format egg groups to a capitalized, comma-separated string
  const formattedAbilities = useMemo(
    () =>
      abilities
        .map(
          (ability) =>
            String(ability.ability.name[0]).toUpperCase() +
            String(ability.ability.name).slice(1)
        )
        .join(", "),
    [abilities]
  );

  const formattedEggGroups = useMemo(
    () =>
      eggGroups
        .map(
          (eggGroup) =>
            String(eggGroup.name[0]).toUpperCase() +
            String(eggGroup.name).slice(1)
        )
        .join(", "),
    [eggGroups]
  );

  return (
    <TabsContent value="About">
      <div className="animate-fade-up">
        <div className="flex flex-row items-center gap-14 mb-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-400">Species</p>
            <p className="text-sm font-semibold text-gray-400">Height</p>
            <p className="text-sm font-semibold text-gray-400">Weight</p>
            <p className="text-sm font-semibold text-gray-400">Abilities</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Species */}
            <p className="text-sm text-black">{formattedSpecies}</p>

            {/* Height */}
            <p className="text-sm text-black">
              {convertedHeight.feetInches} ({convertedHeight.cm} cm)
            </p>

            {/* Weight */}
            <p className="text-sm text-black">
              {convertedWeight.lbs} lbs ({convertedWeight.kg} kg)
            </p>

            {/* Abilities */}
            <p className="text-sm text-black">{formattedAbilities}</p>
          </div>
        </div>

        <p className="font-bold mb-4">Breeding</p>

        <div className="flex flex-row items-center gap-8 mb-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-400">Gender</p>
            <p className="text-sm font-semibold text-gray-400">Egg Groups</p>
            <p className="text-sm font-semibold text-gray-400">Egg Cycle</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Gender */}
            <div className="flex flex-row items-center gap-4">
              {/* Male */}
              {formattedGenderRate.male && (
                <div className="flex flex-row gap-1 items-center">
                  <Male />

                  <p className="text-sm text-black">
                    {formattedGenderRate.male}%
                  </p>
                </div>
              )}

              {/* Female */}
              {formattedGenderRate.female && (
                <div className="flex flex-row gap-1 items-center">
                  <Female />

                  <p className="text-sm text-black">
                    {formattedGenderRate.female}%
                  </p>
                </div>
              )}
            </div>

            {/* Egg Groups */}
            <p className="text-sm text-black">{formattedEggGroups}</p>

            {/* Egg Cycle */}
            <p className="text-sm text-black">{stepsToHatch} Steps</p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AboutContent;
