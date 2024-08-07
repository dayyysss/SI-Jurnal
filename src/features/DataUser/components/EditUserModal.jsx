import { useState } from "react";
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
    image: "" // Added field for profile image
};

function AddUserModalBody({ closeModal }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Preview image or handle file
            setImageFile(file);
            // Optionally you can upload the image here or later
        }
    };

    const saveNewUser = async () => {
        if (userObj.name.trim() === "") return setErrorMessage("Name is required!");
        if (userObj.email.trim() === "") return setErrorMessage("Email is required!");
        // Add more validation checks as needed

        try {
            setLoading(true);

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('name', userObj.name);
            formData.append('email', userObj.email);
            formData.append('school_id', userObj.school_id);
            formData.append('nomor_induk', userObj.nomor_induk);
            formData.append('jurusan', userObj.jurusan);
            formData.append('kelas', userObj.kelas);
            formData.append('gender', userObj.gender);
            formData.append('alamat', userObj.alamat);
            formData.append('nama_ortu', userObj.nama_ortu);
            formData.append('alamat_ortu', userObj.alamat_ortu);
            formData.append('no_hp_ortu', userObj.no_hp_ortu);

            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Replace with your API endpoint for adding a user
            await axios.post('http://127.0.0.1:8000/api/admin/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            closeModal(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error adding user:', error);
            setErrorMessage('Failed to add user');
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
            <h3 className="text-lg font-bold mb-4">Tambah Data User</h3>
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
                <button className="btn btn-primary px-6" onClick={() => saveNewUser()} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default AddUserModalBody;
