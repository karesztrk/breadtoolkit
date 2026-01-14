import { calcFlourPercent, calcHydration, calcIngredientPercent } from "@/service/calculator";

/**
 * @typedef {import('@/components/calculator/CalculatorView').default} CalculatorForm
 */
class SummaryController {
  /** @type CalculatorForm */
  #host;

  #weight;

  #hydration;

  #flourPercent;

  #waterPercent;

  #saltPercent;

  #sourdoughPercent;

  /**
   * @param {CalculatorForm} host
   */
  constructor(host) {
    this.#host = host;
    const percentSuffix = "-percent";
    this.#weight = this.#host.querySelector("#weight");
    this.#hydration = this.#host.querySelector("#hydration");
    this.#flourPercent = this.#host.querySelector(`#flour${percentSuffix}`);
    this.#waterPercent = this.#host.querySelector(`#water${percentSuffix}`);
    this.#saltPercent = this.#host.querySelector(`#salt${percentSuffix}`);
    this.#sourdoughPercent = this.#host.querySelector(`#sourdough${percentSuffix}`);
  }

  update() {
    if (this.#weight) {
      this.#weight.textContent = this.state.dough.toString();
    }

    if (this.#hydration) {
      this.#hydration.textContent = calcHydration(this.state.settings, this.state.liquids);
    }

    if (this.#flourPercent) {
      this.#flourPercent.textContent = Math.floor(
        calcFlourPercent(
          this.state.settings.bakersMath,
          this.state.settings.flour,
          this.state.dough,
        ),
      ).toString();
    }

    if (this.#waterPercent) {
      this.#waterPercent.textContent = Math.floor(
        calcIngredientPercent(
          this.state.settings.bakersMath,
          this.state.settings.flour,
          this.state.settings.water,
          this.state.dough,
        ),
      ).toString();
    }

    if (this.#saltPercent) {
      this.#saltPercent.textContent = Math.floor(
        calcIngredientPercent(
          this.state.settings.bakersMath,
          this.state.settings.flour,
          this.state.settings.salt,
          this.state.dough,
        ),
      ).toString();
    }

    if (this.#sourdoughPercent) {
      this.#sourdoughPercent.textContent = Math.floor(
        calcIngredientPercent(
          this.state.settings.bakersMath,
          this.state.settings.flour,
          this.state.settings.sourdough,
          this.state.dough,
        ),
      ).toString();
    }
  }

  get state() {
    return this.#host.state;
  }
}

export default SummaryController;
