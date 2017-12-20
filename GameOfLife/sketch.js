//create array
function make2DArray(columns, rows) {
    let array = new Array(columns);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
        for (let j = 0; j < array[i].length; j++) {

        }
    }
    return array;
}

let grid;
let cols;
let rows;
let resolution = 5;
// create canvas//grid
function setup() {
    createCanvas(1000,600);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}
// std draw
function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(255);
                rect(x, y, resolution-1, resolution-1);
            }

        }
    }

    // compute next grid
    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            // current cell
            let state = grid[i][j];

            // count the number of live neighbors
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            // rules
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;

}
// counts neighbors
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum = sum + grid[col][row];
        }
    }
    sum = sum - grid[x][y];
    return sum;
}
