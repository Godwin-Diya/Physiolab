export interface CardiacVariables {
  heartRate: number;
  strokeVolume: number;
}

export function calculateCardiacOutput(
  heartRate: number,
  strokeVolume: number
): number {
  return (heartRate * strokeVolume) / 1000;
}

export function getCardiacOutputStatus(
  cardiacOutput: number
) {
  if (cardiacOutput < 4) {
    return {
      label: "Low cardiac output",
      description:
        "The calculated cardiac output is below the typical resting range.",
      type: "low",
    };
  }

  if (cardiacOutput > 8) {
    return {
      label: "High cardiac output",
      description:
        "The calculated cardiac output is elevated compared with a typical resting state.",
      type: "high",
    };
  }

  return {
    label: "Within resting range",
    description:
      "The calculated cardiac output is within a typical resting physiological range.",
    type: "normal",
  };
}

export function getPhysiologyInsight(
  heartRate: number,
  strokeVolume: number
): string {
  if (heartRate > 100 && strokeVolume < 60) {
    return "Heart rate is elevated while stroke volume is relatively low. Increasing heart rate does not necessarily produce a proportional increase in cardiac output.";
  }

  if (heartRate > 100) {
    return "Increasing heart rate increases the number of cardiac cycles occurring each minute. When stroke volume remains adequate, cardiac output rises.";
  }

  if (strokeVolume > 90) {
    return "A larger stroke volume means more blood is ejected with each heartbeat. With heart rate held constant, this increases cardiac output.";
  }

  if (strokeVolume < 55) {
    return "A reduced stroke volume means less blood is ejected with each heartbeat. The cardiovascular system may compensate through changes in heart rate and vascular responses.";
  }

  return "Both variables are close to typical resting values, producing a cardiac output consistent with a resting physiological state.";
}