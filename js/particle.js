function init() {
 
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    
    // initialize variables
    fireflies = [];
    numFlies = 250;
    angleX = 0;
    angleY = 0;
    range = 1.2;
    xSpeed = .7;
    ySpeed = .1;
    fps = 15;
    
    //create a batch of FireFly (object) particles and add each new particle object to the fireflies array.
    
    for (var i = 0; i < numFlies; i++){
        
        xVelocity = randRange(-4, 2);
        yVelocity = randRange(-4, 2);
        
        //we don't want our velocity values to be near 0;
        
        if (xVelocity < 1 && xVelocity > -1){
            xVelocity = -1;
        }
        
        if (yVelocity < 1 && yVelocity > -1){
            yVelocity = -1;
        }
        
        // create a new FireFly particle object and add it to the fireflies array
        
        fireflies.push(new FireFly(10, canvas.height - 10, 10, canvas.width - 10, xVelocity, yVelocity));
        
    }
    
    //get the FireFly animation started using a timer and have it run repeatedly at our framerate until the user leaves the page.
    
    window.requestAnimationFrame =  window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.msRequestAnimationFrame;
    
    //run update() to get our heartbeat started. 
    requestAnimationFrame(update);
    
}

// Constructor fuction for a FireFly particl object

function FireFly(topEdge, bottomEdge, leftEdge, rightEdge, xVel, yVel) {
    
    // save passed in properties for later use
    this.top = topEdge;
    this.bottom = bottomEdge;
    this.left = leftEdge;
    this.right = rightEdge;
    this.xVelocity = xVel;
    this.yVelocity = yVel;
    
    // inital position
    this.x = Math.random() * canvas.width / 2;
    this.y = Math.random() * canvas.height;
    this.alpha = randRange(.2, .9);
    this.color = "rgba(153, 255, 51, " + this.alpha + ")";
    this.radius = randRange(2, 5);
    this.Blink = false;
    this.blinkRate = Math.floor(randRange(0, 15));
    
}

//draw and animate the FireFly particle objects (heartbeat)

function update() {
    
    //use setTimeout to set the framerate.
    setTimeout(function() {
        
        // clear the canvas (context) so it can be refreshed (redrawn)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //let's draw the FireFly particles that are in our fireflies array
        for (var i = 0; i < fireflies.length; i++) {
            
            //get and store the next FireFly object from the array
            fly = fireflies[i];
            
            //start drawing it.
            ctx.beginPath();
            ctx.fillStyle = fly.color;
            
            if (fly.blinkRate >= 15){
                fly.blinkRate = 0;
                fly.blink = false;
            }
            else {
                fly.blinkRate++;
                if (fly.blinkRate >= 7){
                    fly.blink = true;
                }
            }
            
            if (fly.blink) {
            
                ctx.arc(fly.x, fly.y, fly.radius, 0, Math.PI * 2, false);
                ctx.fill();
                
            }
            
            ctx.closePath();
            
            
            //animate each fly particle. 
            //apply a velocity to change x and y properties. 
            fly.x += fly.xVelocity + Math.cos(angleX) * range;
            fly.y += fly.yVelocity + Math.sin(angleY) * range;
            
            //alter the angles 
            angleX += xSpeed;
            angleY += ySpeed;
            
            //collision detection for our boundries/edges
            
            if (fly.y >= fly.bottom + 25 && fly.yVelocity > 0){
                
                fly.y = fly.bottom + 5;
                fly.yVelocity *= -1;
                
            }
            else if (fly.y <= fly.top - 25 && fly.yVelocity < 0){
                
                fly.y = 5;
                fly.yVelocity *= -1;
                
            }
            if (fly.x >= fly.right + 25 && fly.xVelocity > 0){
                
                fly.x = fly.right + 5;
                fly.xVelocity *= -1;
                
            }
            if (fly.x <= fly.left - 25 && fly.xVelocity < 0){
                
                fly.x = 5;
                fly.xVelocity *= -1;
                
            }
            
        }
        
        requestAnimationFrame(update);
        
    }, 1000/fps)
    
}

function randRange(min, max) {
    
     return Math.random() * (max - min) + min;
    
}