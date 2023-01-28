song1 = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreleftwrist = 0;
scoreightwrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes);
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score of left wrist = "+ scoreleftwrist);
        scoreightwrist = results[0].pose.keypoints[10].score;
        console.log("score of right wrist = "+ scoreightwrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftwristX);
        console.log("left wrist y = " + leftwristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightwristX);
        console.log("right wrist y = " + rightwristY);
    }
}

function modelLoaded(){
    console.log('Model is loaded');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FFFF00");
    stroke("#CA28A5");
    if(scoreightwrist > 0.2){

    
    cricle(rightwristX, rightwristY, 20);
    if(rightwristY > 0 && rightwristY <= 100){
    document.getElementById("inforspeed").innerHTML = "speed = 0.5x";
    song1.rate(0.5);
    }
    if(rightwristY > 100 && rightwristY <= 200){
        document.getElementById("inforspeed").innerHTML = "speed = 1x";
        song1.rate(1);
    }
    if(rightwristY > 200 && rightwristY <= 300){
        document.getElementById("inforspeed").innerHTML = "speed = 1.5x";
        song1.rate(1.5);
    }
    if(rightwristY > 300 && rightwristY <= 400){
        document.getElementById("inforspeed").innerHTML = "speed = 2x";
        song1.rate(2);
    }
    if(rightwristY > 400 && rightwristY <= 500){
        document.getElementById("inforspeed").innerHTML = "speed = 2.5x";
        song1.rate(2.5);
    }
}
    if(scoreleftwrist > 0.2){
    circle(leftwristX, leftwristY, 20);
    leftwristYcord = Number(leftwristY);
    decimal_remove = floor(leftwristYcord);
    volume = decimal_remove/500;
    document.getElementById("inforvolume").innerHTML = "volume = "+ volume;
    song1.setVolume(volume);}
    
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
