export default {

  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/load-start'})

      try {
        let res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),
                  parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        })

        res.data.result.items = res.data.result.items.map(item=>(
            item = {
              ...item,
              isReply: false
            }
          )
        )

        dispatch({type:'comments/load-success', payload: {data: res.data.result}})

      } catch(e){
        dispatch({ type: 'comments/load-error' });
      }

    }
  },

  add: (text, parentId, type) => {
    return async (dispatch, getState, services) => {

      try {
        let res = await services.api.request({
          url:'/api/v1/comments?lang=ru&fields=%2A',
          method:'POST',
          body: JSON.stringify({
            "text": text,
            "parent": {
              "_id": parentId,
              "_type": type
            }
          })
        })

        const resAuthor = await services.api.request({
          url:`/api/v1/users/${res.data.result.author._id}?fields=profile(name)`
        })

        res.data.result.author = {
          ...res.data.result.author,
          ...resAuthor.data.result
        }

        dispatch({
          type:'comments/add-success',
          payload: {
            data: res.data.result,
          }
        })

      } catch (e){
        console.log(e)
      }
    }

  },

  openReply: (id)=> {
    return (dispatch, getState) => {

      const list = getState().comments.data

      const data = list.map(item=>{
        if(item._id === id){
          return item = {
            ...item,
            isReply: true
          }

        } else if (item.isReply === true && item._id !== id){
          return item = {
            ...item,
            isReply: false
          }

        } else {
          return item
        }
      })

      dispatch({type: 'comments/open-reply', payload: { data: data}})
    }

  },

  closeReply: (id )=> {
    return (dispatch, getState) => {

      const list = getState().comments.data

      const data = list.map(item=>{
        if(item._id === id){
          return item = {
            ...item,
            isReply: false
          }

        } else {
          return item
        }
      })

      dispatch({type: 'comments/close-reply', payload: { data: data}})
    }

  }

};