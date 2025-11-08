import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getContactForBuyer, getContactForSeller } from "../features/chatSlice";

/**
 * SIMPLE & SAFE VERSION: Selalu refetch tapi dengan smart debouncing
 * Ini memastikan data selalu fresh dan tidak ada bug "semua chat terupdate"
 */
export const useContactRealtime = (socket, userId, role, isBuyer) => {
  const dispatch = useDispatch();

  // Track last refetch time per user
  const lastRefetchRef = useRef({});
  const refetchTimeoutRef = useRef(null);

  useEffect(() => {
    if (!socket || !userId || !role) {
      console.log("⚠️ Socket hook skipped:", {
        socket: !!socket,
        userId,
        role,
      });
      return;
    }

    // Join user room untuk menerima notifikasi
    const userRoom = `user_${role}_${userId}`;
    socket.emit("join_user_room", { userId, role });
    console.log(`🔔 Joined user room: ${userRoom}`);

    // Handler untuk contact list update
    const handleContactUpdate = (data) => {
      console.log("📬 Contact list update received:", data);

      const { partnerId } = data;
      const now = Date.now();

      // 🔥 SMART DEBOUNCING PER PARTNER
      // Hanya refetch jika belum refetch untuk partner ini dalam 2 detik terakhir
      const lastRefetch = lastRefetchRef.current[partnerId] || 0;
      const timeSinceLastRefetch = now - lastRefetch;

      if (timeSinceLastRefetch < 2000) {
        console.log(
          `⏭️ Skip refetch for ${partnerId} (last refetch ${timeSinceLastRefetch}ms ago)`
        );
        return;
      }

      // Clear previous timeout
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }

      // Debounce 300ms untuk handle multiple updates sekaligus
      refetchTimeoutRef.current = setTimeout(() => {
        console.log(`🔄 Refetching contacts for partner: ${partnerId}`);

        // Update last refetch time
        lastRefetchRef.current[partnerId] = Date.now();

        // Refetch
        if (isBuyer) {
          dispatch(getContactForBuyer(userId));
        } else {
          dispatch(getContactForSeller(userId));
        }
      }, 300);
    };

    // Listen untuk update
    socket.on("contact_list_updated", handleContactUpdate);

    // Cleanup
    return () => {
      socket.off("contact_list_updated", handleContactUpdate);
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }
      console.log(`👋 Left user room: ${userRoom}`);
    };
  }, [socket, userId, role, isBuyer, dispatch]);
};

export default useContactRealtime;
