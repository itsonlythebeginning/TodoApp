
let addButton = document.querySelector(".todo__add-button")

let addInput = document.querySelector(".todo__add-input")

let tasks = document.querySelector(".todo__tasks")

let activeDealsCounter = document.querySelector(".todo__header-box-more-counter")

let doneDealsCounter = document.querySelector(".todo__header-box-done-counter")

let deleteButton = document.querySelector(".todo__task-button-delete")

let searchInput = document.querySelector(".todo__search-input")

let activeButton = document.querySelector(".todo__search-button-active")

let doneButton = document.querySelector(".todo__search-button-done")

let allButton = document.querySelector(".todo__search-button-all")



let localStorageArr

let doneDeals = 0
let activeDeals = 0




addButton.addEventListener("click", addItems)

searchInput.addEventListener("input", searchItems)

activeButton.addEventListener("click", showActiveTasks)

doneButton.addEventListener("click", showDoneTasks)

allButton.addEventListener("click", showAllTasks)




if (localStorage.getItem("1")) {

    localStorageArr = JSON.parse(localStorage.getItem("1"))
    addItemsFromLocalStorage()

}
else{
    localStorageArr = []
}



function addItemsFromLocalStorage() {

    for (let i = 0; i < localStorageArr.length; i++) {

        let task = document.createElement("div")
        task.classList.add("todo__task")
        task.id = localStorageArr[i].id

        let taskSort = document.createElement("div")
        taskSort.classList.add("todo__task-sort")

        let sortButtonUp = document.createElement("button")
        sortButtonUp.classList.add("todo__task-sort-button")
        sortButtonUp.classList.add("todo__task-sort-button-up")
        sortButtonUp.textContent = "↑"
        sortButtonUp.addEventListener("click", sortUp)

        let sortButtonDown = document.createElement("button")
        sortButtonDown.classList.add("todo__task-sort-button")
        sortButtonDown.classList.add("todo__task-sort-button-down")
        sortButtonDown.textContent = "↓"
        sortButtonDown.addEventListener("click", sortDown)


        taskSort.append(sortButtonUp)
        taskSort.append(sortButtonDown)

        task.append(taskSort)


        let taskBox = document.createElement("div")
        taskBox.classList.add("todo__task-box")

        let taskTitle = document.createElement("h3")
        taskTitle.classList.add("todo__task-title")
        taskTitle.textContent = localStorageArr[i].title

        let taskLine = document.createElement("span")
        taskLine.classList.add("todo__task-line")

        if (localStorageArr[i].done === true) {
            taskLine.classList.add("todo__task-line_active")
            taskBox.style.opacity = 0.8
        }
        else if (localStorageArr[i].done === false) {
            taskBox.style.opacity = 1
        }

        taskBox.append(taskTitle)
        taskBox.append(taskLine)

        let taskButtons = document.createElement("div")
        taskButtons.classList.add("todo__task-buttons")

        let editButton = document.createElement("button")
        editButton.classList.add("todo__task-button")
        editButton.classList.add("todo__task-button-edit")
        editButton.addEventListener("click", editItem)

        if (localStorageArr[i].done === true) {
            editButton.style.opacity = 0.5
        }
        else if (localStorageArr[i].done === false) {
            editButton.style.opacity = 1
        }

        let doneButton = document.createElement("button")
        doneButton.classList.add("todo__task-button")
        doneButton.classList.add("todo__task-button-done")
        doneButton.addEventListener("mouseover", addHoverLine)
        doneButton.addEventListener("mouseout", removeHoverLine)
        doneButton.addEventListener("click", changeDealStatus)


        if (localStorageArr[i].done === true) {
            doneButton.classList.add("todo__task-button-done_active")
            doneButton.textContent = "✓"
        }
        else{
            doneButton.textContent = "!"
        }


        let deleteButton = document.createElement("button")
        deleteButton.classList.add("todo__task-button")
        deleteButton.classList.add("todo__task-button-delete")
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", deleteItem)

        taskButtons.append(editButton)
        taskButtons.append(doneButton)
        taskButtons.append(deleteButton)

        task.append(taskBox)
        task.append(taskButtons)

        tasks.append(task)

        checkCounterDeals()

    }

}



