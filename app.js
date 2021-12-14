const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }
  
navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.moxGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const audio1 = document.querySelector('#audio1');
const audio2 = document.querySelector('#audio2');
const audio3 = document.querySelector('#audio3');
let model;

handTrack.startVideo(video).then(status => {
  if(status) {
      navigator.getUserMedia(
          {video: {} }, 
          stream => {
            video.srcObject = stream;
            setInterval(runDetection, 300);
            
          },
          err => console.log(err)
      );
  }
});
function runDetection() {
  model.detect(video).then(predictions => {
      if (predictions.length !== 0){
        let hand1 = predictions[0].bbox;
        let x = hand1[0];
        let y = hand1[1];
        if(y > 300){
          if(x < 200){
            audio.play();
          }else if(x > 400){
            audio1.play();
          }
        else if(x > 300){
          audio2.play();
        }else if(x > 200){
          audio3.play();
        }
         }
         
      }        
          
  });
}

handTrack.load(modelParams).then(lmodel =>{
  model = lmodel;
  

});
