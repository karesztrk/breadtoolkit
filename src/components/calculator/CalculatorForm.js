import { LightElement } from "@karesztrk/webcomponent-base";
import reducer, { initialState } from "@/context/calculator/reducer";
import { calcHydration, loadCalculatorSettings } from "@/service/calculator";

/**
 * @typedef {import('@service/types').Settings} Settings
 */
// TODO: Input validation
class CalculatorForm extends LightElement {
  static {
    this.register("calculator-form", CalculatorForm);
  }

  /** @type HTMLInputElement | null */
  flourInput;

  /** @type HTMLInputElement | null */
  waterInput;

  /** @type HTMLInputElement | null */
  saltInput;

  /** @type HTMLInputElement | null */
  sourdoughInput;

  /** @type HTMLElement | null */
  weight;

  /** @type HTMLElement | null */
  hydration;

  /** @type {import("@/context/calculator/reducer").CalculatorState} */
  state = initialState;

  connectedCallback() {
    this.flourInput = this.querySelector("#flour");
    this.waterInput = this.querySelector("#water");
    this.saltInput = this.querySelector("#salt");
    this.sourdoughInput = this.querySelector("#sourdough");

    this.weight = this.querySelector("#weight");
    this.hydration = this.querySelector("#hydration");

    const settings = loadCalculatorSettings();

    this.updateInputs(settings);

    this.state = reducer(this.state, { type: "initialize", settings, extras: {} });
  }

  render() {}

  /**
   * Add two numbers together
   * @param {Event & { target: HTMLInputElement }} e
   */
  onChange(e) {
    switch (e.target) {
      case this.flourInput:
        this.state = reducer(this.state, {
          type: "setSetting",
          key: "flour",
          value: +e.target.value,
        });
        break;

      case this.waterInput:
        this.state = reducer(this.state, {
          type: "setSetting",
          key: "water",
          value: +e.target.value,
        });
        break;

      case this.saltInput:
        this.state = reducer(this.state, {
          type: "setSetting",
          key: "salt",
          value: +e.target.value,
        });
        break;

      case this.sourdoughInput:
        this.state = reducer(this.state, {
          type: "setSetting",
          key: "sourdough",
          value: +e.target.value,
        });
        break;

      default:
        break;
    }

    this.updateSummary();
  }

  updateSummary() {
    if (this.weight) {
      this.weight.textContent = this.state.dough.toString();
    }

    if (this.hydration) {
      this.hydration.textContent = calcHydration(this.state.settings, this.state.liquids);
    }
  }

  /**
   * @param {Settings} settings
   */
  updateInputs(settings) {
    if (this.flourInput && settings.flour) {
      this.flourInput.value = settings.flour.toString();
    }

    if (this.waterInput && settings.water) {
      this.waterInput.value = settings.water.toString();
    }

    if (this.saltInput && settings.salt) {
      this.saltInput.value = settings.salt.toString();
    }

    if (this.sourdoughInput && settings.sourdough) {
      this.sourdoughInput.value = settings.sourdough.toString();
    }
  }
}

export default CalculatorForm;
