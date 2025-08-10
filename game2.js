//word search variables
const WORDS = ["GRATITUDE","POSITIVITY","BREATHE","SMILE","WELLBEING","KINDNESS","HOPE","CALM","JOY","EMPATHY"];
const GRID_SIZE = 12;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//data structures
let wsGrid = [];
let wsCells = [];
let dragStart = null;
// UI elements
const wsGridEl = document.getElementById("wsGrid");
const wsWordListEl = document.getElementById("wsWordList");
const resetBtn = document.getElementById("resetBtn");
const hintBtn = document.getElementById("hintBtn");

//state variables
let foundWords = new Set();
let hintUsed = false;
let wordPositions = new Map(); 

//directions
const DIRS = [
  [0,1],[1,0],[0,-1],[-1,0],
  [1,1],[1,-1],[-1,1],[-1,-1]
];

//empty grid
function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
}

//checks if a word can be placed
function canPlace(word, r, c, dr, dc, grid) {
  for (let i = 0; i < word.length; i++) {
    const rr = r + dr * i;
    const cc = c + dc * i;
    if (rr < 0 || rr >= GRID_SIZE || cc < 0 || cc >= GRID_SIZE) return false;
    const ch = grid[rr][cc];
    if (ch && ch !== word[i]) return false;
  }
  return true;
}

//places word
function placeWord(word, grid) {
  let attempts = 0;
  while (attempts < 200) {
    const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    if (canPlace(word, r, c, dr, dc, grid)) {
      const positions = [];
      for (let i = 0; i < word.length; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        grid[nr][nc] = word[i];
        positions.push({r: nr, c: nc});
      }
      wordPositions.set(word, {start: {r, c}, dir: [dr, dc], positions});
      return true;
    }
    attempts++;
  }
  return false;
}

//fills rest w random letters
function fillRandom(grid) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    }
  }
}

