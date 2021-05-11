export const copyText = (text) => {
  return navigator.clipboard.writeText(text);
};

export function copyNode(node) {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(node.textContent || "");
  }

  const selection = getSelection();
  if (selection == null) {
    return Promise.reject(new Error());
  }

  selection.removeAllRanges();

  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);

  document.execCommand("copy");
  selection.removeAllRanges();
  return Promise.resolve();
}
