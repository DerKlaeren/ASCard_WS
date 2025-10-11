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
        if (!rows || rows.length === 0) return null;

        const game = new Game(rows[0]);

        for (const row of rows) {
            if (row.playerid) {
                game.players.push(new Player(row));
            }
        }

        return game;
    }
}

module.exports = Game;
