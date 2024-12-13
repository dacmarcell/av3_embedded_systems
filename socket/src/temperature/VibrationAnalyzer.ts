import prisma from "../../prisma/singleton";
import { CONSOLE_COLORS, WARNINGS } from "../utils/constants";
import { BaseAnalyzer } from "./BaseAnalyzer";

export class VibrationAnalyzer extends BaseAnalyzer {
  execute() {
    console.log("VibrationAnalyzer execute");
    return this.analyze();
  }

  async analyze() {
    const baseAverage = await this.getBaseAverage();
    const currentAverage = await this.getCurrentAverage();

    if (currentAverage === baseAverage) {
      console.log(CONSOLE_COLORS.GREEN, `[VibrationAnalyzer] ${WARNINGS.OK}`);
      return { state: WARNINGS.OK };
    }

    if (currentAverage > baseAverage) {
      console.log(
        CONSOLE_COLORS.YELLOW,
        `[VibrationAnalyzer] ${WARNINGS.PAY_ATTENTION}`
      );
      return { state: WARNINGS.PAY_ATTENTION };
    }

    if (currentAverage < baseAverage) {
      console.log(
        CONSOLE_COLORS.RED,
        `[VibrationAnalyzer] ${WARNINGS.CRITICAL}`
      );
      return { state: WARNINGS.CRITICAL };
    }

    return { state: null };
  }

  async addValue(value: number) {
    await prisma.vibration.create({ data: { value } });
  }

  private async getBaseAverage() {
    const randomValues = await this.getFiveRandomValues();
    return this.average(randomValues);
  }

  private async getCurrentAverage() {
    const values = await this.getFiveLatestValues();
    return this.average(values);
  }

  private async getFiveRandomValues() {
    const totalRecords = await prisma.vibration.count();
    const skip = Math.floor(Math.random() * totalRecords);

    const vibrationRandomValues = await prisma.vibration.findMany({
      take: 5,
      skip,
      select: { value: true },
    });

    return vibrationRandomValues.map((vib) => vib.value);
  }

  private async getFiveLatestValues() {
    const fiveLatestVibrations = await prisma.vibration.findMany({
      take: 5,
      select: { value: true },
      orderBy: { createdAt: "desc" },
    });

    return fiveLatestVibrations.map((vib) => vib.value);
  }

  private average(list: number[]) {
    return list.reduce((a, b) => a + b) / list.length;
  }
}