//builds UI
function buildUI(grid) {
  wsGridEl.innerHTML = "";
  wsGridEl.style.display = "grid";
  wsGridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 40px)`;
  wsGridEl.style.gridTemplateRows = `repeat(${GRID_SIZE}, 40px)`;
  wsGridEl.style.gap = "4px";
  wsGridEl.style.userSelect = "none";
  wsCells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement("div");
      cell.className = "ws-cell";
      cell.textContent = grid[r][c];
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.border = "1px solid #bbb";
      cell.style.borderRadius = "6px";
      cell.style.background = "#fff";
      cell.style.fontWeight = "700";
      cell.style.fontFamily = "Inter, sans-serif";
      cell.style.color = "#284b63";
      wsGridEl.appendChild(cell);
      wsCells.push(cell);
    }
  }
}

//builds word list
function buildWordList() {
  wsWordListEl.innerHTML = "";
  WORDS.forEach(w => {
    const el = document.createElement("div");
    el.textContent = w.toLowerCase();
    el.style.padding = "6px 10px";
    el.style.margin = "6px 0";
    el.style.borderRadius = "8px";
    el.style.background = "#eaf4ff";
    el.style.color = "#204060";
    el.dataset.word = w;
    wsWordListEl.appendChild(el);
  });
}

//regenerate puzzle
function regenerate() {
  wsGrid = createEmptyGrid();
  wordPositions.clear();
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  for (const w of shuffled) placeWord(w, wsGrid);
  fillRandom(wsGrid);
  buildUI(wsGrid);
  buildWordList();
  
  foundWords.clear();
  hintUsed = false;
  
  if (hintBtn) {
    hintBtn.disabled = false;
    hintBtn.style.opacity = '1';
    hintBtn.style.cursor = 'pointer';
  }
}

// get line cells between two pts
function getLineCells(r1, c1, r2, c2) {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
  const cells = [];
  for (let i = 0; i < len; i++) {
    const rr = r1 + dr * i;
    const cc = c1 + dc * i;
    cells.push([rr, cc]);
  }
  return cells;
}

//convert cells 2 str
function stringifyCells(cells) {
  return cells.map(([r,c]) => wsGrid[r][c]).join("");
}

wsGridEl.addEventListener("pointerdown", (e) => {
  const cell = e.target.closest(".ws-cell");
  if (!cell) return;
  
  // set pointer capture for better touch/pen support
  wsGridEl.setPointerCapture(e.pointerId);
  
  // get starting position
  dragStart = [Number(cell.dataset.r), Number(cell.dataset.c)];
  
  // clear previous selections
  wsCells.forEach(c => {
    c.classList.remove('selected');
  });
  
  // add initial selection
  cell.classList.add('selected');
  e.preventDefault();
});

wsGridEl.addEventListener("pointermove", (e) => {
  if (!dragStart) return;
  
  // get cell under pointer
  const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest(".ws-cell");
  if (!cell) return;
  
  const r2 = Number(cell.dataset.r);
  const c2 = Number(cell.dataset.c);
  
  const line = getLineCells(dragStart[0], dragStart[1], r2, c2);

  // Update selection state
  wsCells.forEach(c => {
    c.classList.remove('selected');
  });

  // add selection class to cells in current line
  line.forEach(([r,c]) => {
    const idx = r * GRID_SIZE + c;
    if (idx >= 0 && idx < wsCells.length) {
      wsCells[idx].classList.add('selected');
    }
  });
  
  e.preventDefault();
});

//mark cells as found
function markFound(cells, word = null) {
  cells.forEach(([r,c]) => {
    const idx = r * GRID_SIZE + c;
    if (idx >= 0 && idx < wsCells.length) {
      const el = wsCells[idx];
      el.style.background = "#d7f9d7";
      el.style.borderColor = "#2a8a2a";
      el.classList.add('found');
    }
  });
  
  if (word) {
    foundWords.add(word);
  }
}


wsGridEl.addEventListener("pointerup", (e) => {
  if (!dragStart) return;
  
  const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest(".ws-cell");
  if (!cell) {
    wsCells.forEach(c => {
      c.style.outline = "none";
      c.classList.remove('selected');
    });
    dragStart = null;
    return;
  }
  
  const r2 = Number(cell.dataset.r);
  const c2 = Number(cell.dataset.c);
  const line = getLineCells(dragStart[0], dragStart[1], r2, c2);
  const word = stringifyCells(line);
  const reversed = word.split("").reverse().join("");
  const found = WORDS.includes(word) ? word : (WORDS.includes(reversed) ? reversed : null);
  
  //check if found 2 mark cells
  if (found) {
    markFound(line, found);
    const item = wsWordListEl.querySelector(`[data-word='${found}']`);
    if (item) {
      item.style.background = "#d7f9d7";
      item.style.color = "#135213";
      item.style.textDecoration = "line-through";
      item.classList.add('found');
    }
  }
  
  wsCells.forEach(c => {
    if (!c.classList.contains('found')) {
      c.style.outline = "none";
      c.classList.remove('selected');
    }
  });
  
  dragStart = null;
  e.preventDefault();
});


//hint stuff
function showHint() {
  if (hintUsed) {
    alert("You've already used your hint for this puzzle!");
    return;
  }
  
  const unfoundWords = WORDS.filter(word => !foundWords.has(word));
  
  if (unfoundWords.length === 0) {
    alert("All words have been found!");
    return;
  }
  
  const hintWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
  const wordData = wordPositions.get(hintWord);
  
  if (!wordData) {
    console.error('Word position data not found for:', hintWord);
    return;
  }
  
  const firstPos = wordData.start;
  const firstCellIndex = firstPos.r * GRID_SIZE + firstPos.c;
  const firstCell = wsCells[firstCellIndex];
  
  if (!firstCell) {
    console.error('Could not find first cell for hint');
    return;
  }
  firstCell.style.animation = 'pulse 1.5s ease-in-out 3';
  firstCell.style.backgroundColor = '#fff3cd';
  firstCell.style.borderColor = '#ffc107';
  firstCell.style.zIndex = '1';
  
  const item = wsWordListEl.querySelector(`[data-word='${hintWord}']`);
  if (item) {
    item.style.animation = 'pulse 1.5s ease-in-out 3';
    item.style.backgroundColor = '#fff3cd';
    item.style.borderColor = '#ffc107';
  }
  
  setTimeout(() => {
    firstCell.style.animation = '';
    firstCell.style.backgroundColor = '';
    firstCell.style.borderColor = '';
    firstCell.style.zIndex = '';
    
    if (item) {
      item.style.animation = '';
      item.style.backgroundColor = '';
      item.style.borderColor = '';
    }
  }, 4500);
  
  //check if hint was used
  hintUsed = true;
  hintBtn.disabled = true;
  hintBtn.style.opacity = '0.7';
  hintBtn.style.cursor = 'not-allowed';
  

//hint message
  const message = document.createElement('div');
  message.textContent = `Look for "${hintWord}" starting here!`;
  message.style.position = 'fixed';
  message.style.background = '#fff';
  message.style.padding = '8px 16px';
  message.style.borderRadius = '20px';
  message.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  message.style.zIndex = '1000';
  message.style.animation = 'fadeIn 0.1s ease-out';

  const rect = firstCell.getBoundingClientRect();
  message.style.left = `${rect.left + window.scrollX}px`;
  message.style.top = `${rect.top + window.scrollY - 50}px`;
  
  document.body.appendChild(message);

  //win condition
  if (foundWords.size === WORDS.length) {
    setTimeout(() => {
      const congrats = document.createElement('div');
      congrats.textContent = '🎉 All words found! Generating new puzzle... 🎉';
      congrats.style.position = 'fixed';
      congrats.style.top = '20px';
      congrats.style.left = '50%';
      congrats.style.transform = 'translateX(-50%)';
      congrats.style.background = 'rgba(255, 255, 255, 0.95)';
      congrats.style.padding = '15px 25px';
      congrats.style.borderRadius = '30px';
      congrats.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
      congrats.style.zIndex = '2000';
      congrats.style.animation = 'fadeIn 0.5s ease-out';
      document.body.appendChild(congrats);
      
      setTimeout(() => {
        congrats.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => congrats.remove(), 500);
        setTimeout(regenerate, 300);
      }, 2000);
    }, 500);
  }

  setTimeout(() => {
    message.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

if (resetBtn) resetBtn.addEventListener("click", regenerate);
if (hintBtn) hintBtn.addEventListener("click", showHint);

regenerate();