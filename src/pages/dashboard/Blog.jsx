import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Integration from '../../features/blog'

function InternalPage(){
    document.title = "SI Jurnal - Blog";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Blog"}))
      }, [])
      
    return(
        <Integration />
    )
}

export default InternalPage