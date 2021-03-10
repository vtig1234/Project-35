//Project 30
//Viyath Wanninayake
//02/02/2021

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var dog,dog1
var happyDog
var database
var foodS
var foodStock
var x

function preload(){
  //Load images for the dog
  dog1 = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  //Create the database
  database = firebase.database();
  //Get that database values of food
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  //Create a dog sprite and add an image to it
  dog = createSprite(200,200,20,20);
  dog.scale = 0.3
  dog.addImage(dog1);
}

function draw() {
  rectMode(CENTER);
  background(46,139,87);
  fill("white");
  textSize(20);
  //Add a text showing what to do and the amount of food
  text("Note : Press Up Arrow Key To Feed Shadow Milk!",20,30);
  text("Food: "+foodS,180,80);
  drawSprites();
  dog.display();
  //Decrease the amount of food when the up arrow key is pressed
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    if (foodS===0){
      foodS = 0;
    }else{
      foodS = foodS-1;
    }
  }
}
//Read and write the values
function readStock(data){
  foodS = data.val(); 
}

function writeStock(x){
  
database.ref("/").update({
   Food:x
})
}