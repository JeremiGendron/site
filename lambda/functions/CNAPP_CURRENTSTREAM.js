const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB({ region: 'us-east-2' })

exports.handler = async (event) => {

    const response = await getCurrent()
    if (!response) return internalError()
    else return success(response)
};

function success(message) {
    return response(200, {data: message})
}
function internalError() {
    return response(500, null)
}
function response(statusCode, body) {
    return {
        isBase64Encoded: false,
        statusCode,
        headers: {
            "Content-Type": 'application/json',
            "Cache-Control": 'no-cache',
            'Access-Control-Allow-Origin': 'https://jeremigendron.com'
        },
        body: body ? JSON.stringify(body) : null
    }
}

async function getCurrent() {
    const params = {
        TableName: 'jeremigendron-metadata',
        Key: {
            name: {
                S: 'current_stream'
            }
        }
    }

    try {
        const result = await dynamoDB.getItem(params).promise()
        return result.Item ? result.Item.value.S : false
    } catch(error) {
        return false
    }
}
