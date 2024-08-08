import { useNavigate } from 'react-router-dom';

function DashboardStats({ title, icon, value, colorIndex }) {
    const COLORS = ["primary", "primary"];
    const navigate = useNavigate();

    const handleClick = () => {
        switch (title) {
            case "Total User":
                navigate('/data-user');
                break;
            case "Total Sekolah":
                navigate('/data-sekolah');
                break;
            case "Total Jurnal":
                navigate('/data-jurnal'); 
                break;
            case "Total Blog":
                navigate('/data-blog'); 
                break;
            default:
                break;
        }
    };

    return (
        <div className="stats shadow">
            <div className="stat">
                <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{icon}</div>
                <div className="stat-title dark:text-slate-300">{title}</div>
                <div className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{value}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs" onClick={handleClick}>Lihat Detail</button>
                </div>
            </div>
        </div>
    );
}

export default DashboardStats;
