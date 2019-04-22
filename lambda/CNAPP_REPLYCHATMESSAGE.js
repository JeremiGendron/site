const crypto = require("crypto");

const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

exports.handler = async (event) => {
    const body = event
    const { message, read, from, email } = body;
    const hasRead = read && read.constructor === Array && read.length > 0;
    if (!message && !hasRead) return badRequest();

    try {
        if (hasRead) {
            for (let i = 0; i < read.length; i ++) {
                await markRead(read[i]);
            }
        }
    } catch(e) {
        if (!message) return internalError('Failed to mark messages as read.')
    }
    try {
        if (message) {
            if (!email) return badRequest();
            const verified = await verifyToken(email);
            if (!verified) return badRequest();

            const result = await newMessage(email, message, from);
            if (result) return success(result);
            else return internalError("Failed to post message.");
        }
    } catch(error) {
        return internalError('Failed to post message.');
    }
}

async function newMessage(email, message, from) {
    const id = getMessageId(email, message)

    const params = {
        TableName: 'CNAPP_USERS',
        ExpressionAttributeNames: {
          "#M": "messages",
          "#mid": id,
        },
        ExpressionAttributeValues: {
          ":m": {
            M: {
                message: {
                    S: message
                },
                date: {
                    N: Date.now().toString()
                },
                from: {
                    S: from ? from : 'Jeremi Gendron'
                }
            },
          },
        },
        Key: {
            email: {
                S: email
            }
        },
        UpdateExpression: "SET #M.#mid = :m",
        ConditionExpression: "attribute_not_exists(#M.#mid)"
    };
    
    try {
        const result = await dynamoDB.updateItem(params).promise();
        return id;
    } catch (e) {
        return false;
    }
}

function getMessageId(token, message) {
    return crypto.createHash('sha256').update(`${token}${message.toString()}${Date.now().toString()}`).digest().toString('hex');
}

async function markRead(message) {
    const params = {
        TableName: 'CNAPP_MESSAGES',
        Key: {
            token: {
                S: message
            },
        },
    }
    try {
        const result = await dynamoDB.deleteItem(params).promise()
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
    body: typeof body == 'string' ? body : JSON.stringify(body),
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
    },
  };
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