function addItems() {

    let taskID = Date.now()

    let taskText = addInput.value

    let task = document.createElement("div")
    task.classList.add("todo__task")
    task.id = taskID

    let taskSort = document.createElement("div")
    taskSort.classList.add("todo__task-sort")

    let sortButtonUp = document.createElement("button")
    sortButtonUp.classList.add("todo__task-sort-button")
    sortButtonUp.classList.add("todo__task-sort-button-up")
    sortButtonUp.textContent = "↑"
    sortButtonUp.addEventListener("click", sortUp)

    let sortButtonDown = document.createElement("button")
    sortButtonDown.classList.add("todo__task-sort-button")
    sortButtonDown.classList.add("todo__task-sort-button-down")
    sortButtonDown.textContent = "↓"
    sortButtonDown.addEventListener("click", sortDown)


    taskSort.append(sortButtonUp)
    taskSort.append(sortButtonDown)

    task.append(taskSort)


    let taskBox = document.createElement("div")
    taskBox.classList.add("todo__task-box")

    let taskTitle = document.createElement("h3")
    taskTitle.classList.add("todo__task-title")
    taskTitle.textContent = taskText

    let taskLine = document.createElement("span")
    taskLine.classList.add("todo__task-line")

    taskBox.append(taskTitle)
    taskBox.append(taskLine)


    let taskButtons = document.createElement("div")
    taskButtons.classList.add("todo__task-buttons")

    let editButton = document.createElement("button")
    editButton.classList.add("todo__task-button")
    editButton.classList.add("todo__task-button-edit")
    editButton.addEventListener("click", editItem)


    let doneButton = document.createElement("button")
    doneButton.classList.add("todo__task-button")
    doneButton.classList.add("todo__task-button-done")
    doneButton.textContent = "!"
    doneButton.addEventListener("mouseover", addHoverLine)
    doneButton.addEventListener("mouseout", removeHoverLine)
    doneButton.addEventListener("click", changeDealStatus)

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("todo__task-button")
    deleteButton.classList.add("todo__task-button-delete")
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", deleteItem)

    taskButtons.append(editButton)
    taskButtons.append(doneButton)
    taskButtons.append(deleteButton)

    task.append(taskBox)
    task.append(taskButtons)

    tasks.append(task)

    addInput.value = ""
    checkCounterDeals()


    let objTask = {
        title: taskText,
        done: false,
        id: taskID
    }

    localStorageArr.push(objTask)
    localStorage.setItem("1" , JSON.stringify(localStorageArr))

    checkAvailableSort()

}



function checkCounterDeals() {

    let allDeals = document.querySelectorAll(".todo__task-button-done").length

    doneDeals = document.querySelectorAll(".todo__task-button-done_active").length

    activeDeals = allDeals - doneDeals

    activeDealsCounter.textContent = activeDeals

    doneDealsCounter.textContent = doneDeals
}


function deleteItem() {

    let deleteItemID = this.parentNode.parentNode.id

    let deleteItemIndex

    localStorageArr.forEach(function (element, index) {
        if (element.id === Number(deleteItemID)) {
            deleteItemIndex = index
        }
    })


    localStorageArr.splice(deleteItemIndex, 1)
    localStorage.setItem("1" , JSON.stringify(localStorageArr))


    this.parentNode.parentNode.remove()
    checkCounterDeals()

}


function addHoverLine() {
    this.parentNode.parentNode.querySelector(".todo__task-line").classList.add("todo__task-line_active")
}


function removeHoverLine() {

    if (this.classList.contains("todo__task-button-done_active") === false) {
        this.parentNode.parentNode.querySelector(".todo__task-line").classList.remove("todo__task-line_active")
    }

}


function changeDealStatus() {

    let changeItemID = this.parentNode.parentNode.id

    if (this.classList.contains("todo__task-button-done_active") === false) {

        this.classList.add("todo__task-button-done_active")
        this.textContent = "✓"
        this.parentNode.parentNode.querySelector(".todo__task-box").style.opacity = 0.6
        this.parentNode.parentNode.querySelector(".todo__task-button-edit").style.opacity = 0.5


        localStorageArr.forEach(function (element, index) {
            if (element.id === Number(changeItemID)) {
                element.done = true
            }
        })

        localStorage.setItem("1" , JSON.stringify(localStorageArr))

    }

    else {
        this.classList.remove("todo__task-button-done_active")
        this.textContent = "!"
        this.parentNode.parentNode.querySelector(".todo__task-box").style.opacity = 1
        this.parentNode.parentNode.querySelector(".todo__task-button-edit").style.opacity = 1

        localStorageArr.forEach(function (element, index) {
            if (element.id === Number(changeItemID)) {
                element.done = false
            }
        })

        localStorage.setItem("1" , JSON.stringify(localStorageArr))

    }

    checkCounterDeals()

}



