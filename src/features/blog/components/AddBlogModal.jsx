import { useState } from "react";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function AddBlogModalBody({ closeModal, onUserAdded }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState({
        judul: "",
        konten: "",
        dokumen: "", 
    });

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
            await axios.post('http://127.0.0.1:8000/api/admin/blog', formData, {
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
                    judul: "",
                    konten: "",
                    dokumen: "",
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
    

    const updateFormValue = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        setUserObj(prevState => ({ ...prevState, [name]: value }));
    };

    const handleContentChange = (content) => {
        setUserObj(prevState => ({ ...prevState, konten: content }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserObj(prevState => ({ ...prevState, dokumen: file }));
    };

    return (
        <div className="p-4 max-w-4xl mx-auto"> {/* Memperbesar modal */}
            <h3 className="text-lg font-bold mb-4">Tambah Blog</h3>
            <InputText type="text" value={userObj.judul} name="judul" containerStyle="mt-4" labelTitle="Judul" onChange={updateFormValue} />
            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Konten</label>
                <ReactQuill
                    value={userObj.konten}
                    onChange={handleContentChange}
                    className="mt-2 bg-white"
                    placeholder="Tulis konten di sini..."
                />
            </div>
            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Dokumen</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 border border-gray-300 rounded-md p-1 w-full" />
            </div>
            
            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action mt-4">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => handleSubmit()} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default AddBlogModalBody;
