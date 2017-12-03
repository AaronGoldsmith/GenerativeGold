var canvas;
var circleLocations = [];
var alarm;
var playing = true;
var width = window.innerWidth;
var height = window.innerHeight*0.8;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(){
  if(!playing){alarm = setInterval(tick,10);}
  else{clearInterval(alarm);}
  playing = !playing;
}


Ball.prototype.bump = function(j){

  if(this.pt.x-this.radius<=0){
    this.vector.x *= -1;
  }
  else if(this.pt.x+this.radius>=width){
    this.vector.x *=-1;
  }
  else if(this.pt.y-this.radius<=0){
    this.vector.y *=-1;
  }
  else if(this.pt.y+this.radius>=height){
    this.vector.y *=-1;
  }
    for(var i = 0;i<circleLocations.length;i++)
    {
      if(i==j){break;}
        var CL = circleLocations[i];
        var dx = this.pt.x - CL.pt.x;
        var dy = this.pt.y - CL.pt.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
       
        if(distance <= 5+CL.radius+this.radius){
          var spd1 = Math.sqrt(this.vector.x*this.vector.x+this.vector.y*this.vector.y);
          var spd2 = Math.sqrt(CL.vector.x*CL.vector.x + CL.vector.y*CL.vector.y);
          if(2*spd1<spd2){     
            this.vector = circleLocations[i].vector.negative;
            circleLocations[i].vector = this.vector.negative;
          }
          else{
            circleLocations[i].vector = this.vector
            this.vector = circleLocations[i].negative;
          }
          
        }
    
      
    }
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

Ball.prototype.move = function()
{
  this.pt.x += this.vector.x; 
  this.pt.y += this.vector.y;
   
}

function tick()
{
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="red";

  for(var circle = 0;circle < circleLocations.length;circle++)
  {
    var c = circleLocations[circle];
    c.bump(circle)    
    c.move();
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


function Ball(pt, vector, color, radius) {
  this.pt = pt;
  this.vector = vector
  this.color = color;
  this.radius = radius;
}
function getColor()
{
  var r = random(0,255);
  var g = random(0,255);
  var b = random(0,255);
  return [r,g,b]
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function colorArray(arr){
  return "#" + arr[0].toString(16)+ arr[1].toString(16) +  arr[2].toString(16);
}
function storeClick(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var PT = new Pt(x,y);
    var vXY = Vector.randomDirection();

    var col = colorArray(getColor());
    
    var ball = new Ball(PT,vXY,col,random(10,30));

    circleLocations.push(ball);
}
function Pt(x,y)
{
  this.x = x || 0;
  this.y = y || 0;
}
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}


Vector.prototype = {
  negative: function() {
    return new Vector(-this.x, -this.y);
  },
  add: function(v) {
    if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y);
    else return new Vector(this.x + v, this.y + v);
  },
  subtract: function(v) {
    if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y);
    else return new Vector(this.x - v, this.y - v);
  },
  multiply: function(v) {
    if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y);
    else return new Vector(this.x * v, this.y * v);
  },
  divide: function(v) {
    if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y);
    else return new Vector(this.x / v, this.y / v);
  },
  equals: function(v) {
    return this.x == v.x && this.y == v.y
  },
  dot: function(v) {
    return this.pt.x * v.pt.x + this.pt.y * v.pt.y 
  },
  length: function() {
    return Math.sqrt(this.dot(this));
  },
  unit: function() {
    return this.divide(this.length());
  },
  min: function() {
    return Math.min(this.x, this.y);
  },
  max: function() {
    return Math.max(this.x, this.y);
  },
  toAngles: function() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  },
  angleTo: function(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  toArray: function(n) {
    return [this.x, this.y].slice(0, n || 2);
  },
  clone: function() {
    return new Vector(this.x, this.y);
  },
  init: function(x, y) {
    this.x = x; this.y = y;
    return this;
  }
};

Vector.negative = function(a, b) {
  b.x = -a.x; b.y = -a.y; b.z = -a.z;
  return b;
};
Vector.add = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y;  }
  else { c.x = a.x + b; c.y = a.y + b; }
  return c;
};
Vector.subtract = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; }
  else { c.x = a.x - b; c.y = a.y - b; }
  return c;
};
Vector.multiply = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
  else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
  return c;
};
Vector.divide = function(a, b, c) {
  if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; }
  else { c.x = a.x / b; c.y = a.y / b; }
  return c;
};
Vector.unit = function(a, b) {
  var length = a.length();
  b.x = a.x / length;
  b.y = a.y / length;
  return b;
};
Vector.fromAngles = function(theta, phi) {
  return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi));
};
Vector.randomDirection = function() {
  return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector.min = function(a, b) {
  return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y));
};
Vector.max = function(a, b) {
  return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y));
};
Vector.fromArray = function(a) {
  return new Vector(a[0], a[1]);
};
Vector.angleBetween = function(a, b) {
  return a.angleTo(b);
};

