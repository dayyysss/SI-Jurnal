import { useState, useEffect } from "react";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';

const INITIAL_USER_OBJ = {
    name: "",
    email: "",
    school_id: "",
    nomor_induk: "",
    jurusan: "",
    kelas: "",
    gender: "",
    alamat: "",
    nama_ortu: "",
    alamat_ortu: "",
    no_hp_ortu: "",
    image: ""
};

function AddUserModalBody({ closeModal, modalType, user }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (modalType === 'edit' && user) {
            setUserObj(user);
        } else {
            setUserObj(INITIAL_USER_OBJ);
        }
    }, [modalType, user]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const saveUser = async () => {
        if (userObj.name.trim() === "") return setErrorMessage("Name is required!");
        if (userObj.email.trim() === "") return setErrorMessage("Email is required!");

        try {
            setLoading(true);
            const formData = new FormData();
            Object.keys(userObj).forEach(key => formData.append(key, userObj[key]));
            if (imageFile) formData.append('image', imageFile);

            if (modalType === 'add') {
                await axios.post('http://127.0.0.1:8000/api/admin/users', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else if (modalType === 'edit') {
                await axios.put(`http://127.0.0.1:8000/api/admin/users/${userObj.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
            setErrorMessage('Failed to save user');
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setUserObj({ ...userObj, [updateType]: value });
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">{modalType === 'add' ? 'Tambah Data User' : 'Edit Data User'}</h3>
            <InputText type="text" defaultValue={userObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />
            <InputText type="email" defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.school_id} updateType="school_id" containerStyle="mt-4" labelTitle="Asal Sekolah" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.nomor_induk} updateType="nomor_induk" containerStyle="mt-4" labelTitle="Nomor Induk" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.jurusan} updateType="jurusan" containerStyle="mt-4" labelTitle="Jurusan" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.kelas} updateType="kelas" containerStyle="mt-4" labelTitle="Kelas" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.gender} updateType="gender" containerStyle="mt-4" labelTitle="Gender" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.alamat} updateType="alamat" containerStyle="mt-4" labelTitle="Alamat" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.nama_ortu} updateType="nama_ortu" containerStyle="mt-4" labelTitle="Nama Ortu" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.alamat_ortu} updateType="alamat_ortu" containerStyle="mt-4" labelTitle="Alamat Ortu" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={userObj.no_hp_ortu} updateType="no_hp_ortu" containerStyle="mt-4" labelTitle="No HP Ortu" updateFormValue={updateFormValue} />

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 border border-gray-300 rounded-md p-1" />
            </div>

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action mt-4">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveUser()} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default AddUserModalBody;
