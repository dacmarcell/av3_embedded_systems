import prisma from "../prisma/singleton";
import { CONSOLE_COLORS, WARNINGS } from "../utils/constants";
import { BaseAnalyzer } from "./BaseAnalyzer";

export class TemperatureAnalyzer extends BaseAnalyzer {
  execute() {
    console.log("TemperatureAnalyzer execute");
    return this.analyze();
  }
  async analyze() {
    const baseAverage = await this.getBaseAverage();
    const currentAverage = await this.getCurrentAverage();

    if (currentAverage === baseAverage) {
      console.log(CONSOLE_COLORS.GREEN, `[TemperatureAnalyzer] ${WARNINGS.OK}`);

      return { state: WARNINGS.OK };
    }

    if (currentAverage > baseAverage) {
      console.log(
        CONSOLE_COLORS.YELLOW,
        `[TemperatureAnalyzer] ${WARNINGS.PAY_ATTENTION}`
      );

      return { state: WARNINGS.PAY_ATTENTION };
    }

    if (currentAverage < baseAverage) {
      console.log(
        CONSOLE_COLORS.RED,
        `[TemperatureAnalyzer] ${WARNINGS.CRITICAL}`
      );

      return { state: WARNINGS.CRITICAL };
    }

    return { state: null };
  }

  async addValue(value: number) {
    await prisma.temperature.create({ data: { value } });
  }

  async getBaseAverage() {
    const randomValues = await this.getFiveRandomValues();
    return this.average(randomValues);
  }

  async getCurrentAverage() {
    const values = await this.getFiveLatestValues();
    return this.average(values);
  }

  private async getFiveRandomValues() {
    const totalRecords = await prisma.temperature.count();
    const skip = Math.floor(Math.random() * totalRecords);

    const temperatureRandomValues = await prisma.temperature.findMany({
      take: 5,
      skip,
      select: { value: true },
    });

    return temperatureRandomValues.map((temp) => temp.value);
  }

  private async getFiveLatestValues() {
    const fiveLatestTemperatures = await prisma.temperature.findMany({
      take: 5,
      select: { value: true },
      orderBy: { createdAt: "desc" },
    });

    return fiveLatestTemperatures.map((temp) => temp.value);
  }

  private average(list: number[]) {
    return list.reduce((a, b) => a + b) / list.length;
  }
}
