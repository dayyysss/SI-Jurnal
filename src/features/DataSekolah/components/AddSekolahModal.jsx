// AddUserModalBody.jsx
import { useState } from "react";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

function AddUserModalBody({ closeModal, onUserAdded }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState({
        nama: "",
        alamat: "",
        nama_pembimbing: "",
        no_hp: "",
    });

    const saveNewUser = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            Object.keys(userObj).forEach(key => {
                formData.append(key, userObj[key]);
            });

            const token = Cookies.get('token');

            await axios.post('http://127.0.0.1:8000/api/admin/sekolah', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            Swal.fire({
                title: 'Sukses!',
                text: 'Pengguna Berhasil Ditambahkan!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                setUserObj({
                    nama: "",
                    alamat: "",
                    nama_pembimbing: "",
                    no_hp: "",
                });
                onUserAdded(); // Memanggil callback setelah pengguna berhasil ditambahkan
                closeModal();
            });
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage('Failed to add user');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add user',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = (e) => {
        const { name, value } = e.target; // Perbaiki nama properti
        setErrorMessage("");
        setUserObj(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Tambah Data Sekolah</h3>
            <InputText type="text" value={userObj.nama} name="nama" containerStyle="mt-4" labelTitle="Nama Sekolah" onChange={updateFormValue} />
            <InputText type="text" value={userObj.alamat} name="alamat" containerStyle="mt-4" labelTitle="Alamat" onChange={updateFormValue} />
            <InputText type="text" value={userObj.nama_pembimbing} name="nama_pembimbing" containerStyle="mt-4" labelTitle="Nama Pembimbing" onChange={updateFormValue} />
            <InputText type="number" value={userObj.no_hp} name="no_hp" containerStyle="mt-4" labelTitle="Nomor Handphone" onChange={updateFormValue} />
            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action mt-4">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewUser()} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default AddUserModalBody;
