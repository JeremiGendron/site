const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

exports.handler = async (event) => {
    const body = event

    const params = {
        TableName: 'CNAPP_STATUS',
        Item: {
            id: {
                S: 'main'
            },
            status: {
                N: body.status.toString()
            }
        }
    };
    try {
        const result = await dynamoDB.putItem(params).promise()
        return response(200);
    } catch(error) {
        return response(500);
    }

};

function response(statusCode) {
    return {
        statusCode,
        body: null,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
