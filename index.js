console.log('Short notes');

const mainInnerCont = document.getElementById("mainInnerCont");
const addNewNoteIcon = document.getElementById('addNewNoteIcon');
const addNoteDiv = document.getElementById('addNoteDiv');
const crossSign = document.getElementById("crossSign");
const optionsDots = document.getElementById("optionsDots");
const optionsLinksCont = document.getElementById('optionsLinksCont');
const hiddenLayer = document.getElementById("hiddenLayer");
const addNoteBtn = document.getElementById("addNoteBtn");
const note_title = document.getElementById("note_title");
const userNote = document.getElementById("userNote");

addNewNoteIcon.addEventListener('click', () => {
    addNoteDiv.style.display = 'flex';
    addNewNoteIcon.style.display = 'none';
});

crossSign.addEventListener('click', () => {
    addNoteDiv.style.display = 'none';
    addNewNoteIcon.style.display = 'flex';
});

optionsDots.addEventListener('click', () => {
    optionsLinksCont.style.display = 'block';
    hiddenLayer.style.display = 'block';
})

hiddenLayer.addEventListener('click', () => {
    optionsLinksCont.style.display = 'none';
    hiddenLayer.style.display = 'none';
})

addNoteBtn.addEventListener('click', () => {
    crossSign.click();  // to close the add note window
    let title = String(note_title.value);
    let note = String(userNote.value);
    if (note.length > 0) {
        if (title.length == 0) {
            title = "new note";
        }
        addNote(title, note);
        note_title.value = "";
        userNote.value = "";
    }
})

function addNote(title, note) {
    // creating main note container
    let noteCont = document.createElement('div');
    noteCont.className = "noteCont";
    mainInnerCont.appendChild(noteCont);

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

    // function to add options to edit and delete
    showOptions(noteCont);
}

function showOptions(eName) {
    // creating option container
    let optionsContainer = document.createElement('div');
    optionsContainer.className = "options";
    eName.appendChild(optionsContainer);

    // creating options
    let optionsLinksContainer = document.createElement('div');
    optionsLinksContainer.className = "optionsLinksCont";
    optionsLinksContainer.id = "optionsLinksCont";

    // creating innerpart of option links container
    let mainOptionCont_1 = document.createElement('div');
    let mainOptionCont_2 = document.createElement('div');
    mainOptionCont_1.className = "mainoptionCont";
    mainOptionCont_2.className = "mainoptionCont";

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
    let spanText_2 = document.createElement('span');
    spanText_2.className = "userSelectNone";
    spanText_2.innerHTML = "Delete";

    // creating dots container
    let optionDotContainer = document.createElement('div');
    optionDotContainer.className = "optionsCont";
    optionDotContainer.id = "optionsDots";
    optionsContainer.appendChild(optionDotContainer);

    // adding dots
    let spanDots = document.createElement('span');
    spanDots.className = "userSelectNone";
    spanDots.innerHTML = "...";
    optionDotContainer.appendChild(spanDots);
}
