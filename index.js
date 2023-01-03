console.log('Short notes');

const addNewNoteIcon = document.getElementById('addNewNoteIcon');
const addNoteDiv = document.getElementById('addNoteDiv');
const crossSign = document.getElementById("crossSign");

addNewNoteIcon.addEventListener('click', addNewNote);
function addNewNote() {
    addNoteDiv.style.display = 'flex';
    addNewNoteIcon.style.display = 'none';
}

crossSign.addEventListener('click', removeNewNote);
function removeNewNote() {
    addNoteDiv.style.display = 'none';
    addNewNoteIcon.style.display = 'flex';
}

const optionsDots = document.getElementById("optionsDots");
const optionsLinksCont = document.getElementById('optionsLinksCont');

optionsDots.onclick = function showOptions() {
    if (optionsLinksCont.style.display === 'none') {
       optionsLinksCont.style.display = 'block'; 
    }
    else {
        optionsLinksCont.style.display = 'none';
    }
}