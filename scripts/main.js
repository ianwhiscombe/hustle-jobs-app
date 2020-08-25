import JobSheet from "./job-sheet.js"

const jobsheet = new JobSheet();
console.log("jobsheet", jobsheet)

const mountNode = document.getElementById('job-card-mount');
const countNode = document.getElementById('job-count');

function render() {
    // const jobItems = jobList
    const jobItems = jobsheet.getAllItems();
    console.log("render -> jobItems", jobItems)

    const fragment = document.createDocumentFragment();

    for (const item of jobItems) {
        const div = document.createElement('div');
        // adds class for bootstrap
        div.classList.add('card', 'card-body')
        div.setAttribute('style', 'width: 220px;')
        div.innerHTML = `
        <div class="card-main">
            <h3 class="card-title">${item.location}</h3>
            <h4 class="card-subtitle text-muted">${item.duration} hours, £${Number(
                item.cashAmount
            ).toLocaleString('en-gb')}</h4>
            <p class="card-text">${item.name}</p>
        </div>
        <div class="card-foot">
            <a class="btn btn-primary btn-lg" href="mailto:example@example.com">Contact Host</a>
        </div>
        
        `
        fragment.prepend(div);
    }

    mountNode.innerHTML = '';
    mountNode.append(fragment);
    countNode.textContent = jobItems.length;
}

render()