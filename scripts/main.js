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
        const li = document.createElement('li');
        // adds class for bootstrap
        // li.classList.add('list-group-item')
        li.innerHTML = `
        <span>${item.name}</span><br>
        <span>${item.location}</span><br>
        <span>${item.duration}</span><br>
        <span>£${Number(
            item.cashAmount
        ).toLocaleString('en-gb')}</span><br>
        <div>
            <a href="mailto:example@example.com">Contact Job Poster</a>
        </div>
        `
        fragment.prepend(li);
    }

    mountNode.innerHTML = '';
    mountNode.append(fragment);
    countNode.textContent = jobItems.length;
}

render()