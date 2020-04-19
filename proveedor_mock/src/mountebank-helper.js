const fetch = require('node-fetch');
const settings = require('./settings');

function postImposter(body) {
    const url = `http://${settings.host}:${settings.port}/imposters`;

    return fetch(url, {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
}

module.exports = { postImposter };