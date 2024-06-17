const soundBtns = document.querySelectorAll('.soundBtns')
const micBtn = document.getElementById('micBtn')
const speakBtn = document.getElementById('speakBtn')
const roomName = document.getElementById('roomName')
const roomCode = document.getElementById('rmCode')
const commsMain = document.getElementById('commsMain')

const socket = io();



var room;
var username;
var roomNo
// var name

function getRoom() {
    room = localStorage.getItem('roomName')
    roomNo = localStorage.getItem('roomCode')
    username = localStorage.getItem('userName')

    console.log(room)

    if (room && username) {
        roomName.innerText = room
        roomCode.innerText = roomNo       
    } else {
        window.location.href = '/'
    }
}

window.addEventListener('load', getRoom)


micBtn.addEventListener('click', (e) => {
    if (micBtn.classList.contains('active')) {
        micBtn.innerHTML = `<span class="material-symbols-rounded">
                                mic_off
                            </span>`
        micBtn.classList.remove('active')
    } else {
        micBtn.innerHTML = `<span class="material-symbols-rounded">
                                mic
                            </span>`
        micBtn.classList.add('active')
    }
})

speakBtn.addEventListener('click', (e) => {
    if (speakBtn.classList.contains('active')) {
        speakBtn.innerHTML = `<span class="material-symbols-rounded">
                                volume_off
                            </span>`
        speakBtn.classList.remove('active')
    } else {
        speakBtn.innerHTML = `<span class="material-symbols-rounded">
                                volume_up
                            </span>`
        speakBtn.classList.add('active')
    }
})

