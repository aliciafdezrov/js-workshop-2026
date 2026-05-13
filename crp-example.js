// CRP Example - beginner friendly
// This file is intentionally simple and verbose for teaching.

// Small helper to print messages on screen and in the console.
function addLog(message) {
  const logList = document.getElementById("log-list");
  const item = document.createElement("li");
  item.textContent = message;
  logList.appendChild(item);
  console.log(message);
}

// 1) This runs when the script is parsed and executed.
addLog("1) JavaScript file executed while HTML parsing is in progress.");

// 2) DOMContentLoaded: HTML is parsed and DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
  addLog("2) DOMContentLoaded fired: DOM is ready.");

  // Update UI when the DOM is ready.
  document.getElementById("status-dom").textContent = "Ready";

  // Simulate a little JS work before painting updates.
  // This is only for demonstration. In real apps keep JS light.
  const start = performance.now();
  while (performance.now() - start < 120) {
    // Busy loop to simulate main-thread blocking.
  }

  addLog("3) Small JS task finished (simulated main-thread work).");
});

// 3) load: all resources are fully loaded (images, CSS, etc.).
window.addEventListener("load", function () {
  addLog("4) window load fired: all resources finished loading.");
  document.getElementById("status-page").textContent = "Fully loaded";

  const box = document.getElementById("paint-reflow-box");
  const reflowButton = document.getElementById("btn-reflow");
  const repaintButton = document.getElementById("btn-repaint");

  // This changes WIDTH, so layout must be recalculated (Reflow).
  reflowButton.addEventListener("click", function () {
    const currentWidth = box.offsetWidth;
    const newWidth = currentWidth === 140 ? 220 : 140;
    box.style.width = newWidth + "px";
    addLog("5) Reflow example: box width changed to " + newWidth + "px.");
  });

  // This changes only COLOR, so the browser repaints pixels (Repaint).
  repaintButton.addEventListener("click", function () {
    const isGreen = box.dataset.colorState !== "orange";

    if (isGreen) {
      box.style.background = "linear-gradient(160deg, #f59e0b, #f97316)";
      box.dataset.colorState = "orange";
      addLog("6) Repaint example: box color changed to orange tones.");
    } else {
      box.style.background = "linear-gradient(160deg, #0f766e, #0ea5a8)";
      box.dataset.colorState = "green";
      addLog("7) Repaint example: box color changed back to green tones.");
    }
  });
});
