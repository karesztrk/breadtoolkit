import { calcFlourPercent, calcHydration, calcIngredientPercent } from "@/service/calculator";

/**
 * @typedef {import('@/components/calculator/CalculatorView').default} CalculatorForm
 */
class SummaryController {
  /** @type CalculatorForm */
  #host;

  #weight;

  #hydration;


  /**
   * @param {CalculatorForm} host
   */
  constructor(host) {
    this.#host = host;
    this.#weight = this.#host.querySelector("#weight");
    this.#hydration = this.#host.querySelector("#hydration");
  }

  update() {
    if (this.#weight) {
      this.#weight.textContent = this.state.dough.toString();
    }

    if (this.#hydration) {
      this.#hydration.textContent = calcHydration(this.state.settings, this.state.liquids);
    }

  }

  get state() {
    return this.#host.state;
  }
}

export default SummaryController;
