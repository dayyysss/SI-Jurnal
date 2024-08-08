// Sekolah.jsx
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../components/Cards/TitleCard';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AddSekolahModalBody from './components/AddSekolahModal';
import EditSekolahModalBody from './components/EditSekolahModal';
import SearchBar from "../../components/Input/SearchBar";
import Swal from 'sweetalert2';

const TopSideButtons = ({ openAddNewSchoolModal, searchText, setSearchText }) => {
    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewSchoolModal}>
                Tambah Data Sekolah
            </button>
        </div>
    );
};

function Sekolah() {
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentSchool, setCurrentSchool] = useState(null);
    const [searchText, setSearchText] = useState('');

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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/sekolah', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                params: {
                    page: page,
                    search: searchText, // Tambahkan parameter pencarian jika diperlukan
                },
            });

            if (response.data.success) {
                const { data, last_page } = response.data.data;
                setSchools(data);
                setTotalPages(last_page);
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
    }, [page, searchText]);

    const applySearch = (searchText) => {
        fetchData(); 
    };

    const removeAppliedFilter = () => {
        setSearchText('');
        fetchData();
    };

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
                await axios.delete(`http://127.0.0.1:8000/api/admin/sekolah/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                });

                fetchData(); // Refresh data setelah berhasil dihapus
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

    const openAddNewSchoolModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddSchoolModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditSchoolModal = (schoolId) => {
        const school = schools.find(school => school.id === schoolId);
        setCurrentSchool(school);
        setIsEditModalOpen(true);
    };

    const closeEditSchoolModal = () => {
        setIsEditModalOpen(false);
        setCurrentSchool(null); // Clear school data after closing
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TitleCard title="Current Schools" topMargin="mt-2" TopSideButtons={<TopSideButtons openAddNewSchoolModal={openAddNewSchoolModal} searchText={searchText} setSearchText={setSearchText} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Sekolah</th>
                                <th>Alamat</th>
                                <th>Nama Pembimbing</th>
                                <th>No HP</th>
                                <th>Jumlah Pengguna</th>
                                <th>Dibuat Pada</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.length > 0 ? (
                                schools.map((school, index) => (
                                    <tr key={school.id}>
                                        <td>{(page - 1) * 10 + index + 1}</td>
                                        <td>{school.nama}</td>
                                        <td>{school.alamat}</td>
                                        <td>{school.nama_pembimbing}</td>
                                        <td>{school.no_hp}</td>
                                        <td>{school.users_count}</td>
                                        <td>{school.created_at ? moment(school.created_at).format("DD MMM YY") : 'N/A'}</td>
                                        <td className="flex justify-between">
                                            <button 
                                                className="btn btn-square btn-ghost" 
                                                onClick={() => openEditSchoolModal(school.id)}
                                            >
                                                <PencilSquareIcon className="w-5" />
                                            </button>
                                            <button 
                                                className="btn btn-square btn-ghost" 
                                                onClick={() => handleDelete(school.id)}
                                            >
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No schools available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
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
                </div>
            </TitleCard>

            {/* Modal Add School */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <AddSekolahModalBody closeModal={closeAddSchoolModal} />
                    </div>
                    <div className="modal-backdrop" onClick={closeAddSchoolModal}></div>
                </div>
            )}

            {/* Modal Edit School */}
            {isEditModalOpen && currentSchool && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <EditSekolahModalBody closeModal={closeEditSchoolModal} school={currentSchool} />
                    </div>
                    <div className="modal-backdrop" onClick={closeEditSchoolModal}></div>
                </div>
            )}
        </>
    );
}

export default Sekolah;
