import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DataSekolah from '../../features/DataSekolah/Sekolah'

function InternalPage(){
    document.title = "SI Jurnal - Data Sekolah";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Data Sekolah"}))
      }, [])


    return(
        <DataSekolah />
    )
}

export default InternalPage