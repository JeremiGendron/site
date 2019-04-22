const crypto = require('crypto')
const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB()
const ses = new aws.SES({ region: 'us-east-1', credentials: #OBFUSCATED# })

exports.handler = async (event) => {
    const body = JSON.parse(event.body)
    const { message, email, name, company } = body;

    if (!message || message.length < 30 || !email || !name) return badRequest()
    if (typeof message !== 'string' || typeof name !== 'string') return badRequest()
    if (!validEmail(email)) return badRequest()

    try  {
        const result = await sendEmail(name, email, company, message)
        if (!result) return internalError('Failed to send email.')
        return success('Thanks for your message.')
    }
    catch (error) {
        return internalError('Failed to send email.')
    }
};

async function sendEmail(name, email, company, message) {
    if (!company) company = ''
    const id = getId(name + email + company + message)

    const params = {
      Destination: {
       ToAddresses: [
          "gendronjeremi@gmail.com",
       ]
      },
      Message: {
       Body: {
        Text: {
         Charset: "UTF-8",
         Data: message + '\n-------------------------\n' + name + '\n-------------------------\n' + email + '\n-------------------------\n' + company
        }
       },
       Subject: {
        Charset: "UTF-8",
        Data: "JG " + email
       }
      },
      Source: "automatic@jeremigendron.com",
    }

    try {
        const result = await ses.sendEmail(params).promise()
        return result
    } catch(error) {
        return false
    }
}

function getId(string) {
    return crypto.createHash('sha256').update(string).digest().toString('hex')
}

function validEmail(email) {
    return /^.+@[^.].*\.[a-z]{2,}$/.test(email)
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
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Cache-Control": "no-cache",
      "Content-Type": contentType ? contentType : "application/json",
    },
  };
}
