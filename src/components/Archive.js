import React from 'react';

const Archive = (props) => {
  const {todosArchive, showArchive} = props.state;
  const {handleDelete, handleAddArchive} = props;

  return (
    <div className={showArchive ? "container-archive " :"hide"}>
      <ul className="archive-list">
        {todosArchive.map((item,index) => 
          <li key={item.id +''+index} className="archive-list__item">
            <span class="archive-list__text">{item.text}</span>
            <button className="todo__item--cross"
              onClick={() => handleDelete(item.id)}
            >
              X
            </button>
          </li>
        )}
      </ul>
      <div>
          <button 
            className="container-archive__button"
            onClick={() => handleAddArchive()}
          >
             &#8249;
          </button>
      </div>
    </div>
  );
}

export default Archive;