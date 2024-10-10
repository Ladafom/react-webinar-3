import { useState, memo } from 'react'
import NewComment from '../new-comment'
import './style.css'

function CommentsItem({item, t, isAuth, addComment, onReply, cancelReply}) {

  const dateString = new Date(item.dateCreate)

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:'numeric',
    minute:'numeric'
  }

  return (
    <div
      key={item._id}
      className='CommentsItem'
    >
      <div className='CommentsItem-nest'>
        <div className='CommentsItem-info'>
          <strong className='CommentsItem-userName'>
            {item.author?.profile?.name}
          </strong>
          <p className='CommentsItem-date'>
            {dateString.toLocaleDateString('ru-RU', dateOptions).replace(/\s*г\./, "")}
          </p>
        </div>
        <p className='CommentsItem-text'>
          {item.text}
        </p>
        <button
          className='CommentsItem-btn'
          onClick={()=>onReply(item._id)}
        >
          {t('comments.reply')}
        </button>
        {
          item.isReply &&
          <NewComment t={t} isAuth={isAuth} addComment={addComment} parentId={item._id} type={'comment'} cancelReply={cancelReply}/>
        }
      </div>

      {
        item.children.map(i=>(
          <CommentsItem
            item={i}
            key={i._id}
            t={t} isAuth={isAuth}
            addComment={addComment}
            onReply={onReply}
            cancelReply={cancelReply}
          />
        ))
      }

    </div>
  );
}

export default memo(CommentsItem);