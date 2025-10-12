// models/Unit.js

const UnitStatus = require('./UnitStatus');
const Pilot = require('./Pilot');

class Unit {
    constructor(data) {
        this.unitId = data.unitid;
        this.unit_name = data.unit_name;
        this.pilot = new Pilot(data); // 1zu1
        this.unit_statuses = []; //1zu1
    }

    addStatus(row) {
        // nur hinzufügen, wenn tatsächlich Statusdaten vorhanden sind
        if (row.armor !== null || row.heat !== null) {
            const status = new UnitStatus(row);
            this.unit_statuses.push(status);
        }
    }
}

module.exports = Unit;
