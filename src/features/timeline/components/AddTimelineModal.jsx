import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const AddTimelineModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        user_id: '',
        tanggal: '',
        start_time: '',
        end_time: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
    
            const formData = new FormData();
            Object.keys(userObj).forEach(key => {
                formData.append(key, userObj[key]);
            });
    
            // Mendapatkan token dari cookies
            const token = Cookies.get('token');
    
            // Mengirimkan request dengan header Authorization
            await axios.post('http://127.0.0.1:8000/api/admin/timeline', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            Swal.fire({
                title: 'Sukses!',
                text: 'Blog Berhasil Ditambahkan!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                setUserObj({
                    name: "",
                    user_id: "",
                    tanggal: "",
                    start_time: "",
                    end_time: "",
                });
                onUserAdded(); 
                closeModal();
            });
        } catch (error) {
            console.error('Error adding blog:', error);
            setErrorMessage('Failed to add blog');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add blog',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Tambah Timeline Baru</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">Nama Timeline</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">ID Pengguna</label>
                        <input
                            type="text"
                            name="user_id"
                            value={formData.user_id}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Tanggal</label>
                        <input
                            type="date"
                            name="tanggal"
                            value={formData.tanggal}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Waktu Mulai</label>
                        <input
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">Waktu Selesai</label>
                        <input
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn">Simpan</button>
                        <button type="button" onClick={onClose} className="btn">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTimelineModal;
