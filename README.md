# Spider Client

Client to be installed on macOS, windows. Android, iOS in later version.

## Version 0.1

- Client should query spider REST API with type of filter enabled on client to get appropriate DNS server
- Client should validate DNS server provided with a test query before applying the DNS server for system.
- Client should periodically resolve random hosts to measure DNS performance for the DNS server enabled.
- Client should reset to users default DNS servers when all filters are disabled
- Client should alert if new version of client is available for download.
- User should be able to restart and quit the client from system tray.
- User should have option to start the client on system boot.

## Spider Client (Electron + React)

This project uses yarn. So make sure yarn is installed globally:
`npm i -g yarn`

Then you can install the components for this application:
`yarn install`

## Available Scripts

In the project directory, you can run:

### To run in development mode

`yarn dev`

### To run production build

```
yarn build
yarn run electron
```

### To run as a binary file.Follow the below commands and then find binary inside release-builds folder.

```
yarn build
yarn run package-mac
```
