const calculateContainerWidth = function calculateContainerWidth (gridContainer, gridWidth, gridGap) {
    const GRID_ROW_LENGTH = 16;
    // Convert computed width pixel value into string 
    gridContainer.style.width = ((gridWidth + gridGap) * GRID_ROW_LENGTH - gridGap) + "px";
}

const generateGridCells = function generateGridCells (cellHeight, cellWidth, gridSize = 16) {
    const DEFAULT_GRID_SIZE = gridSize * gridSize;

    for (let i = 0; i < DEFAULT_GRID_SIZE; i++) {
        let gridCell = document.createElement("div");
        // Convert inputted width and height pixel values into string
        gridCell.style.width = cellWidth + "px";
        gridCell.style.height = cellHeight + "px";
        gridCell.classList.add("grid-cell");
        mainContainer.appendChild(gridCell);
    }
}

const changeCellColor = function changeCellColor (event) {
    const currentCell = event.target;

    currentCell.style.backgroundColor = "blue";
}

const WIDTH = 45;
const HEIGHT = WIDTH;
const GAP = 8;
const mainContainer = document.querySelector(".main-container");

calculateContainerWidth(mainContainer, WIDTH, GAP);
generateGridCells(HEIGHT, WIDTH);

const gridCells = document.querySelectorAll(".grid-cell");

// Add hovering effect on each cell
gridCells.forEach( (cell) => {
    cell.addEventListener("mouseenter", (event) => {
        changeCellColor(event);
    });
});