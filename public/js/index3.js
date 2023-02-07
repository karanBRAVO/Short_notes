const checkBtn = document.getElementById("checkBtn");
const authForm = document.getElementById("authForm");
const username = document.getElementById("username");
const userid = document.getElementById("userid");
const useremail = document.getElementById("useremail");

function setFormaction(action, method) {
    authForm.action = action;
    authForm.method = method;
}

checkBtn.addEventListener('click', () => {
    let uname = username.value;
    let uid = userid.value;
    let uemail = useremail.value;
    setFormaction(`/shortNotesAuth/${uname}/${uid}/${uemail}`, "post");
})
