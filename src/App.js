import React, { useState, useEffect } from 'react';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import AddTodo from './MyComponents/AddTodo';
import Footer from './MyComponents/Footer';
import { About } from './MyComponents/About';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

function App() {

    let initTodo = [];
    if (localStorage.getItem('todos')) initTodo = (JSON.parse(localStorage.getItem('todos')));

    const [todos, setTodos] = useState(initTodo);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title, desc) => {
        let sno = Math.round((Math.random() * 1000000000));
        setTodos([...todos, {
            sno: sno,
            title: title,
            desc: desc
        }]);
    }

    const onDelete = (todo) => {
        setTodos(todos.filter((cur) => {
            return cur !== todo;
        }));
    };

    return (
        <>
            <Router>
                <Header title="My Todos List" searchBar={false} />

                <Switch>
                    <Route exact path="/" render={() => {
                        return (
                            <>
                                <AddTodo addTodo={addTodo} />
                                <Todos todos={todos} onDelete={onDelete} />
                            </>
                        );
                    }} />
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>

                <Footer />
            </Router>
        </>
    );
};

export default App;