function editItem() {

    let newText

    let changeItemID = this.parentNode.parentNode.id

    if (this.parentNode.querySelector(".todo__task-button-done").classList.contains("todo__task-button-done_active") === false) {

        let changeText = this.parentNode.parentNode.querySelector(".todo__task-title").textContent


        if (this.classList.contains("todo__task-button-edit_active") === false) {
            this.classList.add("todo__task-button-edit_active")
            addInput.value = changeText
            addButton.disabled = true;
        }

        else {
            this.classList.remove("todo__task-button-edit_active")
            this.parentNode.parentNode.querySelector(".todo__task-title").textContent = addInput.value
            newText = addInput.value
            addInput.value = ""
            addButton.disabled = false;

            localStorageArr.forEach(function (element, index) {
                if (element.id === Number(changeItemID)) {
                    element.title = newText
                }
            })

            localStorage.setItem("1" , JSON.stringify(localStorageArr))

        }

    }

}



function searchItems(event) {

    let searchText = this.value.toLowerCase()

    let tasksItems = document.querySelectorAll(".todo__task-title")

    tasksItems.forEach(function (element) {

        element.parentNode.parentNode.style.display = ""

        if (element.textContent.toLowerCase().indexOf(searchText) < 0) {
            element.parentNode.parentNode.style.display = "none"
        }

    })

}



function showActiveTasks() {

    allButton.classList.remove("todo__search-button-all_active")
    doneButton.classList.remove("todo__search-button-done_active")

    this.classList.add("todo__search-button-active_active")

    let doneButtons = document.querySelectorAll(".todo__task-button-done")

    doneButtons.forEach(function (element) {

        element.parentNode.parentNode.style.display = ""

        if (element.classList.contains("todo__task-button-done_active")) {
            element.parentNode.parentNode.style.display = "none"
        }

    })

    let allSortButtons = document.querySelectorAll(".todo__task-sort-button")

    allSortButtons.forEach(function (element) {
        element.disabled = true
    })

}


function showDoneTasks() {

    allButton.classList.remove("todo__search-button-all_active")
    activeButton.classList.remove("todo__search-button-active_active")

    this.classList.add("todo__search-button-done_active")

    let doneButtons = document.querySelectorAll(".todo__task-button-done")

    doneButtons.forEach(function (element) {

        element.parentNode.parentNode.style.display = ""

        if (!element.classList.contains("todo__task-button-done_active")) {
            element.parentNode.parentNode.style.display = "none"
        }

    })

    let allSortButtons = document.querySelectorAll(".todo__task-sort-button")

    allSortButtons.forEach(function (element) {
        element.disabled = true
    })

}

function showAllTasks() {

    doneButton.classList.remove("todo__search-button-done_active")
    activeButton.classList.remove("todo__search-button-active_active")

    this.classList.add("todo__search-button-all_active")


    let doneButtons = document.querySelectorAll(".todo__task-button-done")

    doneButtons.forEach(function (element) {

        element.parentNode.parentNode.style.display = ""

    })


    let allSortButtons = document.querySelectorAll(".todo__task-sort-button")

    allSortButtons.forEach(function (element) {
        element.disabled = false
    })

    checkAvailableSort()

}



function sortDown() {

    let currentItem = this.parentNode.parentNode

    let currentIndex = Array.from(document.querySelectorAll(".todo__task")).indexOf(this.parentNode.parentNode)

    let changedIndex = currentIndex + 1;

    [localStorageArr[currentIndex], localStorageArr[changedIndex]] = [localStorageArr[changedIndex], localStorageArr[currentIndex]];

    localStorage.setItem("1" , JSON.stringify(localStorageArr))

    document.querySelector(".todo__tasks").innerHTML = ""

    addItemsFromLocalStorage()

    checkAvailableSort()
}

function sortUp() {

    let currentItem = this.parentNode.parentNode

    let currentIndex = Array.from(document.querySelectorAll(".todo__task")).indexOf(this.parentNode.parentNode)

    let changedIndex = currentIndex - 1;

    [localStorageArr[currentIndex], localStorageArr[changedIndex]] = [localStorageArr[changedIndex], localStorageArr[currentIndex]];

    localStorage.setItem("1" , JSON.stringify(localStorageArr))

    document.querySelector(".todo__tasks").innerHTML = ""

    addItemsFromLocalStorage()

    checkAvailableSort()
}


function checkAvailableSort() {

    let nowTasks = document.querySelectorAll(".todo__task")

    let lastItem = nowTasks.length - 1

    let allSortButtons = document.querySelectorAll(".todo__task-sort-button")


    allSortButtons.forEach(function (element) {
        element.disabled = false
    })


    nowTasks[lastItem].querySelector(".todo__task-sort-button-down").disabled = true
    nowTasks[0].querySelector(".todo__task-sort-button-up").disabled = true

}

checkAvailableSort()

checkCounterDeals()


