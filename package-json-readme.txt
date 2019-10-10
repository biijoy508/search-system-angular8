Vi har följande scripts du kan köra för starta eller testa Farmen GUI

                  kommand körs
npm run
    start       : "ng serve --aot --open",
    start:prod  : "ng serve --prod --open",
    build       : "ng build --aot",
    build:prod  : "ng build --prod",
    test        : "ng test",
    lint        : "ng lint",
    e2e         : "ng e2e"

För att kunna se status på packages och dependencies kör "npm audit"

Kör ng -v för att kunna se alla versioner.

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.803.8
@angular-devkit/build-angular     0.803.8
@angular-devkit/build-optimizer   0.803.8
@angular-devkit/build-webpack     0.803.8
@angular-devkit/core              8.3.8
@angular-devkit/schematics        8.3.8
@angular/cli                      8.3.8
@angular/pwa                      0.803.8
@ngtools/webpack                  8.3.8
@schematics/angular               8.3.8
@schematics/update                0.803.8
rxjs                              6.5.3
typescript                        3.5.3
webpack                           4.39.2
Angular                           6.2.3
Node                              8.9.1

Om du vill uppdatera angular då kör du "ng upate".


