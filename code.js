//these are my globals, they are all initialized in init

//position interator
//I didn't use a matrix because you wanted someone to use pointers, so I did. I haven't done the calculations but I think this is more efficient
//in hindsight I should have made this a prototype for clarity but whatever, it gets the job done
var position = []; 
//inventory
var inventory = [];
//my current locations
var road1, road2, road3, road4, road5, sportArea, foodArea, electricArea, cookArea, officeArea, gunArea, bankArea, mattressArea, clothingArea, drugArea, exitArea;
//items in the game
var gun, pizza, painkillers, extinguisher, bat;

var score = 0;
var gameOver = false;

//while I agree constants are important in coding, there really are no such things in javascript
//which is why I chose to not do it at all
//there is 'const' but it only works in chrome so it is bad practice to use it
//but I will initialize these because it does make the code easier to read
var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var PLAYER = 4;

function updateDisplay(message){
	display.value = message + "\n \n" + display.value;
}
	
function updateScore(x){
	score += x;
	document.getElementById("displayScore").innerHTML = "Current Score: " + score;
}
	
function getInput(input){
	if (gameOver === true) {updateDisplay("GAME OVER \nPlease refresh to play again"); return;}
	if (input === "") {updateDisplay("You did not enter a command."); return;}
	input = input.toUpperCase(); //Getting rid of case
	if(input === "N" || input === "NORTH") { updateDisplay("You head North"); move(NORTH);}
	else if(input === "E" || input === "EAST") { updateDisplay("You head East"); move(EAST);}
	else if(input === "S" || input === "SOUTH") { updateDisplay("You head South"); move(SOUTH);}
	else if(input === "W" || input === "WEST") { updateDisplay("You head West"); move(WEST);}
	else if(input === "I" || input === "INVENTORY") { showInventory();}
	else if(input.substring(0,4) === "TAKE") { take(input.substring(5));}
	else if(input === "LOOK") { look();}
	else if(input.substring(0,7) === "EXAMINE") { examine(input.substring(8));}
	else if(input === "HELP") { updateDisplay("Currently you may enter cardinal directions such as North or N. You may also look into your Inventory by typing inventory or I. You may examine items in your backpack by typing examine and the item's name. You may look around the area as well by typing look."); }
	else updateDisplay(input + " is Invalid Command. Enter \"help\" if you want to see available commands.");
}

function look(){
	updateDisplay(position[PLAYER].details());
}
	
function examine(item){
	item = item.toLowerCase();
	if(hasItem(item)) updateDisplay(item + ": " + window[item].description);
	else updateDisplay("That is not in your inventory.");
}
	
//I didn't get your request for me to refactor until after the final.
//if I were to redo this, I'd probably turn it into a player prototype with a move function or something and the
//four positions and current location would just be variables in the prototype rather than in an array like here.
//but whatever this gets the job done
function move(x){
	if(position[x] === "null") { updateDisplay("You cannot go that way."); return;}
	if(position[x] === exitArea) {endGameCheck(); return;}
	if(position[x].newLocation === true) {updateScore(5); position[x].newLocation = false;} //checks to see if it is a new location
	var current = position[x];
	position[NORTH] = current.north;
	position[EAST] = current.east;
	position[SOUTH] = current.south;
	position[WEST] = current.west;
	position[PLAYER] = current;
	updateDisplay(current.description);
	buttonCheck();
}
	
function endGameCheck(){
	if(checkItems()){
		updateDisplay("You walk out into the field and immediately kill two zombies with your gun. A zombie sneaks up behind you and pounds on you. You beat its face in with your bat. You refresh yourself with painkillers and begin looking for others. \nGAME OVER");
		gameOver = true;
	}
	else updateDisplay("You do not have all you need yet");
}
	
function checkItems(){
	if(hasItem("gun") && hasItem("bat") && hasItem("painkillers")) return true;
	return false;
}

function hasItem(item){
	for(var i = 0; i < inventory.length; i++){
		if(inventory[i].name === item){return true;}
	}
	return false;
}
	
function buttonCheck(){
	document.getElementById("North").disabled = false;
	document.getElementById("East").disabled = false;
	document.getElementById("South").disabled = false;
	document.getElementById("West").disabled = false;
	if(position[NORTH] === "null") { document.getElementById("North").disabled = true;}
	if(position[EAST] === "null") { document.getElementById("East").disabled = true;}
	if(position[SOUTH] === "null") { document.getElementById("South").disabled = true;}
	if(position[WEST] === "null") { document.getElementById("West").disabled = true;}
}

