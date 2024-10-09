import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function NewComment({t, isAuth, addComment, parentId, type, cancelReply}) {

  const [text, setText] = useState('')

  function onSendComment(text, parentId,type){
    if(text.length) {
      setText('')
      cancelReply(parentId)
      addComment(text, parentId, type )
    }
  }

  if(isAuth) {
    return (
      <div className='NewComment'>
        <strong>
          {t('comments.new')}
        </strong>

        <textarea className='NewComment-textarea'
          placeholder={t('comments.placeholder')}
          onInput={(e)=>setText(e.target.value)}
          value={text}
        >
        </textarea>

        <div className='NewComment-btns'>
          <button
            onClick = {()=>onSendComment(text, parentId, type )}
          >
            {t('comments.send')}
          </button>
          {
            type === 'comment' &&
            <button
              onClick = {()=>cancelReply( parentId )}
            >
              {t('comments.cancel')}
            </button>
          }
        </div>
      </div>
    );
  }

  if(!isAuth){
    return (
      <div className='NewComment-notAuth' >
        <Link to='/login'>
          {t('comments.login')}
        </Link>
        <p>
          {
            type === 'article' ?
              t('comments.notAuth')
              :
              t('comments.notAuth.reply')
          }
        </p>
        {
          type === 'comment' &&
          <button
            className={'NewComment-notAuth-cancelBtn'}
            onClick = {()=>cancelReply( parentId )}
          >
            {t('comments.cancel')}
          </button>
        }
      </div>
    )
  }
}

export default memo(NewComment);