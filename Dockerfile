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
COPY --chown=node:node .env .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node src/ src/
COPY --chown=node:node lib/ lib/

RUN npm start

CMD [ "node", "build/src/index.js" ]