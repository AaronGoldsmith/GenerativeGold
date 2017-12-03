var canvas,canvas2;
var radius = 10;
var BG= "blue";
var circleLocations = new Array();
var circleLocations2 =[];
var width = window.innerWidth;
var height = window.innerHeight/2;
var alarm;
var live = true;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(){
  if(!live){alarm = setInterval(tick,10);}
  else{clearInterval(alarm);}
  live = !live;
}
Ball.prototype.bump = function(locs,j){
    for(var i = 0;i<locs.length;i++){
      var dx = this.x - locs[i].x;
      var dy = this.y - locs[i].y;
      
      var distance = Math.sqrt(dx * dx + dy * dy);

     if(distance<(this.size+locs[i].size)&&i!=j){
          //uncomment for realistic physics
         var s1 = this.size;
        var s2 = locs[i].size;
        if(this.vX*s1 > locs[i].vX*s2){
          locs[i].vX = ((2*s1) / (s1+s2))*this.vX;
          locs[i].vY = ((2*s1) / (s1+s2))*this.vY;
          
          this.vX = ((s1-s2)/(s1+s2))*this.vX;
          this.vY = ((s1-s2)/(s1+s2))*this.vY;
        }
        else{
          locs[i].vX = ((2*s1) / (s1+s2))*locs[i].vX;
          locs[i].vY = ((2*s1) / (s1+s2))*locs[i].vY;
          
          this.vX = ((s1-s2)/(s1+s2))*locs[i].vX;
          this.vY = ((s1-s2)/(s1+s2))*locs[i].vY;
        }
          
        //this.vX = -(this.vX);
        //locs[i].vX = -(locs[i].vX);
      }
    }
}
Ball.prototype.draw = function(ctx){
   ctx.beginPath()
   ctx.arc(this.x,this.y, this.size, 0, Math.PI * 2, false);
   ctx.closePath();
   ctx.fillStyle = this.color;
   ctx.strokeStyle = "black";
   ctx.stroke();
   ctx.fill();
}
Ball.prototype.move = function()
{
  if((this.x + this.size) >= width){this.vX *= -1;}
  if((this.x - this.size) <= 0){this.vX *= -(1);} 
  if((this.y + this.size) >= height){this.vY *= -1;}
  if((this.y - this.size) <= 0){this.vY *= -(1);}
  this.x += this.vX; this.y += this.vY; 
}

function tick()
{
  var ctx = canvas.getContext("2d");
  var ctx2 = canvas2.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //ctx.clearRect(0,0,canvas2.width,canvas2.height);
  ctx.fillStyle = BG;
  ctx2.fillStyle = "red";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  //ctx2.fillRect(0,0,canvas2.width,canvas2.height);
  for(var i = 0;i<circleLocations.length;i++){
    circleLocations[i].move();
    circleLocations[i].bump(circleLocations,i)
    circleLocations[i].draw(ctx);    
  }
  for(var j = 0;j<circleLocations2.length;j++){
    circleLocations2[j].move();
    circleLocations2[j].draw(ctx2);    
  }
}
window.onresize=function(){
  width = window.innerWidth;
  canvas = document.getElementById("Canvas");
  canvas2 = document.getElementById("Canvas2");
  canvas.width = window.innerWidth; canvas2.width=window.innerWidth;
  canvas.height = window.innerHeight/2; canvas.height=window.innerHeight/2;
  
  // ctx = canvas.getContext("2d");
}
function setup(){

  canvas = document.getElementById("Canvas");
	canvas2 = document.getElementById("Canvas2");

	canvas.width = window.innerWidth; 
	canvas2.width = window.innerWidth;
	canvas.height = window.innerHeight/2; canvas2.height= (window.innerHeight/2) ;
	canvas.style.margin=0;
 	canvas.style = "margin-bottom:-2px";
	canvas2.style = "margin-top: -1px";
}
function help(){  
  alert("2 Things to remember:\n\n1.\tPress any key to pause/play\n2.\tClick anywhere to create a moving dot");
}
window.onload=function(){
	setup();
	var ctx = canvas.getContext("2d");
	var ctx2 = canvas2.getContext("2d");
  ctx.fillStyle=BG;
	ctx2.fillStyle="red";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx2.fillRect(0,0,canvas2.width,canvas2.height);
	document.body.style = "margin:0px";
  alarm = setInterval(tick, 10);  
}
function Ball(x, y, vX, vY, color, size) {
  this.x = x;
  this.y = y;
  this.vX = vX;
  this.vY = vY;
  this.color = color;
  this.size = size;
}
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  while(num==0){
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
}
function storeClick2(event){
    var rect = canvas2.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var velX = random(-5,5);
    var velY = random(1,5);
    var col = "#" + (random(0,255).toString(16)+random(0,255).toString(16)+random(0,255).toString(16))
    var b = new Ball(x,y,velX,velY,col,random(10,20));
    circleLocations2.push(b);
    //console.log(circleLocations2);
}
function storeClick(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var vel = random(-5,5);
    var velY = random(1,5);
    var col = "#" + (random(0,255).toString(16)+random(0,255).toString(16)+random(0,255).toString(16))
    var g = new Ball(x,y,vel,velY,col,random(10,20));
    circleLocations.push(g);
    //console.log(circleLocations);
}

