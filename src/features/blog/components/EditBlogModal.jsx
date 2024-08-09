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
                dokumen: null
            });
        }
    }, [blog]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const requiredFields = ['judul', 'konten'];
            for (const field of requiredFields) {
                if (!formData[field]) {
                    setErrorMessage(`${field} is required!`);
                    setLoading(false);
                    return;
                }
            }

            const params = new URLSearchParams();
            Object.keys(formData).forEach(key => {
                if (formData[key] && key !== 'dokumen') { // Exclude dokumen from URLSearchParams
                    params.append(key, formData[key]);
                }
            });

            const token = Cookies.get('token');

            await axios.patch(`http://127.0.0.1:8000/api/admin/blog/${blog.id}`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`
                }
            });

            if (formData.dokumen) {
                const formDataImage = new FormData();
                formDataImage.append("dokumen", formData.dokumen);

                const response = await axios.post(`http://127.0.0.1:8000/api/admin/dokumenblog/${blog.id}`, formDataImage, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (response.status !== 200 && response.status !== 201) {
                    setErrorMessage(`Failed to update image: ${response.data.message}`);
                    throw new Error(`Failed to update image: ${response.data.message}`);
                }
            }

            Swal.fire({
                title: 'Success!',
                text: 'Blog and image updated successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                onBlogUpdated();
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
        <div className="p-4 max-w-4xl mx-auto max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg">
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
            
            <div className="modal-action mt-4 flex justify-end">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6 ml-2" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default EditBlogModalBody;
