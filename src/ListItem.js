import React, { useState } from 'react';
import { store } from './index';
import { plural } from './utils';

function ListItem({item}) {

  const [selectedNum, setSelectedNum] = useState(0)
  const forms = ['раз', 'раза'];

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
        <div className="Item-title">{item.title}
          {
            selectedNum !== 0 &&
            ` | Выделяли ${selectedNum} ${plural(forms, selectedNum)}`
          }
        </div>
        <div className="Item-actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default ListItem;