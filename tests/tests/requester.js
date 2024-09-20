import { expect, path, validateRequester } from '../config.js';

describe('API Test (requester)', () => {  
    it('schema check on /profile', (done) => {
      chai.request(path + "/requster")
        .get('/profile')
        .end((err, res) => {
          console.error(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(validateRequester(JSON.parse(res.body.message))).to.be.true
          done();
        });
    });
    it('')
  });
