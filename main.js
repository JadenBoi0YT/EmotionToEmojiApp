prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    image_qaulity:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='SnapshotPreview' src='" + data_uri + "'>";
    });
}
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/FV0gb3P-M/model.json', modelLoaded);

function modelLoaded(){
console.log("modelLoaded");
}

function Speak(){
    var synth=window.speechSynthesis;
    speakData_1= "the first prediction is " + prediction1;
    speakData_2=" and the second prediction is " + prediction2;
    var Utterthis_1= new SpeechSynthesisUtterance(speakData_1 + speakData_2);
    synth.speak(Utterthis_1);
}

function Check(){
    img = document.getElementById("SnapshotPreview");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    }
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    Speak();
    if (results[0].label == "Happy"){
        document.getElementById("update_emoji_image").innerHTML = "&#128512";
    }
    if (results[0].label == "Worried"){
        document.getElementById("update_emoji_image").innerHTML = "&#128532";
    }
    if (results[0].label == "Sad"){
        document.getElementById("update_emoji_image").innerHTML = "&#128546";
    }
    if (results[0].label == "Angry"){
        document.getElementById("update_emoji_image").innerHTML = "&#128545";
    }
    if (results[1].label == "Happy"){
        document.getElementById("update_emoji_image2").innerHTML = "&#128512";
    }
    if (results[1].label == "Worried"){
        document.getElementById("update_emoji_image2").innerHTML = "&#128532";
    }
    if (results[1].label == "Sad"){
        document.getElementById("update_emoji_image2").innerHTML = "&#128546";
    }
    if (results[1].label == "Angry"){
        document.getElementById("update_emoji_image2").innerHTML = "&#128545";
    }
}