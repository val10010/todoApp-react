import React from 'react';
import MainList from './MainList';
import Archive from './Archive';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todosArchive: [],
      showArchive: false,
    }
    this.newInputValue = '';
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddArchive = this.handleAddArchive.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  getRandomKey () {
    let key = new Date();
     return key.getHours()+ '' + key.getMinutes()+ '' + key.getSeconds();
  }

 handleClick() { 
 let value = this.newInputValue.value.trim();
  if(!value) return;
    this.setState(({todos}) => {
    let copyTodos = [...todos];
      let newTodo = {
        id: this.getRandomKey(),
        text: this.newInputValue.value,
        checked: false,
        addStyleList: ''
      };
      this.newInputValue.value = '';

      return {
        todos: [ ...copyTodos, newTodo ],
      }
    });
  }

  handleChecked(id) {
    this.setState(({todos})=> {
      let copyTodos = [...todos];
      let selectedItem = copyTodos.find(obj => {
        if (obj.id === id ) {
          return obj;
        } 
        return false;
      })
      selectedItem.checked = !selectedItem.checked;

      return {
        todos: [...copyTodos]
      }
    });
  }

  handleDelete(id) {
    this.setState(({todos, todosArchive}) => {
      const newTodos = todos.filter(item => item.id !== id);
      const newTodosArchive = todosArchive.filter(item => item.id !== id);
      return {
        todos: newTodos,
        todosArchive: newTodosArchive
      }
    });
  }

  handleFilter(elem) {
  const {todos} = this.state;
  let copyTodos = [...todos];
  let newTodos = [];

    switch (elem){
      case 'All':
      newTodos = copyTodos.map((item) => {
        item.addStyleList = '';
        return item;
      })
      break;
      case 'Active': 
      newTodos = copyTodos.map((item) => {
        item.addStyleList = '';
       if(item.checked){
         item.addStyleList = 'hide';
         return item;
       } 
       return item;
      })
      break;
      case 'Completed': 
      newTodos = copyTodos.map((item) => {
        item.addStyleList = '';
        if(!item.checked){
          item.addStyleList = 'hide';
          return item;
        } 
        return item;
       })
      break;
      default: 
      break;
  } 
  this.setState({
    todos: newTodos
  })
  }

  handleAddArchive() {
  this.setState(({todos, showArchive, todosArchive}) => {
    let newTodosArchive = todos.filter(item => item.checked);
    let newTodos = todos.filter(item => !item.checked);
    return {
      todos: newTodos,
      todosArchive: [...newTodosArchive, ...todosArchive],
      showArchive: newTodosArchive.length > 0 ? true : false,
    }
   });
  }

  renderFilterElement() {
    const filterItem = ['All', 'Active', 'Completed'];
    return ( 
      filterItem.map((elem,index) => (
        <button key={index} className="container-filter__item"
        onClick={() => this.handleFilter(elem)}
        >
        {elem}
      </button>
      ))
    );
  }

  render() {

    return (
      <div> 
        <div className="container-filter">
          {this.renderFilterElement()}
        </div>
        <div className="container-buttonArchive">
        <button 
          className="button-archive"
          onClick={() => this.handleAddArchive()} 
        >
          <span>Add in archive</span>
        </button>
        </div>
        <div className="container-list">
            <MainList 
              handleChecked={this.handleChecked}
              handleDelete={this.handleDelete}
              handleAddArchive={this.handleAddArchive}
              state={this.state}
            />
        </div>
            <Archive 
              state={this.state} 
              handleDelete={this.handleDelete}
              handleAddArchive={this.handleAddArchive}
            />
        <input type="text" className="todo__input" 
          ref={(element)=> this.newInputValue = element}
          placeholder="Enter your todo:"
        />
        <button className="todo__button" 
          onClick={(event) => this.handleClick(event.target)}>
          Add
      </button>
      </div>
    );
  }
}


export default Todo;