import Subtitle from "../Typography/Subtitle";
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import test from '../../assets/logo.png'

function BlogCard({ id, title, children, topMargin, image, profileImage, date, onView, onEdit, onDelete }) {
    return (
        <div className={"card bg-base-100 shadow-xl w-full " + (topMargin || "mt-6")}>
            <div className="p-6 flex">
                {/* Blog Image */}
                <div className="flex-shrink-0 w-32 h-32">
                    {image && (
                        <img
                            src={image}
                            alt="Blog"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    )}
                </div>
                {/* Main Content Area */}
                <div className="flex-1 ml-6">
                    <div className="mb-2">
                        <Subtitle>{title}</Subtitle>
                        {date && (
                            <p className="text-sm text-gray-500">{date}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        {children}
                    </div>
                    <div className="flex items-center justify-between p-6 border-t border-gray-200">
                        {/* Profile Image */}
                        <div className="w-7 h-7">
                            {profileImage && (
                                <img
                                    src={test}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover ml-[-20px]"
                                />
                            )}
                        </div>
                        {/* Action Icons */}
                        <div className="flex space-x-4">
                            <button onClick={onView} className="text-gray-500 hover:text-gray-700">
                                <EyeIcon className="w-6 h-6" />
                            </button>
                            <button onClick={onEdit} className="text-gray-500 hover:text-gray-700">
                                <PencilIcon className="w-6 h-6" />
                            </button>
                            <button onClick={() => onDelete(id)} className="text-gray-500 hover:text-gray-700">
                                <TrashIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
