window.onload = function(){
    document.getElementById('new-todo').onkeypress = function(event){
        //console.log(event.keyCode);
        if(event.keyCode===13){
            addTodo(event.target.value);
        }
    };
    
    document.getElementById('clear-completed').onclick = function(){
        TODO_APP.delChecked;      
    };
};

function addTodo(text){
    var todo = TODO_APP.addTodo(text);
    
    var li = document.createElement('li');
    li.id = 'todo_'+todo.getId;
       
        var check = document.createElement("input");
        check.type = 'checkbox';
        check.onclick = function(){
            todo.setChecked(!todo.getChecked());            
            render();
        };
        
        var text = document.createElement('input');
        text.type = 'text';
        text.value = todo.getText();
        
        var button = document.createElement('button');
            button.onclick=function(){
            TODO_APP.delTodo(todo.getId);
            document.getElementById('todos').removeChild(li);
            render();
        };
        
    
    li.appendChild(check);    
    li.appendChild(text);
    li.appendChild(button);
    document.getElementById('todos').appendChild(li);
    render();

}

function render(){
    var itemsLeft = document.getElementById('items-left');
    var clearCompleted = document.getElementById('clear-completed');
    
    if(TODO_APP.countTodos()>0){
        itemsLeft.style.display = 'block';
        itemsLeft.innerHTML = TODO_APP.itemsLeft() + 'Item' +(TODO_APP.itemsLeft()!==1?'s':'')+' left';
    }else{
        itemsLeft.sytle.display = 'none';
    }
    
    if(TODO_APP.countTodos() - TODO_APP.itemsLeft()>0){
        clearCompleted.style.display='block';
        clearCompleted.innerHTML='Clear completed ('+(TODO_APP.countTodos()-TODO_APP.itemsLeft())+')';
    }else{
        clearCompleted.style.display='none';
    }
}
