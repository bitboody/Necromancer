<div align="center">
<h1>Necromancer</h1>
Botnet made for educational purposes
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/Necromancer">
<img src="https://img.shields.io/github/languages/code-size/brplcc/Necromancer">
<img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
  
<br>

</div>
<div align="center">
<a href="#prerequisites">Prerequisites</a> •
<a href="#getting-started">Getting started</a> •
<a href="#configuration">Configuration</a>
<br>
<a href="#commands">Commands</a> • 
<a href="#about">About</a> •
<a href="#credit">Credit</a> •
<a href="#roadmap">Roadmap</a>
</div>

<h2 id="prerequisites">Prerequisites:</h2>
• <a href="https://nodejs.org/en/download">Node.js</a> for the runtime environment.
<br/>
• <a href="https://github.com/babel/babel">Babel</a> for compiling to ES2015.
<br/>
• <a href="https://github.com/vercel/pkg">pkg</a> for compiling the client to an executable.
<br/>
• <a href="https://github.com/s-h-a-d-o-w/create-nodew-exe">create-nodew-exe</a> for making the executable silent.

---------------

<h2 id="Getting-started">Getting started:</h2>

```sh 
git clone https://github.com/brplcc/Necromancer.git
cd Necromancer
npm install
```

To build the executable:

```sh
npm run build
```

To make the Windows executable run silently in the background: 

```sh
create-nodew-exe <src> <dst>
```
---------------

<h2 id="configuration">Configuration:</h2>

Use example.env as reference and make sure to add the dotenv file at:
- config/.env

---------------

<h2 id="commands">Commands:</h2>

Here is a list of some commands:

| Command   | Functionality                               | Usage                                      |
| --------- | ------------------------------------------- | ------------------------------------------ |
| exec      | Executes shell commands remotely            | exec (command)                             |
| clear     | Clears the terminal                         | clear                                      |
| instances | Limits number of machines running a command | instances (number)                         |
| logging   | Log output to text files                    | logging (boolean)                          |
| select    | Select one bot to control                   | select                                     |
| silent    | Silent output coming from bots              | silent (boolean)                           |
| slowloris | Slowloris DDOS attack                       | slowloris (ip) (port) (duration) (sockets) |
| yank      | Steal a file from a victim's machine        | yank (file name)                           |

---------------

<h2 id="about">About:</h2>

I started this project in hopes of improving my TCP networking skills and because I was interested in the subject. DISCLAIMER: I am not liable for any perceived damages or harm that may result from the improper use of this software; it was only created for educational purposes. Merely a proof of concept.

This repository contains both the C&C server and the client/malware.

<h2 id="credit">Credit:</h2>

Special thanks to [Looseman](https://github.com/glitch-911) and [Scrippy](https://github.com/Scrippy) for helping me with testing and debugging.

The project also had help using:

- A modified version of yosif111's [Slowloris implementation.](https://github.com/yosif111/Slowloris)
- creationix's [TCP based chat server](https://gist.github.com/creationix/707146) as a starting template for the server.
- nickadam's [PS1 script to a single line cmd file](https://gist.github.com/nickadam/2a0db76bf3e32008a934ee3f675e8776) script.

---------------

<h2 id="roadmap">Roadmap:</h2>

- [X] Add an instances option that limits how many machines will run a command.
- [X] Add DDOS attack feature (any kind).
- [X] Download files from a victim's computer.
- [ ] Upload files to a victim's computer.
