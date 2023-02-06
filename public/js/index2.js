const addNewNoteIcon = document.getElementById("addNewNoteIcon");
const addNoteDiv = document.getElementById("addNoteDiv");
const crossSign = document.getElementById("crossSign");

function addNoteDiv_alterDisplay(val) {
    addNoteDiv.style.display = val;
}

addNewNoteIcon.addEventListener('click', () => {
    addNoteDiv_alterDisplay("flex");
    hiddenLayer.click();
})

crossSign.addEventListener('click', () => {
    addNoteDiv_alterDisplay("none");
    remove_allValues();
})

// create operation
const addNoteBtn = document.getElementById("addNoteBtn");
const addDataForm = document.getElementById("addDataForm");
const note_title = document.getElementById("note_title");
const userNote = document.getElementById("userNote");

function remove_allValues() {
    note_title.value = ``;
    userNote.value = ``;
}

function alterForm_actionANDmethod(method, action) {
    addDataForm.method = `${method}`;
    addDataForm.action = `${action}`;
}

function addDataToDB() {
    let heading = note_title.value;
    let description = userNote.value;
    if (description.length > 0) {
        if (heading.length === 0) {
            heading = "new note";
        }
        let date = new Date();
        let dateTime = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}, ${date.toLocaleTimeString()}`;
        alterForm_actionANDmethod("post", `/addData/${dateTime}/${heading}/${description}`);
    }
    else {
        alterForm_actionANDmethod("get", "/");
    }
}

addNoteBtn.addEventListener('click', () => {
    addDataToDB();
})

const hiddenLayer = document.getElementById("hiddenLayer");
const getCount = document.getElementById("getCount");

let optionsLinksContDict = {};
let optionsDotsDict = {};
let count = Number(getCount.innerHTML);

function createOptionLinksDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`optionsLinksCont_${i}`) != null) {
            dict[`optionsLinksCont_${i}`] = document.getElementById(`optionsLinksCont_${i}`);
        }
    }
}

function hideOptionLinksContainers(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (dict[`optionsLinksCont_${i}`] != null) {
            dict[`optionsLinksCont_${i}`].style.display = 'none';
        }
    }
}

function createOptionDotsDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`optionsDots_${i}`) != null) {
            dict[`optionsDots_${i}`] = document.getElementById(`optionsDots_${i}`);
        }
    }
}

function addEventListener_onDots(dot_dict, count, optionCont_dict) {
    for (let i = 1; i <= count; i++) {
        if (dot_dict[`optionsDots_${i}`] != null) {
            dot_dict[`optionsDots_${i}`].addEventListener('click', () => {
                optionCont_dict[`optionsLinksCont_${i}`].style.display = 'block';
                change_hiddenLayer_display("block");
            })
        }
    }
}

function change_hiddenLayer_display(val) {
    hiddenLayer.style.display = val;
}

createOptionLinksDict(optionsLinksContDict, count);
createOptionDotsDict(optionsDotsDict, count);
addEventListener_onDots(optionsDotsDict, count, optionsLinksContDict);

hiddenLayer.addEventListener('click', () => {
    hideOptionLinksContainers(optionsLinksContDict, count);
    change_hiddenLayer_display("none");
})

// update operation
const modifyNoteBtn = document.getElementById("modifyNoteBtn");
const modifyNoteDiv = document.getElementById("modifyNoteDiv");
const modifyDataForm = document.getElementById("modifyDataForm");
const modify_crossSign = document.getElementById("modify_crossSign");
const modify_note_title = document.getElementById("modify_note_title");
const modify_userNote = document.getElementById("modify_userNote");

let editBtnDict = {};
let which_editBtn_clicked = undefined;

function addAllEditButtons_toDict(edit_dict, count) {
    for (let i = 2; i <= count; i++) {
        if (document.getElementById(`editBtn_${i}`) != null) {
            edit_dict[`editBtn_${i}`] = document.getElementById(`editBtn_${i}`);
            edit_dict[`editBtn_${i}`].addEventListener('click', () => {
                let mainContainer = ((edit_dict[`editBtn_${i}`].parentNode).parentNode).parentNode;
                setDisplay_modifyForm("flex");
                modify_note_title.value = mainContainer.children[1].children[0].innerHTML;
                modify_userNote.value = mainContainer.children[2].children[0].innerHTML;
                addNewNoteIcon.style.display = 'none';
                set_whichEditBtnClicked(`editBtn_${i}`);
                hiddenLayer.click();
            })
        }
    }
}

function set_whichEditBtnClicked(val) {
    which_editBtn_clicked = val;
}

function setDisplay_modifyForm(val) {
    modifyNoteDiv.style.display = val;
}

function alterForm_actionANDmethod_modify(method, action) {
    modifyDataForm.method = method;
    modifyDataForm.action = action;
}

addAllEditButtons_toDict(editBtnDict, count);

modifyNoteBtn.addEventListener('click', () => {
    let heading = modify_note_title.value;
    let description = modify_userNote.value;
    if (description.length > 0) {
        if (heading.length === 0) {
            heading = `new note(modified)`;
        }
        alterForm_actionANDmethod_modify("post", `/updateData/${heading}/${description}/${which_editBtn_clicked}`);
    }
    else {
        alterForm_actionANDmethod_modify("get", "/");
    }
})

modify_crossSign.addEventListener('click', () => {
    setDisplay_modifyForm("none");
    addNewNoteIcon.style.display = 'flex';
})

// delete operation
const deleteDataForm = document.getElementById("deleteDataForm");
const hiddenBtn = document.getElementById("hiddenBtn");

let deleteBtnDict = {};
let which_deleteBtn_clicked = undefined;

function set_whichDeleteBtnClicked(val) {
    which_deleteBtn_clicked = val;
}

function set_deleteDataForm_action(method, action) {
    deleteDataForm.action = action;
    deleteDataForm.method = method;
}

function deleteFROMdatabase(val) {
    set_deleteDataForm_action("post", `/deleteData/${val}`);
}

function addAllDeleteButtons_toDict(del_dict, count) {
    for (let i = 2; i <= count; i++) {
        if (document.getElementById(`deleteBtn_${i}`) != null) {
            del_dict[`deleteBtn_${i}`] = document.getElementById(`deleteBtn_${i}`);
            del_dict[`deleteBtn_${i}`].addEventListener('click', () => {
                let mainContainer = ((del_dict[`deleteBtn_${i}`].parentNode).parentNode).parentNode;
                mainContainer.remove();
                hiddenLayer.click();
                set_whichDeleteBtnClicked(`deleteBtn_${i}`);
                hiddenBtn.click();
            })
        }
    }
}

addAllDeleteButtons_toDict(deleteBtnDict, count);

hiddenBtn.addEventListener('click', () => {
    deleteFROMdatabase(which_deleteBtn_clicked);
})

// debugging code
console.log(count);
console.log(deleteBtnDict);
console.log(editBtnDict);
console.log(optionsLinksContDict);
console.log(optionsDotsDict);
