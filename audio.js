
import LatLon from 'https://cdn.jsdelivr.net/npm/geodesy@2.2.1/latlon-spherical.min.js';

var target = {
    latitude : 48.89353893327512,
    longitude: 2.3243825143093972
  };

unmuteButton.addEventListener('click', function() 
{
    // playAudioSource();

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    // navigator.geolocation.watchPosition(receivePosition, receivePositionError, options);

      getAccel();

    // let magSensor = new Magnetometer({frequency: 60});

    // magSensor.addEventListener('reading', e => {
    // console.log("Magnetic field along the X-axis " + magSensor.x);
    // console.log("Magnetic field along the Y-axis " + magSensor.y);
    // console.log("Magnetic field along the Z-axis " + magSensor.z);
    // document.getElementById("magX").innerHTML = magSensor.x;
    // document.getElementById("magY").innerHTML = magSensor.y;
    // document.getElementById("magZ").innerHTML = magSensor.z;
    // });
    // magSensor.start();
});

function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
        // Add a listener to get smartphone acceleration 
            // in the XYZ axes (units in m/s^2)
            window.addEventListener('devicemotion', (event) => {
                console.log(event);
            });
       // Add a listener to get smartphone orientation 
           // in the alpha-beta-gamma axes (units in degrees)
            window.addEventListener('deviceorientation',(event) => {
                console.log(event);
            });
        }
    });
}

function receivePosition(position)
{
    // console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
    const p1 = new LatLon(position.coords.latitude, position.coords.longitude);
    const p2 = new LatLon(target.latitude, target.longitude);
    const d = p1.distanceTo(p2);
    // console.assert(d.toFixed(3) == '968874.704');
    console.log("distance=" + d);
    document.getElementById("distance").innerHTML = d;
}

function receivePositionError(err)
{
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

// Audio
function playAudioSource()
{
    // Create an AudioContext
    let audioContext = new AudioContext();

    // Create a (first-order Ambisonic) Resonance Audio scene and pass it
    // the AudioContext.
    let resonanceAudioScene = new ResonanceAudio(audioContext);

    // Connect the scene’s binaural output to stereo out.
    resonanceAudioScene.output.connect(audioContext.destination);

    // Create an AudioElement.
    let audioElement = document.createElement('audio');

    audioElement.crossOrigin = 'anonymous';

    // Load an audio file into the AudioElement.
    audioElement.src = 'https://raw.githubusercontent.com/simonhill-fr/asset/master/pad.wav';

    // Generate a MediaElementSource from the AudioElement.
    let audioElementSource = audioContext.createMediaElementSource(audioElement);

    // Add the MediaElementSource to the scene as an audio input source.
    let source = resonanceAudioScene.createSource();
    audioElementSource.connect(source.input);

    // Set the source position relative to the room center (source default position).
    source.setPosition(5, 5, 0);

    // Play the audio.
    audioElement.muted = false;
    audioElement.play();

}
