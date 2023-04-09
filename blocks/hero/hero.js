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
            { media: "screen and (min-width: 320px) and (max-width: 767px)", width: "320", height: "300" },
            { media: "screen and (min-width: 768px) and (max-width: 1023px)", width: "550", height: "300" },
            { media: "screen and (min-width: 1024px)", width: "1600", height: "700" },
          ])
        )
    );
}