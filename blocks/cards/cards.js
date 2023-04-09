import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

function replacePlaceHolderText(oldText) {
  const placeHolderContainer = window.placeholders["i18n"];
  if (!placeHolderContainer) return oldText;
  let refinedText = oldText;
  [placeHolderContainer].forEach((holderObj) => {
    const _placeHolderRegex = new RegExp(Object.keys(holderObj)[0], "g");
    refinedText = refinedText.replace(_placeHolderRegex, Object.values(holderObj)[0]);
  });
  return refinedText;
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = replacePlaceHolderText(row.innerHTML);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture")) div.className = "cards-card-image";
      else div.className = "cards-card-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll("img").forEach((img) => img.closest("picture").replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])));
  block.textContent = "";
  block.append(ul);
}
