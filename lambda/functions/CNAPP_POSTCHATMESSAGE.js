const crypto = require("crypto");

const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

exports.handler = async (event) => {
    const splits = event.path.split('/');
    const index = splits.findIndex((item) => item == 'messages');
    const email = splits[index - 1];

    if (!email) return badRequest();

    const body = JSON.parse(event.body);

    const { message, read } = body;
    console.log(body, message)
    const hasRead = read && read.constructor === Array && read.length > 0;
    if (!message && !hasRead) { console.log('didnt pass'); return badRequest(); }

    const verified = await verifyToken(email);
    if (!verified) return badRequest();

    try {
        if (hasRead) {
            for (let i = 0; i < read.length; i ++) {
                await markRead(email, read[i]);
            }
            if (!message) return success(1);
        }
    } catch(e) {
        if (!message) return internalError('Failed to mark messages as read.');
    }
    try {
        if (message) {
            const result = await newMessage(email, message);
            if (result) return success(result);
            else return internalError("Failed to post message.");
        }
    } catch(error) {
        return internalError('Failed to post message.');
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

async function newMessage(email, message) {
    const id = getMessageId(email, message)

    const params = {
        TableName: 'CNAPP_MESSAGES',
        Item: {
            token: {
                S: id
            },
            message: {
                S: message
            },
            from: {
                S: email
            },
            date: {
                N: Date.now().toString()
            }
        },
    };

    try {
        const result = await dynamoDB.putItem(params).promise();
        return id;
    } catch (e) {
        return false;
    }
}

function getMessageId(token, message) {
    return crypto.createHash('sha256').update(`${token}${message.toString()}${Date.now().toString()}`).digest().toString('hex');
}

async function markRead(email, message) {
    const params = {
        ExpressionAttributeNames: {
          "#M": "messages",
          "#mid": message,
        },
        TableName: 'CNAPP_USERS',
        Key: {
            email: {
                S: email
            },
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: "REMOVE #M.#mid",
    }
    try {
        const result = await dynamoDB.updateItem(params).promise()
    } catch (error) {
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

