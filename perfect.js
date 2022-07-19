// ------------------------------------------------------------- Heading -------
let heading = document.querySelector('.heading');

// ------------------------------------------------------------- Inputs -------
let box = document.querySelector('.box');
let text = document.querySelector('.text');
let boxBtn = document.querySelector('.box-btn');

// ------------------------------------------------------------- Container -------
let taskList = document.querySelector('.taskList');
let taskName = document.querySelector('.taskName');
let check = document.querySelector('.check')
let msg = document.querySelector('.message');
let checkC = document.querySelector('.check-c');
let editBox = document.querySelector('span');
let edit_btn = document.querySelector('.edit');
let deletee_btn = document.querySelector('.delete');
let container = document.querySelector('.taskmain');

// ------------------------------------------------------------- Footer Add - Search-------
let allOther = document.querySelector('.allOther');
let btnAdd = document.querySelector('.add-btn');
let btnSearch = document.querySelector('.search-btn');

// ------------------------------------------------------------- Footer Actions-------
let action_btn = document.querySelector('.action-btn');
let action = document.querySelector('.actionS');
let select = document.querySelector('.select');
let unSelect = document.querySelector('.un-select');
let deleteSelected = document.querySelector('.deletedselect');

// ------------------------------------------------------------- Footer Sorting-------
let sort = document.querySelector('.sort');
let a_z = document.querySelector('.A-Z');
let z_a = document.querySelector('.Z-A');
let newest = document.querySelector('.newest');
let oldest = document.querySelector('.oldest');

// ------------------------------------------------------------- Footer Tab-------
let btnAll = document.querySelector('.all-a-btn');
let btnActive = document.querySelector('.active-a-btn');
let btnCompleted = document.querySelector('.completed-a-btn');

// ------------------------------------------------------------- Arrays-------
let movements = [];
let tasks = [];
let task = [];
let array = [];

// ------------------------------------------------------------- Boolean Flag and Variables-------
let editFlag = false;
let allbtn = 0;
let ids = 0;
let active;
let searched;
let input;
let currentId;
let c;
let tasked;

// ------------------------------------------------------------- Logic Starts-------
taskList.innerHTML = '';
container.innerHTML = '';

// ------------------------------------------------------------- Display -------
const displayMovements = function (movements) {
    container.innerHTML = '';
    if (movements.length === 0) {
        const msgs = `<div class="message">No data found</div>`;
        container.insertAdjacentHTML('beforeend', msgs);
        // msg.style.display = "block";
    }
    else {
        // msg.style.display = "none";
        movements.forEach(item => {
            console.log(item)
            const html = `
            <div class="taskList">
            <div class = 'taskName'>
                <input type="checkbox" class="check" ${item.checked ? 'checked' : ""} onclick=checks(${item.id})>
                <div class='editss'>${editFlag && currentId == item.id ? `<input type="textbox" class = 'texts' value="${item.name}" onkeypress = editEnter(event)>` : item.name}</div> 
                 
            </div>
            
            <div class="edits">
                <button class="edit" onclick=edits(${item.id})><i class="fa fa-edit" id="edit-a" style="display: ${editFlag && currentId ? 'none' : ''};"></i></button>
                <button class="delete" onclick=deletes(${item.id})><i class="fa-solid fa-delete-left deletebtn" style="display: ${editFlag && currentId ? 'none' : ''};"></i></button>
                <i class="fa fa-window-close" aria-hidden="true" id="close-${item.id}" onclick="closeBox(${item.id})" style="display: ${editFlag && currentId == item.id ? '' : 'none'};"></i>
            </div>`

            container.insertAdjacentHTML('beforeend', html);
        })
    }
}

btnAdd.addEventListener('click', function () {
    active = 0;
    searched = false;
    btnAdd.classList.add('btn--active')
    btnSearch.classList.remove('btn--active')
    box.style.display = 'block'
})
btnSearch.addEventListener('click', function () {
    active = 1;
    btnAdd.classList.remove('btn--active')
    btnSearch.classList.add('btn--active')
    //box.style.display='block'
})

// ------------------------------------------------------------- Tab Flag Value -------
function main() {
    if (allbtn == 0) {
        tasks = movements
    }
    else if (allbtn == 1) {
        tasks = movements.filter(el => el.checked == false)
    }
    else if (allbtn == 2) {
        tasks = movements.filter(el => el.checked == true)
    }
    return tasks
}

