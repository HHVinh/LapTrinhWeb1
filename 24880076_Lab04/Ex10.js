function addItem() {
    var item = document.getElementById("item");
    if (item.value != "") {
        var ul = document.getElementById("todolist");
        var li = document.createElement("li");

        li.innerHTML = item.value + " (<a href='#' onclick='delItem(this.parentNode)'>Remove</a>)";
        ul.appendChild(li);
        item.value = "";
        return true;
    }
}

function delItem(li) {
    var ul = li.parentNode;
    ul.removeChild(li);
}