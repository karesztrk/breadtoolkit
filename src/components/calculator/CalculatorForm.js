import { LightElement } from "@karesztrk/webcomponent-base";

class CalculatorForm extends LightElement {
  static {
    this.register("calculator-form", CalculatorForm);
  }

  render() {}

  /**
   * Add two numbers together
   * @param {Event & { currentTarget: HTMLInputElement }} e
   */
  onChange(e) {
    // eslint-disable-next-line
    console.log(e.target.name);
    switch (e.target.name) {
      case "flour":
        // eslint-disable-next-line
        console.log(e.target.value);
        break;
      case "water":
        // eslint-disable-next-line
        console.log(e.target.value);
        break;
    }
  }
}

export default CalculatorForm;
