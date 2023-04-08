# Netocompany-db-cw
database for my group coursework

mkdir patient-manager - create a folder called “patient-manager”

cd patient-manager - access the chosen folder

npm init -y

npm install express sqlite3 pug body-parser --save

git clone https://github.com/Hyper515/Netocompany-db-cw.git - pulls the latest files to the current directory where the command is run from

============================================

the commands that I used to create the repository were (do not run this as it is only done once)

git remote add origin https://github.com/Hyper515/Netocompany-db-cw.git

git branch -M main

git push -u origin main

============================================

Instructions to build the website

Next, create an app.js file to handle the HTTP requests and interact with the SQLite database:

The app.js file defines the routes for viewing, searching, and editing patients. It also sets up the Pug view engine and the body-parser middleware for parsing HTTP request bodies.

The GET / route retrieves all patients from the patients table and renders the index.pug template with the patient data.

The GET /search route retrieves the query parameter from the query string and searches for patients whose names contain the query string. It then renders the index.pug template with the search results.

The GET /edit/:id route retrieves a patient's details by their ID and renders the edit.pug template with the patient data.

The POST /edit/:id route updates a patient's details by their ID and redirects to the home page.

============================================

Next, create a views directory and add the index.pug and edit.pug templates:

views/index.pug:
views/edit.pug:

Finally, run the app using node app.js and open http://localhost:3000 in your browser to view the patient table. You can search for patients by name and edit their details by clicking the "Edit" link.
