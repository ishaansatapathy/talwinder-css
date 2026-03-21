import { initEngine } from "./core/engine.js";

document.querySelector("#app").innerHTML = `
  <div class="tw-p-4">
    <h1 class="tw-text-28 tw-text-center tw-text-bold">Talwinder Demo</h1>
    <p class="tw-text-center tw-m-2">Simple utility engine test</p>

    <div class="tw-flex-center tw-p-4">
      <div class="tw-bg-black tw-text-white tw-p-4 tw-rounded tw-shadow-soft">
        Hello from Talwinder
      </div>
    </div>

    <div class="tw-flex-center tw-p-4">
      <fancy-btn>Click Me</fancy-btn>
    </div>

    <div class="tw-flex-center tw-p-4">
      <login-card></login-card>
    </div>
  </div>
`;

initEngine();
