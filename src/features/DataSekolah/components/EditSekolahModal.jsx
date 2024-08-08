import { useState, useEffect } from "react";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

function EditUserModalBody({ closeModal, school, fetchUserData }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState({
        nama: "",
        alamat: "",
        nama_pembimbing: "",
        no_hp: "",
    });
    const [schools, setSchools] = useState([]); // Ensure this state is defined

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get('http://127.0.0.1:8000/api/admin/sekolah', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSchools(response.data.data.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
                setErrorMessage('Failed to load schools');
            }
        };

        fetchSchools();
    }, []);

    useEffect(() => {
        if (school) {
            setUserObj({
                nama: school.nama || "", // Ensure the key names match
                alamat: school.alamat || "",
                nama_pembimbing: school.nama_pembimbing || "",
                no_hp: school.no_hp || "",
            });
        }
    }, [school]);

    const saveChanges = async () => {
        setLoading(true);
        try {
            // Update user data
            const requiredFields = ['nama', 'alamat', 'nama_pembimbing', 'no_hp'];
            for (const field of requiredFields) {
                if (!userObj[field]) {
                    setErrorMessage(`${field} is required!`);
                    setLoading(false);
                    return;
                }
            }

            const params = new URLSearchParams();
            Object.keys(userObj).forEach(key => {
                if (userObj[key]) {
                    params.append(key, userObj[key]);
                }
            });

            const token = Cookies.get('token');
            await axios.patch(`http://127.0.0.1:8000/api/admin/sekolah/${school.id}`, params, { // Adjusted to use `school.id`
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                title: 'Success!',
                text: 'Data updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                fetchUserData();  // Call the function to refetch data
                closeModal();
            });
        } catch (error) {
            console.error('Error saving changes:', error.response ? error.response.data : error.message);
            setErrorMessage('Failed to save changes');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save changes',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setUserObj(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Edit Data Sekolah</h3>
            <InputText type="text" value={userObj.nama} name="nama" containerStyle="mt-4" labelTitle="Nama Sekolah" onChange={updateFormValue} />
            <InputText type="text" value={userObj.alamat} name="alamat" containerStyle="mt-4" labelTitle="Alamat" onChange={updateFormValue} />
            <InputText type="text" value={userObj.nama_pembimbing} name="nama_pembimbing" containerStyle="mt-4" labelTitle="Nama Pembimbing" onChange={updateFormValue} />
            <InputText type="number" value={userObj.no_hp} name="no_hp" containerStyle="mt-4" labelTitle="Nomor Handphone" onChange={updateFormValue} />
            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action mt-4">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveChanges()} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default EditUserModalBody;
