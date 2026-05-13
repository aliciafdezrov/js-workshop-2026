// DOM Optimization Example - beginner friendly
// This file compares a bad approach vs a better approach.

function addDomDemoLog(message) {
  const globalLog = document.getElementById("log-list");

  if (!globalLog) {
    return;
  }

  const item = document.createElement("li");
  item.textContent = message;
  globalLog.appendChild(item);
  console.log(message);
}

function clearDemoList(listElement) {
  listElement.textContent = "";
}

function runBadPerformanceExample(listElement, resultElement) {
  const totalItems = 400;
  const start = performance.now();

  clearDemoList(listElement);

  // Bad pattern:
  // 1) Write to the DOM on every loop iteration.
  // 2) Read layout right after each write (layout thrashing).
  for (let i = 1; i <= totalItems; i += 1) {
    const item = document.createElement("li");
    item.textContent = "Bad item " + i;
    listElement.appendChild(item);

    // Forced layout read after write (expensive in loops).
    void listElement.offsetHeight;
  }

  const end = performance.now();
  const elapsed = (end - start).toFixed(2);

  resultElement.textContent =
    "Bad performance time: " +
    elapsed +
    " ms (direct append + forced layout reads).";

  addDomDemoLog("8) Bad DOM update finished in " + elapsed + " ms.");
}

function runGoodPerformanceExample(listElement, resultElement) {
  const totalItems = 400;
  const start = performance.now();

  clearDemoList(listElement);

  // Better pattern:
  // Build elements in memory first, then append once.
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= totalItems; i += 1) {
    const item = document.createElement("li");
    item.textContent = "Good item " + i;
    fragment.appendChild(item);
  }

  listElement.appendChild(fragment);

  const end = performance.now();
  const elapsed = (end - start).toFixed(2);

  resultElement.textContent =
    "Good performance time: " + elapsed + " ms (batch update with fragment).";

  addDomDemoLog("9) Good DOM update finished in " + elapsed + " ms.");
}

document.addEventListener("DOMContentLoaded", function () { //DOM ready  document.ready of Jquery
  
  const listElement = document.getElementById("dom-demo-list");
  const resultElement = document.getElementById("dom-demo-result");
  const badButton = document.getElementById("btn-dom-bad");
  const goodButton = document.getElementById("btn-dom-good");

  if (!listElement || !resultElement || !badButton || !goodButton) {
    return;
  }

  badButton.addEventListener("click", function () {
    runBadPerformanceExample(listElement, resultElement);
  });

  goodButton.addEventListener("click", function () {
    runGoodPerformanceExample(listElement, resultElement);
  });
});
