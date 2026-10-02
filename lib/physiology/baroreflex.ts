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
    pressureDirection: "low" | "normal" | "high";
    autonomicDirection: "sympathetic" | "parasympathetic" | "balanced";
    response: string;
    insight: string;
}

export function calculateBaroreflex(
    arterialPressure: number,
    bloodVolume: number
): BaroreflexResult {
    /*
   * Educational baroreflex model.
   *
   * Higher arterial pressure
   * → increased baroreceptor firing
   * → increased parasympathetic activity
   * → decreased sympathetic activity
   * → reduced heart rate and vascular tone
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

    let pressureDirection: BaroreflexResult["pressureDirection"];

    if (arterialPressure < 90) {
    pressureDirection = "low";
    } else if (arterialPressure > 110) {
    pressureDirection = "high";
    } else {
    pressureDirection = "normal";
    }

    let autonomicDirection: BaroreflexResult["autonomicDirection"];

    if (baroreceptorActivity < 45) {
    autonomicDirection = "sympathetic";
    } else if (baroreceptorActivity > 55) {
    autonomicDirection = "parasympathetic";
    } else {
    autonomicDirection = "balanced";
    }

    let response = "";
    let insight = "";

    if (pressureDirection === "low") {
    response = "Compensatory cardiovascular response";

    insight =
        "Reduced arterial pressure decreases baroreceptor firing. Sympathetic activity increases while parasympathetic activity decreases, helping increase heart rate and vascular tone.";
    } else if (pressureDirection === "high") {
    response = "Pressure-lowering response";

    insight =
        "Elevated arterial pressure increases baroreceptor firing. Parasympathetic activity increases while sympathetic activity decreases, helping reduce heart rate and vascular tone.";
    } else {
    response = "Near-baseline regulation";

    insight =
        "Arterial pressure is within the model's baseline range. Baroreceptor activity produces a relatively balanced autonomic response.";
    }

    return {
    baroreceptorActivity,
    sympatheticActivity,
    parasympatheticActivity,
    heartRate,
    estimatedMAP,
    vascularTone,
    pressureDirection,
    autonomicDirection,
    response,
    insight,
    };
}


