const CLASS_PREFIX = "tw-";
const DEFAULT_BORDER = "1px solid #ccc";
const DEFAULT_RADIUS = "8px";

function getUtilityValue(token) {
  return token.split("-").slice(1).join("-");
}

function getSpacingValue(rawValue) {
  const numericValue = Number(rawValue);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return `${numericValue * 4}px`;
}

function getPixelValue(rawValue) {
  const numericValue = Number(rawValue);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  return `${numericValue}px`;
}

function applySpacing(el, property, rawValue) {
  const spacingValue = getSpacingValue(rawValue);

  if (spacingValue) {
    el.style[property] = spacingValue;
  }
}

function utilityHandlers() {
  return [
    {
      match: (token) => token.startsWith("bg-"),
      apply: (el, token) => {
        el.style.backgroundColor = getUtilityValue(token);
      },
    },
    {
      match: (token) => token === "text-bold",
      apply: (el) => {
        el.style.fontWeight = "bold";
      },
    },
    {
      match: (token) => token === "text-center",
      apply: (el) => {
        el.style.textAlign = "center";
      },
    },
    {
      match: (token) => token.startsWith("text-"),
      apply: (el, token) => {
        const value = getUtilityValue(token);
        const pixelValue = getPixelValue(value);

        if (pixelValue) {
          el.style.fontSize = pixelValue;
          return;
        }

        el.style.color = value;
      },
    },
    {
      match: (token) => token.startsWith("p-"),
      apply: (el, token) => {
        applySpacing(el, "padding", getUtilityValue(token));
      },
    },
    {
      match: (token) => token.startsWith("px-"),
      apply: (el, token) => {
        const spacingValue = getSpacingValue(getUtilityValue(token));

        if (spacingValue) {
          el.style.paddingLeft = spacingValue;
          el.style.paddingRight = spacingValue;
        }
      },
    },
    {
      match: (token) => token.startsWith("py-"),
      apply: (el, token) => {
        const spacingValue = getSpacingValue(getUtilityValue(token));

        if (spacingValue) {
          el.style.paddingTop = spacingValue;
          el.style.paddingBottom = spacingValue;
        }
      },
    },
    {
      match: (token) => token.startsWith("m-"),
      apply: (el, token) => {
        applySpacing(el, "margin", getUtilityValue(token));
      },
    },
    {
      match: (token) => token.startsWith("w-"),
      apply: (el, token) => {
        const pixelValue = getPixelValue(getUtilityValue(token));

        if (pixelValue) {
          el.style.width = pixelValue;
        }
      },
    },
    {
      match: (token) => token.startsWith("h-"),
      apply: (el, token) => {
        const pixelValue = getPixelValue(getUtilityValue(token));

        if (pixelValue) {
          el.style.height = pixelValue;
        }
      },
    },
    {
      match: (token) => token === "flex",
      apply: (el) => {
        el.style.display = "flex";
      },
    },
    {
      match: (token) => token === "flex-center",
      apply: (el) => {
        el.style.display = "flex";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
      },
    },
    {
      match: (token) => token === "border",
      apply: (el) => {
        el.style.border = DEFAULT_BORDER;
      },
    },
    {
      match: (token) => token === "rounded",
      apply: (el) => {
        el.style.borderRadius = DEFAULT_RADIUS;
      },
    },
    {
      match: (token) => token === "shadow-soft",
      apply: (el) => {
        el.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.2)";
      },
    },
    {
      match: (token) => token === "shadow-hard",
      apply: (el) => {
        el.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.5)";
      },
    },
    {
      match: (token) => token.startsWith("glow-"),
      apply: (el, token) => {
        el.style.boxShadow = `0 0 15px ${getUtilityValue(token)}`;
      },
    },
    {
      match: (token) => token.startsWith("shadow-"),
      apply: (el, token) => {
        const depth = Number(getUtilityValue(token));

        if (!Number.isNaN(depth)) {
          el.style.boxShadow = `0 ${depth}px ${depth * 2}px rgba(0, 0, 0, 0.3)`;
        }
      },
    },
    {
      match: (token) => token === "card-3d",
      apply: (el) => {
        if (el.dataset.twCard3dBound === "true") {
          return;
        }

        el.dataset.twCard3dBound = "true";
        el.style.transition = "transform 0.1s ease";

        el.addEventListener("mousemove", (event) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const midX = rect.width / 2;
          const midY = rect.height / 2;
          const rotateY = (x - midX) / 10;
          const rotateX = (midY - y) / 10;

          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        el.addEventListener("mouseleave", () => {
          el.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
      },
    },
  ];
}

function applyUtilityToken(el, token) {
  const handlers = utilityHandlers();
  const matchingHandler = handlers.find((handler) => handler.match(token));

  if (matchingHandler) {
    matchingHandler.apply(el, token);
  }
}

export function applyUtilities(root = document) {
  if (typeof document === "undefined" || !root?.querySelectorAll) {
    return;
  }

  const elements = root.querySelectorAll("[class]");

  elements.forEach((el) => {
    el.classList.forEach((className) => {
      if (!className.startsWith(CLASS_PREFIX)) {
        return;
      }

      const token = className.slice(CLASS_PREFIX.length);
      applyUtilityToken(el, token);
    });
  });
}

export function createComponent(render) {
  return class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = render();
      applyUtilities(this);
    }
  };
}

export function initEngine() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  applyUtilities(document);
}
