import { CONSOLE_COLORS, WARNINGS } from "../utils/constants";
import { BaseAnalyzer } from "./BaseAnalyzer";

export class VibrationAnalyzer extends BaseAnalyzer {
  execute() {
    console.log("VibrationAnalyzer execute");
    this.analyze();
  }
  analyze() {
    const baseAverage = this.getBaseAverage();
    const currentAverage = this.getCurrentAverage();

    if (currentAverage === baseAverage) {
      console.log(CONSOLE_COLORS.GREEN, `[VibrationAnalyzer] ${WARNINGS.OK}`);
    }

    if (currentAverage > baseAverage) {
      console.log(
        CONSOLE_COLORS.YELLOW,
        `[VibrationAnalyzer] ${WARNINGS.PAY_ATTENTION}`
      );
    }

    if (currentAverage < baseAverage) {
      console.log(
        CONSOLE_COLORS.RED,
        `[VibrationAnalyzer] ${WARNINGS.CRITICAL}`
      );
    }
  }

  addValue(value: string) {}

  getBaseAverage() {
    const randomValues: number[] = this.getFiveRandomValues();
    return this.average(randomValues);
  }

  getCurrentAverage() {
    const values: number[] = this.getFiveLastValues();
    return this.average(values);
  }

  private getFiveRandomValues() {
    const randomList = [];

    for (let i = 0; i < 5; i++) {
      randomList.push(Math.random() * 10);
    }

    return randomList;
  }

  private getFiveLastValues() {
    return [1, 2, 3, 4, 5];
  }

  private average(list: number[]) {
    return list.reduce((a, b) => a + b) / list.length;
  }
}
