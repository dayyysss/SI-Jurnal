import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../components/Cards/BlogCard";
import SearchBar from "../../components/Input/SearchBar";
import Swal from "sweetalert2";
import { PlusIcon } from '@heroicons/react/24/outline';
import AddBlogModalBody from "./components/AddBlogModal";
import EditBlogModalBody from "./components/EditBlogModal";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State untuk modal edit
    const [currentBlog, setCurrentBlog] = useState(null); // State untuk menyimpan blog yang sedang diedit

    const getAuthToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not available. Please login.");
            return null;
        }
        return token;
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/admin/blog', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
    
            if (response.data.success) {
                const sortedBlogs = response.data.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setBlogs(sortedBlogs);
            } else {
                setError('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Yakin Mau Hapus?",
                text: "Data akan dihapus dari database",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Hapus saja!",
            });

            if (result.isConfirmed) {
                await axios.delete(`http://127.0.0.1:8000/api/admin/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                });

                fetchData(); 
                Swal.fire({
                    title: "Deleted!",
                    text: "Data has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const openAddNewBlogModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddNewBlogModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditBlogModal = (blog) => {
        setCurrentBlog(blog); // Set data blog yang sedang diedit
        setIsEditModalOpen(true); // Buka modal edit
    };

    const closeEditBlogModal = () => {
        setIsEditModalOpen(false);
        setCurrentBlog(null); // Reset blog yang sedang diedit
    };

    const formatDate = (date) => {
        const options = { day: 'numeric', year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Current Blogs</h2>
                <div className="inline-block float-right">
                    <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
                    <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewBlogModal}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Tambah Blog
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.judul}
                            topMargin={"mt-2"}
                            image={blog.dokumen}
                            profileImage={blog.users ? blog.users.image : ""}
                            date={`Dipublikasikan • ${formatDate(blog.created_at)}`}
                            onView={() => handleView(blog.id)}
                            onEdit={() => openEditBlogModal(blog)} // Ubah onEdit untuk buka modal edit
                            onDelete={handleDelete}
                        >
                        </BlogCard>
                    ))
                ) : (
                    <div className="text-center col-span-full">No blog posts available</div>
                )}
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <AddBlogModalBody closeModal={closeAddNewBlogModal} onUserAdded={fetchData} />
                    </div>
                </div>
            )}

            {isEditModalOpen && currentBlog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <EditBlogModalBody blog={currentBlog} closeModal={closeEditBlogModal} onBlogUpdated={fetchData} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blog;
