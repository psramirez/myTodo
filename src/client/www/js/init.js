window.onload = function(){
    document.getElementById('new-todo').onkeypress = function(event){
        //console.log(event.keyCode);
        if(event.keyCode===13){
            addTodo(event.target.value);
        }
    };
    
    document.getElementById('clear-completed').onclick = function(){
        delChecked();    
    };
    
     document.getElementById('check-all').onclick = function() {
         var state = TODO_APP.itemsLeft() > 0;
         checkAll(state);
     };
     
     window.onhashchange = function(){
         //console.log(window.location.hash);
         var pattern = "#/";
        var pos = window.location.hash.indexOf(pattern);
        var filter = window.location.hash.substring(pos + pattern.length);

        TODO_APP.filterTodos(filter);
        render();
     };
};

function addTodo(text){
    var todo = TODO_APP.addTodo(text);
    
    var li = document.createElement('li');
    li.id = 'todo_' + todo.getId();
       
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

function delChecked(){
    TODO_APP.delChecked();
    var todos = document.getElementById('todos');
    //RECORRER HIJOS
    var i = todos.children.length -1;
    for(i;i>=0;i--){
        var li = todos.children[i];
        var check = li.children[0];
        if(check.checked){
            todos.removeChild(li);
        }
    }
    render();
}

function checkAll(state) {
     TODO_APP.checkAll(state);
     var todos = document.getElementById('todos');
     var i = todos.children.length - 1;
     for (; i >= 0; i--) {
         var li = todos.children[i];
         var check = li.children[0];
         check.checked = state;
     }
     render();
 }

function render(){
    var itemsLeft = document.getElementById('items-left');
    var clearCompleted = document.getElementById('clear-completed');
    
    //MOSTRAR CONTADOR DE TAREAS PENDIENTES
    if(TODO_APP.countTodos()>0){
        itemsLeft.style.display = 'block';
        itemsLeft.innerHTML = TODO_APP.itemsLeft() + 'Item' +(TODO_APP.itemsLeft()!==1?'s':'')+' left';
    }else{
       itemsLeft.style.display = 'none';
    }
    
    //MOSTRAR BOTON DE BORRAR TAREAS COMPLETADAS
    if(TODO_APP.countTodos() - TODO_APP.itemsLeft()>0){
        clearCompleted.style.display='block';
        clearCompleted.innerHTML='Clear completed ('+(TODO_APP.countTodos()-TODO_APP.itemsLeft())+')';
    }else{
        clearCompleted.style.display='none';
    }
    
    //FILTRAR POR ESTADO DE TAREAS
    var todos = document.getElementById('todos');
    var i = 0;
    for (; i < todos.children.length; i++) {
        var li = todos.children[i];
        var regExp = /^todo_([0-9]+)$/;
        var match = li.id.match(regExp);
        if (match && match.length > 0) {
            var id = match[1];
            var todo = TODO_APP.getTodo(id);
            if (todo) {
                if (todo.isVisible()) {
                    li.style.display = 'block';
                } else {
                    li.style.display = 'none';
                }
            }
        }


    }
}
