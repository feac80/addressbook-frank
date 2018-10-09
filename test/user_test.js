const should = require("chai").should();
const User = require("../models/users");
const expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:3000");

let token = "";

// Validate when the email is not present
// Validate when the email is empty.(behavior:user is created)
// validate when missing fields

//@POST "/api/users/register"
describe("Checking RESTful API", function() {
  before(() => {
    User.remove({}, err => {
      console.log(err);
    });
  });

  it("Should register a new User", function(done) {
    api
      .post("/api/v1/users/register")
      .set("Accept", "application/json")
      .send({
        name: "Maria Jose",
        email: "mjose@hotmail.com",
        password: "1234567Tt@"
      })
      .expect(201)
      .end(function(err, res) {
        expect(res.body.name).to.equal("Maria Jose");
        expect(res.body.email).to.equal("mjose@hotmail.com");
        expect(res.body.date).to.not.equal(null);
        done();
      });
  });

  //@CRUD POST "/api/v1/users/login"
  it("Should login an User", function(done) {
    api
      .post("/api/v1/users/login")
      .set("Accept", "application/json")
      .send({
        email: "mjose@hotmail.com",
        password: "1234567Tt@"
      })
      .expect(200)
      .end(function(err, res) {
        if (!err) {
          expect(res.body.token).to.not.equal(null);
          token = res.body.token;
          done();
        } else {
          console.log(err);
        }
      });
  });
  it("Should create a new Contact", function(done) {
    api
      .post("/api/v1/contacts")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
        name: "Malu",
        surname: "Perea",
        phone: "654654654",
        user_td: "5bbbc1c48117ab0240a93436",
        address: "Madrid",
        email: "jsabina@hotmail.com"
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        done();
      });
  });
  // @CRUD POST "/api/contacts/"

  it("Should validate the contact email", function(done) {
    api
      .post("/api/v1/contacts")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
        name: "Joaquin",
        surname: "Sabina",
        phone: "654654654",
        user_id: "5bbbc1c48117ab0240a93436",
        address: "Tenerife Calle 5",
        email: "Tenerife Calle 5 "
      })
      .expect(422)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        done();
      });
  });

  it("Should require authentication", function(done) {
    api
      .post("/api/v1/contacts")
      .set("Accept", "application/json")
      .set(
        "Authorization",
        "Bearer    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYmI1N2ZkZTc3MTRlMDAxNTRkYmYzZSIsIm5hbWUiOiJNYXJpYSBEb2xvcmVzIiwiZW1haWwiOiJtYXJpYTRAaG90bWFpbC5jb20iLCJpYXQiOjE1MzkwMjgzMzIsImV4cCI6MTUzOTAzMTkzMn0.1aiNhsJyCHDP0vMZ80MdH7x73fDpKSSBoygSh_TZrtA"
      )
      .expect(401)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return done(err);
        }
        done();
      });
  });
});
