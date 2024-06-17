
const modalDiv = document.querySelector('.modal')
const joinBtn = document.getElementById('joinBtn')
const createBtn = document.getElementById('createBtn')

const createForm = document.getElementById('create-form')
const joinForm = document.getElementById('join-form')

const createRoomBtn = document.getElementById('createRoomBtn')
const joinRoomBtn = document.getElementById('joinRoomBtn')



function getRoom() {
    roomId = localStorage.getItem('room')
    room = localStorage.getItem('roomName')
    roomNo = localStorage.getItem('roomCode')
    username = localStorage.getItem('userName')

    fetch(`api/get_room/${roomId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        // Ensure that the response is OK and parse it as JSON
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data)
        if (data) {
            window.location.href = `/home?roomId=${data._id}`
        }
    })
}

getRoom()



createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = createForm.querySelector('input[name="userName"]').value;
    const roomName = createForm.querySelector('input[name="roomName"]').value;
    const roomCode = Math.floor(1000 + Math.random() * 900000);


    fetch('/create-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, roomName, roomCode })
    })
    .then(response => {
        // Ensure that the response is OK and parse it as JSON
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        localStorage.setItem('userName', data.host);
        localStorage.setItem('room', data._id);
        localStorage.setItem('roomCode', data.roomCode);
        localStorage.setItem('roomName', data.roomName);
        window.location.href = `/home?roomId=${data._id}`
    }).catch((err) => {
        console.error(err)
    })
})


joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
        
    const userName = joinForm.querySelector('input[name="userName"]').value;
    const roomCode = joinForm.querySelector('input[name="roomCode"]').value;
    
    var form = { userName, roomCode }
    console.log("Form: ", form)

    fetch('/join-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ userName, roomCode })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        localStorage.setItem('userName', userName);
        localStorage.setItem('room', data._id);
        localStorage.setItem('roomCode', data.roomCode);
        localStorage.setItem('roomName', data.roomName);
        window.location.href = `/home?roomId=${data._id}`
    }).catch((err) => {
        console.error(err)
        window.alert("Room wasn't found")
    })

    closeModal();
})


function closeModal() {
    modalDiv.style.transform = "translateY(1000rem)"

    modalDiv.classList.remove('active');
    var modalKids = modalDiv.querySelectorAll('.active');

    modalKids.forEach(element => {
        element.classList.remove('active');
    });
}


joinBtn.addEventListener('click', (e) => {
    var joinModal = modalDiv.querySelector('.modal-content.join-modal')
    modalDiv.style.transform = "translateY(0)"

    modalDiv.classList.add('active')
    joinModal.classList.add('active')
})

createBtn.addEventListener('click', (e) => {
    var createModal = modalDiv.querySelector('.modal-content.create-modal')
    modalDiv.style.transform = "translateY(0)"

    modalDiv.classList.add('active')
    createModal.classList.add('active')
})

modalDiv.addEventListener('click', function(event) {
    if (event.target == modalDiv) {
        closeModal();
    }
});

