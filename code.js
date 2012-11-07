//these are my globals, they are all initialized in init
//position interator
var position = []; 
//inventory
var inventory = [];
//my current locations
var road1, road2, road3, road4, road5, sportArea, foodArea, electricArea, cookArea, officeArea, gunArea, bankArea, mattressArea, clothingArea, drugArea;

function updateDisplay(message){
	display.value = message + "\n \n" + display.value;
}
	
function updateScore(x){
	score += x;
	document.getElementById("displayScore").innerHTML = "Current Score: " + score;
}
	
function getInput(input){
	input = input.toUpperCase(); //Getting rid of case
	if(input === "N" || input === "NORTH") { updateDisplay("You head North"); move(0);}
	else if(input === "E" || input === "EAST") { updateDisplay("You head East"); move(1);}
	else if(input === "S" || input === "SOUTH") { updateDisplay("You head South"); move(2);}
	else if(input === "W" || input === "WEST") { updateDisplay("You head West"); move(3);}
	else if(input === "I" || input === "INVENTORY") { showInventory();}
	else if(input.substring(0,4) === "TAKE") { take(input);}
	else if(input === "HELP") { updateDisplay("Currently you may enter cardinal directions such as North or N. You may also look into your Inventory by typing inventory or I"); }
	else updateDisplay(input + " is Invalid Command. Enter \"help\" if you want to see available commands");
}
		
function move(x){
	if(position[x] === "null") { updateDisplay("You cannot go that way"); return;}
	var current = position[x];
	//console.log(current.name);
	console.log(current.north + " North");
	console.log(current.east + " East");
	console.log(current.south + " South");
	console.log(current.west + " West");
	position[0] = current.north;
	position[1] = current.east;
	position[2] = current.south;
	position[3] = current.west;
	updateDisplay(current.description);
	buttonCheck();
}
	
function buttonCheck(){
	document.getElementById("North").disabled = false;
	document.getElementById("East").disabled = false;
	document.getElementById("South").disabled = false;
	document.getElementById("West").disabled = false;
	if(position[0] === "null") { document.getElementById("North").disabled = true;}
	if(position[1] === "null") { document.getElementById("East").disabled = true;}
	if(position[2] === "null") { document.getElementById("South").disabled = true;}
	if(position[3] === "null") { document.getElementById("West").disabled = true;}
	}

function showInventory(){
	updateDisplay("Your inventory currently contains: " + inventory);
	}

function take(input){
//this is just a test for my inventory, right now the user can take anything and put it in their inventory
	inventory[inventory.length] = input.substring(5);
	}
	
function area(_name, _item, _description, _north, _east, _south, _west){
	this.name = _name;
    this.item = _item; //<-- not actually used yet, I'll add actual items in the next version
	this.description = _description;
	this.north = _north;
	this.east = _east;
	this.south = _south;
	this.west = _west;
	this.newLocation = true;
	}

function generateAreas(){
	road1 = new area("road", "null", "You are on a path", "null", sportArea, road2, foodArea);
	sportArea = new area("Sports store", "null", "You are inside a sports store", "null", "null", "null", road1);
	foodArea = new area("Food store", "null", "You are inside a food store", "null", road1, "null", "null");
	road2 = new area("road", "null", "You are on a path", road1, cookArea, road3, electricArea);
	cookArea = new area("cooking store", "null", "You are inside a cooking store", "null", "null", road4, road2);
	electricArea = new area("electronics store", "null", "You are inside an electronics store", "null", road2, "null", "null");
	road3 = new area("road", "null", "You are on a path", road2, road4, gunArea, officeArea);
	officeArea = new area("office store", "null", "You are inside an office supplies store", "null", road3, "null", "null");
	gunArea = new area("gun store", "null", "You are inside a gun store", road3, "null", "null", "null");
	road4 = new area("road", "null", "You are on a path", cookArea, road5, bankArea, road3);
	bankArea = new area("bank", "null", "You are inside a bank", road4, "null", "null", "null");
	road5 = new area("road", "null", "You are on a path", mattressArea, clothingArea, drugArea, road4);
	mattressArea = new area("mattress store", "null", "You are inside a mattress store", "null", "null", road5, "null");
	clothingArea = new area("clothing store", "null", "You are inside a clothes store", "null", "null", "null", road5);
	drugArea = new area("drug store", "null", "You are inside a drug store", road5, "null", "null", "null");
	
	//I have to do this because javaScript doesn't actually use pointers and I have not found a solution yet that wouldn't require even more hard coding
	road1.east = sportArea;
	road1.west = foodArea;
	road1.south = road2;
	road2.east = cookArea;
	road2.west = electricArea;
	road2.south = road3;
	cookArea.south = road4;
	road3.east = road4;
	road3.west = officeArea;
	road3.south = gunArea;	
	road4.east = road5;
	road4.south = bankArea;
	road5.north = mattressArea;
	road5.east = clothingArea;
	road5.south = drugArea;
}		


function init(){
	generateAreas();
	position[0] = "null";
	position[1] = sportArea;
	position[2] = road2;
	position[3] = foodArea;
	buttonCheck();
	}
	
//the following code is not written by me, it was taken from WebCheatSheets.com and it disable the enter key to prevent accidental form submission
	
function stopRKey(evt) {
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
	document.onkeypress = stopRKey; 