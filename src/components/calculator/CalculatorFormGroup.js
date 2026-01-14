import { LightElement } from "@karesztrk/webcomponent-base";

class CalculatorFormGroup extends LightElement {
  static {
    this.register("calculator-form-group", CalculatorFormGroup);
  }

  /** @type HTMLInputElement | null */
  #input;

  /** @type HTMLElement | null */
  #errorMessage;

  /** @type AbortController */
  #abortController;

  constructor() {
    super();
    this.#input = this.querySelector("input[type='number']");
    this.#errorMessage = this.querySelector("small");

    this.#abortController = new AbortController();
  }

  connectedCallback() {
    const { signal } = this.#abortController;
    this.#input?.addEventListener("command", this.onCommand.bind(this), { signal });
    this.#input?.addEventListener("input", this.onInput.bind(this), { signal });
  }

  /**
   * Handle the number input event.
   * @param {Event} e
   */
  onInput(e) {
    const element = /** @type {HTMLInputElement} */ (e.target);
    const valid = element.validity.valid;
    if (valid) {
      element.removeAttribute("aria-invalid");
    } else {
      element.setAttribute("aria-invalid", "true");
    }
    if (this.#errorMessage) {
      this.#errorMessage.textContent = valid ? "" : element.validationMessage;
    }
  }

  /**
   * Handle the command on the input.
   * @param {Event} e
   */
  onCommand(e) {
    if (!this.#input) {
      return;
    }

    if (e.command === "--increment") {
      this.#input.stepUp();
    } else if (e.command === "--decrement") {
      this.#input.stepDown();
    }

    // Propagate the change to the parent
    this.#input.dispatchEvent(new CustomEvent("inputstep", { bubbles: true }));
    // Trigger the input change to reset the validity
    this.onInput(e);
  }
}

export default CalculatorFormGroup;
