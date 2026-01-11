import { LightElement } from "@karesztrk/webcomponent-base";

/**
 * Share action widget.
 *
 * Copyright (c) 2025 piccalilli
 * @see https://piccalil.li/blog/simplify-sharing-with-built-in-apis-and-progressive-enhancement/
 */
class Share extends LightElement {
  static {
    this.register("share-actions", Share);
  }

  /** @type HTMLButtonElement | null */
  #shareButton;

  /** @type HTMLButtonElement | null */
  #copyButton;

  /**
   * Returns a url prop value or the current page url as a fallback.
   * @returns {string}
   */
  get url() {
    return this.getAttribute("url") || window.location.href;
  }

  /**
   * Returns a title prop value or the page <title>.
   * @returns {string}
   */
  get title() {
    return this.getAttribute("title") || document.title;
  }

  /**
   * Looks for a meta description and extracts the value if it is found. Returns an empty string if not.
   * @returns {string | undefined}
   */
  get description() {
    const metaDescriptionElement = document.querySelector('meta[name="description"]');

    return metaDescriptionElement
      ? (metaDescriptionElement.getAttribute("content") ?? undefined)
      : "";
  }

  /**
   * Determine if this browser can use the share API.
   * @returns boolean
   */
  get hasShareSupport() {
    return !!navigator.share;
  }

  /**
   * Determine if this browser can use the clipboard API.
   * @returns Clipboard
   */
  get hasClipboardSupport() {
    return navigator.clipboard;
  }

  /**
   * Reveal the share button.
   * @param {HTMLButtonElement} button
   */
  showButton(button) {
    button.style = "display: block";
  }

  connectedCallback() {
    this.#shareButton = this.querySelector("#share-button");
    this.#copyButton = this.querySelector("#copy-button");

    // Conditionally render the share button
    if (this.hasShareSupport && this.#shareButton) {
      this.showButton(this.#shareButton);
    }

    // Conditionally render the share button
    if (this.hasClipboardSupport && this.#copyButton) {
      this.showButton(this.#copyButton);
    }
  }

  /**
   * Handle clicks inside the component.
   * @param {Event & { target: HTMLInputElement }} e
   */
  onClick(e) {
    switch (e.target) {
      case this.#shareButton:
        this.triggerShare();
        break;
      case this.#copyButton:
        this.copyToClipboard();
        break;
      default:
        break;
    }
  }

  /**
   * Takes the event, triggers the share API, then passes that
   * context and alert text to the renderAlert method.
   */
  triggerShare() {
    navigator
      .share({
        title: this.title,
        url: this.url,
        text: this.description,
      })
      .then(() => {
        this.renderAlert("Thanks!");
      })
      .catch((error) => console.error("Error sharing", error));
  }

  /**
   * Takes the event, triggers the clipboard API, then passes that
   *  context and alert text to the renderAlert method.
   */
  copyToClipboard() {
    navigator.clipboard
      .writeText(this.url)
      .then(() => {
        this.renderAlert("Copied!");
      })
      .catch((error) => console.error(error));
  }

  /**
   * Takes message text, the event context and an optional millisecond value for clearing the
   * alert. It than renders the local alert element to this component.
   * If not available, nothing happens here.
   *
   * @param {string} text
   * @param {number} clearTime
   */
  renderAlert(text, clearTime = 3000) {
    const alert = /** @type HTMLElement | null } */ (this.querySelector('[role="alert"]'));

    if (alert) {
      alert.innerText = text;

      setTimeout(() => {
        alert.innerText = "";
      }, clearTime);
    }
  }
}

export default Share;
