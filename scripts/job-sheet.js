

// creates JobItem instances. 
export class JobItem {
    
    constructor(data) {
        const { name='', location, duration, cashAmount } = data;

        // Defensive checks

        if (!name) {
            throw new Error (`No job name provided, received ${name}`)
        }
        if (typeof name !== 'string') {
            throw new Error (`Job name should be a string, received ${name}`)
        }
        if (!location) {
            throw new Error (`No job location provided, received ${location}`)
        }
        if (typeof location !== 'string') {
            throw new Error (`Location should be a string, received ${location}`)
        }
        if (!duration) {
            throw new Error (`No duration provided, received ${duration}`)
        }    
        if (typeof duration !== number) {
            throw new Error (`Duration should be a number, received ${duration}`)
        }
        if (!cashAmount) {
            throw new Error (`No cash amount provided, received ${cashAmount}`)
        }    
        if (typeof cashAmount !== number) {
            throw new Error (`Cash amount should be a number, received ${cashAmount}`)
        }
        // unique number for id
        this.id = create_UUID();
        // this.id = String(Math.random());
        // third option for random number is the UUI lib.
        this.name = name;
        this.location = location;
        this.duration = duration;
        this.cashAmount = cashAmount;
        
        function create_UUID(){
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c=='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
    }
}


// creates app that controls JobItem instances
class JobSheet {
    // private field
    #items = [];

    constructor(itemsDataArray = []) {
        if (!Array.isArray(itemsDataArray)) {
            throw new Error (`Items must be an array, received ${itemsDataArray} (${typeof item})`);
        }

        const stored = JSON.parse(localStorage.getItem("items")) || [];

        for (const item of stored) {
            this.#items.push(item);
        }

        for (const itemData of itemsDataArray) {
            this.#itemspush(new JobItem(itemData));
        }
    }

    // get all items
    getAllItems() {
        return this.#items.slice();
    }
}