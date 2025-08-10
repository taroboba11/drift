function createGridData() {
 //creates 30x30 grid and fills with 2(sky blue) 
  const rowsCount = 30;
  const colsCount = 30;
  const grid = Array.from({ length: rowsCount }, () => Array(colsCount).fill(2));
  //set grid cell value if within bounds
  const setSafe = (r, c, v) => { if (r >= 0 && r < rowsCount && c >= 0 && c < colsCount) grid[r][c] = v; };
  //filled circle + ellipse
  const circle = (cr, cc, radius, v) => { for (let r = 0; r < rowsCount; r++) { for (let c = 0; c < colsCount; c++) { const dr = r - cr; const dc = c - cc; if (dr*dr + dc*dc <= radius*radius) grid[r][c] = v; } } };
  const ellipse = (cr, cc, rr, rc, v) => { for (let r = 0; r < rowsCount; r++) { for (let c = 0; c < colsCount; c++) { const nr = (r - cr) / rr; const nc = (c - cc) / rc; if (nr*nr + nc*nc <= 1) grid[r][c] = v; } } };
  //grass
  for (let r = 24; r < rowsCount; r++) { for (let c = 0; c < colsCount; c++) { grid[r][c] = 3; } }
  //sun
  circle(6, 6, 4, 1);
  //clouds
  const addCloudCumulus = (cr, cc, s = 1) => {
    const puffs = [
      [0, 0, 2.2 * s],
      [0, -2.2 * s, 2.0 * s],
      [0, 2.2 * s, 2.0 * s],
      [-1.6 * s, -1.2 * s, 1.6 * s],
      [-1.6 * s, 1.2 * s, 1.6 * s],
      [-2.6 * s, 0, 1.3 * s]
    ];
    puffs.forEach(([dr, dc, rad]) => circle(cr + dr, cc + dc, rad, 6));
  };
  addCloudCumulus(7.5, 18, 1.0);
  addCloudCumulus(9.0, 26, 0.9);
  //tree trunk
  for (let r = 14; r <= 26; r++) { setSafe(r, 24, 4); setSafe(r, 25, 4); }
  //leaves
  ellipse(17, 25, 5.5, 6.5, 5);
  //flower stem
  for (let r = 20; r <= 28; r++) setSafe(r, 6, 5);
  setSafe(22, 5, 5); setSafe(22, 7, 5);
  //flower center
  const fcR = 20, fcC = 6;
  setSafe(fcR, fcC, 8);
  //flower petals
  const petals = [ [fcR-1, fcC], [fcR+1, fcC], [fcR, fcC-1], [fcR, fcC+1], [fcR-1, fcC-1], [fcR-1, fcC+1], [fcR+1, fcC-1], [fcR+1, fcC+1] ];
  petals.forEach(([r,c]) => setSafe(r, c, 7));
  return grid;
}

//initial grid
const gridData = createGridData();

//color palette
const paletteColors = [
  { num: 1, color: "#FFD93B", name: "Sun Yellow" },
  { num: 2, color: "#7EC8E3", name: "Sky Blue" },
  { num: 3, color: "#3BB54A", name: "Grass Green" },
  { num: 4, color: "#8B5E3C", name: "Tree Brown" },
  { num: 5, color: "#4AAE4F", name: "Leaf Green" },
  { num: 6, color: "#FFFFFF", name: "Cloud White" },
  { num: 7, color: "#F08AA0", name: "Flower Pink" },
  { num: 8, color: "#FFDD59", name: "Flower Center Yellow" }
];

//get HTML elements for features
const grid = document.getElementById("grid");
const palette = document.getElementById("palette");
const selectedColorText = document.getElementById("selectedColorText");
const selectedColorSwatch = document.getElementById("selectedColorSwatch");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const hintToggle = document.getElementById("hintToggle");
const previewToggle = document.getElementById("previewToggle");
const statusMessage = document.getElementById("statusMessage");
const undoBtn = document.getElementById("undoBtn");
const resetBtn = document.getElementById("resetBtn");
const previewBtn = document.getElementById("previewBtn");

//track state + selected color
let selectedColorNum = 1;
let isPainting = false;
//track filled
let filledSet = new Set();
let undoStack = [];
//grid dimensions
const rows = gridData.length;
const cols = gridData[0].length;
const totalFillable = gridData.flat().filter(n => n !== 0).length;

