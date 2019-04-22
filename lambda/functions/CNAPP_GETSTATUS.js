const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB();

exports.handler = async (event) => {
    const params = {
        TableName: 'CNAPP_STATUS',
        Key: {
            id: {
                S: 'main'
            }
        }
    };
    try {
        const result = await dynamoDB.getItem(params).promise()
        const status = Number(result.Item.status.N)
        return response(status);
    } catch(error) {
        return response(500);
    }

};

function response(status) {
    return {
       "isBase64Encoded": false,
        statusCode: 200,
        body: JSON.stringify({ status }),
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=10',
            'Access-Control-Allow-Origin': 'https://jeremigendron.com'
        }
    };
}
