# CRUDApp
For CRUDApp Assessment

The purpose of this app is to track animals in a zoo. Zookeepers who sign in or create a login can then use all CRUD functionality to see current animals, add new animals, edit current animals and delete them. 
There are routes built so that users could be saved in the database as well but I was not able to complete that.
It was my intention to have a specific user be the "Head Zookeeper" and allow only them all CRUD functionality.

Stretch Goals:
Add photos to each animals card
Allow for Zookeeper to generate a list of animals that they specifically have added

To begin: 
In your terminal - git clone: git@github.com:kjlarocca/CRUDApp.git

Backend:
to run:\ 
cd into backend\
 npm install express\
 npm install nodemon -D (dev dependency, optional)\
 i already had: homebrew and mongoDB (& I downloaded mongo locally), so you may need these\
 node server.js\
 or nodemon server.js\
(You should see Server is running on port 3001 and Connected to Database)\

Frontend:\
To run:\
cd into frontend\
npm i react-scripts\
npm install node, axios\
 npm start\

to view:\
React frontend: in google chrome browser nav to http://localhost:3000/ \