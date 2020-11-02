## Simple DXF inspector: backend

This tool was developed as test for job interview and for my own personal learning experience. This is my first attempt to use React, NestJS, Typescript, so please forgive me for "any" types and other nonsense you are about to see. Project is divided into frontend(uses yarn) and backend(uses npm) project, you need to run each one seperately.

## Requirements

- Node.js
- NPM package manager
- MongoDB

## Features

- File receiver API that forwards it to Fractory API
- List of SVG thumbnails with data from file API

If you feel like forking it, go ahead!

## How to install via terminal

- Clone repo to your server - git clone https://github.com/romettm/dxf-backend.git
- Get libraries: npm install
- Start server: npm run start

Go to http://localhost:5000/upload/uploads and you should see empty json response "[]"

Have fun!
