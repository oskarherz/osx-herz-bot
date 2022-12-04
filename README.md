# osx-herz-bot

**TODOs**
- [ ] improve setting of server address inside shortcut ("Question" before Shortcut install?)
- [ ] refactor registering, so it can be done during runtime
- [ ] implement first simple "service infrastructure" or "containerization concept"

## Setup
These `npm` scripts are currently configured:
```sh
npm run start        # Builds the project
npm run start:dev    # Auto-refreshing "watch"-mode (for development)

npm run docker:build # 1) Builds a docker container instance
npm run docker:run   # 2) Runs a docker container instance
```
### Dockerization
To run the project inside a docker container, the following must be done:
```sh
npm run docker:build # docker build . -t "osx-herz-bot"
npm run docker:run   # docker run "osx-herz-bot"
```

### OSX Shortcut
Get the custom shortcut for the official OSX Shortcuts app (https://apps.apple.com/us/app/shortcuts/id915249334).

The link might change over time due to edits, especially since one might want to change the hardcoded api address.
So the current working version probably won't be linked in this repository AT ALL.