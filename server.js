const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// sftp connection
const Client = require("ssh2-sftp-client");
const sftp = new Client();

const connectSFTP = async ( username, password) => {
    try {
        await sftp.connect({
        host: process.env.HOSTFTP,
        port: process.env.PORTFTP,
        username: username,
        password: password,
        });
        console.log("SFTP connected");
    } catch (err) {
        console.log(err, "catch error");
    }
}

// displays all the files in the sftp server
const listFiles = async () => {
    try {
        const files = await sftp.list("/");
        console.log(files);
    } catch (err) {
        console.log(err, "catch error");
    }
}

const createTree = (files) => {
    let tree = "";
    files.forEach((file) => {
        tree += `<div class="tree-item">${file.name}</div>`;
    });
    return tree;
}

// append the tree to the .tree-container element
const appendTree = (tree) => {
    const treeContainer = document.querySelector(".tree-container");
    treeContainer.innerHTML = tree;
}

const main = async (username, password) => {
    await connectSFTP(username, password);
    const files = await listFiles();
    const tree = createTree(files);
    appendTree(tree);

}

const disconnectSFTP = async () => {
    try {
        await sftp.end();
        console.log("SFTP disconnected");
    } catch (err) {
        console.log(err, "catch error");
    }
}
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.allowedSite = this.username + '.html'
    }
}


const users = {
    films : new User('films', ''),
    music : new User('music', '.'),
    books : new User('books', ''),
    docs : new User('docs', '')
}



// console.log(users); // for debugging

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));


app.post("/login", (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    if (users[username] && users[username].password === password) {
        res.sendFile(__dirname + '/public/' + users[username].allowedSite);
        main(username, password);
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});


app.get("/disconnect", (req, res) => {
    disconnectSFTP().then(r => console.log(r));
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Application started and Listening on port " + process.env.PORT + " (http://localhost:" + process.env.PORT || 8080 + " ) " || 8080  );
});

