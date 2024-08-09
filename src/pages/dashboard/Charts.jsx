import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Charts from '../../features/charts'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    document.title = "SI Jurnal - Jurnal";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Analytics"}))
      }, [])


    return(
        <Charts />
    )
}

export default InternalPage