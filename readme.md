package.json: This file will have all nodejs dependencies module for this example.

config/mongodb.js: This file will use for databases connection parameters for Mongodb

config/firebase.js: This file will use for databases connection parameters for firebase

model/users.js: This file will use to create user schema and model.

server.js: This file will use to create nodejs application server and routes url.
routes/api/contacts: This file will handle the end points request for contacts.

routes/api/users:This file will handle the end point request for users.

node_modules folder: This folder will contains all nodejs packages.

The Node js RESTful API details are as follows:

Route Method Type Posted JSON Description
/employees GET JSON – Get all employees data
/employees/{id} GET JSON – Get a single employee data
/employees POST JSON {"employee_name": "Adam", "employee_age": "34", "employee_salary" : "23421"} Insert new employee record into database
/employees PUT JSON {"employee_name": "Adam", "employee_age": "34", "employee_salary" : "23421", "id":21} Update employee record into database
/employees DELETE JSON {"id" : 59} Delete particular employee record from database

# name url verb description

INDEX(camps) /campgrounds GET Show the list of Campground  
NEW /campgrounds/new GET Show the form to create campgrounds  
CREATE /campgrounds POST create a new camp
SHOW /campgrounds/:id GET Show an especific campgroup

Name Path HTTP Verb Purpose Mongoose Method
Index /dogs GET List all dogs Dog.find()
New /dogs/new GET Show new dog form N/A
Create /dogs POST Create a new dog, then redirect somewhere Dog.create()
Show /dogs/:id GET Show info about one specific dog Dog.findById()
Edit /dogs/:id/edit GET Show edit form for one dog Dog.findById()
Update /dogs/:id PUT Update particular dog, then redirect somewhere Dog.findByIdAndUpdate()
Destroy /dogs/:id DELETE Delete a particular dog, then redirect somewhere Dog.findByIdAndRemove()
=============================================================================
How can I configure heroku to launch the npm test with set NODE_ENV="test" and invoke the server ("node server.js") with NODE_ENV="production" .
use cases

describe("User controller", function () {
describe("HTTP Verbs", function () {
it("GET", function (done) {
console.log(config.dbUrl);
console.log(config.baseUrl);
server.post("/api/user") {
.send(utils.createMockedUserPlainObject())
.end(function(err, res) {

                  server.get("/api/user/list")
                    .expect("Content-type", /json/)
                    .expect(200) // THis is HTTP response
                    .end(function (err, res) {
                        // HTTP status should be 200
                        res.status.should.equal(200);
                        res.body.should.have.length(1);

                        done();
                  });
              })
          });
    });

## });

Enforce 'strong' passwords
If you're concerned about security you should have some policy on what constitutes a valid password. Some common restrictions are:

at least n characters
combination of upper- and lower-case characters
one or more digits
not related to other user data (name, address, username, ...)
not a dictionary word
