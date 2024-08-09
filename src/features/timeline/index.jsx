import { useState, useEffect } from 'react';
import CalendarView from '../../components/TimelineView';
import { useDispatch } from 'react-redux';
import { openRightDrawer } from '../common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil';
import axios from 'axios';
import AddTimelineModal from './components/AddTimelineModal';

function Calendar() {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/timeline`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },
            });
            if (response.data.success) {
                const sortedEvents = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setEvents(sortedEvents);
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
    }, []); // Adding an empty dependency array to run fetchData only once on component mount

    const getAuthToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not available. Please login.");
            return null;
        }
        return token;
    };

    const addNewEvent = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const openDayDetail = ({ filteredEvents, title }) => {
        dispatch(openRightDrawer({ header: title, bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject: { filteredEvents } }));
    };

    return (
        <>
            <CalendarView
                calendarEvents={events}
                addNewEvent={addNewEvent}
                openDayDetail={openDayDetail}
                isLoading={isLoading}
                error={error}
            />
            {showModal && <AddTimelineModal onClose={handleModalClose} />}
        </>
    );
}

export default Calendar;
