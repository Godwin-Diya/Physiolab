export interface BaroreflexVariables {
  arterialPressure: number;
  bloodVolume: number;
}

export interface BaroreflexResult {
  baroreceptorActivity: number;
  sympatheticActivity: number;
  parasympatheticActivity: number;
  heartRate: number;
  estimatedMAP: number;
  vascularTone: number;
  response: string;
  insight: string;
}

export function calculateBaroreflex(
  arterialPressure: number,
  bloodVolume: number
): BaroreflexResult {
  /*
   * Educational model:
   *
   * Higher arterial pressure
   * → higher baroreceptor activity
   * → increased parasympathetic activity
   * → reduced sympathetic activity
   * → lower heart rate
   *
   * Lower arterial pressure produces the opposite response.
   */

  const pressureEffect = (arterialPressure - 70) / 60;

  const volumeEffect = (bloodVolume - 5) * 4;

  const baroreceptorActivity = Math.max(
    0,
    Math.min(100, 50 + pressureEffect * 40 + volumeEffect)
  );

  const parasympatheticActivity = Math.max(
    0,
    Math.min(100, baroreceptorActivity)
  );

  const sympatheticActivity = Math.max(
    0,
    Math.min(100, 100 - baroreceptorActivity)
  );

  const heartRate = Math.round(
    100 - baroreceptorActivity * 0.45
  );

  const estimatedMAP = Math.round(
    arterialPressure * 0.93
  );

  const vascularTone = Math.round(
    sympatheticActivity
  );

  let response = "";
  let insight = "";

  if (arterialPressure < 85) {
    response = "Compensatory cardiovascular response";

    insight =
      "Reduced arterial pressure decreases baroreceptor firing. The autonomic nervous system increases sympathetic activity and reduces parasympathetic activity, helping raise heart rate and vascular tone.";
  } else if (arterialPressure > 115) {
    response = "Pressure-lowering response";

    insight =
      "Elevated arterial pressure increases baroreceptor firing. Parasympathetic activity rises while sympathetic activity falls, helping reduce heart rate and vascular tone.";
  } else {
    response = "Near-baseline regulation";

    insight =
    "Arterial pressure is within the model's baseline range, so baroreceptor activity produces a balanced autonomic response.";
  }

  return {
    baroreceptorActivity,
    sympatheticActivity,
    parasympatheticActivity,
    heartRate,
    estimatedMAP,
    vascularTone,
    response,
    insight,
  };
}