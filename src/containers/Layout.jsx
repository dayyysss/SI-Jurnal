import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from './RightSidebar';
import ModalLayout from "./ModalLayout";
import { removeNotificationMessage } from "../features/common/headerSlice";

function Layout() {
  const dispatch = useDispatch();
  const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header);

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) {
        NotificationManager.success(newNotificationMessage, 'Success');
      }
      if (newNotificationStatus === 0) {
        NotificationManager.error(newNotificationMessage, 'Error');
      }
      dispatch(removeNotificationMessage());
    }
  }, [newNotificationMessage]);

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <LeftSidebar />
        <PageContent />
      </div>
      <RightSidebar />
      <NotificationContainer />
      <ModalLayout />
    </>
  );
}

export default Layout;
