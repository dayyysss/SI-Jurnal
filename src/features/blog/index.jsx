import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../../components/Cards/BlogCard";
import SearchBar from "../../components/Input/SearchBar";
import Swal from "sweetalert2";
import { PlusIcon } from '@heroicons/react/24/outline';
import AddBlogModalBody from "./components/AddBlogModal";
import EditBlogModalBody from "./components/EditBlogModal";
import DetailBlogModal from "./components/DetailBlogModal";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/blog?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            if (response.data.success) {
                const sortedBlogs = response.data.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs);
                setTotalPages(response.data.data.total_pages);
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
    }, [page]);

    useEffect(() => {
        if (searchText) {
            const filtered = blogs.filter(blog =>
                blog.judul.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchText, blogs]);

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
        setCurrentBlog(blog);
        setIsEditModalOpen(true);
    };

    const closeEditBlogModal = () => {
        setIsEditModalOpen(false);
        setCurrentBlog(null);
    };

    const openDetailBlogModal = (blog) => {
        setCurrentBlog(blog);
        setIsDetailModalOpen(true);
    };

    const closeDetailBlogModal = () => {
        setIsDetailModalOpen(false);
        setCurrentBlog(null);
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
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            title={blog.judul}
                            topMargin={"mt-2"}
                            image={blog.dokumen}
                            profileImage={blog.users?.image}
                            profileName={blog.users?.name}
                            date={`Dipublikasikan • ${formatDate(blog.created_at)}`}
                            onView={() => openDetailBlogModal(blog)}
                            onEdit={() => openEditBlogModal(blog)}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="text-center col-span-full">No blog posts available</div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 mb-4">
                <div className="btn-group">
                    <button
                        className={`btn ${page === 1 ? 'btn-disabled' : ''} mr-2`}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        « Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn ${page === index + 1 ? 'btn-active' : ''} mr-2`}
                            onClick={() => setPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`btn ${page === totalPages ? 'btn-disabled' : ''}`}
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next »
                    </button>
                </div>
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

            {isDetailModalOpen && currentBlog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-4xl">
                        <DetailBlogModal blog={currentBlog} closeModal={closeDetailBlogModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blog;
