import { Trash } from 'phosphor-react'

import styles from './Task.module.css';

interface Task {
    id: string;
    content: string;
    isDone: boolean;
    onChangeIsDone: (content: string) => void;
    onDeleteTask: (content: string) => void;
}

export function Task({ id, content, isDone, onChangeIsDone, onDeleteTask }: Task) {

    function handleChangeIsDone() {
        onChangeIsDone(id);
    }

    function handleDeleteTask() {
        onDeleteTask(id);
        console.log(id)
    }

    return(
        <div className={`${styles.task} ${content === '' ? styles.noContent : null}`}>
            <div className={`${styles.content} ${isDone ? styles.contentCheck : styles.contentUncheck}`}>
            <div onClick={handleChangeIsDone} className={`${styles.radio} ${isDone ? styles.radioCheck : styles.radioUncheck}`}></div>
            <span>{content}</span>
            </div>

            <Trash onClick={handleDeleteTask} className={styles.delete}/>
        </div>
    )
}