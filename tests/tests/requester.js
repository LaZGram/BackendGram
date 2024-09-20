import supertest from 'supertest';
import assert from 'assert';  // Node.js built-in assert module
import { path, validateRequester } from '../config.js';

// Set up supertest with the base API path
const request = supertest(path);

describe('API Test (requester)', () => {
  it('schema check on /profile', (done) => {
    request
      .get('/requester/profile')  // Path updated to match your API endpoint
      .expect(200)  // Ensure the status code is 200
      .end((err, res) => {
        if (err) return done(err);  // Handle error properly
        // Using assert to check if the body is an object
        assert.strictEqual(typeof res.body, 'object', 'Response body should be an object');

        // Using assert to validate the requester schema
        assert.strictEqual(validateRequester(res.body.message), true, 'Response does not match the schema');
        done();
      });
  });
});
