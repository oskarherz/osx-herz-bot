FROM node:current-alpine
USER node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json .
COPY --chown=node:node tsconfig.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node src/ src/

RUN export $(cat .env) && npm start

CMD [ "node", "build/index.js" ]