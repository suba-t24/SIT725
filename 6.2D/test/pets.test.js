const expect = require("chai").expect;
const request = require("request");

describe("Pets API", function () {
  const baseUrl = "http://localhost:3000";

  it("returns status 200 to check if API is reachable", function (done) {
    request.get(`${baseUrl}/api/pets`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should return a valid pets JSON response", function (done) {
    request.get(`${baseUrl}/api/pets`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);

      const resBody = JSON.parse(body);
      expect(resBody).to.be.an("object");
      expect(resBody).to.have.property("statusCode", 200);
      expect(resBody).to.have.property("data").that.is.an("array");
      expect(resBody).to.have.property("message", "Success");

      if (resBody.data.length > 0) {
        const item = resBody.data[0];
        expect(item).to.have.property("title");
        expect(item).to.have.property("image");
        expect(item).to.have.property("description");
      }

      done();
    });
  });

  //clear the DB table data to check this
  it("should return an empty array if no pets are available", function (done) {
    request.get(`${baseUrl}/api/pets`, function (error, response, body) {
      const resBody = JSON.parse(body);
      expect(resBody).to.have.property("data").that.is.an("array");
      expect(resBody.data.length).to.equal(0);
      done();
    });
  });

  it("should return 404 for unknown routes", function (done) {
    request.get(`${baseUrl}/api/unknownroute`, function (error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it("should not accept POST to /api/pets (if not implemented)", function (done) {
    request.post(
      {
        url: `${baseUrl}/api/pets`,
        json: { title: "Fluffy", image: "img.jpg", description: "Cute pet" }
      },
      function (error, response, body) {
        expect(response.statusCode).to.not.equal(200); // 404 or 405
        done();
      }
    );
  });

});
