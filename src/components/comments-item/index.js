import { useState, memo} from 'react'
import NewComment from '../new-comment'
import './style.css'

function CommentsItem({item, t, isAuth, addComment, onReply, cancelReply, lang, currentNest, currentUserId}) {

  const dateString = new Date(item.dateCreate)
  const isCurrentUser = currentUserId === item.author._id

  const maxNesting = 7

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:'numeric',
    minute:'numeric'
  }

  const scrollTo = (ref) => {
    if(ref){
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div
      key={item._id}
      className={currentNest <= maxNesting && currentNest !==0? 'CommentsItem' : ''}
    >
      <div className='CommentsItem-nest'>
        <div className='CommentsItem-info'>
          <strong className={`CommentsItem-userName ${isCurrentUser ? 'CommentsItem-userName_auth' : ''}`}
          >
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
      </div>

      {
        item.children.map(i=>{
          ++currentNest
          return(
            <CommentsItem
              item={i}
              key={i._id}
              t={t} isAuth={isAuth}
              addComment={addComment}
              onReply={onReply}
              cancelReply={cancelReply}
              lang={lang}
              currentNest={currentNest}
              currentUserId={currentUserId}
            />
          )
        })
      }
      {
        item.isReply &&
        <div ref={scrollTo}>
          <NewComment t={t} isAuth={isAuth} addComment={addComment} parentId={item._id} type={'comment'} cancelReply={cancelReply} lang={lang}/>
        </div>
      }

    </div>
  );
}

export default memo(CommentsItem);