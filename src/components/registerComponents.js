import { applyUtilities, createComponent } from "../core/engine.js";

const componentRegistry = [
  {
    tagName: "login-card",
    render: () => `
      <div class="tw-p-4 tw-bg-blue tw-rounded tw-shadow-soft">
        <h2 class="tw-text-white">Login</h2>
        <input placeholder="Username" class="tw-m-2" />
        <input placeholder="Password" type="password" class="tw-m-2" />
        <button class="tw-m-2">Login</button>
      </div>
    `,
  },
  {
    tagName: "fancy-btn",
    render: () => `
      <button class="tw-p-2 tw-bg-blue tw-text-white tw-rounded">
        <slot></slot>
      </button>
    `,
  },
  {
    tagName: "glass-card",
    render: () => `
      <div class="glass tw-p-4 tw-rounded">
        <slot></slot>
      </div>
    `,
  },
  {
    tagName: "card-3d",
    render: () => `
      <div class="tw-card-3d tw-p-4 tw-bg-blue tw-rounded tw-text-white">
        <slot></slot>
      </div>
    `,
  },
  {
    tagName: "gol-roti",
    render: () => `
      <div class="tw-w-100 tw-h-100 tw-rounded tw-bg-yellow"></div>
    `,
  },
  {
    tagName: "spin-loader",
    render: () => `
      <div
        style="
          width: 40px;
          height: 40px;
          border: 5px solid #ccc;
          border-top: 5px solid blue;
          border-radius: 50%;
          animation: tw-spin 1s linear infinite;
        "
      ></div>
      <style>
        @keyframes tw-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `,
  },
];

export function registerComponents() {
  if (typeof window === "undefined" || typeof customElements === "undefined") {
    return;
  }

  componentRegistry.forEach(({ tagName, render }) => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, createComponent(render));
    }
  });
}

export function initTalwinder() {
  registerComponents();
  applyUtilities(document);
}
