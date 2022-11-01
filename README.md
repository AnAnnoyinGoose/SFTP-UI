# SFTP-UI

This project is a simple web interface for managing files on a remote server via SFTP.
Made with [Express](https://expressjs.com/), dotenv and ssh2-sftp-client

## Setup
Create [linode](https://www.linode.com/) server and install
[Node.js](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages) on it.
But you can use any other server with Node.js installed.

Set up your SFTP server ([filezilla](https://filezilla-project.org/) is what I am using).

Install dependencies
```
npm -i nodemon express dotenv ssh2-sftp-client
```
Create a .env file in the project directory and add the following:
```
HOSTFTP=SFTP_SERVER_IP
PORTFTP=SFTP_SERVER_PORT (22 by default)
PORT=serverport (8080 by default)
USERFTP=SERVER_USER (root by default)
PASSFTP=SERVER_PASSWORD
```
Run the server
```
npm start
```
## Usage

Go to server.js and change the path to the directory you want to manage.
```
:88
 const users = {
    films : new User('films', '.'),
    music : new User('music', '.'),
    books : new User('books', '.'),
    docs : new User('docs', '.')
}
```
this is a simple example, you can add as many users as you want,
but don't forget to add the same-named directory to the ~/ on the server.
The first argument is the username, the second is the password to access the directory.






## Future Ideas
- [ ] Admin panel
- [ ] User management

# **!!! This project is not finished yet !!!**
# **!!! If you find any bugs or my 3am guide doesn't work just open a ticket !!!**


