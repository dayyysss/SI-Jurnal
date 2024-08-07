import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../components/Cards/TitleCard';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import AddUserModalBody from './components/AddUserModal';

const TopSideButtons = ({ openAddNewUserModal }) => {
    return (
        <div className="inline-block float-right">
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
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk kontrol modal

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
    }, [page, role]);

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
        setIsModalOpen(true); // Mengubah state untuk membuka modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Mengubah state untuk menutup modal
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <TitleCard title="Current Users" topMargin="mt-2" TopSideButtons={<TopSideButtons openAddNewUserModal={openAddNewUserModal} />}>
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
                                            <button className="btn btn-square btn-ghost" onClick={() => editCurrentUser(user.id)}>
                                                <PencilSquareIcon className="w-5" />
                                            </button>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentUser(user.id)}>
                                                <TrashIcon className="w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" className="text-center">No users available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TitleCard>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <AddUserModalBody closeModal={closeModal} />
                    </div>
                    <div className="modal-backdrop" onClick={closeModal}></div>
                </div>
            )}
        </>
    );
}

export default Users;
