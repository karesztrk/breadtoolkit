/** @typedef {import('@service/types').Features} Features */

class CSSHighlightChecker {
  available;

  /** @type {Features} */
  features;

  /** @type {Array<string>} */
  errors;

  constructor() {
    this.available = false;
    this.features = {};
    this.errors = [];
  }

  /**
   * Detects CSS Custom Highlight API support and features
   */
  detect() {
    this.available = false;
    this.features = {};
    this.errors = [];

    try {
      const selectorSupport = CSS.supports("selector(::highlight(test))");
      if (!window.CSS || !CSS.highlights || !selectorSupport) {
        this.errors.push("CSS Custom Highlight API not available in this browser");
        return;
      }

      this.available = true;

      this.features = {
        highlights: typeof CSS.highlights === "object",
        set: typeof CSS.highlights.set === "function",
        delete: typeof CSS.highlights.delete === "function",
        clear: typeof CSS.highlights.clear === "function",
        has: typeof CSS.highlights.has === "function",
        highlight: typeof window.Highlight === "function",
        range: typeof window.Range === "function",
      };
    } catch (err) {
      this.errors.push(`Detection error: ${this.errorMessage(err)}`);
    }
  }

  /**
   * Checks if the API is fully supported
   * @returns {boolean} True if all features are available
   */
  isFullySupported() {
    return this.available && Object.values(this.features).every((f) => f === true);
  }

  /**
   * Safely get the error message.
   * @param {any} err
   * @return {string}
   */
  errorMessage(err) {
    return err && typeof err === "object" && "message" in err ? err.message : "Unknown";
  }
}

export default CSSHighlightChecker;
