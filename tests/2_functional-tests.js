const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
        chai.request(server)
        .post('/api/solve')
        .send({
            puzzle: ".3.....7..48...91....487.....9...2..2..9.8..5...3.2....56...72.8..6.5..4...794..."
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'solution', 'response should contain solution field');
          assert.equal(res.body.solution,
            "635219478748563912912487653389156247271948365564372891456831729897625134123794586",
            "correct solution should be returned");
          done();
        });
      });

});

