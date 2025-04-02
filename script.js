const generateGrid = function generateGrid (gridContainer, gridSize) {
    const calculateContainerWidth = function calculateContainerWidth (cellWidth, gridGap, gridSize) {
        return ((cellWidth + gridGap) * gridSize - gridGap) + "px"
    }

    const giveCellsHoverEffect = function giveCellsHoverEffect () {
        const gridCells = document.querySelectorAll(".grid-cell");

        // Add hovering effect on each cell
        gridCells.forEach( (cell) => {
            cell.addEventListener("mouseenter", (event) => {
                event.target.style.backgroundColor = "blue"
            });
        });
    }

    // TASK: Make this dynamic
    const WIDTH = 45;
    const HEIGHT = WIDTH;
    const GAP = 8;
    const gridDimension = gridSize * gridSize;

    // Clear grid
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    // Calculate container width
    gridContainer.style.width = calculateContainerWidth(WIDTH, GAP, gridSize);

    // Generate grid cells
    for (let i = 0; i < gridDimension; i++) {
        const gridCell = document.createElement("div");

        // Convert inputted width and height pixel values into string
        gridCell.style.width = WIDTH + "px";
        gridCell.style.height = HEIGHT + "px";
        gridCell.classList.add("grid-cell");

        gridContainer.appendChild(gridCell);
    }

    giveCellsHoverEffect();
}

const getNewGridSize = function getNewGridSize () {
    let promptText = "Define a new grid size (16-100): ";
    let newGridSize = 0;

    while (true) {
        const MAX_GRID_SIZE = 100;
        let userInput = prompt(promptText);

        newGridSize = Number(userInput);

        if (!Number.isInteger(newGridSize)) {
            promptText = `${newGridSize} is not an integer.\n\nDefine a new grid size (16-100): `;
        } else if (newGridSize < MINIMUM_GRID_SIZE) {
            promptText = `${newGridSize} is less than the minimum grid size of ${MINIMUM_GRID_SIZE}.\n\nDefine a new grid size (16-100): `;
        } else if (newGridSize > MAX_GRID_SIZE) {
            promptText = `${newGridSize} is greater than the maximum grid size of ${MAX_GRID_SIZE}.\n\nDefine a new grid size (16-100): `
        } else {
            break;
        }   
    }

    return newGridSize;
}

const MINIMUM_GRID_SIZE = 16;
const mainContainer = document.querySelector(".main-container");
const resetButton = document.querySelector(".reset-button");
const generateButton = document.querySelector(".generate-button");

generateGrid(mainContainer, MINIMUM_GRID_SIZE);

generateButton.addEventListener("click", () => {
    let newGridSize = getNewGridSize();
    generateGrid(mainContainer, newGridSize);
});