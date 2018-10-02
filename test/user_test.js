const should = require("chai").should();
const expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:3000");

// Validate when the email is not present
// Validate when the email is empty.(behavior:user is created)
// validate when missing fields

//@POST "/api/users/register"
describe("Checking User", function() {
  it("should register a new User", function(done) {
    api
      .post("/api/users/register")
      .set("Accept", "application/json")
      .send({
        name: "Frank Eduardo",
        surname: "Araque Cadenas",
        email: "feac91@hotmail.com",
        password: "password"
      })
      .expect(201, done);
    // .end(function(err, res) {
    //   expect(res.body.name).to.equal("Frank Eduardo");
    //   expect(res.body.surname).to.equal("Araque Cadenas");
    //   expect(res.body.email).to.equal("feac89@hotmail.com");
    //   expect(res.body.password).to.equal("13267095");
    //   done();
    // });
  });
});
//@CRUD POST "/api/users/login"
// it("should login an User", function(done) {
//   api
//     .post("/api/users/login")
//     .set("Accept", "application/json")
//     .send({
//       email: "feac87@hotmail.com",
//       password: "password"
//     })
//     .expect(200)
//     .end(function(err, res) {
//       expect(res.body.error).to.equal(null);
//       expect(res.body.token).to.not.equal(null);

//       done();
//     });
// });

// describe("User", function() {
//   it("should create a new user", function(done) {
//     api
//       .get("/api/users/")
//       .set("Accept", "application/json")
//       .expect(200);
//     done();
//   });

//   it("should return a 200 response for existing user", function(done) {
//     api
//       .get("/api/users/")
//       .set("Accept", "application/json")
//       .expect(200);
//     done();
//   });
//   it("should return an object with keys and values", function(done) {
//     api
//       .get("/products/5bb1a5489758ac06a8a1d1b5")
//       .set("Accept", "application/json")
//       .end(function(err, res) {
//         expect(res.body).to.have.property("name");
//         expect(res.body.name).to.not.equal(null);
//         expect(res.body).to.have.property("price");
//         expect(res.body.price).to.not.equal(null);
//         done();
//       });
//   });

//   it("should create a new product", function(done) {
//     api
//       .post("/products/")
//       .set("Accept", "application/json")
//       .send({
//         name: "Test mocha product",
//         price: 20
//       })
//       .expect(200)
//       .end(function(err, res) {
//         expect(res.body.name).to.equal("Test mocha product");
//         expect(res.body.price).to.equal(20);
//         done();
//       });
//   });
// });
