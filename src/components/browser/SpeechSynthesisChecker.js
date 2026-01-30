/** @typedef {import('@service/types').Features} Features */

class SpeechSynthesisChecker {
  available;

  voicesLoaded;

  voiceCount;

  /** @type {Features} */
  features;

  /** @type {Array<string>} */
  errors;

  constructor() {
    this.available = false;
    this.voicesLoaded = false;
    this.voiceCount = 0;
    this.features = {};
    this.errors = [];
  }

  /**
   * Detects Speech Synthesis API support and features
   * @returns {Promise<void>} Promise that resolves when detection is complete
   */
  detect() {
    return new Promise((resolve) => {
      this.available = false;
      this.voicesLoaded = false;
      this.voiceCount = 0;
      this.features = {};
      this.errors = [];

      try {
        if (!window.speechSynthesis || !("speechSynthesis" in window)) {
          this.errors.push("Speech Synthesis API not available in this browser");
          resolve();
          return;
        }

        this.available = true;

        this.features = {
          speak: typeof window.speechSynthesis.speak === "function",
          cancel: typeof window.speechSynthesis.cancel === "function",
          pause: typeof window.speechSynthesis.pause === "function",
          resume: typeof window.speechSynthesis.resume === "function",
          getVoices: typeof window.speechSynthesis.getVoices === "function",
          speechSynthesisUtterance: typeof window.SpeechSynthesisUtterance === "function",
        };

        let voicesChecked = false;

        const checkVoices = () => {
          try {
            const voices = window.speechSynthesis.getVoices();
            this.voiceCount = voices.length;
            this.voicesLoaded = voices.length > 0;

            if (voices.length === 0) {
              this.errors = this.errors.filter((e) => !e.includes("voices"));
              this.errors.push("No voices available (they may still be loading)");
            } else {
              this.errors = this.errors.filter((e) => !e.includes("voices"));
              if (!voicesChecked) {
                voicesChecked = true;
                resolve();
              }
            }
          } catch (err) {
            this.errors.push(`Error loading voices: ${this.errorMessage(err)}`);
            if (!voicesChecked) {
              voicesChecked = true;
              resolve();
            }
          }
        };

        checkVoices();

        if (window.speechSynthesis.addEventListener) {
          window.speechSynthesis.addEventListener("voiceschanged", checkVoices, { once: true });
        }
        setTimeout(() => {
          if (!voicesChecked) {
            voicesChecked = true;
            resolve();
          }
        }, 100);
      } catch (err) {
        this.errors.push(`Detection error: ${this.errorMessage(err)}`);
        resolve();
      }
    });
  }

  /**
   * Tests the Speech Synthesis API by speaking a test phrase
   * @param {Function} [onStart] - Optional callback called when speech starts
   * @param {Function} [onEnd] - Optional callback called when speech ends
   * @param {Function} [onError] - Optional callback called on error, receives error message
   * @returns {boolean} True if test was initiated, false if API is not available
   */
  test(onStart, onEnd, onError) {
    if (!this.available || !this.voicesLoaded) {
      return false;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new window.SpeechSynthesisUtterance(
        "Speech synthesis is working correctly.",
      );

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        if (onError) onError(e.error);
      };

      if (onStart) onStart();
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      if (onError) onError(this.errorMessage(err));
      return false;
    }
  }

  /**
   * Checks if the API is fully supported
   * @returns {boolean} True if all features are available and voices are loaded
   */
  isFullySupported() {
    return (
      this.available && this.voicesLoaded && Object.values(this.features).every((f) => f === true)
    );
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

export default SpeechSynthesisChecker;
