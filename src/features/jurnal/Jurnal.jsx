import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../components/Cards/TitleCard';
import { TrashIcon, PencilSquareIcon, FlagIcon, PaperClipIcon, CalendarDaysIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import AddJurnalModalBody from './components/AddJurnalModal';
import EditJurnalModalBody from './components/EditJurnalModal';
import SearchBar from "../../components/Input/SearchBar";
import Swal from 'sweetalert2';

const TopSideButtons = ({ openAddNewJurnalModal, searchText, setSearchText }) => {
    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewJurnalModal}>
                Tambah Jurnal
            </button>
        </div>
    );
};

function Jurnal() {
    const [jurnal, setJurnal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentJurnal, setCurrentJurnal] = useState(null);
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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/jurnal', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                params: {
                    page: page,
                    search: searchText,
                },
            });

            if (response.data.success) {
                const { data, last_page } = response.data.data;

                // Sorting jurnal berdasarkan waktu pembuatan terbaru
                const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setJurnal(sortedData);
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
                await axios.delete(`http://127.0.0.1:8000/api/admin/jurnal/${id}`, {
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

    const openAddNewJurnalModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddJurnalModal = () => {
        setIsAddModalOpen(false);
    };

    // Tambahkan fungsi yang akan dipanggil setelah jurnal berhasil ditambahkan
    const handleJurnalAdded = () => {
        fetchData(); // Refresh data jurnal setelah menambahkan jurnal baru
        closeAddJurnalModal(); // Tutup modal setelah menambahkan jurnal baru
    };

    const openEditJurnalModal = (jurnalId) => {
        const jurnalItem = jurnal.find(jurnal => jurnal.id === jurnalId);
        setCurrentJurnal(jurnalItem);
        setIsEditModalOpen(true);
    };

    const closeEditJurnalModal = () => {
        setIsEditModalOpen(false);
        setCurrentJurnal(null); // Clear jurnal data after closing
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TitleCard title="Daftar Jurnal" topMargin="mt-2" TopSideButtons={<TopSideButtons openAddNewJurnalModal={openAddNewJurnalModal} searchText={searchText} setSearchText={setSearchText} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kegiatan / Aktivitas</th>
                                <th>
                                    <ArrowTrendingUpIcon className="inline-block w-5 h-5 mr-1" />
                                    Status
                                </th>
                                <th>
                                    <FlagIcon className="inline-block w-5 h-5 mr-1" />
                                    Prioritas
                                </th>
                                <th>
                                <CalendarDaysIcon className="inline-block w-5 h-5 mr-1" />
                                    Deadline
                                </th>
                                <th>
                                    <PaperClipIcon className="inline-block w-5 h-5 mr-1" />
                                    Files & Media
                                </th>
                                <th>Dibuat Pada</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jurnal.length > 0 ? (
                                jurnal.map((jurnalItem, index) => (
                                    <tr key={jurnalItem.id}>
                                        <td>{(page - 1) * 10 + index + 1}</td>
                                        <td>{jurnalItem.nama_projek}</td>
                                        <td className='badge badge-neutral'>{jurnalItem.status}</td>
                                        <td>{jurnalItem.prioritas}</td>
                                        <td>{jurnalItem.deadline}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={jurnalItem.dokumen} alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{jurnalItem.created_at ? moment(jurnalItem.created_at).format("DD MMM YY") : 'N/A'}</td>
                                        <td className="flex justify-between">
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => openEditJurnalModal(jurnalItem.id)}
                                            >
                                                <PencilSquareIcon className="w-5" />
                                            </button>
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => handleDelete(jurnalItem.id)}
                                            >
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No jurnal available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </TitleCard>
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

            {/* Modal Add Jurnal */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <AddJurnalModalBody closeModal={closeAddJurnalModal} onJurnalAdded={handleJurnalAdded} />
                    </div>
                    <div className="modal-backdrop" onClick={closeAddJurnalModal}></div>
                </div>
            )}

            {/* Modal Edit Jurnal */}
            {isEditModalOpen && currentJurnal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <EditJurnalModalBody closeModal={closeEditJurnalModal} jurnal={currentJurnal} />
                    </div>
                    <div className="modal-backdrop" onClick={closeEditJurnalModal}></div>
                </div>
            )}
        </>
    );
}

export default Jurnal;
