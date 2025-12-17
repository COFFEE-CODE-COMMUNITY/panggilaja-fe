import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, getServicesAround } from "../features/serviceSlice";
import { selectCurrentUser } from "../features/authSlice";
import { selectSeeAddress } from "../features/userSlice";

export const useServiceRealtime = (socket) => {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const addressState = useSelector(selectSeeAddress);

    useEffect(() => {
        if (!socket) return;

        const handleServiceUpdate = (data) => {
            console.log("🔄 Service update received via Socket:", data);

            // CRITICAL FIX: Race Condition Handling
            // We MUST wait for the backend database to fully commit the transaction
            // before we fetch the updated list. Without this delay, we fetch stale data.
            // 1000ms is a safe buffer for most database operations.
            setTimeout(() => {
                console.log("⏰ Dispatching real-time refresh (delayed)...");

                // 1. Always refresh global list
                dispatch(getServices());

                // 2. Refresh "Services Around" if user is buyer and location is known
                const isBuyer = user?.active_role?.toLowerCase() === 'buyer';
                const kecamatan = user?.address?.kecamatan || addressState?.data?.kecamatan;

                if (isBuyer && kecamatan) {
                    console.log("📍 Refreshing services nearby for:", kecamatan);
                    dispatch(getServicesAround({
                        id: user.id_buyer,
                        kecamatan: kecamatan
                    }));
                }
            }, 1000);
        };

        // Listen for multiple potential event names to be safe
        socket.on("service_created", handleServiceUpdate);
        socket.on("service_updated", handleServiceUpdate);
        socket.on("service_deleted", handleServiceUpdate);
        socket.on("new_service", handleServiceUpdate);

        return () => {
            socket.off("service_created", handleServiceUpdate);
            socket.off("service_updated", handleServiceUpdate);
            socket.off("service_deleted", handleServiceUpdate);
            socket.off("new_service", handleServiceUpdate);
        };
    }, [socket, dispatch, user, addressState]);
};
