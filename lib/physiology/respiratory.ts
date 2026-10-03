export interface RespiratoryVariables {
  alveolarOxygen: number;
  alveolarCarbonDioxide: number;
  inspiredOxygen: number;
  ventilation: number;
}

export interface RespiratoryResult {
  oxygenGradient: number;
  carbonDioxideGradient: number;
  oxygenTransfer: number;
  carbonDioxideTransfer: number;
  ventilationStatus: "low" | "normal" | "high";
  gasExchangeStatus: "impaired" | "normal" | "enhanced";
  insight: string;
}

export function calculateGasExchange(
  alveolarOxygen: number,
  alveolarCarbonDioxide: number,
  inspiredOxygen: number,
  ventilation: number
): RespiratoryResult {
  const oxygenGradient = Math.max(
    0,
    inspiredOxygen - alveolarOxygen
  );

  const carbonDioxideGradient = Math.max(
    0,
    alveolarCarbonDioxide - 40
  );

  const oxygenTransfer = Math.min(
    100,
    oxygenGradient * 1.25
  );

  const carbonDioxideTransfer = Math.min(
    100,
    carbonDioxideGradient * 2.5
  );

  const ventilationStatus =
    ventilation < 4
      ? "low"
      : ventilation > 8
        ? "high"
        : "normal";

  const gasExchangeStatus =
    oxygenTransfer < 40
      ? "impaired"
      : oxygenTransfer > 80
        ? "enhanced"
        : "normal";

  let insight = "";

  if (ventilationStatus === "low") {
    insight =
      "Low ventilation reduces the movement of fresh gas into the alveoli, which can limit oxygen delivery and carbon dioxide removal.";
  } else if (ventilationStatus === "high") {
    insight =
      "Higher ventilation increases the movement of air through the alveoli and can enhance gas exchange.";
  } else {
    insight =
      "Ventilation is within the simplified normal range, allowing effective movement of oxygen and carbon dioxide.";
  }

  return {
    oxygenGradient,
    carbonDioxideGradient,
    oxygenTransfer,
    carbonDioxideTransfer,
    ventilationStatus,
    gasExchangeStatus,
    insight,
  };
}