import { useState, useEffect } from "react";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

function AddUserModalBody({ closeModal, onUserAdded }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        school_id: "",
        nomor_induk: "",
        jurusan: "",
        roles: "siswa",
        kelas: "",
        gender: "",
        alamat: "",
        nama_ortu: "",
        alamat_ortu: "",
        no_hp_ortu: "",
        image: ""
    });
    const [schools, setSchools] = useState([]);
    const [imageFile, setImageFile] = useState(null);

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const saveNewUser = async () => {
        if (userObj.name.trim() === "") return setErrorMessage("Name is required!");
        if (userObj.email.trim() === "") return setErrorMessage("Email is required!");

        try {
            setLoading(true);

            const formData = new FormData();
            Object.keys(userObj).forEach(key => {
                formData.append(key, userObj[key]);
            });

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const token = Cookies.get('token');

            await axios.post('http://127.0.0.1:8000/api/admin/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    school_id: "",
                    nomor_induk: "",
                    jurusan: "",
                    kelas: "",
                    roles: "siswa",
                    gender: "",
                    alamat: "",
                    nama_ortu: "",
                    alamat_ortu: "",
                    no_hp_ortu: "",
                    image: ""
                });
                setImageFile(null);
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
        const { name, value } = e.target;
        setErrorMessage("");
        setUserObj(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Tambah Data User</h3>
            <InputText type="text" value={userObj.name} name="name" containerStyle="mt-4" labelTitle="Name" onChange={updateFormValue} />
            <InputText type="email" value={userObj.email} name="email" containerStyle="mt-4" labelTitle="Email" onChange={updateFormValue} />
            <InputText type="password" value={userObj.password} name="password" containerStyle="mt-4" labelTitle="Password" onChange={updateFormValue} />
            <InputText type="password" value={userObj.password_confirmation} name="password_confirmation" containerStyle="mt-4" labelTitle="Password Confirmation" onChange={updateFormValue} />
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Asal Sekolah</label>
                <select
                    className="select select-bordered w-full mt-2"
                    value={userObj.school_id}
                    onChange={(e) => updateFormValue({ target: { name: 'school_id', value: e.target.value } })}
                >
                    <option value="">Pilih Sekolah</option>
                    {schools.length > 0 ? (
                        schools.map((school) => (
                            <option key={school.id} value={school.id}>{school.nama}</option>
                        ))
                    ) : (
                        <option value="">Loading...</option>
                    )}
                </select>
            </div>
            <InputText type="text" value={userObj.nomor_induk} name="nomor_induk" containerStyle="mt-4" labelTitle="Nomor Induk" onChange={updateFormValue} />
            <InputText type="text" value={userObj.jurusan} name="jurusan" containerStyle="mt-4" labelTitle="Jurusan" onChange={updateFormValue} />
            <InputText type="text" value={userObj.kelas} name="kelas" containerStyle="mt-4" labelTitle="Kelas" onChange={updateFormValue} />
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                    className="select select-bordered w-full mt-2"
                    value={userObj.gender}
                    onChange={(e) => updateFormValue({ target: { name: 'gender', value: e.target.value } })}
                >
                    <option value="">Pilih Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <InputText type="text" value={userObj.alamat} name="alamat" containerStyle="mt-4" labelTitle="Alamat" onChange={updateFormValue} />
            <InputText type="text" value={userObj.nama_ortu} name="nama_ortu" containerStyle="mt-4" labelTitle="Nama Ortu" onChange={updateFormValue} />
            <InputText type="text" value={userObj.alamat_ortu} name="alamat_ortu" containerStyle="mt-4" labelTitle="Alamat Ortu" onChange={updateFormValue} />
            <InputText type="text" value={userObj.no_hp_ortu} name="no_hp_ortu" containerStyle="mt-4" labelTitle="No HP Ortu" onChange={updateFormValue} />

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 border border-gray-300 rounded-md p-1 w-full" />
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
