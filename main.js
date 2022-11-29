status = "";
objects = [];

 function setup()
 {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture();
    video.hide();
 }

 function start()
 {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    Input = document.getElementById("input_f").innerHTML;
    if(objects.label == Input)
    {
      video_webcamLiveView.stop();
      objectDetector.detect(gotResult);
      document.getElementById("found_s").innerHTML = "Object"+ Input + "Found!";
      speech = document.getElementById(speechSynthesis).innerHTML
   }
    
 }
 
 function modelLoaded()
 {
    console.log("Model Loaded!");
    status = true;
 }

 function draw()
 {
    image(video, 0, 0, 600, 380);
    if(status != "")
    {
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++)
      {
         document.getElementById("status").innerHTML = "Status: Objects Detected ";
         document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;

         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#FF0000");
         Reflect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
 }

 function gotResult(error, results)
 {
   if(error)
   {
      console.log(error);
   }
   console.log(results);
   objects = results;
 }


