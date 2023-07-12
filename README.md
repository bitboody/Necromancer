<div align="center">
<h1>Botnet</h1>
Simple botnet made for educational purposes
<br>
<br>
<img src="https://img.shields.io/github/license/brplcc/botnet">
<img src="https://img.shields.io/github/last-commit/brplcc/botnet">
<br>
</div>

<div align="center">
<a href="#prerequisites">Prerequisites & tools</a> •
<a href="#getting-started">Getting started</a> •
<a href="#about">About</a> •
<a href="#TODO">TODO</a>
</div>

<h2 id="prerequisites">Prerequisites & tools</h2>
• <a href="https://nodejs.org/en/download">Node</a> for the runtime environment.
<br/>
• <a href="https://github.com/vercel/pkg">pkg</a> for compiling the client to an executable.
<br/>
• <a href="https://github.com/s-h-a-d-o-w/create-nodew-exe">create-nodew-exe</a> for making the executable silent.

---------------

<h2 id="Getting-started">Getting started</h2>

Also make sure to add the dotenv file at:
- config/.env

Use example.env as reference.

```ps 
git clone https://github.com/brplcc/botnet.git
cd botnet
npm install
```

To compile to Windows:

```ps
pkg .
```

To make the Windows executable run in the background: 

```ps
create-nodew-exe (src) (dst)
```

---------------

<h2 id="about">About</h2>

I started this project in hopes to improve my TCP networking abilities and because I was interested in the subject. I am not liable for any perceived damages or harm that may result from the improper use of this software; it was only created for educational purposes.

---------------

<h2 id="TODO">TODO</h2>

- [ ] Get it to work online instead of localhost.
