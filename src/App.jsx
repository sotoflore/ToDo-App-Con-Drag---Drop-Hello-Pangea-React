import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react'

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
    { id:1, text: 'Aprender React.js'},
    { id:2, text: 'Aprender JavaScript'},
    { id: 3, text: 'Aprender Vue.js' },
    { id: 4, text: 'Aprender Angular' },
    { id: 5, text: 'Aprender Nodejs' },
    ]
const App = () => {

  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const handleDragEnd = result => { 
      if(!result.destination) return;
      console.log(result);

      const startIndex = result.source.index
      const endIndex = result.destination.index

      const copyArray =  [...todos];
      const [reorderedItem] = copyArray.splice(startIndex, 1);

      copyArray.splice(endIndex, 0, reorderedItem);
      
      setTodos(copyArray);
  }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-8">
            <div className="bg-gray-800 shadow-md rounded-lg w-full max-w-md p-6 border border-gray-700">
                <h1 className="text-2xl text-center mb-6 font-black text-purple-600">Todo App</h1>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todos">
                        {(droppableProvider) => (
                            <ul
                                className="space-y-4"
                                ref={droppableProvider.innerRef}
                                {...droppableProvider.droppableProps}
                            >
                                {todos.map((todo, index) => (
                                    <Draggable
                                        key={todo.id}
                                        index={index}
                                        draggableId={`${todo.id}`}
                                    >
                                        {(draggableProvider) => (
                                            <li
                                                ref={draggableProvider.innerRef}
                                                {...draggableProvider.draggableProps}
                                                {...draggableProvider.dragHandleProps}
                                                className="border border-gray-700 text-green-600 font-bold p-4 rounded-md shadow-lg cursor-move flex items-center justify-between"
                                            >
                                                <span>{todo.text}</span> <span>:::</span>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvider.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
