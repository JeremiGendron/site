const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

const TableName = 'CNAPP_USERS';

exports.handler = async (event) => {
    const splits = event.path.split('/');
    const index = splits.findIndex((item) => item == 'messages');
    const email = splits[index - 1];

    if (!(await verifyToken(email))) return badRequest();

    try {
        const result = await getMessages(email);
        if (!result) return internalError("Failed to get messages.");
        return success(result);
    } catch(e) {
        return internalError("Failed to get messages.");
    }
};

async function getMessages(email) {
    const params = {
        TableName,
        Key: {
            email: {
                S: email
            },
        },
    }

    try {
        const result = await dynamoDB.getItem(params).promise();
        return result;
    } catch (e) {
        return false;
    }
}


async function verifyToken(email) {
    const params = {
        TableName: 'CNAPP_USERS',
        Key: {
            email: {
                S: email
            }
        },
        AttributesToGet: ["name"]
    };
    try {
        const result = await dynamoDB.getItem(params).promise();
        if (result.Item.name && result.Item.name.S.length > 0) return true;
        else return false;
    } catch(error) {
        return false;
    }
}

function badRequest() {
  return response(401, 'Bad request.');
}

function internalError(error) {
  return response(500, error);
}

function success(data) {
  return response(200, data);
}

function response(statusCode, body, contentType) {
  return {
    isBase64Encoded: false,
    statusCode,
    body: contentType ? body : JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "https://jeremigendron.com",
      "Cache-Control": "no-cache",
      "Content-Type": contentType ? contentType : "application/json",
    },
  };
}
