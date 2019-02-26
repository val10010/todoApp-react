import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    }
  }

  render() {
    return (
      <div> 

        <div className="container-list">
          <Todo.List/>
        </div>
        <p>Enter your text:</p>
        <input type="text" className="todo__input"/>
        <button className="todo__button">Add</button>
      </div>
    );
  }
}

Todo.List = () => {
  return (
    <ul>

    </ul>
  );

}

export default Todo;