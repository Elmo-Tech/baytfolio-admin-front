export async function captureBrowserState(page) {
  return page.evaluate(() => ({
    url: location.pathname + location.search + location.hash,
    text: document.body.innerText,
    active:
      document.activeElement?.getAttribute("aria-label") ??
      document.activeElement?.id,
    elements: [...document.body.querySelectorAll("*")]
      .filter(
        (el) =>
          !el.closest(".tsqd-parent-container") &&
          !["SCRIPT", "STYLE"].includes(el.tagName),
      )
      .map((el) => {
        const s = getComputedStyle(el),
          r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          role: el.getAttribute("role"),
          rect: [r.x, r.y, r.width, r.height],
          color: s.color,
          background: s.background,
          border: s.border,
          radius: s.borderRadius,
          font: s.font,
          shadow: s.boxShadow,
          outline: s.outline,
          padding: s.padding,
          opacity: s.opacity,
          transform: s.transform,
          fill: s.fill,
          stroke: s.stroke,
          value: el.value,
          checked: el.checked,
        };
      }),
  }));
}
