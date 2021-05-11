var database ,dog,dog1,dog2
var position
var feed,add, foodobject,Feedtime, Lastfeed;

function preload()

{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
 

  var tom = database.ref('Food');
  tom.on("value", readPosition, showError);
  feed = createButton("FEED TOM")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 



function draw(){
 { background("orange");
 foodobject.display()
 
 }
 drawSprites();
  
  fill(255,255,254);
 textSize(20);
 text("Feed Tom Milk!",450,400,300,20);
 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ Lastfeed=data.val(); });
 
 if(Lastfeed>=12)
 {
   text("Last Feed :" + Lastfeed%12 + "PM", 150,100);
 }else if(Lastfeed === 0 )
 {
   text("Last Feed : 12 AM" , 150,100)
 }else
 {
   text("Last Feed :" + Lastfeed + "AM", 150,100);
 }
 
  drawSprites();
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime: hour ()
 })
}
