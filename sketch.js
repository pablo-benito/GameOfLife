
var cellList=[];
var canvasWidth = 640;
var canvasHeight = 480;
var size=10;
var numCols = canvasWidth / size;
var numRows = canvasHeight / size;

function reset() {

	for (var i = 0; i < numCols*numRows; i++) {
		cellList[i].alive = Math.round(Math.random());
	}
}

function getRules() {

	var e = document.getElementById("ruleSelector");
	var option = e.options[e.selectedIndex].value;
	[n_alive, n_dead] = option.split('/');
	n_alive = int(n_alive.split(" "));
	n_dead  = int(n_dead.split(" "));
 	return [ n_alive, n_dead];
}

function changeRules() {

	[n_alive,n_dead] = getRules();
	

	for( var i = 0 ; i < numCols*numRows; i++) {
		cellList[i].n_alive = n_alive;
		cellList[i].n_dead = n_dead;
	}

	reset();

}


function setup() {

	
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("p5jsContainer");

	frameRate(20);
    background(0);
    stroke(255);
    colorMode(HSB,255);

	[n_alive,n_dead] = getRules();
    for(var i = 0 ; i < numCols*numRows ; i++) {
    	cellList[i] = new Cell(n_alive,n_dead);
    }

    for(var col = 0 ; col < numCols; col++){
    	for(var row = 0 ; row < numRows ; row++) {
    		cellid = (row * numCols + col )
    		cell1 = cellid - numCols - 1
            cell2 = cellid - numCols
            cell3 = cellid - numCols + 1
            
            cell4 = cellid - 1
            cell5 = cellid + 1
            
            cell6 = cellid + numCols - 1
            cell7 = cellid + numCols
            cell8 = cellid + numCols + 1

            if (row == 0) {
                if (col == 0) {
                    neighbours = [cell5, cell7, cell8];
                }
                else if (col == (numCols-1)) {
                    neighbours = [cell4, cell6, cell7]
                }
                else {
                    neighbours = [cell4, cell5, cell6, cell7, cell8]
                }
            } else if (row == (numRows -1)) {
                if (col == 0) {
                    neighbours = [cell2, cell3, cell5]
                }
                else if (col == (numCols-1)) {
                    neighbours = [cell1, cell2, cell4]
                }
                else {
                    neighbours = [cell1, cell2, cell3, cell4, cell5]
                }
            } else {
                if (col == 0) {
                    neighbours = [cell2,cell3,cell5,cell7,cell8]
                }
                else if (col == (numCols-1)) {
                    neighbours = [cell1,cell2,cell4,cell6,cell7]
                }
                else {
                    neighbours = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8]
                }
            }

            for( var neighbourID of neighbours) {
            	cellList[cellid].neighbours.push(cellList[neighbourID])
            }
            
    	}
    }

    canvas.mouseClicked(reset);
}



function draw() {

	for (var col = 0 ; col < numCols ; col++) {
		for (var row = 0 ; row < numRows ; row++) {
			var currentCell = cellList[row * numCols + col ];
			if (currentCell.alive == 1) {
				//fill(0,0,0);
				fill((currentCell.years)%255, 255,255);
			} else {
				//fill(255,255,255);
				fill(0,0,255);
			}
			
			rect(col*size,row*size, size, size);
			currentCell.calculateNextState();
		}
	}
	for( var cell of cellList) {
		cell.updateState();
	}
}