# Spotify App

Super simple Angular application that allows a user to login to their spotify and get a list of their 20 most listened to artists and tracks

## Why?
Spotify, for some reason, doesn't allow you to view what your most listened to artists and tracks are, despite it being a feature in their end-of-year review. This information is accessible via their Web API, so it's just pulling from there

## What is the permission scope?
This application only requests the `user-top-read` scope, which means information such as name, email etc. are not viewed by the application.

## How to run
```
git clone https://github.com/lukehaeffner/SpotifyTopArtists.git
cd SpotifyTopArtists
npm install
ng serve
```

And then navigate to [http://localhost:4200](http://localhost:4200/)

## TODO
1. Allow the user to choose how many results to display (API limit I believe is 50. Currently defaulting to 20)
2. Add in appropriate error handling
3. Make the cards look nicer