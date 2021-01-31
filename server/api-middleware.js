const express = require('express');
const sudo = require('sudo-prompt');

// const request = require('requestretry');
const router = express.Router();
// const fs = require('fs-extra');
// const path = require('path');

const getRouter = redisClient => {
  router.all('/dnsinfo', (req, res) => {
    console.log('second');
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send('8.8.8.8');
  });

  router.all('/setdns', (req, res) => {
    let options = {
      name: 'DNS settings are changing and spider'
      // icns: '/Applications/Electron.app/Contents/Resources/Electron.icns', // (optional)
    };

    sudo.exec('sh change', options, function(error, stdout, stderr) {
      if (error) throw error;
      console.log('stdout: ' + stdout);
    });
  });
  return router;
};

module.exports = getRouter;
