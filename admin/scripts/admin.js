import AdminJobSheet from './admin-job-sheet.js'

const jobSheet = new AdminJobSheet();
console.log("jobSheet", jobSheet)
const clearButton = document.getElementById("clearData");
const jobCount = jobSheet.getAllItems().length;

if (clearButton) {
    clearButton.addEventListener('click', (event) => {
        event.stopPropagation();
        jobSheet.removeAllItems();
        render();
        GrowlNotification.notify({
            title: 'Success!',
            description: `${jobCount} job(s) deleted.`,
            image: {visible: true,
                    customImage: '../../assets/icons/success-outline.svg'}, 
            type: 'success',
            position: 'top-center',
            showProgress: true,
            closeTimeout: 2300
        });
    });
}

const mountNode = document.getElementById('job-card-mount');
const countNode = document.getElementById('job-count');

function render() {
    
    const jobItems = jobSheet.getAllItems();
    

    const fragment = document.createDocumentFragment();

    for (const item of jobItems) {
        const li = document.createElement('li');
        li.classList.add('card', 'card-body')
        li.setAttribute('style', 'width: 220px;')

        li.innerHTML = `
        <div class="card-main">
            <h3 class="card-title">${item.location}</h3>
            <h4 class="card-subtitle text-muted">${item.duration} hours, £${Number(
                item.cashAmount
            ).toLocaleString('en-gb')}</h4>
            <p class="card-text">${item.name}</p>
        </div>
        <div class="card-foot">
            <a class="btn btn-link btn-lg" href="/admin/update-job.html?id=${item.id}">
                <span>Update</span>
            </a>
            <button class="delete btn btn-danger btn-lg" data-id="${item.id}">
                Delete
            </button>
        </div>
        `
        fragment.prepend(li);
    }

    mountNode.innerHTML = '';
    mountNode.append(fragment);
    countNode.textContent = jobItems.length;
}

if (mountNode) {
    render();

    mountNode.addEventListener("click", (event) => {
        const { target } = event;
        console.log("target", target)

        if (
            target.closest("button.delete")
        ) {
        console.log("delete");
        const id = target.closest("button.delete").dataset.id;
        console.log(`id for deletion: ${id}`);
        jobSheet.removeItem(id);
        target.closest("li").remove();
        GrowlNotification.notify({
            title: 'Success!',
            description: `Job has been deleted.`,
            image: {visible: true,
                    customImage: '../../assets/icons/success-outline.svg'}, 
            type: 'success',
            position: 'top-center',
            showProgress: true,
            closeTimeout: 2300
        });
        }
    });
}

const addForm = document.forms["add-form"];
console.log("addForm", addForm);

if (addForm) {
    addForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(addForm));
        console.log("add data", data);
        jobSheet.addItem(data);
        addForm.reset();
        GrowlNotification.notify({
            title: 'Success!',
            description: `Your job has been added.`,
            image: {visible: true,
                    customImage: '../../assets/icons/success-outline.svg'}, 
            type: 'success',
            position: 'top-center',
            showButtons: true,
            buttons: {
                action: {
                    text: 'View Job',
                    callback: function() {
                        console.log('hello')
                        window.location.replace('/admin/index.html')
                    }
                },
                cancel: {
                    text: 'Add New Job',
                    // callback: function() {} 
                }
            },
        });

        
    });
}

const updateForm = document.forms["update-form"];
console.log("updateForm", updateForm);

if (updateForm) {
    // Get id and populate form
    var params = new URLSearchParams(window.location.search);
    console.log("params", params)
    const id = params.get("id");
    console.log("id", id)
    const itemToUpdate = jobSheet.getItemById(id);
    console.log("render -> itemToUpdate", itemToUpdate)
    populate(updateForm, itemToUpdate);

    // handle submit
    updateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(updateForm));
        data._id = id;
        console.log("update data", data, id);
        jobSheet.updateItem(data);
        updateForm.reset();
        location.href = "/admin/index.html";
    });
}

function populate(form, data) {
    // walk the object
    for (const key in data) {
      // if this is a system property then bail...
        if (!data.hasOwnProperty(key)) {
            continue;
        }

        // get key/value for inputs
        let name = key;
        let value = data[key];
    
        // Make any bad values an empty string
        if (!value && value !== 0) {
            value = "";
        }
    
        // try to find element in the form
        const element = form.elements[name];
    
        // If we can't then bail
        if (!element) {
            continue;
        }
    
        // see what type an element is to handle the process differently
        const type = element.type || element[0].type;
    
        switch (type) {
            case "checkbox": {
            // Here, value is an array of values to be spread across the checkboxes that make up this input. It's the value of the input as a whole, NOT the value of one checkbox.
            const values = Array.isArray(value) ? value : [value];
    
            for (let j = 0, len = element.length; j < len; j += 1) {
                const thisCheckbox = element[j];
                if (values.includes(thisCheckbox.value)) {
                thisCheckbox.checked = true;
                }
            }
            break;
            }
            case "select-multiple": {
            const values = Array.isArray(value) ? value : [value];
    
            for (let k = 0, len = element.options.length; k < len; k += 1) {
                const thisOption = element.options[k];
                if (values.includes(thisOption.value)) {
                thisOption.selected = true;
                }
            }
            break;
            }
            // case "select":
            // case "select-one":
            //   element.value = value.toString() || value;
            //   break;
    
            // case "date":
            //   element.value = new Date(value).toISOString().split("T")[0];
            //   break;
    
            // text boxes
            default:
            element.value = value;
            break;
        }
    }
}