// ------------------------------------------------------------- Close Box -------
function closeBox(i) {
    editFlag = 0;
    container.innerHTML = '';
    displayMovements(movements);
}

// ------------------------------------------------------------- Check -------
function checks(i) {
    const index = movements.findIndex(x => x.id === i)
    movements[index].checked = !movements[index].checked
    console.log(movements) 
    //main() 

    if (movements[index].checked) {
        console.log("hello")
        array = movements.filter(el => el.checked == false)
        console.log(array)
        // displayMovements(array)
        if (allbtn == 1) {
            displayMovements(array)
        }
        else {
            console.log('helllo')
            sortings(movements)
        }
    }
    else if (movements[index].checked == false) {
        if (allbtn == 2) {
            array = movements.filter(el => el.checked == true);
            displayMovements(array)
        }

    }
    if (task.length > 0) {
        if (task[index].checked) {
            array = task.filter(el => el.checked == false)
            console.log(array)
            displayMovements(array)
        }
    }
}

// ------------------------------------------------------------- Delete -------
function deletes(i) {
    movements = movements.filter(el => el.id !== i);
    tasks = tasks.filter(el => el.id !== i);
    displayMovements(movements);
    sortings(tasks);
}

// ------------------------------------------------------------- Edit Input -------
function edits(i) {
    editFlag = true
    currentId = i
    displayMovements(movements);
    if(searched){
        tasks = tasks.filter(el => el.id === i);
        displayMovements(tasks);
    }
}

function editEnter(e) {
    input = document.querySelector('.texts').value.trim();
    if (e.key === 'Enter') {
        if (input) {
            const index = movements.findIndex(el => el.id === currentId)
            movements[index].name = document.querySelector('.texts').value
            editFlag = false;
            currentId = 0
            displayMovements(movements)
        }
    }
}

// ------------------------------------------------------------- Add Input -------
const add = function () {
    input = text.value;
    //let checked = false
    input = input.trim();
    if (input) {
        movements.push({ id: ++ids, name: input, checked: false });
        console.log(movements)
        displayMovements(movements);
    }
    console.log(movements);
    btnAll.classList.add('btn--active');
    btnActive.classList.remove('btn--active');
    btnCompleted.classList.remove('btn--active');
    allbtn = 0
}

// ------------------------------------------------------------- Search Input -------
const search = function () {
    main()
    input = text.value.toLowerCase().trim();
    searched = tasks.filter(el => el.name.startsWith(input));
    if (input == '') {
        displayMovements(tasks);
    } else {
        displayMovements(searched);
    }
}

// ------------------------------------------------------------- Sorting -------
function sortings(task) {
    let sorting = sort.options[sort.selectedIndex].value;
    console.log(sorting)
    switch (sorting) {
        case "A-Z":
            //sort.selectedIndex=0
            task = tasks.slice().sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                else if (a.name > b.name) {
                    return 1
                }
                else {
                    return 0

                }
            })
            displayMovements(task)
            console.log(task)
            console.log(movements)
            break;
        case 'Z-A':
            //sort.selectedIndex=0
            task = tasks.slice().sort((a, b) => {
                if (b.name < a.name) {
                    return -1
                }
                else if (b.name > a.name) {
                    return 1
                }
                else {
                    return 0

                }
            });
            displayMovements(task);
            break;
        case 'newest':
            //sort.selectedIndex=0
            task = tasks.slice().sort((a, b) => {
                return b.id - a.id
            })
            displayMovements(task)
            break;
        case "oldest":
            // sort.selectedIndex=0

            task = tasks.slice().sort((a, b) => a.id - b.id)
            displayMovements(task)
            break;

    }
    //return task
}

sort.addEventListener('click', function () {
    main()
    c = 0
    sortings(tasks)
})

