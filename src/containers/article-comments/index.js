import { useCallback, memo, useEffect } from 'react'
import Comments from "../../components/comments";
import NewComment from "../../components/new-comment";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import { useSelector as useSelectorRedux } from 'react-redux';
import commentsActions from'../../store-redux/comments/actions'
import { useDispatch } from 'react-redux';
import shallowequal from 'shallowequal';
import commentsToTree from '../../utils/comments-to-tree';
import './style.css'

function ArticleComments(props) {

  const dispatch = useDispatch()

  const select = useSelector(state => ({
    isAuth: state.session.exists,
    userId: state.session.user._id
  }));
  const selectRedux = useSelectorRedux(
    state => ({
      count: state.comments.count,
      comments: state.comments.data,
      isReply: state.comments.isReply
    }),
    shallowequal,
  );

  const nestedComments = commentsToTree(selectRedux.comments)

  const callbacks = {
    sendComment: useCallback((text, parentId, type) => dispatch(commentsActions.add(text, parentId, type))),

    openReply: useCallback((id)=> dispatch(commentsActions.openReply(id))),

    closeReply: useCallback((id) => dispatch(commentsActions.closeReply(id)))
  }

  useEffect(()=>{
    return (
      callbacks.closeReply()
    )
  },[])

  const { t, lang } = useTranslate();

  return (
    <div className='ArticleComments'>
      <Comments
        comments={nestedComments}
        count={selectRedux.count}
        isAuth={select.isAuth}
        addComment={callbacks.sendComment}
        cancelReply={callbacks.closeReply}
        onReply={callbacks.openReply}
        t={t}
        lang={lang}
        currentUserId={select.userId}
      />
      {
        selectRedux.isReply &&
        <NewComment
          t={t}
          isAuth={select.isAuth}
          addComment={callbacks.sendComment}
          parentId={props.parentId}
          type={'article'}
          cancelReply={callbacks.closeReply}
          lang={lang}
        />
      }
    </div>
  );
}

export default memo(ArticleComments);