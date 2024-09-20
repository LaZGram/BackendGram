import * as chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

export const path = "http://api_gateway:3000";

export const expect = chai.expect;