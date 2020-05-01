// Rules: 
// n_alive. Keeps alive next turn continues 'n_alive' neighbours alive 
// n_dead. Born next turn if 'n_dead' neighbours alive

function Cell(n_alive = [2,3], n_dead = [3]) {


	//this.alive = Math.abs(Math.round(randomGaussian(0.2,0.5)));
	this.alive = Math.round(Math.random());
	this.n_alive = n_alive;
	this.n_dead = n_dead;
	
	this.years = 0; 
	this.nextTurnAlive = this.alive;

	this.neighbours = [];
	

	this.calculateNextState = function() {
		var alives = 0;
		for (x of this.neighbours) {
			alives+= x.alive
		}

		if (this.alive == 1) {
			if (this.n_alive.includes(alives) ) {
				this.nextTurnAlive = 1;
			} else {
				this.nextTurnAlive = 0;
			}
		} else {
			if (this.n_dead.includes(alives) ) {
				this.nextTurnAlive = 1;
			} else {
				this.nextTurnAlive = 0;
			}
		}
	}

	this.updateState = function() {
		if (this.alive == 1) {
			if (this.nextTurnAlive == 1) {
				this.years+=2;
			} else {
				this.years = 0;
			}
		}
		this.alive = this.nextTurnAlive;
	}

}