import { memo } from 'react'
import CommentsItem from '../comments-item';
import './style.css'

function Comments({comments, t, count, addComment, isAuth, onReply, cancelReply}) {

  return (
    <>
      <h2 className="Comments-title">
        {t("comments.title")} ({count})
      </h2>

      {
        comments.map(item=>(
          <CommentsItem
            item={item}
            addComment={addComment}
            onReply={onReply}
            cancelReply={cancelReply}
            isAuth={isAuth}
            key={item._id}
            t={t}
          />
        ))
      }
    </>
  );
}

export default memo(Comments);