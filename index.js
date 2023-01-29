console.log('Short notes');

const mainInnerCont = document.getElementById("mainInnerCont");
const addNewNoteIcon = document.getElementById('addNewNoteIcon');
const addNoteDiv = document.getElementById('addNoteDiv');
const crossSign = document.getElementById("crossSign");
const hiddenLayer = document.getElementById("hiddenLayer");
const addNoteBtn = document.getElementById("addNoteBtn");
const note_title = document.getElementById("note_title");
const userNote = document.getElementById("userNote");

let optionsLinksContCount = 1;
let optionsLinksContDict = {};

function createOptionLinksDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        dict[`optionsLinksCont_${i}`] = document.getElementById(`optionsLinksCont_${i}`);
    }
}
createOptionLinksDict(optionsLinksContDict, optionsLinksContCount);

let optionsDotsCount = 1;
let optionsDotsDict = {};

function createOptionDotsDict(dict, count) {
    for (let i = 1; i <= count; i++) {
        dict[`optionsDots_${i}`] = document.getElementById(`optionsDots_${i}`);
    }
}
createOptionDotsDict(optionsDotsDict, optionsDotsCount);

addNewNoteIcon.addEventListener('click', () => {
    addNoteDiv.style.display = 'flex';
    addNewNoteIcon.style.display = 'none';
});

crossSign.addEventListener('click', () => {
    addNoteDiv.style.display = 'none';
    addNewNoteIcon.style.display = 'flex';
    note_title.value = "";
    userNote.value = "";
});

function addEventListener_onDots(dot_dict, count, optionCont_dict) {
    for (let i = 1; i <= count; i++) {
        dot_dict[`optionsDots_${i}`].addEventListener('click', () => {
            optionCont_dict[`optionsLinksCont_${i}`].style.display = 'block';
            hiddenLayer.style.display = 'block';
        })
    }
}
addEventListener_onDots(optionsDotsDict, optionsDotsCount, optionsLinksContDict);

function hideOptionLinksContainers(dict, count) {
    for (let i = 1; i <= count; i++) {
        dict[`optionsLinksCont_${i}`].style.display = 'none';
    }
}

hiddenLayer.addEventListener('click', () => {
    hiddenLayer.style.display = 'none';
    hideOptionLinksContainers(optionsLinksContDict, optionsLinksContCount);
})

addNoteBtn.addEventListener('click', () => {
    let title = String(note_title.value);
    let note = String(userNote.value);
    if (note.length > 0) {
        if (title.length == 0) {
            title = "new note";
        }
        addNote(title, note);
    }
    crossSign.click();  // to close the add note window
})

function addNote(title, note) {
    // creating main note container
    let noteCont = document.createElement('div');
    noteCont.className = "noteCont";
    mainInnerCont.appendChild(noteCont);

    // function to add options to edit and delete
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
    optionsLinksContainer.appendChild(mainOptionCont_1);
    let mainOptionCont_2 = document.createElement('div');
    mainOptionCont_2.className = "mainoptionCont";
    optionsLinksContainer.appendChild(mainOptionCont_2);

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
    optionsDotsCount++;
    let optionDotContainer = document.createElement('div');
    optionDotContainer.className = "optionsCont";
    optionDotContainer.id = `optionsDots_${optionsDotsCount}`;
    optionsContainer.appendChild(optionDotContainer);
    createOptionDotsDict(optionsDotsDict, optionsDotsCount);
    addEventListener_onDots(optionsDotsDict, optionsDotsCount, optionsLinksContDict);

    // adding dots
    let spanDots = document.createElement('span');
    spanDots.className = "userSelectNone";
    spanDots.innerHTML = "...";
    optionDotContainer.appendChild(spanDots);
}
