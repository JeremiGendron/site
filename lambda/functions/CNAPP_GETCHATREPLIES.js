const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

const TableName = 'CNAPP_MESSAGES';

exports.handler = async (event) => {
    try {
        const result = await getMessages();
        if (!result) return internalError("Failed to get messages.");
        return success(result);
    } catch(e) {
        return internalError("Failed to get messages.");
    }
};

async function getMessages() {
    const params = {
        TableName,
        ExpressionAttributeNames: {
           "#T": "token", 
           "#M": "message",
           "#F": "from",
           "#D": "date"
          }, 
        ProjectionExpression: "#T, #M, #F, #D",
    }
    
    try {
        const result = await dynamoDB.scan(params).promise();
        return result;
    } catch (e) {
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
    body: typeof body == 'string' ? body : JSON.stringify(body),
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
    },
  };
}
