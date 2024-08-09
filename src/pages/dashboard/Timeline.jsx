import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Calendar from '../../features/timeline'

function InternalPage(){
    document.title = "SI Jurnal - Timeline";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Calendar"}))
      }, [])


    return(
        <Calendar />
    )
}

export default InternalPage