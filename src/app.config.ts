import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

/**
 * Import your Room files
 */
import { MemoryRoom } from "@natewilcox/memory-server";
import { PrivateRoom, PublicRoom } from "@natewilcox/tic-tac-toe-server";

export default config({

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        console.log("creating memory room");
        //gameServer.define('memory_room', MemoryRoom);

        console.log('Configuring TIC-TAC-TOE rooms....');
        gameServer.define('tictactoe_public_room', PublicRoom);
        gameServer.define('tictactoe_private_room', PrivateRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.get("/hello_world", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        if (process.env.NODE_ENV !== "production") {
            app.use("/", playground);
        }

        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
