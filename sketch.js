//For creating variables
var dog , dogImg , happyDog , database , foodS , foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog = createSprite(250,250,10,10);
  dog.addImage("Image for dog",dogImg);
  dog.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value" , readStock);
  textSize(20);
}


function draw() {  
  background(46,139,87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill(255);
  stroke("black");
  text("Food Remaining : " + foodS,150,150);
  textSize(13);
  text("Note : Press arrow key to feed the dog and make it happy" , 20 , 480);
}


function readStock(data){
  foodS = data.val();
}


function writeStock(x){
   if(x <= 0){
     x = 0;
   }
   else{
     x = x-1;
   }

   database.ref('/').update({
     Food : x
   })
}