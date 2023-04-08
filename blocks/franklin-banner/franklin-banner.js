import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

export default function decorate(block) {
  const bannerBlock = block;
  bannerBlock
    .querySelectorAll("img")
    .forEach((img) =>
      img
        .closest("picture")
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, true, [
            { width: "320px" },
            { media: "(min-width: 768px)", width: "750" },
            { media: "(min-width: 1024px)", width: "1000" },
          ])
        )
    );
}
