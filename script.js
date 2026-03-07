// load Issues
const container = document.getElementById("issuesContainer")

async function loadIssues(){
document.getElementById("loading").classList.remove("hidden")
const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json()
displayIssues(data.data)
document.getElementById("loading").classList.add("hidden")
}
loadIssues()

// Display Issues

function displayIssues(issues){
    container.innerHTML = ""
    document.getElementById("issueCount").innerText = issues.length
    issues.forEach(issue => {
    const div = document.createElement("div")
    div.className = "bg-white rounded-md shadow p-5"
    if(issue.status === "closed"){
        div.style.borderTop = "4px solid purple"
    }else{
        div.style.borderTop = "4px solid green"
    }
    
div.innerHTML = `
                    <div class="flex justify-end mb-5 pb-3">
                        <span class="text-sm bg-gray-300 px-4 py-1 rounded-full cursor-pointer">${issue.priority}</span>
                    </div>
                    <h3 class="font-semibold text-lg cursor-pointer"
                        onclick="getIssue(${issue.id})">
                        ${issue.title}
                    </h3>
                    <p class="text-gray-600 text-sm pt-2">
                        ${issue.description.slice(0,80)}...
                    </p>
                    <div class="flex gap-2 pt-3 text-xs">
                        ${issue.labels ? issue.labels.map(l => 
                        `<span class="bg-yellow-100 text-yellow-600 font-semibold text-md px-2 py-1 rounded-full">${l}</span>`
                        ).join("") : ""}
                    </div>
                    <div class="pt-4 text-sm text-gray-500">
                        #1 by ${issue.author}
                    <br>
                    ${issue.createdAt}
                    </div>
                `
                
container.appendChild(div)

})

}

// Filter Search text
async function searchIssue(){
const text = document.getElementById("searchInput").value
const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)
const data = await res.json()
displayIssues(data.data)
}

// Filter all || open || close || Active button
// Active button function
function setActive(btn){
    const buttons = document.querySelectorAll(".tab-btn")
    buttons.forEach(b=>{
        b.classList.remove("btn-primary")
    })
    btn.classList.add("btn-primary")
}
//Filter All
async function filterAll(btn){
    setActive(btn)
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
displayIssues(data.data)
}
//Filter Open
async function filterOpen(btn){
    setActive(btn)
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    const open = data.data.filter(issue => issue.status === "open")
displayIssues(open)
}
//Filter Close
async function filterClosed(btn){
    setActive(btn)
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    const closed = data.data.filter(issue => issue.status === "closed")
displayIssues(closed)
}