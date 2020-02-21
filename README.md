# FarmenGui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

Installera alla npm bibliotek innan du kan köra projektet 

* npm config set registry http://vl-nexus01.intern.jordbruksverket.se:8080/repository/sjv-npm-all/
* npm install


 Uppdatera till ny version av styleguide 

*  npm uninstall --save @sjv/component-library 
*  npm config set registry http://vl-nexus01.intern.jordbruksverket.se:8080/repository/sjv-npm-all/
*  npm install --save-dev @sjv/component-library@latest


## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4500/`. The app will automatically reload if you change any of the source files.

## Routing
app-routing.module.ts holds all routing paths. All new paths must be manually entered there

## Build

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

