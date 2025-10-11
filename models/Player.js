// models/Player.js
class Player {
    constructor(data) {
        this.playerid = data.playerid;
        this.name = data.name;
        this.npc = !!data.npc;
        this.confirmed = !!data.confirmed;
        this.login_enabled = !!data.login_enabled;
        this.email = data.email;
        this.admin = !!data.admin;
        this.godadmin = !!data.godadmin;
        this.image = data.image;
        this.factionid = data.factionid;
        this.hostedgameid = data.hostedgameid;
        this.teamid = data.teamid;
        this.commandid = data.commandid;
        this.opfor = !!data.opfor;
        this.bid_pv = data.bid_pv;
        this.bid_tonnage = data.bid_tonnage;
        this.bid_winner = !!data.bid_winner;
        this.round = data.round;
        this.active_ingame = !!data.active_ingame;
        this.last_unit_opened = data.last_unit_opened;
        this.last_login = data.last_login;
    }
}

module.exports = Player;
