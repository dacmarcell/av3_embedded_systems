import { BaseAnalyzer } from "./BaseAnalyzer";

export class TemperatureAnalyzer extends BaseAnalyzer {
  execute() {
    console.log("TemperatureAnalyzer execute");
    this.analyze();
  }
  analyze() {
    console.log("TemperatureAnalyzer analyze");
  }
}
