import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import socket from '../../config/socket';
import { useContactRealtime } from '../../hooks/contactRealtime';
import { useServiceRealtime } from '../../hooks/useServiceRealtime';

const GlobalRealtimeListener = () => {
    const user = useAuthStore(state => state.user);

    const isBuyer = user?.active_role?.toUpperCase() === "BUYER";
    const myId = isBuyer ? user?.id_buyer : user?.id_seller;
    const role = user?.active_role?.toLowerCase();

    useContactRealtime(socket, myId, role, isBuyer);
    useServiceRealtime(socket);

    return null;
};

export default GlobalRealtimeListener;
