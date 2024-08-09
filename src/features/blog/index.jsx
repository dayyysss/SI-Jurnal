import { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "../../components/Cards/BlogCard";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

function Blog() {
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setBlogs(response.data.data.data); // Extract the blog data correctly
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('id-ID', options);
    };

    const handleView = (id) => {
        console.log(`View blog ${id}`);
    };

    const handleEdit = (id) => {
        console.log(`Edit blog ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete blog ${id}`);
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <TitleCard
                        key={blog.id}
                        title={blog.judul}
                        topMargin={"mt-2"}
                        image={blog.dokumen}
                        profileImage={blog.users ? blog.users.image : ""}
                        date={`Dipublikasikan • ${formatDate(blog.created_at)}`}
                        onView={() => handleView(blog.id)}
                        onEdit={() => handleEdit(blog.id)}
                        onDelete={() => handleDelete(blog.id)}
                    >
                        <p>{blog.konten}</p>
                    </TitleCard>
                ))
            ) : (
                <div className="text-center col-span-full">No blog posts available</div>
            )}
        </div>
    );    
}

export default Blog;
