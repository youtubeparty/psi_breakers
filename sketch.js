var symmetry;

var angle;

let currentX = 10;
let currentY = 10;
var currentXSize;
var currentYSize;
var x;
var y;

var xVelocity;
var yVelocity;
var xSizeVelocity;
var ySizeVelocity;

var secretNumber;
var secretImage;

let userInput = "";

let busStop;

var turn;
var mode;

var score;

var name;

function realX(relativeX) {
  return (relativeX * x)/2
}

function realY(relativeY) {
  return (relativeY * y)/2
}

function realTextSize(sizeRelativeTo720) {
  return (sizeRelativeTo720/720)*x
}

function preload(){
  selectSecret();
  busStop = loadFont("BusStopRegular.ttf");
}

function setup() {
  x = windowWidth;
  y = windowHeight;
  currentXSize = x;
  currentYSize = y;
  
  xVelocity = 4 * x / 400;
  yVelocity = 2 * y / 720;
  xSizeVelocity = 5 * x /400;
  ySizeVelocity = 7 * y / 720;
  
  createCanvas(x, y);
  angleMode(DEGREES);
  blendMode(DIFFERENCE);
  background(255);
  frameRate(30);
  
  turn = 0;
  mode='title';
  name = '';
  score = 0;
  
}

function draw() {
  
  translate(width/2, height/2);
  
  
  
  for(let i=0; i<symmetry; i++){
    rotate(angle);
    image(secretImage,currentX,currentY,currentXSize,currentYSize);
    push();
    scale(1, -1);
    image(secretImage,currentX,currentY,currentXSize,currentYSize);
    pop();
  }
  
  currentX += xVelocity;
  currentY += yVelocity;
  currentXSize += xSizeVelocity;
  currentYSize += ySizeVelocity;
  
  if(currentX < -x/3 || currentX > x/3){
    xVelocity = -xVelocity;
  }
  if(currentY < -y/3 || currentY > y/3){
    yVelocity = -yVelocity;
  }
  if(currentXSize < 0 || currentXSize > 2*x){
    xSizeVelocity = -xSizeVelocity;
  }
  if(currentYSize < 0 || currentXSize > 2*y){
    ySizeVelocity = -ySizeVelocity;
  }

  menu();
  
}

function selectSecret(){
  lastSecret = secretNumber;
  while(lastSecret == secretNumber){
    secretNumber = int(random(10)); 
  }
  secretImage = loadImage('test'+(secretNumber)+'.png');
  if(secretNumber == 0 || secretNumber == 1){
    symmetry = 2;
  }else{
    symmetry = secretNumber;
  }
  
  angle = 360 / symmetry;

}

function writeText(words,size,xText,yText,font){
 
  //rotate(random(-symmetry, symmetry))
  blendMode(BLEND);
  textFont(font);
  textSize(size);
  fill('black');
  stroke(246, 255, 224);
  strokeWeight(10);
  text(words,xText,yText);
  blendMode(DIFFERENCE);
  
}

function keyPressed(){
  if (keyCode == 8 && userInput.length > 0){
    userInput = userInput.substring(0, userInput.length - 1);
  }else if(keyCode == 13 && userInput.length > 0){
    if(mode=='title'){
      name = userInput;
      mode = 'game';
      userInput = '';
    }else if(mode=='game'){
      mode = 'results';
      rate();
    }else if(mode=='results' && turn < 10){
      selectSecret();
      userInput = '';
      mode = 'game';
    }else if(mode=='results' && turn > 9){
      userInput = 'temp';
      mode = 'end';
    }else if(mode=="end"){
      name = '';
      userInput = '';
      score = 0;
      turn = 0;
      mode = 'title';
    }
  }else if(key.length == 1 && mode != 'results' && mode != 'end'){
    userInput = userInput+key;
  }
  
}

function menu(){
  if(mode=='title'){
    writeText('PSI BREAKERS',realTextSize(50),realX(-0.05),realY(0),'Courier New');
    writeText('enter name to start',30,realX(-0.05),realY(0.2),busStop);
  }else if(mode=='game'){
    writeText('a number has been generated \nbetween 0 & 9(inclusive)',realTextSize(30),realX(-0.7),realY(0),'Courier New');
    // writeText('between 0 & 9(inclusive)',30,-x/3,25,'Courier New');
     writeText('what is the number?',realTextSize(30),realX(-0.28),realY(0.32),'Courier New');
  }else if(mode=='results'){
    if(userInput == secretNumber){
      writeText('Correct Secret Number Is ' + secretNumber,realTextSize(40),realX(-0.9),realY(0),'Courier New');
      
    }else{
      writeText('Incorrect Secret Number Is ' + secretNumber,realTextSize(40),realX(-0.9),realY(0),'Courier New');
    }
    writeText('enter to continue',realTextSize(40),realX(-0.2),realY(0.2),'Courier New');
  }else if(mode == 'end'){
    writeText(name+": "+score+int(random(10))+"% psychic pressure",realTextSize(40),realX(-0.9),realY(0),'Courier New');
    writeText('enter to restart',realTextSize(40),realX(-0.05),realY(0.2),'Courier New');
  }
  
  if(mode!='results' && mode !='end'){
    writeText(userInput,realTextSize(40),realX(-0.1),realY(0.4),'Courier New');
  }
  
}

function rate(){
  if(userInput == secretNumber){
    score++;
  }
  turn++;
}