//color balette
function buildPalette() {
  palette.innerHTML = "";
  paletteColors.forEach(({num, color, name}) => {
    const swatch = document.createElement("div");
    swatch.classList.add("color-swatch");
    if(num === selectedColorNum) swatch.classList.add("selected");
    swatch.title = `${num} - ${name}`;
    swatch.dataset.num = num;
    swatch.dataset.color = color;
    swatch.tabIndex = 0;

    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;

    const colorNum = document.createElement("div");
    colorNum.classList.add("color-num");
    colorNum.textContent = num;

    swatch.appendChild(colorBox);
    swatch.appendChild(colorNum);
    palette.appendChild(swatch);

    swatch.addEventListener("click", () => selectPalette(num));
    swatch.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        selectPalette(num);
      }
    });
  });
  updateSelectedColorUI();
}

//palette cilor selection
function selectPalette(num) {
  selectedColorNum = num;
  document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
  const selected = Array.from(document.querySelectorAll(".color-swatch")).find(s => Number(s.dataset.num) === num);
  if (selected) selected.classList.add("selected");
  updateSelectedColorUI();
  updateHighlights();
  saveState();
}

//create grid UI
function buildGrid() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 30px)`;
  for(let r = 0; r < gridData.length; r++) {
    for(let c = 0; c < gridData[r].length; c++) {
      const num = gridData[r][c];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.num = num;
      const index = r * cols + c;
      cell.dataset.index = String(index);
      cell.tabIndex = num === 0 ? -1 : 0;
      cell.style.backgroundColor = num === 0 ? "#d0f0ff" : "";
      cell.style.cursor = num === 0 ? "default" : "pointer";
      cell.textContent = num === 0 ? "" : num;
      //logic for mouse and keyboard interactions
      cell.addEventListener("pointerdown", (e) => {
        if (num === 0) return;
        isPainting = true;
        fillCell(cell, num);
        cell.setPointerCapture(e.pointerId);
      });
      cell.addEventListener("pointerenter", () => {
        if (!isPainting || num === 0) return;
        fillCell(cell, num);
      });
      cell.addEventListener("pointerup", () => {
        isPainting = false;
      });
      cell.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && num !== 0) {
          fillCell(cell, num);
        }
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
          e.preventDefault();
          const next = nextIndexByArrow(index, e.key);
          const nextEl = grid.querySelector(`.cell[data-index='${next}']`);
          if (nextEl) nextEl.focus();
        }
      });

      grid.appendChild(cell);
    }
  }
  //call functions
  applySavedFills();
  updateHighlights();
  updateProgress();
  applyPreviewIfEnabled();
}

//try filling cell
function fillCell(cell, num) {
  if(num === 0) return;
  if(cell.classList.contains("filled")) return;
  if(num === selectedColorNum) {
    cell.style.backgroundColor = paletteColors.find(c => c.num === num).color;
    cell.classList.add("filled");
    cell.textContent = "";
    const idx = Number(cell.dataset.index);
    if (!filledSet.has(idx)) {
      filledSet.add(idx);
      undoStack.push(idx);
      updateProgress();
      saveState();
    checkComplete();
    }
  } else {
    const originalBg = cell.style.backgroundColor;
    const originalBorder = cell.style.border;
    cell.style.backgroundColor = "#ffe8e8";
    cell.style.border = "2px solid #d83b01";
    setTimeout(() => {
      cell.style.backgroundColor = originalBg;
      cell.style.border = originalBorder || "1px solid #bbb";
    }, 220);
  }
}

//check if all cells are filled
function checkComplete() {
  const cells = grid.querySelectorAll(".cell");
  for(let cell of cells) {
    const n = parseInt(cell.dataset.num);
    if(n !== 0 && !cell.classList.contains("filled")) return;
  }
  if (statusMessage) {
    statusMessage.textContent = "🎉 You completed the nature scene! Great job!";
  }
}

//ui update 4 selected color
function updateSelectedColorUI() {
  const meta = paletteColors.find(c => c.num === selectedColorNum);
  if (selectedColorText) {
    selectedColorText.textContent = `Selected: ${meta.num} - ${meta.name}`;
  }
  if (selectedColorSwatch) {
    selectedColorSwatch.style.backgroundColor = meta.color;
  }
}

//fill progress bar
function updateProgress() {
  const filledCount = filledSet.size;
  const percent = Math.round((filledCount / totalFillable) * 100);
  if (progressText) progressText.textContent = `Progress: ${filledCount}/${totalFillable} (${percent}%)`;
  if (progressBar) progressBar.style.width = `${percent}%`;
}

//target cells
function updateHighlights() {
  const enabled = hintToggle && hintToggle.checked;
  const cells = grid.querySelectorAll(".cell");
  cells.forEach(cell => {
    const n = Number(cell.dataset.num);
    if (enabled && n === selectedColorNum && !cell.classList.contains("filled")) {
      cell.style.outline = "2px dashed #2d7ef7";
      cell.style.outlineOffset = "-2px";
    } else {
      cell.style.outline = "none";
    }
  });
}

//show/hide preview
function applyPreviewIfEnabled() {
  const enabled = previewToggle && previewToggle.checked;
  const cells = grid.querySelectorAll(".cell");
  cells.forEach(cell => {
    const n = Number(cell.dataset.num);
    if (enabled && n !== 0) {
      const color = paletteColors.find(c => c.num === n)?.color;
      cell.dataset.preview = "1";
      cell.style.backgroundImage = color ? `linear-gradient(0deg, ${color}, ${color})` : "";
      cell.style.backgroundColor = color || cell.style.backgroundColor;
      cell.classList.add("filled");
      cell.textContent = "";
    } else if (cell.dataset.preview === "1") {
      delete cell.dataset.preview;
      const num = Number(cell.dataset.num);
      if (!filledSet.has(Number(cell.dataset.index))) {
        cell.classList.remove("filled");
        cell.textContent = num === 0 ? "" : String(num);
        cell.style.backgroundImage = "none";
        cell.style.backgroundColor = num === 0 ? "#d0f0ff" : "white";
      }
    }
  });
}

// calculate the next cell index based on arrow keyy
function nextIndexByArrow(index, key) {
  const r = Math.floor(index / cols);
  const c = index % cols;
  if (key === "ArrowUp") return Math.max(0, (r - 1) * cols + c);
  if (key === "ArrowDown") return Math.min(rows * cols - 1, (r + 1) * cols + c);
  if (key === "ArrowLeft") return Math.max(0, r * cols + (c - 1));
  if (key === "ArrowRight") return Math.min(rows * cols - 1, r * cols + (c + 1));
  return index;
}

//save grid state to localStorage
function saveState() {
  try {
    const payload = {
      filled: Array.from(filledSet),
      selectedColorNum
    };
    localStorage.setItem("game1State", JSON.stringify(payload));
  } catch {}
}

//load saved state from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem("game1State");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.filled)) {
      filledSet = new Set(data.filled.map(Number));
    }
    if (typeof data.selectedColorNum === "number") {
      selectedColorNum = data.selectedColorNum;
    }
  } catch {}
}

//apply saved fills to grid
function applySavedFills() {
  if (!filledSet || filledSet.size === 0) return;
  filledSet.forEach(idx => {
    const cell = grid.querySelector(`.cell[data-index='${idx}']`);
    if (!cell) return;
    const num = Number(cell.dataset.num);
    const color = paletteColors.find(c => c.num === num)?.color;
    if (num !== 0 && color) {
      cell.classList.add("filled");
      cell.textContent = "";
      cell.style.backgroundColor = color;
    }
  });
}

//clears + resets
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    filledSet.clear();
    undoStack = [];
    if (statusMessage) statusMessage.textContent = "";
  buildGrid();
    saveState();
  });
}

//clears last filled cell
if (undoBtn) {
  undoBtn.addEventListener("click", () => {
    const idx = undoStack.pop();
    if (idx == null) return;
    if (filledSet.has(idx)) filledSet.delete(idx);
    const cell = grid.querySelector(`.cell[data-index='${idx}']`);
    if (cell) {
      const num = Number(cell.dataset.num);
      cell.classList.remove("filled");
      cell.textContent = num === 0 ? "" : String(num);
      cell.style.backgroundColor = num === 0 ? "#d0f0ff" : "white";
    }
    if (statusMessage) statusMessage.textContent = "";
    updateProgress();
    updateHighlights();
    saveState();
  });
}

//toggles target
if (hintToggle) {
  hintToggle.addEventListener("change", updateHighlights);
}

//preview final image
if (previewToggle) {
  previewToggle.addEventListener("change", applyPreviewIfEnabled);
}

//preview button
if (previewBtn) {
  previewBtn.addEventListener("click", () => {
    if (!previewToggle) return;
    previewToggle.checked = !previewToggle.checked;
    applyPreviewIfEnabled();
  });
}

//stop when mouse is released
window.addEventListener("pointerup", () => {
  isPainting = false;
});

document.addEventListener("keydown", (e) => {
  const num = Number(e.key);
  if (num >= 1 && num <= 8) {
    selectPalette(num);
  }
});

//build UI
loadState();
buildPalette();
buildGrid();


