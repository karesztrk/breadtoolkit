import CSSHighlightChecker from "./CSSHighlightChecker";
import SpeechSynthesisChecker from "./SpeechSynthesisChecker";

class BrowserApiChecker {
  speechChecker;

  highlightChecker;

  constructor() {
    this.speechChecker = new SpeechSynthesisChecker();
    this.highlightChecker = new CSSHighlightChecker();
    this.browser = "";
  }

  /**
   * Detects the current browser from user agent string
   * @returns {string} Browser name (Edge, Chrome, Safari, Firefox, Opera, or Unknown Browser)
   */
  getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
    return "Unknown Browser";
  }

  /**
   * Runs all browser API detection checks
   * @returns {Promise<void>} Promise that resolves when all detection is complete
   */
  async detect() {
    this.browser = this.getBrowserInfo();
    await this.speechChecker.detect();
    this.highlightChecker.detect();
  }

  /**
   * Tests the Speech Synthesis API
   * @param {Function} [onStart] - Optional callback called when speech starts
   * @param {Function} [onEnd] - Optional callback called when speech ends
   * @param {Function} [onError] - Optional callback called on error, receives error message
   * @returns {boolean} True if test was initiated, false if API is not available
   */
  testSpeech(onStart, onEnd, onError) {
    return this.speechChecker.test(onStart, onEnd, onError);
  }
}

export default BrowserApiChecker;
