import { LightElement } from "@karesztrk/webcomponent-base";
import reducer, { initialState } from "@/context/calculator/reducer";
import { loadCalculatorSettings, saveCalculatorSettings } from "@/service/calculator";
import SummaryController from "./SummaryController";

/**
 * @typedef {import('@service/types').Settings} Settings
 * @typedef {import('@service/types').SettingName} SettingName
 * @typedef {import("@/context/calculator/reducer").CalculatorState} State
 */
class CalculatorView extends LightElement {
  static {
    this.register("calculator-view", CalculatorView);
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

  /** @type HTMLInputElement | null */
  #weightDialogInput;

  /** @type HTMLFormElement | null */
  #weightForm;

  /** @type HTMLFormElement | null */
  #resetForm;

  /** @type SummaryController */
  #summaryController;

  /** @type HTMLElement | null */
  #shareActions;

  /** @type {State} */
  #state = initialState;

  /**
   * Create HTML element references.
   */
  bindElements() {
    this.#flourInput = this.querySelector("#flour-input");
    this.#waterInput = this.querySelector("#water-input");
    this.#saltInput = this.querySelector("#salt-input");
    this.#sourdoughInput = this.querySelector("#sourdough-input");
    this.#sourdoughRatioInput = this.querySelector("#sourdough-ratio-input");
    this.#weightDialogInput = this.querySelector("#weight-input");
    this.#weightForm = this.querySelector("#weight-form");
    this.#resetForm = this.querySelector("#reset-form");
    this.#shareActions = this.querySelector("share-actions");
    this.#summaryController = new SummaryController(this);
  }

  /**
   * Initialize the calculator local state.
   */
  initState() {
    // Load from storage
    const storedSettings = loadCalculatorSettings();

    // Load from URL
    const queryParams = new URLSearchParams(window.location.search);
    const flour = Number(queryParams.get("flour"));
    const water = Number(queryParams.get("water"));
    const salt = Number(queryParams.get("salt"));
    const yeast = Number(queryParams.get("yeast"));
    const sourdough = Number(queryParams.get("sourdough"));
    const sourdoughRatio = Number(queryParams.get("sourdoughRatio"));
    const settings = {
      ...storedSettings,
      ...(flour && { flour }),
      ...(water && { water }),
      ...(salt && { salt }),
      ...(yeast && { yeast }),
      ...(sourdough && { sourdough }),
      ...(sourdoughRatio && { sourdoughRatio }),
    };

    this.state = reducer(this.state, { type: "initialize", settings, extras: {} });
  }

  /**
   * Load component dependencies.
   * @override
   */
  dependencies() {
    this.bindElements();
    this.initState();
  }

  /**
   * Updates the UI.
   * @override
   */
  render() {
    this.#summaryController.update();
    this.updateInputs();
    this.updateShareActions();
  }

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
  }

  /**
   * Handle form submission.
   *
   * @param {Event & { target: HTMLFormElement, submitter: HTMLElement }} e
   */
  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    switch (e.target) {
      case this.#weightForm: {
        this.onWeightFormSubmit(e);
        break;
      }

      case this.#resetForm: {
        this.onResetFormSubmit(e);
        break;
      }

      default:
        break;
    }
  }

  /**
   * Handle weight form submission.
   *
   * @param {Event & { target: HTMLFormElement, submitter: HTMLElement }} e
   */
  onWeightFormSubmit(e) {
    const values = new FormData(e.target, e.submitter);
    const weightValue = /** @type string | null */ (values.get("weight"));
    if (weightValue) {
      const weight = +weightValue;
      if (!Number.isNaN(weight) && weight > 0) {
        this.state = reducer(this.state, {
          type: "submitDoughGoal",
          goal: +weight,
        });

        this.render();
      }
    }
    const popover = /** @type HTMLElement | null */ (e.target.closest("[popover]"));
    popover?.hidePopover();
  }

  /**
   * Handle reset form submission.
   *
   * @param {Event & { target: HTMLFormElement, submitter: HTMLElement }} e
   */
  onResetFormSubmit(e) {
    this.state = reducer(this.state, {
      type: "resetSettings",
    });

    this.render();
    const popover = /** @type HTMLElement | null */ (e.target.closest("[popover]"));
    popover?.hidePopover();
  }

  /**
   * @param {HTMLInputElement} element
   * @param {SettingName} key
   */
  onNumberInputChange(element, key) {
    const value = element.valueAsNumber;
    if (!Number.isNaN(value)) {
      this.state = reducer(this.state, {
        type: "setSetting",
        key,
        value,
      });
      this.render();
    }
  }

  /**
   * Update input field values on the form.
   */
  updateInputs() {
    const { dough, settings } = this.state;

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

    if (this.#sourdoughRatioInput) {
      this.#sourdoughRatioInput.value = settings.sourdoughRatio.toString();
    }

    if (this.#weightDialogInput) {
      this.#weightDialogInput.value = dough.toString();
    }
  }

  /**
   * Updates the share actions.
   */
  updateShareActions() {
    if (this.#shareActions) {
      const url = new URL(window.location.href);
      const { bakersMath: _bm, imperialUnits: _iu, ...settings } = { ...this.#state.settings };
      for (const key in settings) {
        url.searchParams.set(key, settings[key].toString());
      }

      if ("url" in this.#shareActions) {
        this.#shareActions.url = url.toString();
      }
    }
  }

  /**
   * Returns the current state of the calculator.
   * @return {State}
   */
  get state() {
    return this.#state;
  }

  /**
   * Overwrites the current state of the calculator.
   * @param {State} state
   */
  set state(state) {
    this.#state = state;
    saveCalculatorSettings(state.settings);
  }
}

export default CalculatorView;
