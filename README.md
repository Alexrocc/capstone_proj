# CapstoneProj

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

Stylesheet language: SCSS
Angular routing: no

## Development server

This application runs through Json-server. To use:
-Install json-server and json-server-auth in the CLI : npm i json-server json-server-auth

(WARNING: json-server released a new alpha version in january 2024, which will likely be installed when you run the command. Make sure to specify
"0.17.4" in the package.json file "json-server" key to modify the version and run the command "npm update" to replace the version if you already installed it.)

-Install concurrently to initialize the application and the server at the same time: npm i concurrently
-Install jwt to utilize authorization and password cyphering: npm i @auth0/angular-jwt

-This application uses Bootstrap 5 for its layout, install it with the command "npm i bootstrap" and import the following code in the styles.scss
file: @import 'bootstrap/scss/bootstrap';

-In the package.json file, in the "scripts" object, replace the content with the following lines:
"ng": "ng",
"start": "ng serve -o",
"build": "ng build",
"watch": "ng build --watch --configuration development",
"test": "ng test",
"backend": "json-server-auth --watch db.json --port 4201",
"fullstack": "concurrently \"npm run backend\" \"npm run start\""

-Create a db.json file and insert it in the root folder of the project (src folder level)
-Create a "users" array [ ] in the db.json (mandatory), should it not be present already:

{
"users": []
}

-To run the application, type the command "npm run fullstack" in the CLI.

-External API used: handmade API with data extracted from the Steam website -> https://mockapi.io/projects/659ebef647ae28b0bd369b18

PREMISE:

This application is a mock version of the popular Steam platform, created as an excercise and as a didactical project, directed to a better understanding of widely used methods and computations from the RxJS library outside of the Authorization and Authentication processes, such as
Observables and Behavior Subjects (more on that here: https://rxjs.dev/guide/overview).
As such, functionalities and layout have been kept simple yet functional.

FUNCTIONALITIES:
The application allows to create an account (handled by json-server and json-server-auth) and then log into it to access most of its features.
The idea was to handle a fake backend which fetches and handles data (from the External API) without Redux and without continuously making REST calls
to the API as to apply the least possible stress while mantaining precise data.
To achieve this goal, during the registration process two additional keys ("wishlist" and "library"), outside of those required in the form, will be generated and added to the new account: these are empty arrays that will handle most components' data, as to reduce the number of API calls and the amount of data passed through each component. This has been further optimized through the use of Behavior Subjects and Async pipes, especially in the components which handle said arrays like the Library and the Details component.
The Store component shows a list of games fetched from the API. From those, you can access the Details component which shows the full data of a single chosen item in the list, and allows to add it either in the Wishlist component (and array) as well as in the Library (simulating a "transaction"), as well as having a short description and a short video of it.
The Library is shown as a separate component, while the wishlist will be rendered in the Profile component.

The DOM makes large use of \*NgIf directories and <ng-template>s to handle different situations (game already in wishlist, free to play games, game rating etc..), as well as Async pipes connected to Observables/Subjects to avoid premature HTML rendering and synchronize DOM events with logical TS events (as an example, the template changes when, in the Details component, you click on the button "Add to Wishlist", in response to effectively adding it to the database).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
