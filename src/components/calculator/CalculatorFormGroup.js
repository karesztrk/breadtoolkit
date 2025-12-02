import { LightElement } from "@karesztrk/webcomponent-base";

class CalculatorFormGroup extends LightElement {
  static {
    this.register("calculator-form-group", CalculatorFormGroup);
  }

  connectedCallback() {}

  render() {}

  /**
   * @param {Event & { target: HTMLInputElement }} e
   */
  onInput(e) {
    const element = e.target;
    if (element.validity.valid) {
      element.removeAttribute("aria-invalid");
    } else {
      element.setAttribute("aria-invalid", "true");
    }
  }
}

export default CalculatorFormGroup;
