const nreq = require('./lib/NReq');


nreq.post('http', 'localhost', 10001, '/player/get/15002')


let payload1 = { player_id: '15001' };
nreq.post('http', 'localhost', 10002, '/reward/collect', payload1)

let payload2 = { player_id: '15002' };
nreq.post('http', 'localhost', 10002, '/reward/collect', payload2)
