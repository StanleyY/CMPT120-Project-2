//these are my globals, they are all initialized in init

//position interator
var position = []; 
//inventory
var inventory = [];
//my current locations
var road1, road2, road3, road4, road5, sportArea, foodArea, electricArea, cookArea, officeArea, gunArea, bankArea, mattressArea, clothingArea, drugArea;
//items in the game
var gun, pizza, painkillers, extinguisher, bat;

var score = 0; 

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
	else if(input.substring(0,4) === "TAKE") { take(input.substring(5));}
	else if(input === "HELP") { updateDisplay("Currently you may enter cardinal directions such as North or N. You may also look into your Inventory by typing inventory or I"); }
	else updateDisplay(input + " is Invalid Command. Enter \"help\" if you want to see available commands");
}
		
function move(x){
	if(position[x] === "null") { updateDisplay("You cannot go that way"); return;}
	if(position[x].newLocation === true) {updateScore(5); position[x].newLocation = false;} //checks to see if it is a new location
	var current = position[x];
	position[0] = current.north;
	position[1] = current.east;
	position[2] = current.south;
	position[3] = current.west;
	position[4] = current; //where the player currently is
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
	input = input.toLowerCase();
	if (position[4].item.toLowerCase() != input) {updateDisplay("There is no " + input + " here"); return;} //checks to see if the item exists in the current location
	inventory[inventory.length] = window[input]; //wheeee global variables
	updateDisplay("You put the " + input + " in your backpack");
	position[4].item = "null";
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
	this.toString = function(){
						return(this.discription);
						}
	}
	
function item(_name, _description){
	this.name = _name;
	this.description = _description;
	this.toString = function(){
						return(this.name);
						}
	}

function generateAreas(){
	road1 = new area("road", "null", "You are on a path", "null", sportArea, road2, foodArea);
	sportArea = new area("Sports store", "bat", "You are inside a sports store", "null", "null", "null", road1);
	foodArea = new area("Food store", "pizza", "You are inside a food store", "null", road1, "null", "null");
	road2 = new area("road", "null", "You are on a path", road1, cookArea, road3, electricArea);
	cookArea = new area("cooking store", "null", "You are inside a cooking store", "null", "null", road4, road2);
	electricArea = new area("electronics store", "null", "You are inside an electronics store", "null", road2, "null", "null");
	road3 = new area("road", "null", "You are on a path", road2, road4, gunArea, officeArea);
	officeArea = new area("office store", "extinguisher", "You are inside an office supplies store", "null", road3, "null", "null");
	gunArea = new area("gun store", "gun", "You are inside a gun store", road3, "null", "null", "null");
	road4 = new area("road", "null", "You are on a path", cookArea, road5, bankArea, road3);
	bankArea = new area("bank", "null", "You are inside a bank", road4, "null", "null", "null");
	road5 = new area("road", "null", "You are on a path", mattressArea, clothingArea, drugArea, road4);
	mattressArea = new area("mattress store", "null", "You are inside a mattress store", "null", "null", road5, "null");
	clothingArea = new area("clothing store", "null", "You are inside a clothes store", "null", "null", "null", road5);
	drugArea = new area("drug store", "painkillers", "You are inside a drug store", road5, "null", "null", "null");
	
	//I have to do this because javaScript doesn't actually use pointers and I have not found a solution yet that wouldn't require even more hard coding
	//maybe an update method, eh I'll do it next version
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

function generateItems(){
	gun = new item("gun", "loaded and gives practical solutions to practical problems");
	pizza = new item("pizza", "Delicious and Cheesy");
	painkillers = new item("painkillers", "Pills that make everything better for a little while");
	extinguisher = new item("extinguisher", "puts out those pesky fires");
	bat = new item("bat", "Time to play ball");
}


function init(){
	generateAreas();
	generateItems();
	position[0] = "null";
	position[1] = sportArea;
	position[2] = road2;
	position[3] = foodArea;
	position[4] = road1;
	buttonCheck();
	}
	
//the following code is not written by me, it was taken from WebCheatSheets.com and it disable the enter key to prevent accidental form submission
	
function stopRKey(evt) {
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
	document.onkeypress = stopRKey; 