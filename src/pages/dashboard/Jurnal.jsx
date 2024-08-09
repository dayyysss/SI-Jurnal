import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Jurnal from '../../features/jurnal/Jurnal'
import { setPageTitle } from '../../features/common/headerSlice'

function InternalPage(){
    document.title = "SI Jurnal - Jurnal";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Jurnal"}))
      }, [])


    return(
        <Jurnal />
    )
}

export default InternalPage