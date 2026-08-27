



function show(id) {
    document.getElementById(id).classList.add("show");
    document.getElementById(id).classList.remove("hide");
}

function hide(id)  {
    document.getElementById(id).classList.add("hide");
    document.getElementById(id).classList.remove("show");
}