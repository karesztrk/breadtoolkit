import { LightElement } from "@karesztrk/webcomponent-base";

/**
 * Speech synthesis widget.
 *
 * Copyright (c) 2025 David Bushell
 * @see https://dbushell.com/2025/07/26/text-to-speech-synthesis/
 */
export default class SpeechSynth extends LightElement {
  static {
    this.register("speech-synth", SpeechSynth);
  }

  static observedAttributes = ["target"];

  /** @type {HTMLButtonElement | null} */
  #playButton;

  /** @type {HTMLButtonElement | null} */
  #stopButton;

  /** @type {AbortController} */
  #controller;

  /** @type {SpeechSynthesisUtterance} */
  #utterance;

  #skipNodes = new Set(["[popover]", "button", "iframe", "pre"]);

  constructor() {
    super();
    this.#controller = new AbortController();
  }

  /**
   * Determine if this browser can use the CSS Highlight API.
   * @returns boolean
   */
  get hasHighlightSupport() {
    return CSS.supports("selector(::highlight(test))");
  }

  /**
   * Determine if this browser can use the Web Speech API.
   * @returns boolean
   */
  get hasSpeechSupport() {
    return "speechSynthesis" in window;
  }

  /**
   * Create HTML element references.
   */
  bindElements() {
    this.#playButton = this.querySelector("#play-button");
    this.#stopButton = this.querySelector("#stop-button");
  }

  /**
   * Load component dependencies.
   * @override
   */
  dependencies() {
    this.bindElements();

    if (!this.hasHighlightSupport || !this.hasSpeechSupport) {
      return;
    }

    if (this.#playButton) {
      this.showButton(this.#playButton);
    }
  }

  /**
   * @return {string | undefined} value
   */
  get playing() {
    return this.dataset.playing;
  }

  /**
   * @param {boolean} value
   */
  set playing(value) {
    if (value) {
      this.dataset.playing = "";
    } else {
      delete this.dataset.playing;
    }
  }

  /**
   * @return {string | null} value
   */
  get targetSelector() {
    return this.getAttribute("target");
  }

  /**
   * @param {string} value
   */
  set targetSelector(value) {
    this.setAttribute("target", value);
  }

  /**
   * Reveal the button.
   * @param {HTMLButtonElement} button
   */
  showButton(button) {
    button.style.visibility = "visible";
  }

  /**
   * Hide the button.
   * @param {HTMLButtonElement} button
   */
  hideButton(button) {
    button.style.visibility = "hidden";
  }

  /**
   * Handle clicks inside the component.
   * @param {Event & { target: HTMLInputElement }} e
   */
  onClick(e) {
    switch (e.target) {
      case this.#playButton:
        this.play();
        break;
      case this.#stopButton:
        this.stop();
        break;
      default:
        break;
    }
  }

  /**
   * Stop speech.
   */
  stop() {
    this.#controller.abort();
    globalThis.speechSynthesis.cancel();
    CSS.highlights?.delete("speech-synth");
    this.playing = false;
    if (this.#stopButton) {
      this.hideButton(this.#stopButton);
    }
  }

  /**
   * Start speech.
   */
  play() {
    const synth = globalThis.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      return;
    }

    if (!this.targetSelector) {
      throw new Error("Target selector not found");
    }

    const target = document.getElementById(this.targetSelector);
    if (!target) {
      throw new Error("Target not found");
    }

    const nodeParent = new WeakMap();

    const nodeList = this.collectNodes(target);

    const highlight = new Highlight();
    CSS.highlights?.set("speech-synth", highlight);
    let highlightNode = null;

    const nextWord = () => {
      if (nodeList.length === 0) {
        highlight.clear();
        this.stop();
        return;
      }

      const text = nodeList.shift();
      if (!text) {
        return;
      }
      const textContent = text.textContent;

      this.#utterance = new SpeechSynthesisUtterance(textContent);
      this.#utterance.addEventListener(
        "end",
        () => {
          nextWord();
        },
        { signal: this.#controller.signal, once: true },
      );
      globalThis.speechSynthesis.cancel();
      globalThis.speechSynthesis.speak(this.#utterance);
      this.#utterance.addEventListener("error", (ev) => {
        this.stop();
        this.renderAlert(ev.error);
      });
      this.#utterance.addEventListener(
        "boundary",
        (ev) => {
          highlight.clear();
          if (highlightNode) {
            delete highlightNode.dataset.speechSynthHighlight;
            highlightNode = null;
          }
          if (nodeParent.has(text)) {
            highlightNode = nodeParent.get(text);
            highlightNode.dataset.speechSynthHighlight = "true";
            return;
          }
          const range = new Range();
          range.setStart(text, ev.charIndex);
          range.setEnd(text, ev.charIndex + ev.charLength);
          highlight.add(range);
        },
        { signal: this.#controller.signal },
      );

      const parent = text.parentElement ?? nodeParent.get(text);
      if (parent) {
        parent.style.scrollMarginBlock = "200px";
        parent.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        parent.style.scrollMarginBlock = "";
      }
    };
    nextWord();

    if (this.#stopButton) {
      this.showButton(this.#stopButton);
    }

    this.playing = true;
  }

  /**
   * Recursively collect all nodes inside the given parent element;
   * @param {HTMLElement} parent
   * @returns {Array<HTMLElement>}
   */
  collectNodes(parent) {
    const nodeList = [];

    next: for (const child of parent.childNodes) {
      if (child === this) {
        continue;
      }
      // Ignore non-text or element nodes
      if (Node.TEXT_NODE !== child.nodeType && Node.ELEMENT_NODE !== child.nodeType) {
        continue;
      }

      const childElement = /** @type {HTMLElement} */ (child);
      switch (childElement.nodeType) {
        case Node.ELEMENT_NODE:
          // Skip selected tags
          for (const selector of this.#skipNodes) {
            if (childElement.matches(selector)) {
              continue next;
            }
          }
          nodeList.push(...this.collectNodes(childElement));
          break;

        case Node.TEXT_NODE:
          // Ignore possibly empty text?
          if (childElement.textContent.trim() !== "") {
            nodeList.push(childElement);
          }
          break;

        default:
          nodeList.push(...this.collectNodes(childElement));
          break;
      }
    }
    return nodeList;
  }

  disconnectedCallback() {
    this.stop();
    super.disconnectedCallback();
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
