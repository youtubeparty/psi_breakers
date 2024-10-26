var symmetry;

var angle;

let x = 700;
let y = 500;

let currentX = 10;
let currentY = 10;
let currentXSize = x;
let currentYSize = y;


let xVelocity = 4;
let yVelocity = 2;
let xSizeVelocity = 5;
let ySizeVelocity = 7;

var secretNumber;
var secretImage;

let userInput = "";

let busStop;

var turn;
var mode;

var score;

var name;


function preload(){
  selectSecret();
  busStop = loadFont("BusStopRegular.ttf");
}

function setup() {
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
  secretNumber = int(random(10));
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
    writeText('PSI BREAKERS',50,-5,0,'Courier New');
    writeText('enter name to start',30,-10,50,'Courier New');
  }else if(mode=='game'){
    writeText('a number has been generated bewteen 0 & 9(inclusive)',30,-x/3,0,'Courier New');
    writeText(' bewteen 0 & 9(inclusive)',30,-x/3,25,'Courier New');
     writeText('what is the number?',30,-100,75,'Courier New');
  }else if(mode=='results'){
    if(userInput == secretNumber){
      writeText('Correct Secret Number Is ' + secretNumber,40,-350,0,'Courier New');
      
    }else{
      writeText('Incorrect Secret Number Is ' + secretNumber,40,-350,0,'Courier New');
    }
    writeText('enter to continue',30,-10,50,'Courier New');
  }else if(mode == 'end'){
    writeText(name+": "+score+int(random(10))+"% psychic pressure",40,-350,0,'Courier New');
    writeText('enter to restart',30,-10,50,'Courier New');
  }
  
  if(mode!='results' && mode !='end'){
    writeText(userInput,40,-40,100,'Courier New');
  }
  
}

function rate(){
  if(userInput == secretNumber){
    score++;
  }
  turn++;
}
