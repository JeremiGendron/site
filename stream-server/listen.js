const fs = require('fs')
const express = require('express')();

express.get('/stream/:key/:current/:file', (req, res) => {

  const { key, current, file } = req.params
  const auth = req.headers['jg-auth-target']

  if (auth !== '87ef49ca-b65f-4b7e-846c-5e0009276c1f') return

  const isManifest = file.endsWith('8')
  const splits = req.url.split('/')

  try {
    if (isManifest) {
      res.set('Cache-Control', 'no-cache')
      res.set('Access-Control-Allow-Origin', 'https://jeremigendron.com')
      try {
        const file = fs.createReadStream('./out/' + splits[2] + '/' + splits[3] + '/' + splits[4])
        file.on('error', () => res.end())
        file.pipe(res)
      } catch(error) {
        return
      }
    }
    else {
      res.set('Cache-Control', 'max-age=604800')
      res.set('Access-Control-Allow-Origin', 'https://jeremigendron.com')
      try {
        const file = fs.createReadStream('./out/' + splits[2] + '/' + splits[3] + '/' + splits[4])
        file.on('error', () => res.end())
        file.pipe(res)
      } catch(error) {
        return
      }
    }
  } catch(error) {}
})

express.get('/*', (req, res) => {
  res.end("OK")
})

express.listen(9098)

