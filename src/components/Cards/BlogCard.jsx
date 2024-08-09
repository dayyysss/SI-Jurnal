import Subtitle from "../Typography/Subtitle";
import { TrashIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import defaultProfileImage from '../../assets/logo.png';

function BlogCard({ id, title, children, topMargin, image, profileImage, profileName, date, onView, onEdit, onDelete }) {
    return (
        <div className={"card bg-base-100 shadow-xl w-full " + (topMargin || "mt-6")}>
            <div className="p-6 flex flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-32 h-32 mb-4 md:mb-0">
                    {image ? (
                        <img
                            src={image}
                            alt="Blog"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 md:ml-6">
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
                        <div className="flex items-center space-x-4">
                            <img
                                src={profileImage || defaultProfileImage} 
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <p className="text-sm font-semibold text-gray-700">{profileName || 'Anonymous'}</p>
                        </div>
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
