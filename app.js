const http = require('http');
const NReq = require('./lib/NReq');
const { MongoClient }   = require('mongodb')

const   db_protocol     = `mongodb+srv://`,
        db_path         = `/`,
        db_host         = `fooncluster.mw6zjin.mongodb.net`,  
        db_port         = ``,    
        db_url          = db_protocol+db_host+db_port+db_path

const authuser = {
                    username: `foon16220`, 
                    password: `nannapath16220`
                }



let authmech = `SCRAM-SHA-1`

let options = {            
                 auth: authuser ,
                 authMechanism: authmech 
            }

           
function connect(db_url, options )
{
    const client    = new MongoClient(db_url,options)
    return client.connect()
}

// ---------------------------------------------------------------------------
async function runMongo( db_url, options, dbname, collection, data )
{
   const conn = await connect(db_url,options)

   const insertresp = await conn.db(dbname).collection(collection).insertOne(data)

   console.log(insertresp)

   await conn.close()
}
// ---------------------------------------------------------------------------
async function getMongoData( db_url, options, dbname, collection, filter = {})
{
   const conn = await connect(db_url,options)

   const resp = await conn.db(dbname).collection(collection).find(filter).toArray()

   console.log(resp)

   await conn.close()
}
// ---------------------------------------------------------------------------
async function updateMongoData( db_url, options, dbname, collection, filter = {}, incdata)
{
   const conn = await connect(db_url,options)

   const resp = await conn.db(dbname).collection(collection).updateMany(filter,incdata)

   console.log(resp)

   await conn.close()
}
// ---------------------------------------------------------------------------
//const input_data = {
    //type : 'weapon',
    //subtype : 'sword',
    //code : 'sword_002',
    //name : 'Iron Sword',
    //range : 10,
    //price : 1500
//}

const rewardService = {
    collectReward: async (playerId) => { 
        const playerLevel = await getPlayerLevel(playerId);
        if (playerLevel > 1) {
            return { code: 2, msg: 'player cannot collect this rewards' };
        }

        const payload = { player_id: playerId };
        try {
            const response = await NReq.post('http://<ip/localhost>:10002/first_reward/collect', payload);
    
            if (response.success) {
                return { code: 1, msg: 'player collected this rewards' };
            } else {
                return { code: 3, msg: 'Error collecting rewards' };
            }
        } catch (error) {
            console.error('Error collecting rewards:', error);
            return { code: 3, msg: 'Error collecting rewards' };
        }
    }
};

//-----------------------------------------------------------------------

async function getUserData(dbUrl, options, dbName, collectionName, userId) {
    const conn = await connect(dbUrl, options);
    const userData = await conn.db(dbName).collection(collectionName).findOne({ player_id: userId });
}

//-----------------------------------------------------------------------
const server1 = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/hi') {
        res.writeHead(200, 'Hi, this is your call in GET method.');
        res.end();
    } else if (req.method === 'POST' && req.url === '/hi') {
        res.writeHead(200, 'Hi, this is your call in POST method.');
        res.end();
    } else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
});

server1.listen(10001, () => {
    console.log('Server running at http://localhost:10001/');
});

const server2 = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/hi') {
        res.writeHead(200, 'Hi, this is your call in GET method.');
        res.end();
    } else if (req.method === 'POST' && req.url === '/hi') {
        res.writeHead(200, 'Hi, this is your call in POST method.');
        res.end();
    } else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
});

server2.listen(10002, () => {
    console.log('Server is running at http://localhost:10002');
});

runMongo( db_url , options, dbname, collection, input_data )

//getMongoData( db_url, options, 'sq362', 'item', {subtype : null})

const player_data = [
    {
        "player_id": "15001",
        "username": "john",
        "level": 1
    },
    {
        "player_id": "15002",
        "username": "tony",
        "level": 9
    },
    {
        "player_id": "15003",
        "username": "kerry",
        "level": 1
    }
]

//updateMongoData( db_url, options, 'sq362', 'item', {subtype : null}, incdata)
