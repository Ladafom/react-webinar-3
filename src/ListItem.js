import React, { useState } from 'react';

function ListItem({item, store}) {

  const [selectedNum, setSelectedNum] = useState(0)

  function onSelect(code){
    store.selectItem(code)
    if(item.selected){
      setSelectedNum(selectedNum+1)
    }
  }

  return (
    <div key={item.code} className="List-item">
      <div
        className={'Item' + (item.selected ? ' Item_selected' : '')}
        onClick={() => onSelect(item.code)}
      >
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">{item.title}</div>
        {
          selectedNum !== 0 &&
          <div className="Item-selected-num"> Выделяли {selectedNum} раз(а)</div>
        }
        <div className="Item-actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;