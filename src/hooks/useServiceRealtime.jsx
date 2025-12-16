import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getServices } from "../features/serviceSlice";

export const useServiceRealtime = (socket) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        const handleServiceUpdate = (data) => {
            console.log("🔄 Service update received:", data);
            dispatch(getServices());
        };

        // Listen for multiple potential event names to be safe
        socket.on("service_created", handleServiceUpdate);
        socket.on("service_updated", handleServiceUpdate);
        socket.on("service_deleted", handleServiceUpdate);
        socket.on("new_service", handleServiceUpdate); // Common alternative

        return () => {
            socket.off("service_created", handleServiceUpdate);
            socket.off("service_updated", handleServiceUpdate);
            socket.off("service_deleted", handleServiceUpdate);
            socket.off("new_service", handleServiceUpdate);
        };
    }, [socket, dispatch]);
};
