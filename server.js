const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
// sftp connection
const Client = require("ssh2-sftp-client");
const sftp = new Client();

const currTime = () => {
    return new Date().toLocaleString();
}

const connectSFTP = async () => {
    try {
        await sftp.connect({
            host: process.env.HOSTFTP,
            port: process.env.PORTFTP || 22,
            username: process.env.USERNAMEFTP || 'root',
            password: process.env.PASSWORDFTP || 'GooseIsGood',
        });
        console.log("SFTP connected");
    } catch (err) {
        console.log(err, "catch error");
    }
}

// create a tree of all visible files in the directory

const listFiles = async (username) => {
    let space = '    ';
    let branch = '│   ';
    let tee = '├── ';
    let last = '└── ';

    let files = await sftp.list("/home/" + username);
    let tree = files.reduce((tree, file) => {
        let path = file.name.split('/');
        path.reduce((parent, child, i) => {
            if (!parent[child]) {
                parent[child] = {__files: []};
            }
            if (i === path.length - 1) {
                parent[child].__files.push(file);
            }
            return parent[child];
        }, tree);
        return tree;

    }, {});

    let result = '';
    let print = (tree, indent = '') => {
        Object.keys(tree).forEach((key, i, keys) => {
            let isLast = i === keys.length - 1;
            result += indent + (isLast ? last : tee) + key + '\n';
        });


    }
    print(tree);
    return result;

}


// send


const main = async (username) => {
    if (sftp.connected) {
        await listFiles(username).then((result) => {
            console.log(result);
        });
    } else {
        await connectSFTP();
        await listFiles(username).then((result) => {
            console.log(result);
        });

    }
}
const disconnectSFTP = async () => {
    try {
        await sftp.end();
        console.log("SFTP disconnected " + currTime());
    } catch (err) {
        console.log(err, "catch error");
    }
}

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.allowedSite = this.username
    }
}

const users = {
    films: new User('films', '.'),
    music: new User('music', '.'),
    books: new User('books', '.'),
    docs: new User('docs', '.')
}


// console.log(users); // for debugging

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));


app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if (users[username] && users[username].password === password) {
        console.log('usr: ', username, ' | pwsd: ', password, ' | login success at ', currTime());
        res.sendFile(__dirname + '/public/sftp.html');
        main(username).then(() => {
            //    nothing
        });

    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});


app.get("/disconnect", (req, res) => {
    disconnectSFTP().then(() => {
        res.sendFile(__dirname + '/public/index.html');
    });
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Application started and Listening on port " + process.env.PORT + " (http://localhost:" + process.env.PORT || 8080 + " ) " || 8080);
});

