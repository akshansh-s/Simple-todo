let globalId = 1;
    let todoState = [];
    let oldTodoState = [];

    function addTodoToDom(newTodo) {
      const todoDiv = document.createElement('div');
      todoDiv.id = `todo-${newTodo.id}`;
      todoDiv.innerHTML = `
      <h3>${newTodo.title}</h3>
      <p>${newTodo.description}</p>
      <button onclick="deleteTodo(${newTodo.id})">Completed!</button>`;

      document.getElementById("todos").appendChild(todoDiv);
    }

    function deleteTodo(todoId) {
      // Filter out the todo item to be deleted
      todoState = todoState.filter(todo => todo.id !== todoId);
      // Update the state to reflect the deletion
      updateState(todoState);
    }

    function removeTodoFromDom(todoId) {
      const todoElement = document.getElementById(`todo-${todoId}`);

      if (todoElement) {
        todoElement.remove();
      }
    }

    function updateTodoInDom(oldTodo, newTodo) {
      const todoElement = document.getElementById(`todo-${oldTodo.id}`);
      if (todoElement) {
        todoElement.innerHTML = `
          <h3>${newTodo.title}</h3>
          <p>${newTodo.description}</p>`;
        }
    }

    function updateState(newTodos) {
      // calculate the diff b/w newTodos and oldTodos.
      // More specifically, find out what todos are - 
      // 1. added
      // 2. deleted
      // 3. updated
      const added = [];
      const deleted = [];
      const updated = [];

      //added
      for (let i = 0; i < newTodos.length; i++) {
        let isAdded=true;
        for (let j = 0; j < oldTodoState.length; j++) {
          if (newTodos[i].id === oldTodoState[j].id){
            isAdded=false;
          }
        }
        if (isAdded) {
          added.push(newTodos[i]);
        }
      }

      //deleted
      for (let i = 0; i < oldTodoState.length; i++) {
        let isDeleted=true;
        for (let j = 0; j < newTodos.length; j++) {
          if (oldTodoState[i].id === newTodos[j].id){
            isDeleted=false;
          }
        }
        if (isDeleted) {
          deleted.push(oldTodoState[i]);
        }
      }

      //update
      for (let i = 0; i < newTodos.length; i++) {
        for (let j = 0; j < oldTodoState.length; j++) {
          if (newTodos[i].id === oldTodoState[j].id && newTodos[i].title !== oldTodoState[j].title) {
            updated.push({ old: oldTodoState[j], new: newTodos[i] });
            break;
          }
          else if (newTodos[i].id === oldTodoState[j].id && newTodos[i].description !== oldTodoState[j].description){
            updated.push({ old: oldTodoState[j], new: newTodos[i] });
            break;
          }
        }
      }

     
      // calculate these 3 arrays
      // call addTodo, removeTodo, updateTodo functions on each of the elements
      added.forEach(todo => addTodoToDom(todo));
      deleted.forEach(todo => removeTodoFromDom(todo.id));
      updated.forEach(({ old, new: newTodo }) => updateTodoInDom(old, newTodo));
      oldTodoState = [...newTodos];

    }

    function addTodo() {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      todoState.push({
        title: title,
        description: description,
        id: globalId++,
      })
      updateState(todoState);
    }