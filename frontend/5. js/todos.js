
function main(){
    let todos = [];
    function todoList(){
        let todoStr = "";
        todos.forEach(function(todo){
            todoStr += todo + "\n";
        })
        // for(let i = 0; i<todos.length; i++){
        //     console.log(todos[i]);
        //     todoStr += todos[i] + "\n"
        // }
        return todoStr;
    }

    function alertTodoList(){
        console.log(todos);
        if(todos.length > 0){
            let tl = todoList()
            console.log(tl);
            let alertString = "Here's your todo list:\n" + tl;
            console.log(alertString)
            alert(alertString);
        }
        else{
            alert("You have no todos")
        }
    }
    var command = prompt("What would you like to do?");
    while(command !== "quit"){
        if(command === "n"){
            let newTodo = prompt("What would you like to add to your todos?")
            todos.push(newTodo);
            console.log(todos);
        } else if (command === "l") {
            alertTodoList(todos);
        }
        else if (command === "q"){
            alertTodoList(todos);
            return;
        }
        else{
            alert("Please enter a valid command next time...")
        }
        command = prompt("What would you like to do?")
    }
}







$(document).ready(main);