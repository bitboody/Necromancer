<div align="center">
<h1>Botnet</h1>
Simple botnet made for educational purposes
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/botnet">
<img src="https://img.shields.io/github/languages/code-size/brplcc/botnet">
<img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
  
<br>

</div>
<div align="center">
<a href="#prerequisites">Prerequisites & tools</a> •
<a href="#getting-started">Getting started</a> •
<a href="#commands">Commands</a> •
<a href="#about">About</a>
</div>

<h2 id="prerequisites">Prerequisites & tools</h2>
• <a href="https://nodejs.org/en/download">Node</a> for the runtime environment.
<br/>
• <a href="https://github.com/vercel/pkg">pkg</a> for compiling the client to an executable.
<br/>
• <a href="https://github.com/s-h-a-d-o-w/create-nodew-exe">create-nodew-exe</a> for making the executable silent.

---------------

<h2 id="Getting-started">Getting started</h2>

```sh 
git clone https://github.com/brplcc/botnet.git
cd botnet
npm install
```

Use example.env as reference and make sure to add the dotenv file at:
- config/.env

To compile to Windows:

```sh
pkg .
```

To make the Windows executable run silently in the background: 

```sh
create-nodew-exe <src> <dst>
```
---------------

<h2 id="commands">Commands</h2>

Here is a list of some commands:

| Command   | Functionality                               | Usage              |
| --------- | ------------------------------------------- | ------------------ |
| exec      | Executes shell commands remotely            | exec (command)     |
| instances | Limits number of machines running a command | instances (number) |
| help      | Shows you how to use commands               | help (command)     |

---------------

<h2 id="about">About</h2>

I started this project in hopes to improve my TCP networking skills and because I was interested in the subject. DISCLAIMER: I am not liable for any perceived damages or harm that may result from the improper use of this software; it was only created for educational purposes.

Special thanks to [Looseman](https://github.com/glitch-911) and [Scrippy](https://github.com/Scrippy) for testing. and [ProtogenDelta](https://github.com/ProtogenDelta) for helping me properly understand how basic networking works and with code quality.

---------------

<h2 id="TODO">TODO</h2>

- [X] Get it to work online instead of localhost.
- [X] Add an instances option that limits how many machines will run a command.
- [X] Add a help command.
- [ ] Add DDOS attack feature (any kind).
