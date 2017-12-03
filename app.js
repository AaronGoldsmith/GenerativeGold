
 //come in to multi media lab for DW
 

// SELECTORS CANVAS
var can = document.querySelector("canvas");
var ctx = can.getContext("2d");
var form1 = document.querySelector("form");
var selection = document.querySelector("#log");
var text = document.querySelector("#txtArea");
var colorList = new FileReader();
var colors;


function wordsPerSide(){
    return Math.ceil(Math.sqrt(text.value.length()));
}
var formattedSelection = function(){
    return text.value?formatText(text.value):"";
}
function formatText(str)
{
   var wordDim = str.split(/\W{1}/g);
   return wordDim.filter(v=>v!='');
}
var sel = document.getElementById("ss")


var meta; 
// PROPERTIES
var DIMENSION = 600;
var grid = {};

var sideLength;

var avg = function(arr){
    var sum = 0;
    for(var c in arr){sum+=c}
    return c/arr.length;
}
function run()
{
    var numWords = 0;
    ctx.clearRect(0,0,DIMENSION,DIMENSION);    
    const formatted = formattedSelection();
    var colorCodes = [];
    formatted.forEach(function(i){
        var word = colorListFULL[i];
        if(word){
            colorCodes[numWords++] = word;
            console.log("found:" + i,word);
        }
        else{
            colorCodes[numWords++] = i.toHexColor(); 
        }
    });                                         //  code in an array colorCodes

    
    setup();
    // draw board after setup is done
    drawBoard(colorCodes, numWords);

  
}
window.onload = function(){
    console.log("Starting setup");
    setup();
    console.log("completed setup")
    colorList.onload = function()
    {
        var colors = colorList.result
    }
}
function setup()
{
    can.width = DIMENSION; 
    can.height = DIMENSION;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,DIMENSION,DIMENSION);
    return true;
}


function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

// Convert an int to hexadecimal with a max length
// of six characters.
function intToARGB(i) {
    var hex = ((i>>24)&0xFF).toString(16) +
            ((i>>16)&0xFF).toString(16) +
            ((i>>8)&0xFF).toString(16) +
            (i&0xFF).toString(16);
    hex += '00000';
    return hex.substring(0, 6);
}

// Extend the string type to allow converting to hex for quick access.
String.prototype.toHexColor = function() {
    return "#" + intToARGB(hashCode(this));
}

function drawBoard(colors,numWords)
{
    // CURRENTLY SORTING
    //colors.sort();
    var activeC = 0;
    var offsetX = 0, offsetY = 0;
    var Boxlen = DIMENSION/Math.ceil(Math.sqrt(numWords));
    ctx.strokeStyle= "black";
    

    while(offsetY <= DIMENSION){
        colors.forEach(function(c){
            ctx.fillStyle = c;
            ctx.fillRect(offsetX,offsetY,Boxlen,Boxlen);
            ctx.strokeRect(offsetX,offsetY,Boxlen,Boxlen);
            if(offsetX + Boxlen >= DIMENSION){
                offsetX = 0; 
                offsetY += Boxlen;
            }
            else{
                offsetX += Boxlen;                
            }
        });
    }
}
var rgbaSum = function(c1, c2){
    var a = c1.a + c2.a*(1-c1.a);
    return {
      r: (c1.r * c1.a  + c2.r * c2.a * (1 - c1.a)) / a,
      g: (c1.g * c1.a  + c2.g * c2.a * (1 - c1.a)) / a,
      b: (c1.b * c1.a  + c2.b * c2.a * (1 - c1.a)) / a,
      a: a
    }
  } 
String.prototype.score = function()
{
    var sum,i;
    for(i = 0,sum=0;i<this.length;i++){
        sum += this.charCodeAt(i);
    }
    return sum%255;
}
Array.prototype.avg = function()
{
    var sum,i;
    for(i = 0,sum=0;i<this.length;i++){
        sum += this[i];
    }
    return sum/this.length;
}

var convertToNums = function(str)
{
    var wordDim = [];
    str.forEach(function(el){wordDim.push(el.score());})
    return wordDim;
}

