# SFTP-UI

This project is a simple web interface for managing files on a remote server via SFTP.
Made with [Express](https://expressjs.com/), dotenv and ssh2-sftp-client

## Setup
Create a [linode](https://www.linode.com/) server and install [Node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages) on it.
Or any other server with Node.js installed.

Create a new user/s on the server and give them access to the files you want to manage. (remember the password you will need it! root won't do)
```
sudo adduser USERNAME
```



Set up your SFTP server ([filezilla](https://filezilla-project.org/) is what I am using).


Install dependencies
```
npm -i nodemon express dotenv ssh2-sftp-client
```
Create a .env file in the project directory and add the following:
```
HOSTFTP=SFTP_SERVER_IP
PORTFTP=yourport (22 by default)
PORT=serverport (8080 by default)
```
Run the server
```
npm start
```
## Usage


In server.js, change the:
```
const users = {
    films : new User('films', '.'),
    music : new User('music', '.'),
    books : new User('books', '.'),
    docs : new User('docs', '.'),
    ...
}
```
to your own users and directories. The first argument is the username, the second is the password. Dir is home by default.
The username and password is the one you created on the server. e.g:
```
sudo adduser films
> Password: .
> Repeat password: .
```
Then in the server.js file:
```
const users = {
    films : new User('films', '.'),
}
```
Now you can log in with the username and password you created on the server.

## Future Ideas
- [ ] Admin panel
- [ ] User management

## **!!! This project is not finished yet !!!**
## **!!! If you find any bugs or my 3am guide doesn't work just open a ticket !!!**