function showInventory(){
	if(inventory.length === 0) { updateDisplay("Your inventory is currently empty"); return;}
	updateDisplay("Your inventory currently contains: " + inventory);
}

function take(input){
	input = input.toLowerCase();
	if (position[PLAYER].item.toLowerCase() != input) {updateDisplay("There is no " + input + " here."); return;} //checks to see if the item exists in the current location
	inventory[inventory.length] = window[input]; //wheeee global variables
	updateDisplay("You put the " + input + " in your backpack.");
	position[PLAYER].item = "null";
	updateScore(10);
}
	
function area(_name, _item, _description, _north, _east, _south, _west){
	this.name = _name;
    this.item = _item;
	this.description = _description;
	this.north = _north;
	this.east = _east;
	this.south = _south;
	this.west = _west;
	this.newLocation = true;
	this.toString = function(){
						return(this.discription);
					}
	this.details = function(){
						var stuff = "";
						stuff += this.description;
						if (this.item != "null") { stuff+= ". You see a " + this.item;}
						else {stuff += ". There is nothing of interest here";}
						if (this.north != "null"){ stuff += ". To your North is " + this.north.name;}
						else {stuff += ". There is nothing to your North";}
						if (this.east != "null"){ stuff += ". To your East is " + this.east.name;}
						else {stuff += ". There is nothing to your East";}
						if (this.south != "null"){ stuff += ". To your South is " + this.south.name;}
						else {stuff += ". There is nothing to your South";}
						if (this.west != "null"){ stuff += ". To your West is " + this.west.name + ".";}
						else {stuff += ". There is nothing to your West.";}
						return stuff;
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
	road1 = new area("a road", "null", "You are on a path", exitArea, sportArea, road2, foodArea);
	sportArea = new area("the Sports store", "bat", "You are inside the Sports store", "null", "null", "null", road1);
	foodArea = new area("the Food store", "pizza", "You are inside the Food store", "null", road1, "null", "null");
	road2 = new area("a road", "null", "You are on a path", road1, cookArea, road3, electricArea);
	cookArea = new area("the Cooking store", "null", "You are inside the Cooking store", "null", "null", road4, road2);
	electricArea = new area("the Electronics store", "null", "You are inside the Electronics store", "null", road2, "null", "null");
	road3 = new area("a road", "null", "You are on a path", road2, road4, gunArea, officeArea);
	officeArea = new area("the Office store", "extinguisher", "You are inside the Office supplies store", "null", road3, "null", "null");
	gunArea = new area("the Gun store", "gun", "You are inside the Gun store", road3, "null", "null", "null");
	road4 = new area("a road", "null", "You are on a path", cookArea, road5, bankArea, road3);
	bankArea = new area("the Bank", "null", "You are inside the Bank", road4, "null", "null", "null");
	road5 = new area("road", "null", "You are on a path", mattressArea, clothingArea, drugArea, road4);
	mattressArea = new area("the Mattress store", "null", "You are inside the Mattress store", "null", "null", road5, "null");
	clothingArea = new area("the Clothing store", "null", "You are inside the Clothes store", "null", "null", "null", road5);
	drugArea = new area("the Drug store", "painkillers", "You are inside the Drug store", road5, "null", "null", "null");
	exitArea = new area("the Exit", "null", "null", "null", "null", road1, "null");
	//I have to do this because javaScript doesn't actually use pointers and I have not found a solution yet that wouldn't require even more hard coding
	//I know a better way to do this but I didn't feel like refactoring for something so trivial
	road1.north = exitArea;
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
	gun = new item("gun", "Loaded and gives practical solutions to practical problems");
	pizza = new item("pizza", "Delicious and Cheesy");
	painkillers = new item("painkillers", "Pills that make everything better for a little while");
	extinguisher = new item("extinguisher", "Puts out those pesky fires");
	bat = new item("bat", "Time to play ball");
}


function init(){
	generateAreas();
	generateItems();
	position[NORTH] = exitArea;
	position[EAST] = sportArea;
	position[SOUTH] = road2;
	position[WEST] = foodArea;
	position[PLAYER] = road1;
	buttonCheck();
}
	
//the following code is not written by me, it was taken from WebCheatSheets.com and it disable the enter key to prevent accidental form submission
	
function stopRKey(evt) {
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
	document.onkeypress = stopRKey; 