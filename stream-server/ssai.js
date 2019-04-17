const fs = require('fs')

const uuidv4 = require('uuid/v4')

const { spawn } = require('child_process')

const express = require('express')();

const aws = require('aws-sdk')
const dynamoDB = new aws.DynamoDB({ region: 'us-east-2' })

function encode(req) {
  return spawn(`scripts/ad.sh`, [req.params.key, req.startTime])
}

express.post("/:key/:filename", (req, res) => {
  console.log('starting')
  req.on('data', (chunk) => {
    if (!req.initialized) {
      req.initialized = true
      req.startTime = uuidv4(),
      writeStart(req)
      req.ffmpeg = encode(req)
      req.ffmpeg.stderr.pipe(process.stdout)
      req.ffmpeg.stdin.write(chunk)
    }
    else if (!req.serveAd) {
      req.ffmpeg.stdin.write(chunk)
    }
    else if (req.serveAd && !req.adEnding) {
      req.adEnding = true
      req.ffmpeg.stdin.write(req.ad.buffer)
      setTimeout(() => { req.serveAd = false; req.adEnding = false; req.adResponse.end('success'); }, req.ad.duration - 500)
    }
  })

  req.on('end', () => {
    setTimeout(() => {
      req.ffmpeg.stderr.unpipe(process.stdout)
      req.ffmpeg.kill()
      req.endTime = Date.now()
      req.res.end("ended stream at " + req.endTime)
    }, 1000)
  })
})

async function writeStart(req) {
  try {
    dynamoDB.putItem({
      TableName: 'jeremigendron-metadata',
      Item: {
        name: {
          S: 'current_stream'
        },
        value: {
          S: req.startTime,
        }
      },
    }).promise()
  } catch(error) {
    console.log(error)
  }
}

express.listen(9091)

