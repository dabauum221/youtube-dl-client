# Youtube Downloader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run

Run `yarn start` to run the program in development mode.

```
docker run -d\
 --name youtube-downloader \
 -p 8080:8080 \
 --env GOOGLE_API_KEY=? \
 dabauum221/youtube-downloader
```
## Compose

```
version: '3'

services:
  youtube-downloader:
    image: dabauum221/youtube-downloader
    expose:
      - 8080
    container_name: youtube-downloader
    environment:
     - GOOGLE_API_KEY=?
    restart: unless-stopped
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
