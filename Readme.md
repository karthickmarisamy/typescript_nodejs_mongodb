npm init -y
npm install -D typescript
npm install -D ts-node
npm install -D nodemon

create a file called tsconfig.json

{
    "compilerOptions":{
        "module":"NodeNext",
        "moduleResolution": "node",
        "baseUrl":"src",
        "outDir":"dist",
        "sourceMap":true,
        "noImplicitAny": true
    },
    "include":["src/**/*"],
}

create a file called nodemon.json

{
    "watch":["src"],
    "ext":".ts, .js",
    "exec":"ts-node ./src/index.ts"
}

create a folder called src and file index.ts

open a package.json

inside scripts
    "start" : "nodemon"

Run like below
    npm start

Install below packages

import express from 'express';
import http from 'http';
import bodyParser from 'bodyParser';
import cookieParser from 'cookieParser';
import cors from 'cors';

npm i express http body-parser cookie-parser cors compression

npm i -D @types/express @types/body-parser @types/cookie-parser @types/cors @types/compression

Create a mongodb atlas and access url

npm install mongoose
npm i -D @types/mongoose

create folder called databased inside the src folder along with users.ts file 

In that file create a schema using mongoose