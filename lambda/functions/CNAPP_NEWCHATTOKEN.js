const crypto = require('crypto');

const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  let { email, company, name } = body;

  if (!email || !name) return badRequest();
  if (!validateEmail(email)) return badRequest();

  email = Buffer.from(email).toString('base64');

  try {
    const record = await getRecord(email);
    if (record.Item && record.Item.name) return success(email);
    else {
      return await createToken(email, name, company);
    }
  } catch(error) {
    return internalError(error);
  }
};

async function createToken(email, name, company) {
  const params = {
    TableName: 'CNAPP_USERS',
    Item: {
      email: {
        S: email
      },
      name: {
        S: name
      },
      messages: {
        M: {}
      }
    }
  };

  if (company) params.Item.company = {
    S: company
  };

  try {
    const result = await dynamoDB.putItem(params).promise();
    return success(email);
  } catch(error) {
    return internalError(error);
  }
}

function getRecord(email) {
  return dynamoDB.getItem({
    TableName: 'CNAPP_USERS',
    Key: {
      email: {
        S: email
      }
    }
  }).promise();
}

function validateEmail(email) {
  return new RegExp(/^.+@[^\.].*\.[a-z]{2,}$/).test(email)
}

function badRequest() {
  return response(401, 'Bad request.');
}

function internalError(error) {
  return response(500, error);
}

function success(data) {
  return response(200, data, 'text/plain');
}

function response(statusCode, data, contentType) {
  return {
    isBase64Encoded: false,
    statusCode,
    body: contentType ? data : JSON.stringify(data),
    headers: {
      'Content-Type': contentType ? contentType : "application/json",
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': 'https://jeremigendron.com'
    },
  };
}

