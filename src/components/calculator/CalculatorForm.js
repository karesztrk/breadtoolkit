import { LightElement } from "@karesztrk/webcomponent-base";

class CalculatorForm extends LightElement {
  static {
    this.register("calculator-form", CalculatorForm);
  }

  render() {}

  onChange(e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

export default CalculatorForm;
