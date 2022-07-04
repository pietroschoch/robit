import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header'
import { PlusCircle } from 'phosphor-react'
import { Task } from './components/Task'
import { useState, FormEvent, ChangeEvent, MouseEvent} from 'react'
import listIcons from './assets/list.svg'
import './global.css'
import styles from './App.module.css'

interface Task {
  id: string;
  content: string;
  isDone: boolean;
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [newTask, setNewCommentTask] = useState('')


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();


    let newTaskAdder = {
      id: uuidv4(),
      content: newTask,
      isDone: false,
    }


    setTasks([...tasks, newTaskAdder]);
    setNewCommentTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.setCustomValidity(''))
    setNewCommentTask(event.target.value);
  }

  function onChangeIsDone(id: string) {
    let tasksWithoutChangedOnes = tasks.filter(task => {
      return task.id !== id;
    })

    let taskThatWillBeChanged = tasks.filter(task => {
      return task.id === id;
    })

    let treatedNewTasks = taskThatWillBeChanged.map(task => ({
      id: task.id,
      content: task.content,
      isDone: task.isDone ? false : true,
    }))

    setTasks([...tasksWithoutChangedOnes, ...treatedNewTasks])  

  }

  function onDeleteTask(id: string) {
    let tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })

    setTasks([...tasksWithoutDeletedOne])  

  }

  let QtyDoneTasks = tasks.reduce((total, task) => {
    if (task.isDone === true) return total += 1;
    else return total}, 0
  )
  
  const isNewTaskEmpty = newTask.length === 0

  return (
    <div>
      <Header />
      
      <form className={styles.adder} onSubmit={handleCreateNewTask} action="">
            <input value={newTask} onChange={handleNewTaskChange} placeholder="Adicione uma nova tarefa" type="text" />
            <button disabled={isNewTaskEmpty} type="submit">
                Criar
                <PlusCircle size={16} />
            </button>
      </form>

      <main>
        <div className={styles.infos}>
          <div>
          <span>Tarefas criadas</span>
          <p>{tasks.length}</p>
          </div>

          <div>
          <span>Tarefas concluidas</span>
          <p>{`${QtyDoneTasks} de ${tasks.length}`}</p>
          </div>
        </div>

        {tasks.length === 0 ? 
          <div className={styles.noContent}>
            <img src={listIcons} alt="noContent" />
            <span>Você ainda não tem tarefas cadastradas</span>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        : tasks.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              content={task.content}
              isDone={task.isDone}
              onChangeIsDone={onChangeIsDone}
              onDeleteTask={onDeleteTask}
            />
          )
        })}
       
      </main>

      
    </div>
  )
}
 
export default App
