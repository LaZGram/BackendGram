import { expect, path } from '../config.js';

describe('API Test', () => {  
    // Test /GET route using chai-http
    it('should return Hello World on GET /hello', (done) => {
      chai.request(path)
        .get('/hello')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Hello World!');
          done();
        });
    });
  });