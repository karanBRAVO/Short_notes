console.log('Short notes');

const mainInnerCont = document.getElementById("mainInnerCont");
const addNewNoteIcon = document.getElementById('addNewNoteIcon');
const addNoteDiv = document.getElementById('addNoteDiv');
const crossSign = document.getElementById("crossSign");
const hiddenLayer = document.getElementById("hiddenLayer");
const addNoteBtn = document.getElementById("addNoteBtn");
const note_title = document.getElementById("note_title");
const userNote = document.getElementById("userNote");
const modify_crossSign = document.getElementById("modify_crossSign");
const modifyNoteDiv = document.getElementById("modifyNoteDiv");
const modify_note_title = document.getElementById("modify_note_title");
const modify_userNote = document.getElementById("modify_userNote");
const modifyNoteBtn = document.getElementById("modifyNoteBtn");
const showInfo_top = document.getElementById("showInfo_top");
const info = document.getElementById("info");

let optionsLinksContCount = 1;
let optionsLinksContDict = {};

function createOptionLinksDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`optionsLinksCont_${i}`) != null) {
            dict[`optionsLinksCont_${i}`] = document.getElementById(`optionsLinksCont_${i}`);
        }
    }
}
createOptionLinksDict(optionsLinksContDict, optionsLinksContCount);

let optionsDotsDict = {};

function createOptionDotsDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (document.getElementById(`optionsDots_${i}`) != null) {
            dict[`optionsDots_${i}`] = document.getElementById(`optionsDots_${i}`);
        }
    }
}
createOptionDotsDict(optionsDotsDict, optionsLinksContCount);

let editBtnDict = {};
let which_edit_btn_clicked = null;

function addAllEditButtons_toDict(edit_dict, count) {
    for (let i = 2; i <= count; i++) {
        if (document.getElementById(`editBtn_${i}`) != null) {
            edit_dict[`editBtn_${i}`] = document.getElementById(`editBtn_${i}`);
            edit_dict[`editBtn_${i}`].addEventListener('click', () => {
                let mainContainer = ((edit_dict[`editBtn_${i}`].parentNode).parentNode).parentNode;
                modifyNoteDiv.style.display = "flex";
                modify_note_title.value = mainContainer.children[1].children[0].innerHTML;
                modify_userNote.value = mainContainer.children[2].children[0].innerHTML;
                which_edit_btn_clicked = edit_dict[`editBtn_${i}`];
                hiddenLayer.click();
                addNewNoteIcon.style.display = 'none';
            })
        }
    }
}
addAllEditButtons_toDict(editBtnDict, optionsLinksContCount);

function modifyValues() {
    if (which_edit_btn_clicked != null) {
        if ((modify_userNote.value).length > 0) {
            if ((modify_note_title.value).length == 0) {
                modify_note_title.value = "new note";
            }
            let mainContainer = ((which_edit_btn_clicked.parentNode).parentNode).parentNode;
            mainContainer.children[1].children[0].innerHTML = modify_note_title.value;
            mainContainer.children[2].children[0].innerHTML = modify_userNote.value;
            msg("note modified succesfully", "#03C988", "flex");
        }
        modify_crossSign.click();
    }
}

modifyNoteBtn.addEventListener('click', modifyValues);

let deleteBtnDict = {};

function addAllDeleteButtons_toDict(del_dict, count) {
    for (let i = 2; i <= count; i++) {
        if (document.getElementById(`deleteBtn_${i}`) != null) {
            del_dict[`deleteBtn_${i}`] = document.getElementById(`deleteBtn_${i}`);
            del_dict[`deleteBtn_${i}`].addEventListener('click', () => {
                let mainContainer = ((del_dict[`deleteBtn_${i}`].parentNode).parentNode).parentNode;
                mainContainer.remove();
                hiddenLayer.click();
                deleteBtnDict = {};
                editBtnDict = {};
                optionsDotsDict = {};
                msg("note deleted succesfully", "#F55050", "flex");
                // optionsLinksContDict = {};
            })
        }
    }
}
addAllDeleteButtons_toDict(deleteBtnDict, optionsLinksContCount);

addNewNoteIcon.addEventListener('click', () => {
    addNoteDiv.style.display = 'flex';
    addNewNoteIcon.style.display = 'none';
    hiddenLayer.click();
});

crossSign.addEventListener('click', () => {
    addNoteDiv.style.display = 'none';
    addNewNoteIcon.style.display = 'flex';
    note_title.value = "";
    userNote.value = "";
});

modify_crossSign.addEventListener('click', () => {
    modifyNoteDiv.style.display = "none";
    modify_note_title.value = "";
    modify_userNote.value = "";
    addNewNoteIcon.style.display = 'flex';
})

function addEventListener_onDots(dot_dict, count, optionCont_dict) {
    for (let i = 1; i <= count; i++) {
        if (dot_dict[`optionsDots_${i}`] != null) {
            dot_dict[`optionsDots_${i}`].addEventListener('click', () => {
                optionCont_dict[`optionsLinksCont_${i}`].style.display = 'block';
                hiddenLayer.style.display = 'block';
            })
        }
    }
}
addEventListener_onDots(optionsDotsDict, optionsLinksContCount, optionsLinksContDict);

function hideOptionLinksContainers(dict, count) {
    for (let i = 1; i <= count; i++) {
        if (dict[`optionsLinksCont_${i}`] != null) {
            dict[`optionsLinksCont_${i}`].style.display = 'none';
        }
    }
}

