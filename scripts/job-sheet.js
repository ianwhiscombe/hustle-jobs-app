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
        if (typeof duration !== 'string') {
            throw new Error (`Duration should be a number, received ${duration}`)
        }
        if (!cashAmount) {
            throw new Error (`No cash amount provided, received ${cashAmount}`)
        }    
        if (typeof cashAmount !== 'string') {
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

// Hardcoded placeholder jobs to provide examples when app loads.

const placeholderJobs = [
    {
        id: '92d2f527-a732-489f-bebf-807febdf521',
        name: 'Leaking roof needs fixing, tiles missing. Might be longer than 4 hours, will pay the extra.',
        location: 'Rowhedge, Colchester',
        duration: '4',
        cashAmount: '300'
    },
    {
        id: '92d2f527-a732-489f-bebf-807febdf522',
        name: 'Six dogs need walking, must be prepared to pick up their shit as well.',
        location: 'Wymondham, Norfolk',
        duration: '2',
        cashAmount: '50'
    },
    {
        id: '92d2f527-a732-489f-bebf-807febdf523',
        name: 'Fences need making, installing and painting. I\'ve got paint ready but nothing else.',
        location: 'Colchester, Essex',
        duration: '3',
        cashAmount: '80'
    },
    {
        id: '92d2f527-a732-489f-bebf-807febdf524',
        name: 'Patio and driveway need power-hosing. Can you bring your own hose.',
        location: 'Rowhedge, Colchester',
        duration: '3',
        cashAmount: '60'
    },
    {
        id: '92d2f527-a732-489f-bebf-807febdf525',
        name: 'Tall hedges need cutting, about 4 metres high. Cuttings should be taken with you as well.',
        location: 'Chelmsford, Essex',
        duration: '4',
        cashAmount: '100'
    },
    {
        id: '92d2f527-a732-489f-bebf-807febdf526',
        name: 'Moving house, can someone pack up my whole house safely for me and take to new property. Should have your own truck.',
        location: 'Chelmsford, Essex',
        duration: '4',
        cashAmount: '100'
    }
]


// creates app that controls JobItem instances
export default class JobSheet {
    // private field
    #items = [...placeholderJobs];

    constructor(itemsDataArray = []) {
        if (!Array.isArray(itemsDataArray)) {
            throw new Error (`Items must be an array, received ${itemsDataArray} (${typeof item})`);
        }

        const stored = JSON.parse(localStorage.getItem("items")) || [];
        console.log("JobSheet -> constructor -> stored", stored)

        for (const item of stored) {
            this.#items.push(item);
        }

        for (const itemData of itemsDataArray) {
            this.#items.push(new JobItem(itemData));
        }
    }

    // get all job items and return a copy of the array
    getAllItems() {
        return this.#items.slice();
    }
}