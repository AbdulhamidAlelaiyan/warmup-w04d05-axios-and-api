// If you get stuck go to axiox documentations
// https://github.com/axios/axios

function getAllStudents() {
    axios.get(`https://sei-relativity-ruh.herokuapp.com/developers`)
        .then(response => {
            addToPage(response.data)
        }).catch(err => console.log(err))
}

function addToPage(data) {
    const main = document.querySelector("#main")
    const allStudents = data.map((student) => `<li id="student-${student.id}">${student.name}</li><button id="edit-${student.id}">Edit</button><button id="delete-${student.id}">Delete</button>`).join("")
    main.innerHTML = `<ul>${allStudents}</ul>`
}

function addStudent(name) {
    axios.post(`https://sei-relativity-ruh.herokuapp.com/developers`, {
            name
        })
        .then(getAllStudents).catch(err => console.log(err))
}


const form = document.querySelector("#form-n")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.querySelector("#name").value
    addStudent(name)
})

getAllStudents()



///////////////////////

const editForm = document.querySelector("#form-e");
editForm.style.display = "none"


function deleteStudent(id) {
    axios.delete(`https://sei-relativity-ruh.herokuapp.com/developers/${id}`)
        .then(getAllStudents).catch(err => console.log(err))

}

function updateStudent(name, id) {
    console.log(name);

    axios.patch(`https://sei-relativity-ruh.herokuapp.com/developers/${id}`, {
            name: name
        })
        .then(getAllStudents).catch(err => console.log(err))
}


main.addEventListener("click", (e) => {

    if (e.target.id.includes('edit')) {
        editForm.style.display = "block"
        const id = e.target.id.replace("edit-", "")
        editForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const name = document.querySelector("#new-name").value
            updateStudent(name, id)

        })

    }
    if (e.target.id.includes('delete')) {
        const id = e.target.id.replace("delete-", "")
        deleteStudent(id)

    }

}) 
