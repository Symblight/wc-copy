import { copyNode, copyText } from "./copy";

async function copy(button) {
  const forId = button.getAttribute("for");
  const HTMLToCopy = document.querySelector(`#${forId}`);

  const value = HTMLToCopy.getAttribute("value");

  if (value) {
    await copyText(value);
  } else {
    await copyNode(HTMLToCopy);
  }

  console.log(HTMLToCopy);
}

const click = (event) => {
  const button = event.currentTarget;
  if (button instanceof HTMLElement) {
    copy(button);
  }
};

export class CopyToClipboard extends HTMLElement {
  connectedCallback() {
    console.log("Custom square element added to page.");

    this.addEventListener("click", click);
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    // updateStyle(this);
  }
}

if (!window.customElements.get("copy-to-clipboard")) {
  window.CopyToClipboard = CopyToClipboard;
  window.customElements.define("copy-to-clipboard", CopyToClipboard);
}
