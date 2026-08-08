// ============ State ============
let expr = "";
let isDeg = true;
let memory = 0;
let ans = 0;

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const modeTag = document.getElementById("modeTag");
const degRadBtn = document.getElementById("degRad");

// ============ Degree-aware trig helpers (built on Math object) ============
function sinDeg(x) { return Math.sin((x * Math.PI) / 180); }
function cosDeg(x) { return Math.cos((x * Math.PI) / 180); }
function tanDeg(x) { return Math.tan((x * Math.PI) / 180); }

function factorial(n) {
  n = Math.round(n);
  if (n < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// ============ Display helpers ============
function prettify(str) {
  return str
    .replaceAll("*", "×")
    .replaceAll("/", "÷")
    .replaceAll("sqrt(", "√(")
    .replaceAll("pi", "π");
}

function render() {
  expressionEl.textContent = prettify(expr);
}

function showResult(val) {
  resultEl.textContent = val;
}

// ============ Convert user-facing expression into a real JS expression ============
function toEvalString(str) {
  let out = str;

  out = out.replaceAll("sqrt(", "Math.sqrt(");
  out = out.replaceAll("log(", "Math.log10(");
  out = out.replaceAll("ln(", "Math.log(");

  if (isDeg) {
    out = out.replaceAll("sin(", "sinDeg(");
    out = out.replaceAll("cos(", "cosDeg(");
    out = out.replaceAll("tan(", "tanDeg(");
  } else {
    out = out.replaceAll("sin(", "Math.sin(");
    out = out.replaceAll("cos(", "Math.cos(");
    out = out.replaceAll("tan(", "Math.tan(");
  }

  out = out.replaceAll("pi", "Math.PI");
  out = out.replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, "Math.E");
  out = out.replaceAll("^", "**");

  // Postfix factorial: 5! -> factorial(5)
  out = out.replace(/(\d+(\.\d+)?)!/g, "factorial($1)");
  // Postfix percent: 20% -> (20/100)
  out = out.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  return out;
}

// ============ Core actions ============
function appendToken(tok) {
  expr += tok;
  render();
}

function clearAll() {
  expr = "";
  render();
  showResult("0");
}

function backspace() {
  expr = expr.slice(0, -1);
  render();
}

function calculate() {
  if (!expr) return;

  try {
    const evalStr = toEvalString(expr);
    // Controlled, sandboxed evaluation of a math-only expression built entirely
    // from our own button tokens (no external/user-typed strings reach this).
    const value = Function(
      "sinDeg", "cosDeg", "tanDeg", "factorial",
      `"use strict"; return (${evalStr});`
    )(sinDeg, cosDeg, tanDeg, factorial);

    if (typeof value !== "number" || !isFinite(value)) {
      throw new Error("Invalid result");
    }

    const rounded = Math.round(value * 1e10) / 1e10;
    ans = rounded;
    showResult(rounded);
    history.push({ expr: expr, result: rounded });
    if (typeof renderHistory === "function") renderHistory();
    expr = String(rounded);
    render();
  } catch (err) {
    showResult("Error");
  }
}

// ============ Button wiring ============
document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.val;
    const action = btn.dataset.action;

    if (val !== undefined) {
      appendToken(val);
      return;
    }

    switch (action) {
      case "clear":
        clearAll();
        break;
      case "backspace":
        backspace();
        break;
      case "equals":
        calculate();
        break;
      case "square":
        appendToken("^2");
        break;
      case "percent":
        appendToken("%");
        break;
      case "ans":
        appendToken(String(ans));
        break;
    }
  });
});

// ============ Degree / Radian toggle ============
degRadBtn.addEventListener("click", () => {
  isDeg = !isDeg;
  const label = isDeg ? "DEG" : "RAD";
  degRadBtn.textContent = label;
  modeTag.textContent = label;
  degRadBtn.classList.toggle("active", !isDeg);
});

// ============ Memory functions ============
document.getElementById("memAdd").addEventListener("click", () => {
  const current = parseFloat(resultEl.textContent);
  if (!isNaN(current)) memory += current;
});

document.getElementById("memRecall").addEventListener("click", () => {
  appendToken(String(memory));
});

document.getElementById("memClear").addEventListener("click", () => {
  memory = 0;
});

// ============ Keyboard support ============
document.addEventListener("keydown", (e) => {
  const allowedChars = "0123456789.+-*/()";

  if (allowedChars.includes(e.key)) {
    appendToken(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clearAll();
  }
});

// ============ New state for innovations ============
let soundOn = true;
let history = [];

const calcBody = document.getElementById("calcBody");
const soundToggle = document.getElementById("soundToggle");
const historyToggle = document.getElementById("historyToggle");
const historyDrawer = document.getElementById("historyDrawer");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const copyBtn = document.getElementById("copyBtn");
const copiedFlash = document.getElementById("copiedFlash");

// ============ Click sound (Web Audio API beep) ============
let audioCtx = null;

function playBeep() {
  if (!soundOn) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = 640;
  gain.gain.value = 0.06;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
  osc.stop(audioCtx.currentTime + 0.09);
}

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "🔊" : "🔇";
  soundToggle.classList.toggle("muted", !soundOn);
});

// Beep on every key press
document.querySelectorAll(".key, .icon-btn, .swatch").forEach((el) => {
  el.addEventListener("click", playBeep);
});

// ============ LCD theme switcher ============
document.querySelectorAll(".swatch").forEach((sw) => {
  sw.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((s) => s.classList.remove("active"));
    sw.classList.add("active");

    calcBody.classList.remove("theme-amber", "theme-blue");
    const theme = sw.dataset.theme;
    if (theme === "amber") calcBody.classList.add("theme-amber");
    if (theme === "blue") calcBody.classList.add("theme-blue");
  });
});

// ============ History drawer ============
historyToggle.addEventListener("click", () => {
  historyDrawer.classList.toggle("open");
});

function renderHistory() {
  if (history.length === 0) {
    historyList.innerHTML = '<li class="history-empty">No calculations yet.</li>';
    return;
  }

  historyList.innerHTML = history
    .slice()
    .reverse()
    .map(
      (h, i) => `
        <li data-index="${history.length - 1 - i}">
          <span class="h-expr">${prettify(h.expr)}</span>
          <span class="h-result">= ${h.result}</span>
        </li>`
    )
    .join("");

  document.querySelectorAll(".history-list li[data-index]").forEach((li) => {
    li.addEventListener("click", () => {
      const idx = Number(li.dataset.index);
      expr = String(history[idx].result);
      render();
      historyDrawer.classList.remove("open");
    });
  });
}

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  renderHistory();
});

// ============ Copy result ============
copyBtn.addEventListener("click", () => {
  const text = resultEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copiedFlash.classList.add("show");
    setTimeout(() => copiedFlash.classList.remove("show"), 1000);
  });
});

// ============ Initial paint ============
clearAll();
renderHistory();
