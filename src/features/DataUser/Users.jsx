import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../components/Cards/TitleCard';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AddUserModalBody from './components/AddUserModal';
import EditUserModalBody from './components/EditUserModal';
import SearchBar from "../../components/Input/SearchBar"

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
            const response = await axios.get('http://127.0.0.1:8000/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                params: {
                    role: role,
                    page: page,
                    search: searchText, // Tambahkan parameter pencarian
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
    }, [page, role, searchText]); // Tambahkan searchText sebagai dependensi

    const applySearch = (searchText) => {
        fetchData(); // Memanggil fetchData untuk mendapatkan hasil pencarian
    };

    const removeAppliedFilter = () => {
        setSearchText(''); // Menghapus teks pencarian
        fetchData(); // Memanggil fetchData untuk mendapatkan semua data
    };

    const deleteCurrentUser = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
        setCurrentUser(null); // Clear user data after closing
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TitleCard title="Current Users" topMargin="mt-2" TopSideButtons={<TopSideButtons openAddNewUserModal={openAddNewUserModal} searchText={searchText} setSearchText={setSearchText} />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
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
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.image} alt="Avatar" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.school_id}</td>
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
                                                onClick={() => deleteCurrentUser(user.id)}
                                            >
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className="text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TitleCard>

            {/* Modal Add User */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <AddUserModalBody closeModal={closeAddUserModal} />
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
