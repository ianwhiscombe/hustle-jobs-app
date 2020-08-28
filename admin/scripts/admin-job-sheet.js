import { JobItem } from './../../scripts/job-sheet.js'

export default class AdminJobSheet {
    // private field
    items = [];

    constructor(itemsDataArray = []) {
        if (!Array.isArray(itemsDataArray)) {
            throw new Error (`Items must be an array, received ${itemsDataArray} (${typeof item})`);
        }

        const stored = JSON.parse(localStorage.getItem("items")) || [];

        for (const item of stored) {
            this.items.push(item);
        }

        for (const itemData of itemsDataArray) {
            this.items.push(new JobItem(itemData));
        }
    }

    // get all job items and return a copy of the array
    getAllItems() {
        return this.items.slice();
    }

    removeAllItems() {
        this.items.length = 0;
        this.save();
    }

    // get a job item's index using its id.

    getItemIndex(id) {
        if (!id) {
            throw new Error(`An id must be provided to getItemIndex`);
        }
        if (typeof id !== "string") {
            throw new Error(
            `The id provided to getItemIndex must be a string. Received ${id}(${typeof id})`
            );
        }
        const index = this.items.findIndex((item) => {
        console.log("AdminJobSheet -> getItemIndex -> item", item)
            return item.id === id;
        });
    
        if (!~index) {
            console.log(`Item with _id of ${id} not found`);
        }
        return index;
    }

    // get a job item by id and return a copy
    getItemById(id) {
        const index = this.getItemIndex(id);
        if (!~index) {
            return null;
        }
        const targetItem = this.items[index];
        return { ...targetItem }; 
    }

    addItem(itemData) {
    console.log("AdminJobSheet -> addItem -> itemData", itemData)
        
        if (!itemData) {
            throw new Error(`No data provided to addItem: received ${itemData}`);
        }
    
        const newItem = new JobItem(itemData);
        console.log("AdminJobSheet -> addItem -> newItem", newItem)
    
        // push it into our internal array
        this.items.push(newItem);
    
        this.save();
    
        // Return the finished product for reference
        console.log("AdminJobSheet -> addItem -> newItem", newItem)
        return { ...newItem };
    }

    updateItem(updates = {}) {
        // Check id is correct
        const { _id: id } = updates;
        if (!id) {
            throw new Error(
            "An id of the item you want to change must be provided to updateItem"
            );
        }
        if (typeof id !== "string") {
            throw new Error(`id must be a string. Received ${id}(${typeof id})`);
        }
    
        // Get old item
        const targetItemIndex = this.getItemIndex(id);
        const targetItem = this.items[targetItemIndex];
    
        if (!targetItem) {
            throw new Error(`Item not found`);
        }
    
        // Create a new Item to validate
        const updatedItem = new JobItem({
            ...targetItem,
            ...updates,
        });
    
        // Remove the old and insert the new
        this.items.splice(targetItemIndex, 1, updatedItem);
        this.save();
        return { ...updatedItem }; // before returning the new item
    }

    removeItem(id) {
        console.log('removeItem firing')
        if (!id) {
            throw new Error(`No id provided to removeItem: received ${id}`);
        }
        const index = this.getItemIndex(id);
        if (!~index) {
            return null;
        }
        const deleted = this.items.splice(index, 1);
        this.save();
        console.log('save called')
        return deleted;
    }

    save() {
        localStorage.setItem("items", JSON.stringify(this.items));
    }



}