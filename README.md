
# Restaurant API And Algorithm

This is a minimalist service of a restaurant application with Nestjs.

Its a system that manages restaurants and their location and allows users to get the nearest location.


## [](https://github.com/moostee/ivory-assessment#task)Task

1. A solution containing a WebAPI based on typescript and NestJs Framework.
2. Sock Pairing Algorithm.

## [](https://github.com/moostee/ivory-assessment#table-of-contents)Table of Contents

-   [Features](https://github.com/moostee/ivory-assessment#features)
-   [Scope of my solution](https://github.com/moostee/ivory-assessment#scope-of-my-solution)
    -   [Backend](https://github.com/moostee/ivory-assessment#backend)
-   [Limitations](https://github.com/moostee/ivory-assessment#limitations)
-   [Likely Improvements](https://github.com/moostee/ivory-assessment#likely-improvements)
-   [Installation Information](https://github.com/moostee/ivory-assessment#installation-information)

## [](https://github.com/moostee/ivory-assessment#features)[](https://github.com/moostee/ivory-assessment#features)Features

Restaurant API consists of the following features:

-  User can add restaurant.
-  User can edit restaurant.
-  User can delete restaurant.
-  User can get restaurant based on user location.
-  User can add city.


## [](https://github.com/moostee/ivory-assessment#scope-of-my-solution)[](https://github.com/moostee/ivory-assessment#scope)Scope of my solution

- InMemory Storage With Seeded Restaurant Data

#### [](https://github.com/moostee/ivory-assessment#backend)[](https://github.com/moostee/ivory-assessment#scope-backend)Backend

-   NestJs Framework for project structure
-   Unit tests on the controller
-   Open API documentation using Swagger UI 
(http:localhost://3000/api)
## [](https://github.com/moostee/ivory-assessment#limitations)[](https://github.com/moostee/ivory-assessment#limitations)Limitations

The limitations with this current version of Quickloan Service includes:

-   User is not authenticated.
- Any user can add, update, delete restaurants.

## [](https://github.com/moostee/ivory-assessment#likely-improvements)[](https://github.com/moostee/ivory-assessment#improvements)Likely Improvements

Along with handling of the aforementioned limitations, the following improvements can be made:

-   More test coverage
-   Implementing event source to improve API performance

## [](https://github.com/moostee/ivory-assessment#installation-information)[](https://github.com/moostee/ivory-assessment#installation)Installation information

Clone the project
```
git clone https://github.com/moostee/ivory-assessment
```

Task 1 : From the project root (restaurant-api), run the following:
```
npm run start:prod
```
Launch the API on [https://localhost:3000/](http://localhost:3000/)

Task 2 : From the Algorithm Folder, run the following
```
node saveMerchant.js
```