hiddenLayer.addEventListener('click', () => {
    hiddenLayer.style.display = 'none';
    hideOptionLinksContainers(optionsLinksContDict, optionsLinksContCount);
})

function hideMsg() {
    showInfo_top.style.display = "none";
}

function msg(text, color, set_display) {
    info.innerHTML = text;
    info.parentNode.style.background = color;
    showInfo_top.style.display = set_display;
    setTimeout(hideMsg, 2 * 1000);
}

addNoteBtn.addEventListener('click', () => {
    let title = String(note_title.value);
    let note = String(userNote.value);
    if (note.length > 0) {
        if (title.length == 0) {
            title = "new note";
        }
        addNote(title, note);
        // blitting message
        msg("note added succesfully", "#03C988", "flex");
    }
    crossSign.click();  // to close the add note window
})

function addNote(title, note) {
    // creating main note container
    let noteCont = document.createElement('div');
    noteCont.className = "noteCont";
    mainInnerCont.appendChild(noteCont);

    // function to add options to edit and delete and date created
    showOptions(noteCont);

    // creating inner part of main note container
    let noteHeading = document.createElement('div');
    let noteDescCont = document.createElement('div');
    noteHeading.className = "noteHeading";
    noteDescCont.className = "note";
    noteCont.appendChild(noteHeading);
    noteCont.appendChild(noteDescCont);

    // creating element to add title
    let spanTitle = document.createElement('span');
    spanTitle.innerHTML = `${title}`;
    noteHeading.appendChild(spanTitle);

    // creating element to add note description
    let spanNote = document.createElement('span');
    spanNote.innerHTML = `${note}`;
    noteDescCont.appendChild(spanNote);
}

function showOptions(eName) {
    // creating option container
    let optionsContainer = document.createElement('div');
    optionsContainer.className = "options";
    eName.appendChild(optionsContainer);

    // incrementing option container variable
    optionsLinksContCount++;

    // creating date container
    let dateContainer = document.createElement('div');
    dateContainer.className = `dateCreatedCont`;
    optionsContainer.appendChild(dateContainer);

    // creating inner container for date box
    let dateInnerCont = document.createElement('div');
    dateInnerCont.className = `spanContDate`;
    dateContainer.appendChild(dateInnerCont);

    // creating span to store date
    let spanDate = document.createElement('span');
    spanDate.id = `dateCreatedSpan_${optionsLinksContCount}`;
    let date = new Date();
    spanDate.innerHTML = `${date.toLocaleString()}`;
    dateInnerCont.appendChild(spanDate);

    // creating options
    let optionsLinksContainer = document.createElement('div');
    optionsLinksContainer.className = "optionsLinksCont";
    optionsLinksContainer.id = `optionsLinksCont_${optionsLinksContCount}`;
    optionsContainer.appendChild(optionsLinksContainer);
    createOptionLinksDict(optionsLinksContDict, optionsLinksContCount);

    // creating innerpart of option links container
    let mainOptionCont_1 = document.createElement('div');
    mainOptionCont_1.className = "mainoptionCont";
    mainOptionCont_1.id = `editBtn_${optionsLinksContCount}`
    optionsLinksContainer.appendChild(mainOptionCont_1);
    addAllEditButtons_toDict(editBtnDict, optionsLinksContCount);
    let mainOptionCont_2 = document.createElement('div');
    mainOptionCont_2.className = "mainoptionCont";
    mainOptionCont_2.id = `deleteBtn_${optionsLinksContCount}`;
    optionsLinksContainer.appendChild(mainOptionCont_2);
    addAllDeleteButtons_toDict(deleteBtnDict, optionsLinksContCount);

    // creating images elements and adding to containers
    let editImg = document.createElement('img');
    editImg.src = "edit.svg";
    editImg.id = "editImg";
    editImg.className = "optionsIcon";
    mainOptionCont_1.appendChild(editImg);
    let delImg = document.createElement('img');
    delImg.src = "delete.svg";
    delImg.id = "deleteImg";
    delImg.className = "optionsIcon";
    mainOptionCont_2.appendChild(delImg);

    // creating text container
    let textCont_1 = document.createElement('div');
    textCont_1.className = "spanOption";
    mainOptionCont_1.appendChild(textCont_1);
    let textCont_2 = document.createElement('div');
    textCont_2.className = "spanOption";
    mainOptionCont_2.appendChild(textCont_2);

    // adding text
    let spanText_1 = document.createElement('span');
    spanText_1.className = "userSelectNone";
    spanText_1.innerHTML = "Edit";
    textCont_1.appendChild(spanText_1);
    let spanText_2 = document.createElement('span');
    spanText_2.className = "userSelectNone";
    spanText_2.innerHTML = "Delete";
    textCont_2.appendChild(spanText_2);

    // creating dots container
    let optionDotContainer = document.createElement('div');
    optionDotContainer.className = "optionsCont";
    optionDotContainer.id = `optionsDots_${optionsLinksContCount}`;
    optionsContainer.appendChild(optionDotContainer);
    createOptionDotsDict(optionsDotsDict, optionsLinksContCount);
    addEventListener_onDots(optionsDotsDict, optionsLinksContCount, optionsLinksContDict);

    // adding dots
    let spanDots = document.createElement('span');
    spanDots.className = "userSelectNone";
    spanDots.innerHTML = "...";
    optionDotContainer.appendChild(spanDots);
}
