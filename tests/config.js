import * as chai from 'chai';
import chaiHttp from 'chai-http';
import Ajv from 'ajv';
const ajv = new Ajv();

chai.use(chaiHttp);

const addressSchema = {
    type: 'object',
    properties: {
        addressId: { type: 'integer' },
        name: { type: 'string' },
        detail: { type: 'string' },
        note: { type: 'string' },
        latitude: { type: 'number', minimum: -90, maximum: 90 },
        longitude: { type: 'number', minimum: -180, maximum: 180 }
    },
    required: ['addressId', 'name', 'detail', 'latitude', 'longitude'],
    additionalProperties: true
};

const debitCardSchema = {
    "type": "object",
    "properties": {
      "cardNumber": {
        "type": "string",
        "pattern": "^(\\d{4}-\\d{4}-\\d{4}-\\d{4})$"
      },
      "expiryDate": {
        "type": "string",
        "pattern": "^(0[1-9]|1[0-2])\\/\\d{2}$"
      },
      "cvv": {
        "type": "string",
        "pattern": "^\\d{3}$"
      }
    },
    "required": ["cardNumber", "expiryDate", "cvv"],
    "additionalProperties": true
  }

const requesterSchema = {
    "type": "object",
    "properties": {
      "username": {
        "type": "string"
      },
      "email": {
        "type": "string",
        "format": "email"
      },
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "phoneNumber": {
        "type": "string",
        "pattern": "^\\d{3}-\\d{4}$"
      },
      "profilePicture": {
        "type": "string",
        "format": "uri"
      },
      "address" : {
        type : "array",
        items : addressSchema
      },
      "debitCard" : {
        type : "array",
        items : debitCardSchema
      },
      "required": ["username", "email", "firstName", "lastName", "phoneNumber", "profilePicture", "address", "debitCard"],
      "additionalProperties": true,
    }
}

export const path = "http://api_gateway:3000";

export const expect = chai.expect;