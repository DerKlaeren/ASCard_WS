// models/Game.js
const Player = require("./Player");

class Game {
    constructor(data) {
        this.gameid = data.gameid;
        this.ownerPlayerId = data.ownerPlayerId;
        this.title = data.title;
        this.background = data.background;
        this.era = data.era;
        this.yearInGame = data.yearInGame;
        this.accessCode = data.accessCode;
        this.locked = !!data.locked;
        this.scheduled = data.scheduled;
        this.started = data.started;
        this.finished = data.finished;
        this.Updated = data.Updated;
        this.players = [];
    }

    static parseFromRows(rows) {
        const game = new Game(rows[0]);

        // Map für eindeutige Spieler (damit Spieler bei mehrfachen Units nicht dupliziert werden)
        const playerMap = new Map();

        for (const row of rows) {
            if (!row.playerid) continue;

            if (!playerMap.has(row.playerid)) {
                playerMap.set(row.playerid, Player.fromRow(row));
            }

            const player = playerMap.get(row.playerid);
            player.addUnit(row);
        }

        game.players = Array.from(playerMap.values());
        return game;
    }
}

module.exports = Game;
