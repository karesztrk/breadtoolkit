import { LightElement } from "@karesztrk/webcomponent-base";
import reducer, { initialState } from "@/context/calculator/reducer";
import { calcHydration, loadCalculatorSettings } from "@/service/calculator";

/**
 * @typedef {import('@service/types').Settings} Settings
 * @typedef {import('@service/types').SettingName} SettingName
 */
// TODO: Input validation
class CalculatorForm extends LightElement {
  static {
    this.register("calculator-form", CalculatorForm);
  }

  /** @type HTMLInputElement | null */
  #flourInput;

  /** @type HTMLInputElement | null */
  #waterInput;

  /** @type HTMLInputElement | null */
  #saltInput;

  /** @type HTMLInputElement | null */
  #sourdoughInput;

  /** @type HTMLInputElement | null */
  #sourdoughRatioInput;

  /** @type HTMLElement | null */
  #weight;

  /** @type HTMLElement | null */
  #hydration;

  /** @type HTMLInputElement | null */
  #weightDialogInput;

  /** @type HTMLFormElement | null */
  #weightForm;

  #hydrationTitle;

  #hydrationPopover;

  /** @type {import("@/context/calculator/reducer").CalculatorState} */
  #state = initialState;

  connectedCallback() {
    this.#flourInput = this.querySelector("#flour");
    this.#waterInput = this.querySelector("#water");
    this.#saltInput = this.querySelector("#salt");
    this.#sourdoughInput = this.querySelector("#sourdough");
    this.#sourdoughRatioInput = this.querySelector("#sourdough_ratio");
    this.#weightDialogInput = this.querySelector("#weight-input");
    this.#weightForm = this.querySelector("#weight-form");
    this.#hydrationTitle = this.querySelector("#hydration-title");
    this.#hydrationPopover = this.querySelector("#hydration-popover");

    this.#weight = this.querySelector("#weight");
    this.#hydration = this.querySelector("#hydration");

    const settings = loadCalculatorSettings();

    this.#state = reducer(this.#state, { type: "initialize", settings, extras: {} });

    this.updateInputs();
    this.updateSummary();

    if (this.#hydrationTitle && this.#hydrationPopover) {
    }
  }

  render() {}

  /**
   * Adds two numbers together.
   * @param {Event & { target: HTMLInputElement }} e
   */
  onChange(e) {
    switch (e.target) {
      case this.#flourInput:
        this.onNumberInputChange(e.target, "flour");
        break;

      case this.#waterInput:
        this.onNumberInputChange(e.target, "water");
        break;

      case this.#saltInput:
        this.onNumberInputChange(e.target, "salt");
        break;

      case this.#sourdoughInput:
        this.onNumberInputChange(e.target, "sourdough");
        break;

      case this.#sourdoughRatioInput:
        this.onNumberInputChange(e.target, "sourdoughRatio");
        break;

      default:
        break;
    }

    this.updateSummary();
  }

  /**
   * Handle custom weight submission.
   *
   * @param {Event & { target: HTMLFormElement, submitter: HTMLElement }} e
   */
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === this.#weightForm) {
      const values = new FormData(e.target, e.submitter);
      const weightValue = /** @type string | null */ (values.get("weight"));
      if (weightValue) {
        const weight = +weightValue;
        if (!Number.isNaN(weight) && weight > 0) {
          this.#state = reducer(this.#state, {
            type: "submitDoughGoal",
            goal: +weight,
          });

          this.updateSummary();
          this.updateInputs();
        }
      }
      const popover = /** @type HTMLElement | null */ (e.target.closest("[popover]"));
      popover?.hidePopover();
    }
  }

  /**
   * @param {HTMLInputElement} element
   * @param {SettingName} key
   */
  onNumberInputChange(element, key) {
    const value = element.valueAsNumber;
    if (!Number.isNaN(value)) {
      this.#state = reducer(this.#state, {
        type: "setSetting",
        key,
        value,
      });
    }
  }

  /**
   * Update the calculator summary fields.
   */
  updateSummary() {
    if (this.#weight) {
      this.#weight.textContent = this.#state.dough.toString();
    }

    if (this.#hydration) {
      this.#hydration.textContent = calcHydration(this.#state.settings, this.#state.liquids);
    }
  }

  /**
   * Update input field values on the form.
   */
  updateInputs() {
    const { dough, settings } = this.#state;

    if (this.#flourInput && settings.flour) {
      this.#flourInput.value = settings.flour.toString();
    }

    if (this.#waterInput && settings.water) {
      this.#waterInput.value = settings.water.toString();
    }

    if (this.#saltInput && settings.salt) {
      this.#saltInput.value = settings.salt.toString();
    }

    if (this.#sourdoughInput && settings.sourdough) {
      this.#sourdoughInput.value = settings.sourdough.toString();
    }

    if (this.#weightDialogInput) {
      this.#weightDialogInput.value = dough.toString();
    }
  }
}

export default CalculatorForm;
