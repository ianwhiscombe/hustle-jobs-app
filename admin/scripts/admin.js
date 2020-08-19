import AdminJobSheet from './admin-job-sheet.js'

const jobSheet = new AdminJobSheet();
const clearButton = document.getElementById("clearData");

if (clearButton) {
    clearButton.addEventListener('click', (event) => {
        event.stopPropagation();
        jobSheet.removeAllItems();
        render();
    });
}

const mountNode = document.getElementById('job-card-mount');
const countNode = document.getElementById('job-count');

function render() {
    
    const jobItems = jobSheet.getAllItems();
    

    const fragment = document.createDocumentFragment();

    for (const item of jobItems) {
        const li = document.createElement('li');
        // adds class for bootstrap
        // li.classList.add('list-group-item')
        li.innerHTML = `
        <span>${item.name}</span><br>
        <span>${item.location}</span><br>
        <span>${item.duration}</span><br>
        <span>£${Number(
            item.cashAmount
        ).toLocaleString('en-gb', {
            minimumFractionDigits: 2,
        })}}</span><br>
        <div>
            <a href="/admin/update-job.html?id=${item._id}">
                <span class="sr-only">Update</span>
            </a>
            <button data-id="${item._id}">
                <span class="sr-only">Delete</span>
            </button>
        </div>
        `
        fragment.append(li);
    }

    mountNode.innerHTML = '';
    mountNode.append(fragment);
    countNode.textContent = jobItems.length;
}

if (mountNode) {
    render();

    mountNode.addEventListener("click", (event) => {
        const { target } = event;

        if (
            (target && target.matches("button.delete")) ||
            target.closest("button").matches("button.delete")
        ) {
        console.log("delete");
        const id = target.closest("button.delete").dataset.id;
        console.log(`id for deletion: ${id}`);
        jobSheet.removeItem(id);
        target.closest("li").remove();
        }
    });
}