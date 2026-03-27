/* button navigation using data-group */

let buttons = document.querySelectorAll(".serviceBtn");

buttons.forEach(btn => {

btn.addEventListener("click", () => {

let page = btn.dataset.group;

if(page === "cleaning"){
window.location.href = "cleaning.html";
}

if(page === "rental"){
window.location.href = "rental.html";
}

});

});