import React from 'react';

const DetailBlogModal = ({ blog, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex-1">{blog.judul}</h2>
                    <button 
                        onClick={closeModal} 
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        &times;
                    </button>
                </div>
                <div className="text-gray-500 text-sm mb-4">
                    {blog.created_at && (
                        <p>Diterbitkan pada {new Date(blog.created_at).toLocaleDateString()}</p>
                    )}
                </div>
                <div className="mb-4 flex justify-center">
                    {blog.dokumen && (
                        <img
                            src={blog.dokumen}
                            alt="Blog"
                            className="w-full h-auto max-w-sm object-cover rounded-lg" 
                        />
                    )}
                </div>
                <div
                    className="content text-gray-900"
                    dangerouslySetInnerHTML={{ __html: blog.konten }}
                />
                <style jsx>{`
                    .content a {
                        color: #1d4ed8; /* Blue color */
                        text-decoration: underline;
                    }
                    .content a:hover {
                        color: #2563eb; /* Darker blue on hover */
                    }
                `}</style>
            </div>
        </div>
    );
};

export default DetailBlogModal;
