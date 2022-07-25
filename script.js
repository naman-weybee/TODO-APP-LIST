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
    }
    else {
        movements.forEach(item => {
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
});

btnSearch.addEventListener('click', function () {
    active = 1;
    btnAdd.classList.remove('btn--active')
    btnSearch.classList.add('btn--active')
});

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
    sortings(tasks);
}

// ------------------------------------------------------------- Check -------
function checks(i) {
    const index = movements.findIndex(x => x.id === i)
    movements[index].checked = !movements[index].checked

    if (movements[index].checked) {
        array = movements.filter(el => el.checked == false)
        if (allbtn == 1) {
            displayMovements(array)
        }
        else {
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

// ------------------------------------------------------------- Edit btn -------
function edits(i) {
    editFlag = true
    currentId = i
    displayMovements(movements);
    sortings(tasks);
    if (searched) {
        input = text.value.trim();
        tasks = tasks.filter(el => el.name.startsWith(input));
        displayMovements(tasks);
        sortings(tasks);
    }
}

// ------------------------------------------------------------- Edit on Enter -------
function editEnter(e) {
    input = document.querySelector('.texts').value.trim();
    if (e.key === 'Enter') {
        if (input) {
            if (!searched) {
                const index = movements.findIndex(el => el.id === currentId);
                movements[index].name = document.querySelector('.texts').value;
                editFlag = false;
                currentId = 0;
                displayMovements(movements);
                sortings(tasks);
            } else if (searched) {
                const index = tasks.findIndex(el => el.id === currentId);
                tasks[index].name = document.querySelector('.texts').value;
                editFlag = false;
                currentId = 0;
                let singleTask = tasks.splice().filter(el => el.name.startsWith(document.querySelector('.text').value.trim()));
                displayMovements(singleTask);
            }
        }
    }
}

// ------------------------------------------------------------- Add Input -------
const add = function () {
    input = text.value.trim();
    if (input) {
        movements.push({ id: ++ids, name: input, checked: false });
        displayMovements(movements);
    }
    btnAll.classList.add('btn--active');
    btnActive.classList.remove('btn--active');
    btnCompleted.classList.remove('btn--active');
    allbtn = 0
}

// ------------------------------------------------------------- Search Input -------
const search = function () {
    main();
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
    switch (sorting) {
        case "A-Z":
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
            break;
        case 'Z-A':
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
            task = tasks.slice().sort((a, b) => {
                return b.id - a.id
            })
            displayMovements(task)
            break;
        case "oldest":

            task = tasks.slice().sort((a, b) => a.id - b.id)
            displayMovements(task)
            break;

    }
}

sort.addEventListener('click', function () {
    main();
    c = 0;
    sortings(tasks);
})

// ------------------------------------------------------------- Actions -------
action.addEventListener('click', function () {
    main()
    let actions = action.options[action.selectedIndex].value;

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
                        el.checked = true
                        array = tasks.filter(el => el.checked == false)
                        displayMovements(array)

                    }
                    else {
                        el.checked = true
                        displayMovements(tasks)
                    }

                }
            })
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
                        el.checked = false
                        array = tasks.filter(el => el.checked == true)
                        displayMovements(array)

                    }
                    else {
                        el.checked = false
                        displayMovements(tasks)
                    }

                }

            })
            break;
        case "deselectAll":
            action.selectedIndex = 0
            if (active == 1) {
                if (searched) {
                    searched = searched.filter(el => el.checked == true)
                    searched.forEach(eli => {
                        const index = tasks.findIndex(x => x.id == eli.id);
                        let i = tasks[index].id;
                        tasks = tasks.filter(el => el.id !== i)
                        movements = movements.filter(el => el.id !== i)
                        displayMovements(tasks)
                    })
                }
                else {
                    tasks = tasks.filter(el => el.checked == false)
                    movements = movements.filter(el => el.checked == false)
                    displayMovements(tasks);
                }

            }
            else {
                tasks = tasks.filter(el => el.checked == false)
                task = task.filter(el => el.checked == false)
                movements = movements.filter(el => el.checked == false)
                displayMovements(tasks)
            }

            break;
        default:

    }
})

// ------------------------------------------------------------- Tabs -------
btnAll.addEventListener('click', function () {
    allbtn = 0
    main();
    btnAll.classList.add('btn--active')
    btnActive.classList.remove('btn--active')
    btnCompleted.classList.remove('btn--active')
    if (searched) {
        main();
        input = text.value.toLowerCase().trim();
        searched = tasks.filter(el => el.name.startsWith(input));
        if (input == '') {
            displayMovements(tasks);
        } else {
            displayMovements(searched);
        }
    }else{
        if (c == 0) {
            sortings(tasks)
        }
        else {
            displayMovements(tasks)
        }
    }
});

btnActive.addEventListener('click', function () {
    main();
    allbtn = 1
    btnAll.classList.remove('btn--active')
    btnActive.classList.add('btn--active')
    btnCompleted.classList.remove('btn--active')
    array = tasks.filter(el => el.checked == false)
    if (searched) {
        main();
        input = text.value.toLowerCase().trim();
        searched = tasks.filter(el => el.name.startsWith(input));
        if (input == '') {
            displayMovements(tasks);
        } else {
            displayMovements(searched);
        }
    }else{
        if (c == 0) {
            sortings(array)
        }
        else {
            displayMovements(array)
        }
    }
});

btnCompleted.addEventListener('click', function () {
    main();
    allbtn = 2
    btnAll.classList.remove('btn--active')
    btnActive.classList.remove('btn--active')
    btnCompleted.classList.add('btn--active')
    array = tasks.filter(el => el.checked == true);

    if (searched) {
        main();
        input = text.value.toLowerCase().trim();
        searched = tasks.filter(el => el.name.startsWith(input));
        if (input == '') {
            displayMovements(tasks);
        } else {
            displayMovements(searched);
        }
    }else{
        if (c == 0) {
            sortings(array)
        }
        else {
            displayMovements(array)
        }
    }

});

boxBtn.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        if (active == 0) {
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
});