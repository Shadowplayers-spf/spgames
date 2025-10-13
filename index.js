import express from 'express';
import io from 'socket.io';
import Rest from './server/Rest.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DBConnection from './server/DBConnection.js';
import Config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Load up the DB connections
const connUser = new DBConnection(Config.db_user_user, Config.db_user_pass, Config.db_user_db);
const connGame = new DBConnection(Config.db_game_user, Config.db_game_pass, Config.db_game_db);
(async () => {

    await connUser.connect();
    await connGame.connect();

    Rest.init(connGame, connUser);

    const port = 8090;
    const app = express();
    const server = app.listen(port, () => {
        console.log('Express server listening on port ' + port);
    });

    app.use(express.json());

    app.all('/api*splat', async (req, res) => {

        const rest = new Rest(req);
        let out = {};
        try{
            out = await rest.run();
        }catch(err){
            out = {
                error : err.message || err
            };
        }

        res.json(out);
    });

    app.use(express.static(__dirname+'/public'));

    const sio = io(server);

    sio.on('connection', socket => {
        console.log('Socket.io connection established');

        socket.on('disconnect', () => {
            console.log('Socket.io connection closed');
        });

    });


})();