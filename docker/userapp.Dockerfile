from node:20.12.0-alpine3.19
workdir /usr/src/app

copy package.json package-lock.json turbo.json ./

copy apps ./apps
copy packages ./packages

run npm install -y

run npm run db:generate

run cd ./apps/user-app && npm run build

cmd ["npm", "run", "start-user-app"]

