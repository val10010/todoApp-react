import React from 'react';

const MainList = (props) => {
  const {todos} = props.state;
  const {handleDelete, handleChecked} = props;

  return (
      <ul className="todo__block">
        {todos.map(item => 
          <li key={item.id} className={"todo__item " + (item.addStyleList)}>
            <span  className="todo__item--completed" 
              onClick={() => handleChecked(item.id)}
            >
            <i className={!item.checked ? "hide" : ''}> &#10004;</i>
            </span>
            <span className={item.checked ? "completed todo__item__text" : "todo__item__text"}> 
              {item.text} 
            </span>   
            <button className="todo__item--cross"
              onClick={() => handleDelete(item.id)}
            >
              X
            </button>
         </li>
        )}
      </ul>
  );
}

export default MainList;