// ------------------------------------------------------------- Actions -------
action.addEventListener('click', function () {
    main()
    let actions = action.options[action.selectedIndex].value;
    console.log(actions)

    switch (actions) {
        case "selectAll":
            action.selectedIndex = 0

            movements.forEach(el => {
                if (active == 1) {
                    if (searched) {
                        searched.forEach(eli => {
                            eli.checked = true
                            let index = tasks.findIndex(x => x.id == eli.id)
                            tasks[index].checked = true
                            index = movements.findIndex(x => x.id == eli.id)
                            movements[index].checked = true

                            if (allbtn == 1) {
                                array = tasks.filter(el => el.checked == false)
                                displayMovements(array)
                            }
                            else {

                                displayMovements(searched)
                            }
                        })

                    }
                    else {
                        el.checked = true
                        displayMovements(tasks)

                    }
                }
                else {
                    if (allbtn == 1) {
                        console.log('how are u')
                        el.checked = true
                        array = tasks.filter(el => el.checked == false)
                        displayMovements(array)

                    }
                    else {
                        console.log('how are u 5555')
                        el.checked = true
                        displayMovements(tasks)
                    }

                }
            })
            console.log(tasks)
            break;
        case 'unselectAll':
            action.selectedIndex = 0
            movements.forEach(el => {
                if (active == 1) {
                    if (searched) {
                        searched.forEach(eli => {
                            eli.checked = false
                            const index = tasks.findIndex(x => x.id == eli.id)
                            tasks[index].checked = false
                            if (allbtn == 2) {
                                array = tasks.filter(el => el.checked == true)
                                displayMovements(array)
                            }
                            else {

                                displayMovements(searched)
                            }


                        })
                    }
                    else {
                        el.checked = false
                        displayMovements(tasks)

                    }

                }
                else {
                    if (allbtn == 2) {
                        console.log('how are u')
                        el.checked = false
                        array = tasks.filter(el => el.checked == true)
                        displayMovements(array)

                    }
                    else {
                        console.log('how are u 5555')
                        el.checked = false
                        displayMovements(tasks)
                    }

                }

            })
            console.log(movements)
            break;
        case "deselectAll":
            action.selectedIndex = 0
            if (active == 1) {
                if (searched) {
                    console.log(searched)
                    searched = searched.filter(el => el.checked == true)
                    console.log(searched)
                    searched.forEach(eli => {
                        const index = tasks.findIndex(x => x.id == eli.id)
                        let i = tasks[index].id
                        console.log(i)
                        console.log(movements)
                        tasks = tasks.filter(el => el.id !== i)
                        movements = movements.filter(el => el.id !== i)
                        displayMovements(tasks)
                    })
                }
                else {
                    tasks = tasks.filter(el => el.checked == false)
                    movements = movements.filter(el => el.checked == false)
                    displayMovements(tasks)

                }

            }
            else {
                tasks = tasks.filter(el => el.checked == false)
                task = task.filter(el => el.checked == false)
                movements = movements.filter(el => el.checked == false)
                displayMovements(tasks)
            }

            console.log(tasks)
            break;
        default:

    }
})

// ------------------------------------------------------------- Tabs -------
btnAll.addEventListener('click', function () {
    allbtn = 0
    console.log(allbtn)
    main()
    //sortings()

    btnAll.classList.add('btn--active')
    btnActive.classList.remove('btn--active')
    btnCompleted.classList.remove('btn--active')
    if (c == 0) {
        sortings(tasks)
    }
    else {
        displayMovements(tasks)
    }

})
btnActive.addEventListener('click', function () {
    allbtn = 1
    //sortings()
    console.log(allbtn)
    btnAll.classList.remove('btn--active')
    btnActive.classList.add('btn--active')
    btnCompleted.classList.remove('btn--active')
    main()
    array = tasks.filter(el => el.checked == false)
    if (c == 0) {
        sortings(array)
    }
    else {
        displayMovements(array)
    }

})
btnCompleted.addEventListener('click', function () {
    allbtn = 2
    //sortings()
    console.log(allbtn)
    btnAll.classList.remove('btn--active')
    btnActive.classList.remove('btn--active')
    btnCompleted.classList.add('btn--active')
    main()


    //sortings(tasks)
    array = tasks.filter(el => el.checked == true);
    if (c == 0) {
        sortings(array)
    }
    else {
        displayMovements(array)
    }

})


boxBtn.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (active == 0) {
            console.log("active=0")
            add(movements);
            text.value = '';
            if (c == 0) {
                sortings(movements);
            }
        }

    }
    else if (active == 1) {
        search();
    }
})