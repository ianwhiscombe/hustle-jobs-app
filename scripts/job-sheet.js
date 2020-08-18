function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


class JobItem {
    
    constructor(data) {
        const{ name='', location, duration, cashAmount } = data;
        // third option for random number is the UUI lib.
        this.id = create_UUID();
        // this.id = String(Math.random());
        this.name = name;
        this.location = location;
        this.duration = duration;
        this.cashAmount = cashAmount;
    }
}

class JobSheet {
    constructor() {
        
    }
}