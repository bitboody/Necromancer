
<div align="center">
<h1>Necromancer</h1>
Simple botnet made for educational purposes
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

You can have your own shell scripts to run at this directory:
- config/scripts/


---------------

<h2 id="commands">Commands:</h2>

Here is a list of some commands:

| Command   | Functionality                               | Usage              |
| --------- | ------------------------------------------- | ------------------ |
| exec      | Executes shell commands remotely            | exec (command)     |
| instances | Limits number of machines running a command | instances (number) |
| run       | Runs custom scripts you have                | run (script name)  |
| help      | Shows you how to use commands               | help (command)     |
| scripts   | Lists custom scripts you have               | scripts            |
| silent    | Silents clients from responding             | silent (boolean)   |

---------------

<h2 id="about">About:</h2>

I started this project in hopes to improve my TCP networking skills and because I was interested in the subject. DISCLAIMER: I am not liable for any perceived damages or harm that may result from the improper use of this software; it was only created for educational purposes.

Special thanks to [Looseman](https://github.com/glitch-911) and [Scrippy](https://github.com/Scrippy) for testing. and [ProtogenDelta](https://github.com/ProtogenDelta) for helping me properly understand how basic networking works and with code quality.

---------------

<h2 id="roadmap">Roadmap:</h2>

- [X] Get it to work online instead of localhost.
- [X] Add an instances option that limits how many machines will run a command.
- [X] Add a help command.
- [X] Add a (scripts) run command.
- [ ] Add DDOS attack feature (any kind).