function sampleText(){
    
        var str = "";
        var len = colorListFULL.length;
        var count = 0;
        for (var key in colorListFULL){
            var r = Math.floor(Math.random()*100);
            if(r<10){
             str += key + " ";
              count++;
            }
            if(r >98){str+="\n"}
            
        }
        document.getElementById("txtArea").value = str;
        run();
    }

   


///// color list

var colorListFULL = {'intellect':'#0600A7','abundance':'#88B04B','learn':'#FFE34C','learning':'#FFE34C','acceptance':'#4169E1','action':'#DD4124','action':'#FFE34C','affection':'#D94F70','affection':'#4169E1','aggression':'#BF1932','aggression':'#FB523F','aging':'#F0C05A','air':'#4169E1','ambition':'#DD4124','amiability':'#DD4124','anger':'#9B1B30','angry':'#9B1B30','anonymity':'#000000','anti-establishment':'#000000','apricot':'#FCCC71','arrogance':'#3E3E85','artistry':'#4169E1','artistry':'#6A69C5','assurance':'#DD4124','astral':'#C0C0C0','attainment':'#FFD700','attention':'#BF1932','attention-grabbing':'#DD4124','attraction':'#DD4124','attractiveness':'#DD4124','authority':'#000000','automotive':'#4169E1','autumn':'#DD4124','awe':'#FFD700','bad,luck':'#000000','balance':'#DD4124','balance':'#88B04B','beauty':'#6A69C5','beautiful':'#6A69C5','beginnings':'#DD4124','betrayal':'#FFE34C','binding':'#000000','birth':'#FCFCFC','blood':'#BF1932','boring':'#919192','bravery':'#BF1932','brilliance':'#FCFCFC','business,goals':'#DD4124','business,productivity':'#B87333','calm':'#F8F8F2','calm':'#88B04B','calming':'#D94F70','calming':'#7BC4C4','calming':'#4169E1','calmness':'#4169E1','career':'#DD4124','career,goals':'#BF1932','career,moves':'#B87333','caring':'#D94F70','cars':'#BF1932','caution':'#FFE34C','caution':'#F0C05A','ceremony':'#3E3E85','charity':'#DD4124','charity':'#FCFCFC','chastity':'#FCFCFC','cheap':'#DD4124','cheerfulness':'#BF1932','cheerfulness':'#DD4124','cheerfulness':'#FFE34C','child':'#ECA7B7','chivalrous':'#6A69C5','chocolate':'#2B0F0E','citrus':'#FCCC71','clairaudience':'#C0C0C0','clairvoyance':'#C0C0C0','clarity':'#FFE34C','clarity':'#FCFCFC','classic':'#000000','classy':'#000000','cleanliness':'#4169E1','cleanliness':'#4169E1','cleanliness':'#FCFCFC','clinical':'#FCFCFC','cold':'#4169E1','cold':'#FCFCFC','comfort':'#3B2020','comfort':'#4169E1','communication':'#4169E1','communication':'#C0C0C0','compassion':'#88B04B','compassion':'#4169E1','conceit':'#3E3E85','concentration':'#FFD700','concentration':'#6A69C5','confidence':'#FFE34C','confidence':'#4169E1','confidence':'#00FFFF','consciousness':'#4169E1','conservatism':'#4169E1','conservative':'#919192','conservativeness':'#919192','constructiveness':'#DD4124','contemplation':'#88B04B','contemplation':'#4169E1','contemplation':'#3E3E85','contentment':'#3B2020','coolness':'#FCFCFC','cooperation':'#FFE34C','cooperation':'#4169E1','coral':'#FCCC71','corporate':'#0600A7','courage':'#BF1932','courage':'#9B1B30','courage':'#DD4124','covetousness':'#FFE34C','cowardice':'#FFE34C','cowardice':'#688B5A','creative,force':'#6A69C5','creativity':'#DD4124','creativity':'#FFE34C','creativity':'#4169E1','creativity':'#3E3E85','creativity':'#6A69C5','credibility':'#3B2020','credibility':'#0600A7','cruelty':'#3E3E85','crystal,clear,day':'#9BC4E2','curiosity':'#FFE34C','danger':'#BF1932','decay':'#F0C05A','deceit':'#FB523F','deceit':'#FFE34C','decisiveness':'#0600A7','deeper,truth':'#3E3E85','deja,vu':'#3E3E85','delicacy':'#D94F70','dependability':'#88B04B','dependability':'#4169E1','dependability':'#0600A7','depressing':'#000000','depression':'#4169E1','depth':'#4169E1','depth':'#0600A7','depth':'#000000','depth':'#000000','desire':'#BF1932','desire':'#FB523F','desire,for,power':'#FFD700','desire,to,improve':'#FFE34C','determination':'#BF1932','determination':'#DD4124','devotion':'#4169E1','dignity':'#3E3E85','dignity':'#919192','dignity':'#000000','diplomacy':'#88B04B','dirt':'#3B2020','dirtiness':'#000000','discord':'#688B5A','disease':'#FFE34C','dishonesty':'#FFE34C','distinguished':'#C0C0C0','divinity':'#FCFCFC','domination':'#FB523F','drama':'#BF1932','dramatic':'#00FFFF','dramatic':'#000000','dreams':'#FFE34C','dreams':'#3E3E85','dreams':'#C0C0C0','drinks':'#BF1932','driving-forces':'#BF1932','durability':'#919192','dynamic':'#BF1932','earth':'#DD4124','earth':'#3B2020','earth,mother':'#88B04B','eccentricity':'#00FFFF','ego':'#3E3E85','elegance':'#3E3E85','elegance':'#000000','elegance':'#000000','elegance':'#F8F8F2','element,of,fire':'#BF1932','elephant':'#F8F8F2','emotional,healing':'#D94F70','emotional,healing':'#7BC4C4','emotional,intensity':'#BF1932','emotional,lift':'#DD4124','emotional,maturity':'#D94F70','empathy':'#4169E1','empathy':'#3E3E85','emptiness':'#000000','encouragement':'#DD4124','endurance':'#DD4124','endurance':'#3B2020','endurance':'#88B04B','energy':'#BF1932','energy':'#ECA7B7','energy':'#DD4124','energy':'#FFE34C','energy':'#3E3E85','enlightenment':'#FFE34C','enlightenment':'#3E3E85','enthusiasm':'#DD4124','enthusiasm':'#FFE34C','environment':'#88B04B','envy':'#88B04B','eroticism':'#BF1932','ethereal':'#D94F70','ethereal':'#6A69C5','evil':'#000000','evil':'#000000','excellence':'#6A69C5','excitement':'#BF1932','excitement':'#DD4124','expansiveness':'#DD4124','expertise':'#0600A7','extravagance':'#3E3E85','fairness':'#FCFCFC','faith':'#4169E1','faith':'#FCFCFC','fame':'#BF1932','fascination':'#DD4124','fast,action':'#BF1932','fear':'#000000','fear,of,the,unknown':'#000000','fearlessness':'#00FFFF','female,power':'#C0C0C0','femininity':'#D94F70','fertility':'#3B2020','fertility':'#88B04B','festivity':'#00FFFF','flamboyance':'#DD4124','fluidity':'#4169E1','follower':'#FFE34C','food':'#88B04B','force':'#BF1932','foresignt':'#88B04B','formality':'#4169E1','formality':'#000000','fragility':'#ECA7B7','freedom.,betterment,of,humanity':'#4169E1','freshness':'#88B04B','freshness':'#00FFFF','friendliness':'#DD4124','friendliness':'#88B04B','friendly':'#DD4124','friendship':'#D94F70','friendship':'#4169E1','friendships':'#3B2020','fun':'#DD4124','general,success':'#DD4124','generosity':'#BF1932','generosity':'#3B2020','generosity':'#88B04B','gentleness':'#4169E1','glamour':'#C0C0C0','gloominess':'#919192','glory':'#FFE34C','goals':'#DD4124','god':'#FFD700','goddess':'#FCFCFC','goddess':'#C0C0C0','good,fortune':'#4169E1','good,luck':'#88B04B','good,will':'#D94F70','good-tasting':'#BF1932','goodness':'#FCFCFC','graceful,aging':'#C0C0C0','grass':'#88B04B','greed':'#88B04B','grief':'#000000','growing,things':'#DD4124','growth':'#88B04B','happiness':'#DD4124','happiness':'#FFD700','happiness':'#FFE34C','hard,work':'#3B2020','harmony':'#88B04B','harmony':'#4169E1','harmony':'#4169E1','healing':'#88B04B','healing':'#3E3E85','health':'#DD4124','health':'#FCCC71','health':'#88B04B','hearth':'#3B2020','heat':'#BF1932','heat':'#DD4124','heaven':'#4169E1','heaviness':'#88B04B','hidden,knowledge':'#3E3E85','high,aspirations':'#3E3E85','high,quality':'#000000','high,spirits':'#ECA7B7','high,tech':'#C0C0C0','high-end':'#000000','high-tech':'#C0C0C0','higher,mathematics':'#FFD700','higher,self':'#FCFCFC','higher,thoughts':'#4169E1','holiness':'#FCFCFC','home':'#3B2020','honor':'#FFE34C','hope':'#FFE34C','hope':'#88B04B','hope':'#88B04B','hope':'#88B04B','humility':'#FCFCFC','humor':'#FFE34C','humor':'#00FFFF','idealism':'#FFE34C','idealism':'#4169E1','ideas':'#4169E1','imagination':'#FFE34C','imagination':'#3E3E85','immortality':'#88B04B','indecision':'#C74375','indecisiveness':'#9B1B30','independence':'#DD4124','independence':'#3E3E85','individualism':'#00FFFF','industrial':'#C0C0C0','inexpensive':'#3B2020','inexperience':'#88B04B','inexperience':'#88B04B','infinity':'#4169E1','influence':'#3E3E85','inner,strength':'#4169E1','innocence':'#FCFCFC','innocence':'#FCFCFC','innovative':'#7BC4C4','inspiration':'#4169E1','inspiration':'#4169E1','inspiration':'#6A69C5','integrity':'#0600A7','Intellect':'#F0C05A','intellect':'#FFE34C','intellect':'#4169E1','intelligence':'#FFE34C','intelligence':'#4169E1','intelligence':'#919192','intense':'#DD4124','intimacy':'#3B2020','intuition':'#3E3E85','intuition':'#C0C0C0','invisible':'#3E3E85','inviting':'#DD4124','jealousy':'#FFE34C','jealousy':'#F0C05A','jealousy':'#88B04B','jealousy':'#88B04B','jealousy':'#688B5A','joy':'#C74375','joy':'#DD4124','joy':'#FFE34C','joy':'#88B04B','justice':'#DD4124','knowledge':'#0600A7','knowledge':'#0600A7','lavender':'#6A69C5','law':'#0600A7','leadership':'#BF1932','leadership':'#9B1B30','legal,matters':'#DD4124','light':'#FFE34C','light':'#FCFCFC','logic':'#0600A7','logical,imagination':'#FFE34C','longevity':'#3B2020','love':'#BF1932','love':'#C74375','love':'#D94F70','love':'#88B04B','love':'#4169E1','love':'#BA0001','low-budget':'#DD4124','loyalty':'#FFE34C','loyalty':'#4169E1','lust':'#BF1932','luxury':'#3E3E85','magic':'#88B04B','magic':'#3E3E85','majesty':'#3E3E85','malice':'#9B1B30','masculine':'#3B2020','materialistic,thoughts':'#3B2020','maturity':'#919192','meaning':'#FFD700','medical,products':'#4169E1','meditation':'#3E3E85','meditation':'#6A69C5','mellowness':'#FFE34C','melon':'#FCCC71','memory':'#FFE34C','mental,and,appetite,stimulant':'#DD4124','mental,blocks':'#FFE34C','mental,force':'#FFE34C','messages':'#4169E1','misfortune':'#88B04B','moderation':'#88B04B','modern,music':'#000000','modernism':'#000000','modernity':'#C0C0C0','modesty':'#919192','monetary,success':'#88B04B','money':'#88B04B','money,goals':'#B87333','mood-lightening':'#DD4124','movement':'#00FFFF','music':'#6A69C5','mystery':'#4169E1','mystery':'#3E3E85','mystery':'#000000','mystic,powers':'#FFD700','nature':'#88B04B','nausea':'#3E3E85','nausea,':'#688B5A','New,Age,spirituality':'#3E3E85','night':'#000000','nobility':'#3E3E85','non-threatening':'#4169E1','nurturing':'#D94F70','nurturing':'#3B2020','nurturing':'#88B04B','old,age':'#919192','optimism':'#FFE34C','order':'#4169E1','order':'#0600A7','organization':'#FFE34C','ornate,riches':'#C0C0C0','outdoor':'#3B2020','outdoors':'#3B2020','paganism':'#3E3E85','panache':'#2B0F0E','passion':'#BF1932','passion':'#C74375','passion':'#B87333','passivity':'#D94F70','passivity':'#3B2020','patience':'#4169E1','peace':'#D94F70','peace':'#4169E1','peace':'#FCFCFC','peach':'#FCCC71','perception':'#FFE34C','perfection':'#FCFCFC','personal,goals':'#88B04B','perspective':'#000000','philosophy':'#FFE34C','physical,healing':'#88B04B','piety':'#4169E1','plant,':'#88B04B','playful,humor':'#FFD700','pleasantness':'#F8F8F2','pleasure':'#FB523F','positivity':'#FCFCFC','power':'#BF1932','power':'#000000','practical':'#919192','practicality':'#3B2020','practicality':'#919192','precision':'#4169E1','precision':'#FCFCFC','prestige':'#FFD700','prestige':'#88B04B','prestige':'#000000','pristine':'#00FFFF','pristine':'#FCFCFC','productivity':'#3B2020','professional':'#919192','professional,growth':'#B87333','progress':'#4169E1','property,deals':'#DD4124','protection':'#7BC4C4','protection':'#4169E1','protection':'#000000','provoking':'#BF1932','psychic,ability':'#3E3E85','psychometry':'#C0C0C0','purity':'#FFE34C','purity':'#F8F8F2','purity':'#FCFCFC','purpose':'#FFD700','quality':'#919192','quests,of,the,heart':'#FFD700','quick':'#DD4124','movement':'#DD4124','quiet':'#F8F8F2','quiet':'#88B04B','quiet':'#919192','quiet':'#4169E1','wisdom':'#4169E1','quietness':'#6A69C5','quietude':'#88B04B','rage':'#9B1B30','reassurance':'#4169E1','recognition':'#9B1B30','refreshing':'#88B04B','refreshing':'#7BC4C4','relaxation':'#4169E1','reliability':'#3B2020','reliability':'#919192','reliability':'#000000','remorse':'#000000','renewal':'#88B04B','repelling':'#000000','negativity': '#000000','reservedness':'#000000','responsibility':'#6A69C5','responsiveness':'#88B04B','restlessness':'#FFE34C','resurrection':'#88B04B','retro':'#7BC4C4','reverence':'#FCFCFC','revolution':'#BF1932','rich,':'#F8F8F2','richness':'#2B0F0E','richness':'#3E3E85','risk':'#BF1932','robustness':'#2B0F0E','romance':'#BF1932','royalty':'#3E3E85','sacrifice':'#6A69C5','sadness':'#4169E1','sadness':'#919192','sadness':'#000000','safety':'#FFD700','safety':'#88B04B','safety':'#FCFCFC','sciences':'#FFD700','sea':'#4169E1','secretiveness':'#000000','security':'#4169E1','security':'#919192','self,assurance':'#3E3E85','self-assuredness':'#DD4124','confidence':'#3E3E85','self-control':'#88B04B','self-sacrifice':'#FCFCFC','selling':'#DD4124','sensitivity':'#C74375','sensuality':'#3B2020','sensuality':'#3E3E85','sensuality':'#6A69C5','serene':'#9BC4E2','serenity':'#0600A7','serious':'#000000','sex':'#BF1932','sexuality':'#C74375','sexuality':'#FB523F','shapeshifting':'#000000','sharing':'#88B04B','sharing':'#4169E1','sickness':'#F0C05A','sickness':'#688B5A','simplicity':'#3B2020','simplicity':'#FCFCFC','sincerity':'#4169E1','sky':'#4169E1','sky':'#9BC4E2','sleekness':'#C0C0C0','snow':'#F8F8F2','snow':'#FCFCFC','social,energy':'#FFE34C','social,force':'#DD4124','softness':'#F8F8F2','solid':'#919192','soothing':'#88B04B','sophisticated':'#7BC4C4','sophisticated':'#919192','sophisticated':'#000000','sophistication':'#2B0F0E','sophistication':'#3E3E85','sophistication':'#000000','space':'#000000','special,events':'#3B2020','speech':'#4169E1','speed':'#BF1932','spiritual':'#4169E1','spiritual,connection':'#3E3E85','spiritual,love':'#FFD700','spiritual,power':'#3E3E85','spirituality':'#3E3E85','spirituality':'#FCFCFC','sports':'#7BC4C4','sports,and,games':'#BF1932','stability':'#3B2020','stability':'#88B04B','stability':'#4169E1','stability':'#0600A7','staid':'#919192','steadfastness':'#DD4124','sterility':'#FCFCFC','stimulating':'#BF1932','strength':'#BF1932','strength':'#DD4124','strength':'#3B2020','strength':'#00FFFF','strength':'#000000','strength,of,character':'#000000','strong':'#000000','style':'#000000','substance':'#3B2020','success':'#DD4124','success':'#FFD700','successful,innovations':'#FCFCFC','summer':'#FFE34C','sun':'#FFE34C','sunshine':'#FFE34C','survival':'#BF1932','sweet,smelling':'#D94F70','sweet,tasting':'#D94F70','tangy':'#FCCC71','technical':'#000000','technology':'#4169E1','teeth':'#F8F8F2','telepathy':'#3E3E85','telepathy':'#C0C0C0','tenseness':'#9B1B30','the,sun':'#DD4124','third,eye':'#3E3E85','thirst,for,action':'#FB523F','tranquil':'#88B04B','tranquility':'#3B2020','tranquility':'#4169E1','transformation':'#3E3E85','travel':'#4169E1','tree,':'#88B04B','trees':'#88B04B','tropics':'#DD4124','trust':'#4169E1','truth':'#D94F70','truth':'#4169E1','uncertainty':'#FFE34C','unconscious':'#3E3E85','underground':'#000000','understanding':'#FFE34C','understanding':'#4169E1','understated':'#F8F8F2','unhappiness':'#000000','uninhibited':'#DD4124','union':'#FCFCFC','unity':'#4169E1','universal,spirit':'#3E3E85','vibrancy':'#BF1932','vibrancy':'#DD4124','vigor':'#9B1B30','vigor':'#00FFFF','vigour':'#88B04B','violence':'#BF1932','virginity':'#FCFCFC','vitality':'#DD4124','war':'#BF1932','warmth':'#BF1932','warmth':'#DD4124','warmth':'#FFE34C','water':'#4169E1','water':'#4169E1','weakness':'#FFE34C','wealth':'#FFD700','wealth':'#3E3E85','wealth':'#000000','willpower':'#9B1B30','winning':'#FFD700','winter':'#FCFCFC','wisdom':'#FFD700','wisdom':'#FFE34C','wisdom':'#4169E1','wisdom':'#0600A7','wisdom':'#3E3E85','wrath':'#9B1B30','yearning':'#9B1B30','youth':'#ECA7B7','youth':'#DD4124','youth':'#88B04B','youth':'#88B04B','youth':'#000000'}

console.log(colorListFULL);