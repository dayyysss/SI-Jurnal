import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function AddJurnalModalBody({ closeModal, onJurnalAdded }) {
    const [userObj, setUserObj] = useState({
        nama_projek: "",
        status: "",
        prioritas: "",
        deadline: "",
        dokumen: null,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserObj({ ...userObj, [name]: value });
    };

    const onFileChange = (e) => {
        setUserObj({ ...userObj, dokumen: e.target.files[0] });
    };

    const saveNewUser = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            Object.keys(userObj).forEach(key => {
                formData.append(key, userObj[key]);
            });

            const token = Cookies.get('token');

            await axios.post('http://127.0.0.1:8000/api/admin/jurnal', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                title: 'Sukses!',
                text: 'Jurnal Berhasil Ditambahkan!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                setUserObj({
                    nama_projek: "",
                    status: "",
                    prioritas: "",
                    deadline: "",
                    dokumen: null,
                });
                onJurnalAdded(); // Panggil fungsi yang diteruskan dari Jurnal.jsx
            });
        } catch (error) {
            console.error('Error adding jurnal:', error);
            setErrorMessage('Failed to add jurnal');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add jurnal',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold">Tambah Jurnal Baru</h3>
            <div className="mt-4">
                <label className="block">Aktivitas / Kegiatan</label>
                <input
                    type="text"
                    name="nama_projek"
                    value={userObj.nama_projek}
                    onChange={onInputChange}
                    className="input input-bordered w-full mt-2"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block">Status</label>
                <select
                    name="status"
                    value={userObj.status}
                    onChange={onInputChange}
                    className="select select-bordered w-full mt-2"
                    required
                >
                    <option value="">Pilih Status</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Sedang">Sedang dikerjakan</option>
                    <option value="Akan">Akan dikerjakan</option>
                    <option value="Belum">Belum dimulai</option>
                </select>
            </div>
            <div className="mt-4">
                <label className="block">Prioritas</label>
                <select
                    name="prioritas"
                    value={userObj.prioritas}
                    onChange={onInputChange}
                    className="select select-bordered w-full mt-2"
                    required
                >
                    <option value="">Pilih Prioritas</option>
                    <option value="Tinggi">Sangat Penting</option>
                    <option value="Sedang">Cukup Penting</option>
                    <option value="Rendah">Biasa Saja</option>
                </select>
            </div>
            <div className="mt-4">
                <label className="block">Deadline</label>
                <input
                    type="date"
                    name="deadline"
                    value={userObj.deadline}
                    onChange={onInputChange}
                    className="input input-bordered w-full mt-2"
                    required
                />
            </div>
            <div className="mt-4">
                <label className="block">Dokumen</label>
                <input
                    type="file"
                    name="dokumen"
                    onChange={onFileChange}
                    className="file-input file-input-bordered w-full mt-2"
                />
            </div>
            <div className="modal-action">
                <button
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    onClick={saveNewUser}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
                <button className="btn" onClick={closeModal} disabled={loading}>
                    Cancel
                </button>
            </div>
            {errorMessage && (
                <div className="alert alert-error mt-4">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default AddJurnalModalBody;
