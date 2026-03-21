export function initEngine() {
  const elements = document.querySelectorAll("[class]");

  elements.forEach((el) => {
    el.classList.forEach((cls) => {
      if (!cls.startsWith("tw-")) return;
      const actual = cls.slice(3);

      if (actual.startsWith("bg-")) {
        const val = actual.split("-")[1];
        el.style.backgroundColor = val;
      }

      if (actual === "text-bold") {
        el.style.fontWeight = "bold";
      }

      if (actual === "text-center") {
        el.style.textAlign = "center";
      }

      if (actual.startsWith("text-")) {
        const val = actual.split("-")[1];
        if (isNaN(val)) {
          el.style.color = val;
        } else {
          el.style.fontSize = `${val}px`;
        }
      }

      if (actual.startsWith("p-")) {
        const val = actual.split("-")[1];
        el.style.padding = `${val * 4}px`;
      }

      if (actual.startsWith("px-")) {
        const val = actual.split("-")[1];
        const space = `${val * 4}px`;
        el.style.paddingLeft = space;
        el.style.paddingRight = space;
      }

      if (actual.startsWith("py-")) {
        const val = actual.split("-")[1];
        const space = `${val * 4}px`;
        el.style.paddingTop = space;
        el.style.paddingBottom = space;
      }

      if (actual.startsWith("m-")) {
        const val = actual.split("-")[1];
        el.style.margin = `${val * 4}px`;
      }

      if (actual.startsWith("w-")) {
        const val = actual.split("-")[1];
        el.style.width = `${val}px`;
      }

      if (actual.startsWith("h-")) {
        const val = actual.split("-")[1];
        el.style.height = `${val}px`;
      }

      if (actual === "flex") {
        el.style.display = "flex";
      }

      if (actual === "flex-center") {
        el.style.display = "flex";
        el.style.justifyContent = "center";
        el.style.alignItems = "center";
      }

      if (actual === "border") {
        el.style.border = "1px solid #ccc";
      }

      if (actual === "rounded") {
        el.style.borderRadius = "8px";
      }

      if (actual === "shadow-soft") {
        el.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
      }

      if (actual === "shadow-hard") {
        el.style.boxShadow = "0 15px 30px rgba(0,0,0,0.5)";
      }

      if (actual.startsWith("glow-")) {
        const color = actual.split("-")[1];
        el.style.boxShadow = `0 0 15px ${color}`;
      }

      if (actual.startsWith("shadow-")) {
        const val = actual.split("-")[1];
        if (!isNaN(val)) {
          el.style.boxShadow = `0 ${val}px ${val * 2}px rgba(0,0,0,0.3)`;
        }
      }

      if (actual === "card-3d") {
        el.style.transition = "transform 0.1s ease";
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const midX = rect.width / 2;
          const midY = rect.height / 2;
          const rotateY = (x - midX) / 10;
          const rotateX = (midY - y) / 10;
          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
      }
    });
  });
}

if (typeof window !== "undefined" && typeof customElements !== "undefined") {
  if (!customElements.get("login-card")) {
    customElements.define("login-card", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div class="tw-p-4 tw-bg-blue tw-rounded tw-shadow-soft">
            <h2 class="tw-text-white">Login</h2>
            <input placeholder="Username" class="tw-m-2" />
            <input placeholder="Password" type="password" class="tw-m-2" />
            <button class="tw-m-2">Login</button>
          </div>
        `;
      }
    });
  }

  if (!customElements.get("fancy-btn")) {
    customElements.define("fancy-btn", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <button class="tw-p-2 tw-bg-blue tw-text-white tw-rounded">
            <slot></slot>
          </button>
        `;
      }
    });
  }

  if (!customElements.get("glass-card")) {
    customElements.define("glass-card", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div class="glass tw-p-4 tw-rounded">
            <slot></slot>
          </div>
        `;
      }
    });
  }

  if (!customElements.get("card-3d")) {
    customElements.define("card-3d", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div class="tw-card-3d tw-p-4 tw-bg-blue tw-rounded tw-text-white">
            <slot></slot>
          </div>
        `;
      }
    });
  }

  if (!customElements.get("gol-roti")) {
    customElements.define("gol-roti", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div class="tw-w-100 tw-h-100 tw-rounded tw-bg-yellow"></div>
        `;
      }
    });
  }

  if (!customElements.get("spin-loader")) {
    customElements.define("spin-loader", class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <div style="
            width:40px;
            height:40px;
            border:5px solid #ccc;
            border-top:5px solid blue;
            border-radius:50%;
            animation: spin 1s linear infinite;
          "></div>

          <style>
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        `;
      }
    });
  }
}
