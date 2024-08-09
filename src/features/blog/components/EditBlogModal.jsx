import { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditBlogModalBody({ blog, closeModal, onBlogUpdated }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        judul: "",
        konten: "",
        dokumen: null, // Untuk menyimpan file dokumen
    });

    useEffect(() => {
        if (blog) {
            setFormData({
                judul: blog.judul,
                konten: blog.konten,
                dokumen: null // Reset dokumen karena kita hanya akan mengupload yang baru jika diubah
            });
        }
    }, [blog]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
    
            const data = new FormData();
            data.append('judul', formData.judul);
            data.append('konten', formData.konten);
            if (formData.dokumen) {
                data.append('dokumen', formData.dokumen);
            }

            const token = Cookies.get('token');
    
            await axios.put(`http://127.0.0.1:8000/api/admin/blog/${blog.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            Swal.fire({
                title: 'Sukses!',
                text: 'Blog Berhasil Diedit!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                onBlogUpdated(); 
                closeModal();
            });
        } catch (error) {
            console.error('Error updating blog:', error);
            setErrorMessage('Failed to update blog');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update blog',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleContentChange = (content) => {
        setFormData(prevState => ({ ...prevState, konten: content }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({ ...prevState, dokumen: file }));
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-4">Edit Blog</h3>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Judul</label>
                <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    className="mt-2 border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Judul blog"
                />
            </div>
            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Konten</label>
                <ReactQuill
                    value={formData.konten}
                    onChange={handleContentChange}
                    className="mt-2"
                    placeholder="Tulis konten di sini..."
                />
            </div>
            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Dokumen</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-2 border border-gray-300 rounded-md p-1 w-full"
                />
            </div>
            
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            
            <div className="modal-action mt-4">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default EditBlogModalBody;
