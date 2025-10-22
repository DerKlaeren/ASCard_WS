// models/UnitStatus.js
class UnitStatus {
    constructor(data) {
        this.heat = data.heat;
        this.armor = data.armor;
        this.unit_status = data.unit_status;
        this.round = data.round;
    }

}

module.exports = UnitStatus;