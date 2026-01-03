import { LightElement } from "@karesztrk/webcomponent-base";

class NumberInput extends LightElement {
  static {
    this.register("number-input", NumberInput);
  }

  /** @type HTMLInputElement | null */
  #input;

  constructor() {
    super();
    this.#input = this.querySelector("input");
  }

  connectedCallback() {
    this.#input?.addEventListener("command", this.onCommand.bind(this))
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
  }

}

export default NumberInput;
