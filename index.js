

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.innerHTML);
    // event.dataTransfer.setData("taskId", event.target.id);
    event.target.classList.add('dragging');

}



function drop(event) {
    event.preventDefault();
    
    const dropTarget = event.target;

    // If the drop target is a column (not the title)
    if (dropTarget.classList.contains('column')) {
        appendTask(event,dropTarget);
    } else if (dropTarget.parentNode.classList.contains('column')) {
        // If the drop target is a child of the column (like the title), append to the column
        const column = dropTarget.parentNode;
        appendTask(event,column);
    }
}

function appendTask(event,column) {
    const data = event.dataTransfer.getData("text");
    // const taskId = event.dataTransfer.getData("taskId");
    
    // Create a new task element
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.draggable = true;
    newTask.innerHTML = data;
    // newTask.id = taskId; // You can assign a unique ID if needed
    newTask.ondragstart = drag;

    // Append the new task to the column
    column.appendChild(newTask);
}

// Remove the dragging class when the drag ends
document.addEventListener('dragend', function(event) {
    event.target.classList.remove('dragging');
});
