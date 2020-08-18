import JobSheet from "./job-sheet.js"

const jobsheet = new JobSheet();
console.log("jobsheet", jobsheet)

const mountNode = document.getElementById('job-card-mount');
const countNode = document.getElementById('job-count');

function render() {
    const jobItems = jobsheet.getAllItems();

    const fragment = document.createDocumentFragment();
    console.log("render -> fragment", fragment)

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
        `
        fragment.append(li);
    }

    mountNode.innerHTML = '';
    mountNode.append(fragment);
    countNode.textContent = jobItems.length;
}

// placeholder jobs

const placeholderJobs = [
    {
        name: 'Leaking roof needs fixing',
        location: 'Rowhedge, Colchester',
        duration: 120,
        cashAmount: 300
    },
    {
        name: 'Six dogs need walking, must be prepared to pick up their shit as well.',
        location: 'Brightlingsea',
        duration: 60,
        cashAmount: 50
    },
    {
        name: 'Fences need painting',
        location: 'Rowhedge, Colchester',
        duration: 180,
        cashAmount: 210
    },
    {
        name: 'Patio and driveway need powerhosing',
        location: 'Rowhedge, Colchester',
        duration: 120,
        cashAmount: 60
    }
]

const myJobSheetApp = new JobSheet(placeholderJobs)
console.log("render -> myJobSheetApp", myJobSheetApp)

render(myJobSheetApp)