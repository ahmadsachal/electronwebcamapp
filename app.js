'use strict';
const electron = require('electron');
const { remote } = require('electron');
const { dialog } = remote;
const { ipcRenderer } = electron;
const fs = require('fs');
const Swal = require('sweetalert2');
let photoData;
let video
let filePath = './saved_images/image.png'
// const titleBar = document.getElementById("title-bar");
const titleBarBtns = Array.from(document.getElementsByClassName("title-bar-btn"));

function savePhoto(filePath) {
    if (filePath) {
        fs.writeFile(filePath, photoData, 'base64', (err) => {
            if (err) {
                alert(`There was a problem saving the photo: ${err.message}`);
            }
            console.log('Success')
            photoData = null;
        });
    }
    else {
        console.log('No path found')
    }
}


var checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
    var video = document.querySelector('video')
    if (checkbox.checked) {
        window.location = "index.html"
        console.log('Checked');
    } else {
        // video.srcObject.getTracks()[0].enabled = true
        // console.log("Video off");
        video.srcObject.getTracks()[0].stop();
        console.log("Video off");
        console.log('Not checked');
    }
});


function initialize() {
    Particles.init({
        selector: '#particles-bg',
        color: "#CCCCCC",
        connectParticles: true,
        speed: 1,
        minDistance: 150
    });
    video = window.document.querySelector('video');
    let errorCallback = (error) => {
        console.log(`There was an error connecting to the video stream: ${error.message}`);
    };

    window.navigator.getUserMedia({ video: true }, (localMediaStream) => {
        var video = document.querySelector('video')
        video.srcObject = localMediaStream;
    }, errorCallback);
}


titleBarBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        ipcRenderer.send("action:main", btn.getAttribute("data-action"));
    });
});


function takePhoto() {
    let canvas = window.document.getElementById("webcam");
    canvas.getContext('2d').drawImage(video, 0, 0, 850, 550);
    photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    fs.writeFile(filePath, photoData, 'base64', (err) => {
        if (err) {
            alert(`There was a problem saving the photo: ${err.message}`);
        }
        console.log('Success')
        photoData = null;
    });
    Swal.fire(
        'Image Saved',
        'Your image has been saved.',
        'success'
    ).then((res) => {
        var video = document.querySelector('video')
        video.srcObject.getTracks()[0].stop();
        console.log("Vid off");
        // window.location = "index.html"
    })
}


window.onload = initialize;
