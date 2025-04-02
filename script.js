const generateGrid = function generateGrid (gridContainer, gridSize) {
    const giveCellsHoverEffect = function giveCellsHoverEffect () {
        const gridCells = document.querySelectorAll(".grid-cell");

        // Add hovering effect on each cell
        gridCells.forEach( (cell) => {
            cell.addEventListener("mouseenter", (event) => {
                if (event.shiftKey) {  
                    event.target.style.backgroundColor = "blue";
                }
            });
        });
    }

    const containerWidth = Number(window.getComputedStyle(gridContainer).width.slice(0, -2));
    const gridDimension = gridSize * gridSize;
    const cellWidth = containerWidth / gridSize;
    const cellHeight = cellWidth;

    // Clear grid
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    // Generate grid cells
    for (let i = 0; i < gridDimension; i++) {
        const gridCell = document.createElement("div");

        // Convert inputted width and height pixel values into string
        gridCell.style.width = cellWidth + "px";
        gridCell.style.height = cellHeight + "px";
        gridCell.classList.add("grid-cell");

        gridContainer.appendChild(gridCell);
    }

    giveCellsHoverEffect();
}

const getNewGridSize = function getNewGridSize () {
    const maximumGridSize = 100;
    let promptText = "Define a new grid size (16-100): ";
    let newGridSize = 0;

    while (true) {
        const userInput = prompt(promptText);

        newGridSize = Number(userInput);

        if (!Number.isInteger(newGridSize)) {
            promptText = `${newGridSize} is not an integer.\n\nDefine a new grid size (16-100): `;
        } else if (newGridSize < minimumGridSize) {
            promptText = `${newGridSize} is less than the minimum grid size of ${minimumGridSize}.\n\nDefine a new grid size (16-100): `;
        } else if (newGridSize > maximumGridSize) {
            promptText = `${newGridSize} is greater than the maximum grid size of ${maximumGridSize}.\n\nDefine a new grid size (16-100): `
        } else {
            break;
        }   
    }

    return newGridSize;
}

const minimumGridSize = 16;
const mainContainer = document.querySelector(".main-container");
const resetButton = document.querySelector(".reset-button");
const generateButton = document.querySelector(".generate-button");

generateGrid(mainContainer, minimumGridSize);

generateButton.addEventListener("click", () => {
    const newGridSize = getNewGridSize();
    generateGrid(mainContainer, newGridSize);
});