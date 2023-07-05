export async function handler(event: any[]) {
  console.log(JSON.stringify(event));

  const [input, damages, riskLevel, tax, mood] = event;
  const { name, value } = input;

  const priorDamages = extractPriorDamagesValue(damages);

  const recalculatedDamages = calculateNewDamages({
    newDamages: value,
    priorDamages,
    riskLevel,
    tax,
    mood
  });

  return { name, damages: recalculatedDamages.toString() };
}

const extractPriorDamagesValue = (damages: any) => damages?.Item?.damages?.S || '0';

function calculateNewDamages(input: DamageCalculationInput) {
  const { newDamages, priorDamages, riskLevel, tax, mood } = input;

  const riskAdjustedDamages = newDamages * riskMultipliers[riskLevel];
  const totalTaxedValue = riskAdjustedDamages + (riskAdjustedDamages * tax) / 100;
  const newTotal = parseInt(priorDamages) + totalTaxedValue;

  return mood === 'BAD' ? newTotal * 2 : newTotal;
}

type DamageCalculationInput = {
  newDamages: number;
  priorDamages: string;
  riskLevel: number;
  tax: number;
  mood: string;
};

const riskMultipliers: Record<number, number> = {
  1: 1,
  2: 1.25,
  3: 1.5,
  4: 1.75,
  5: 2
};
