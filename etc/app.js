var canvas;
var circleList = [];
var width = window.innerWidth;
var height = window.innerHeight*0.8;


document.addEventListener("keydown", function(event) {
    switch(event.which){
        case 32: clickSimulator(); break;
        default: break;
    }
  });



function clickSimulator(){
    var count = 0, misses = 0, circles = 0;
    while(count<10500 && misses < 5000){
        if(simClick(new Point(random(10,width-10),random(20,height-20)))){
            circles++; }
        else{
            misses++; }

        count++;
        }
    console.log("misses: "+misses+"\ncircles: "+circles)
    
}

Ball.prototype.draw = function(ctx){
   ctx.beginPath()
   ctx.arc(this.pt.x,this.pt.y, this.radius, 0, Math.PI * 2, false);
   ctx.closePath();
   ctx.fillStyle = this.color;
   ctx.strokeStyle = "black";
   ctx.lineWidth = "5";
   ctx.stroke();
   ctx.fill();
}



function tick()
{
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  for(var circle = 0;circle < circleList.length;circle++)
  {
    var c = circleList[circle];   
    c.draw(ctx);
    
  }

}
function setup(){
  width = window.innerWidth;height=window.innerHeight;
  canvas = document.getElementById("Canvas");
  var ctx = canvas.getContext("2d");
  
	canvas.width = width; 
	canvas.height = height;
	canvas.style.margin=0;
	ctx.fillRect(0,0,canvas.width,canvas.height);

}
function help(){  
  alert("2 Things to remember:\n\n1.\tPress any key to pause/play\n2.\tClick anywhere to create a moving dot");
}
window.onload=function(){
  setup();
  document.body.style = "margin:0px";  
  alarm = setInterval(tick, 10);
  
}


function Ball(pt, color, radius) {
  this.pt = pt;
  this.color = color;
  this.radius = radius;
}

function getColor(){
  var r = random(0,255);
  var g = random(0,255);
  var b = random(0,255);
  return [r,g,b]}



  function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function colorArray(){
    var arr = getColor();
  return "#" + arr[0].toString(16)+ arr[1].toString(16) +  arr[2].toString(16);
}

function checkClick(PT){
    var closest = 1000;
    for(var i = 0;i<circleList.length;i++)
    {
        var d = Point.distance(PT,circleList[i].pt)
        if(d<circleList[i].radius){return -1;}
        var diff = Math.abs(circleList[i].radius-d)
        if(diff<closest){closest = diff-1;}
        
    }
  
    return closest;
}
function simClick(PT)
{
    var rect = canvas.getBoundingClientRect();
    var col = colorArray();
    
    var dX = checkClick(PT); // returns +distance from closest item
    console.log(dX)
    if(dX>0){
        var B;
        if(dX < 50){
         B = new Ball(PT,col,dX);}
        else{ B = new Ball(PT,col,random(30,50));}
    
        circleList.push(B);
        return true;
    } 
    else{
        return false;
    }
    
    
}
function storeClick(event) {
    var rect = canvas.getBoundingClientRect();
    var col = colorArray();
    
    var PT = new Point((event.clientX - rect.left),(event.clientY - rect.top));    
    var dX = checkClick(PT); // returns +distance from closest item
    console.log(dX)
    if(dX>0){
        var B;
        if(dX < 150){
         B = new Ball(PT,col,dX);}
        else{ B = new Ball(PT,col,random(10,30));}
        circleList.push(B);
    } 
    
    var count = 0;
    var misses = 0;
    var circles = 0;
   
}

class Point
{
  constructor(x,y){
    this.x = x || 0;
    this.y = y || 0;
  }
   getRand(max){
    this.x = random(0,max);
    this.y = random(0,max);
  }
  get negative(){ return (this.x*this.y<0); }


 
  static distance(a, b) {
    const dx = a.x - b.x; const dy = a.y - b.y;
    return Math.hypot(dx, dy);}
}
