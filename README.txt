Design Decisions:
I decided to use pug template engine to generate almost all of the html files on the browser. I did this because I found
formatting to be much easier. I used the express.static middleware function to make finding files through a public directory very easy.
When changing the restaurant information I saved all the changes locally using arrays and variables so that when I send the changes it
will be easier to manage on the server side. I made divs under over each add item field so that i can just add all of the added itemns for display to the user.


How to run server:

First start by downloading package.json file by typing 'npm install' in the terminal to get all of the dependencies for the server. 
When this is done just go to the terminal and type 'node server.js'. Then go to your browser of choice and go to the 
localhost by typing'localhost:3000/' in the search bar. From here you have access to all of the servers functionality