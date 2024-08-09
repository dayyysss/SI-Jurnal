import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DataUser from '../../features/DataUser/Users'

function InternalPage(){
    document.title = "SI Jurnal - Data User";
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Data User"}))
      }, [])


    return(
        <DataUser />
    )
}

export default InternalPage