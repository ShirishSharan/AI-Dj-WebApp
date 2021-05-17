song = "";
leftWristX = 0;
leftWristY= 0;
rightWristX=0;
rightWristY = 0;
score = 0;
rightWrishtscore = 0;

function preload(){
song= loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(500,500);
    canvas.position(430,150);
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results){
    if (results.length > 0)
    {
       console.log(results);
       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       score = results[0].pose.keypoints[9].score;
       rightWrishtscore=results[0].pose.keypoints[10].score;
     
    }

    
}

function modelLoaded(){
console.log('PoseNet is Intialized !');
}



function draw(){
    image(video, 0,0,600,600);
    fill('red');
    stroke('yellow');

    if(rightWrishtscore > 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY > 0 && rightWristY<=100){
        document.getElementById('speed').innerHTML = "speed(0.5)";
        song.rate(0.5);
        }

        if(rightWristY > 100 && rightWristY<=200){
            document.getElementById('speed').innerHTML = "speed(1)";
            song.rate(1);
            }

            if(rightWristY > 200 && rightWristY<=300){
                document.getElementById('speed').innerHTML = "speed(1.5)";
                song.rate(1.5);
                }

                if(rightWristY > 300 && rightWristY<=400){
                    document.getElementById('speed').innerHTML = "speed(2)";
                    song.rate(2);
                    }

                    if(rightWristY > 400 && rightWristY<=500){
                        document.getElementById('speed').innerHTML = "speed(2.5)";
                        song.rate(2.5);
                        }
       } 

    

    if (score > 0.2){
        circle(leftWristX,leftWristY,20);
        a = Number(leftWristY);
        b_rdecimals= floor(a);
        volume = b_rdecimals/500;
        document.getElementById('volume').innerHTML = volume;
        song.setVolume(volume);


    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}





