// Users.jsx
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../components/Cards/TitleCard';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AddUserModalBody from './components/AddUserModal';
import EditUserModalBody from './components/EditUserModal';
import SearchBar from "../../components/Input/SearchBar";
import Swal from 'sweetalert2';

const TopSideButtons = ({ openAddNewUserModal, searchText, setSearchText }) => {
    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewUserModal}>
                Tambah User
            </button>
        </div>
    );
};

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [role, setRole] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/users/role/3', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                params: {
                    role: role,
                    page: page,
                    search: searchText,
                },
            });

            if (response.data.success) {
                const { data, last_page, total } = response.data.data;
                setUsers(data);
                setTotalPages(last_page);
                setTotalUsers(total);
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
    }, [page, role, searchText]);

    const openAddNewUserModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddUserModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditUserModal = (userId) => {
        const user = users.find(user => user.id === userId);
        setCurrentUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditUserModal = () => {
        setIsEditModalOpen(false);
        setCurrentUser(null);
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
                await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`,
                    },
                });
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const handleUserAdded = () => {
        fetchData();
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TitleCard title="Daftar Pengguna" topMargin="mt-2" TopSideButtons={<TopSideButtons openAddNewUserModal={openAddNewUserModal} searchText={searchText} setSearchText={setSearchText} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Profil</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Asal Sekolah</th>
                                <th>Nomor Induk</th>
                                <th>Jurusan</th>
                                <th>Kelas</th>
                                <th>Gender</th>
                                <th>Alamat</th>
                                <th>Nama Ortu</th>
                                <th>Alamat Ortu</th>
                                <th>No HP Ortu</th>
                                <th>Dibuat Pada</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{(page - 1) * 10 + index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="Avatar" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.schools ? user.schools.nama : ""}</td>
                                        <td>{user.nomor_induk}</td>
                                        <td>{user.jurusan}</td>
                                        <td>{user.kelas}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.alamat}</td>
                                        <td>{user.nama_ortu}</td>
                                        <td>{user.alamat_ortu}</td>
                                        <td>{user.no_hp_ortu}</td>
                                        <td>{moment(user.created_at).format("DD MMM YY")}</td>
                                        <td className="flex justify-between">
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => openEditUserModal(user.id)}
                                            >
                                                <PencilSquareIcon className="w-5" />
                                            </button>
                                            <button
                                                className="btn btn-square btn-ghost"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="14" className="text-center">No users available</td>
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
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                « Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    className={`btn ${page === index + 1 ? 'btn-active' : ''} mr-2`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                className={`btn ${page === totalPages ? 'btn-disabled' : ''}`}
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                Next »
                            </button>
                        </div>
                    </div>

            {/* Modal Add User */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <AddUserModalBody closeModal={closeAddUserModal} onUserAdded={handleUserAdded} />
                    </div>
                    <div className="modal-backdrop" onClick={closeAddUserModal}></div>
                </div>
            )}

            {/* Modal Edit User */}
            {isEditModalOpen && currentUser && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <EditUserModalBody closeModal={closeEditUserModal} user={currentUser} />
                    </div>
                    <div className="modal-backdrop" onClick={closeEditUserModal}></div>
                </div>
            )}
        </>
    );
}

export default Users;
