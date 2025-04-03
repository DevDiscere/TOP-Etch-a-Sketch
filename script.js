const parseBackgroundColor = function parseBackgroundColor (cellBGColor) {
    const getColorValues = function getColorValues (colorReference) {
        /*
            First part removes function name and opening parenthesis
            Second part removes whitespaces
            Third part removes closing parenthesis
            Fourth part removes commas
        */
        const colorStringArray = cellBGColor.replace(colorReference, "").replaceAll(" ", "").replace(")", "").split(",");
        const colorNumberArray = colorStringArray.map((colorValue) => Number(colorValue));

        return colorNumberArray;
    }

    const rgbaReference = "rgba(";
    const rgbReference = "rgb(";

    if (cellBGColor.startsWith(rgbaReference)) {
        return getColorValues(rgbaReference);
    } else if (cellBGColor.startsWith(rgbReference)) {
        return getColorValues(rgbReference);
    }
}

const giveCellsHoverEffect = function giveCellsHoverEffect () {
    const gridCells = document.querySelectorAll(".grid-cell");

    // Add hovering effect on each cell
    gridCells.forEach( (cell) => {
        cell.addEventListener("mouseenter", (event) => {
            const cellBackgroundColor = window.getComputedStyle(cell).backgroundColor;
            // Parse to get only the color values
            const cellColorValues = parseBackgroundColor(cellBackgroundColor);
            let targetedCell = event.target.style;

            if (event.shiftKey) {
                if (cellBackgroundColor.startsWith("rgb(")) {
                    // Progressively darken the colored cell
                    const opacityFactor = 25;
                    const darkenedRed = Math.max(0, cellColorValues[0] - opacityFactor);
                    const darkenedGreen = Math.max(0, cellColorValues[1] - opacityFactor);
                    const darkenedBlue = Math.max(0, cellColorValues[2] - opacityFactor);

                    targetedCell.backgroundColor = `rgb(${darkenedRed}, ${darkenedGreen}, ${darkenedBlue})`;
                } else if (cellBackgroundColor.startsWith("rgba(")) {
                    // Progressively darken the white cell
                    const incrementOpacity = Math.min(1, cellColorValues[3] + 0.1);

                    targetedCell.backgroundColor = `rgba(0, 0, 0, ${incrementOpacity})`;
                }
            }

            if (event.ctrlKey) {
                // Generate random cell color 
                const randomRedValue = Math.floor(Math.random() * 255);
                const randomGreenValue = Math.floor(Math.random() * 255);
                const randomBlueValue = Math.floor(Math.random() * 255);

                targetedCell.backgroundColor = `rgba(${randomRedValue}, ${randomGreenValue}, ${randomBlueValue})`;
            }

            if (event.altKey) {
                targetedCell.removeProperty("background-color");
            }
        });
    });
}

const generateGrid = function generateGrid (gridContainer, gridSize) {
    const containerWidth = Number(window.getComputedStyle(gridContainer).width.slice(0, -2));
    const gridDimension = gridSize * gridSize;
    const cellWidth = containerWidth / gridSize;
    const cellHeight = cellWidth;

    // Clear grid
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = 0; i < gridDimension; i++) {
        const gridCell = document.createElement("div");
        
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
        const userInput = prompt(promptText, minimumGridSize);

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

const cleanGrid = function cleanGrid () {
    const gridCells = document.querySelectorAll(".grid-cell");

    gridCells.forEach( (cell) => {
        cell.style.removeProperty("background-color");
    });
}

const minimumGridSize = 16;
const mainContainer = document.querySelector(".main-container");
const cleanButton = document.querySelector(".clean-button");
const generateButton = document.querySelector(".generate-button");

generateGrid(mainContainer, minimumGridSize);

generateButton.addEventListener("click", () => {
    const newGridSize = getNewGridSize();
    generateGrid(mainContainer, newGridSize);
});

cleanButton.addEventListener("click", () => {
    cleanGrid();
});