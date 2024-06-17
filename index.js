
// Import deps.
const express = require('express');
const socketIo = require('socket.io');
const { join } = require('path');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// Import Models
const { Room, Joined } = require('./models/room');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const uri = "mongodb+srv://echo_admin:echoAdmin@cluster0.bagkada.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));


io.on('joined', (socket) => {
    console.log("New User Joined")
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'index.html'));
})
app.get('/home', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'main.html'));
})

app.post('/create-room', async (req, res) => {
    console.log("Create Room: ", req.body)
    try {
        const { roomName, userName, roomCode } = req.body;
        const room = new Room({ host: userName, roomName, roomCode });
        await room.save();
        // res.status(200).json({ room })
        console.log(room)
        return res.json(room)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/join-room', async (req, res) => {
    console.log(req.body)
    const { userName, roomCode } = req.body;
    try {
        const room = await Room.findOne({ roomCode });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        const joined = new Joined({ userName, room: room._id });
        await joined.save();
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/get_room/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})


function startServer() {
    mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected')

        // Start the server
        port = 3000
        server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    })
    .catch(err => console.error('MongoDB connection error:', err));
}


startServer()

// app.get('/home', (req, res) => {
//     res.sendFile(join(__dirname, 'views', 'home.html'));
// })

// app.get('/login', (req, res) => {
//     res.sendFile(join(__dirname, 'views', 'login.html'));
// })

// app.get('/register', (req, res) => {
//     res.sendFile(join(__dirname, 'views', 'register.html'));
// })