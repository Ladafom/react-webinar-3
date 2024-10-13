import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

function NewComment({t, isAuth, addComment, parentId, type, cancelReply, lang}) {

    const [text, setText] = useState('')

  function onSendComment(text, parentId,type){
    if(text.trim().length ) {
      setText(t('comments.placeholder'))
      cancelReply(parentId)
      addComment(text, parentId, type )
    }
  }

  if(isAuth) {
    return (
      <div className={`NewComment ${type === 'article'? '' : 'NewComment_padding'}`}>
        <strong>
          {
            type === 'comment' &&
            t('comments.new.answer')
          }
          {
            type === 'article' &&
            t('comments.new')
          }
        </strong>

        <textarea className='NewComment-textarea'
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
      <div className={ `NewComment-notAuth ${lang === 'en' ? 'NewComment_gap':''} ${type === 'article'? '' : 'NewComment_padding'}`} >
        <Link to='/login' state={{ back: location.pathname }}>
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