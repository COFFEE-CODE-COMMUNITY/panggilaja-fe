import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContactFromSocket,
  getContactForBuyer,
  getContactForSeller,
  updateUserStatus,
  setOnlineUsers
} from "../features/chatSlice";

// ... (existing code)



/**
 * Custom hook untuk mendengarkan update contact list secara real-time
 * SAFEST VERSION: Menggunakan ref untuk avoid dependency issues
 */
export const useContactRealtime = (socket, userId, role, isBuyer) => {
  const dispatch = useDispatch();

  // Get current contact list dari Redux dengan safe check
  const contacts = useSelector((state) => {
    if (!state?.chat) return [];
    return isBuyer
      ? state.chat.contactBuyer || []
      : state.chat.contactSeller || [];
  });

  // Simpan contacts di ref untuk diakses dalam handler tanpa dependency
  const contactsRef = useRef(contacts);

  // Update ref setiap contacts berubah
  useEffect(() => {
    contactsRef.current = contacts;
  }, [contacts]);

  // Ref untuk debouncing refetch
  const refetchTimeoutRef = useRef(null);
  const pendingRefetchRef = useRef(false);

  // Ref untuk menyimpan parameter hook
  const paramsRef = useRef({ isBuyer, userId });
  paramsRef.current = { isBuyer, userId };

  // Debounced refetch function
  const debouncedRefetch = useCallback(() => {
    // Clear timeout sebelumnya
    if (refetchTimeoutRef.current) {
      clearTimeout(refetchTimeoutRef.current);
    }

    // Set flag pending
    pendingRefetchRef.current = true;

    // Delay 500ms sebelum refetch (tunggu burst messages selesai)
    refetchTimeoutRef.current = setTimeout(() => {
      if (pendingRefetchRef.current) {
        console.log("🔄 Executing debounced refetch...");
        const { isBuyer: currentIsBuyer, userId: currentUserId } =
          paramsRef.current;

        if (currentIsBuyer) {
          dispatch(getContactForBuyer(currentUserId));
        } else {
          dispatch(getContactForSeller(currentUserId));
        }
        pendingRefetchRef.current = false;
      }
    }, 500); // 500ms debounce
  }, [dispatch]);

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

    const joinUserRoom = () => {
      socket.emit("join_user_room", { userId, role });
      console.log(`🔔 Joined user room: ${userRoom}`);
    };

    // Join immediately
    joinUserRoom();

    // Re-join on reconnection
    const handleReconnect = () => {
      console.log("🔄 Socket reconnected, re-joining user room...");
      joinUserRoom();
    };

    socket.on("reconnect", handleReconnect);
    // Hardening: Update room join on initial connect/reconnect to avoid race conditions
    socket.on("connect", joinUserRoom);

    // Handler untuk contact list update
    const handleContactUpdate = (data) => {
      console.log("📬 Contact list update received:", data);
      console.log(
        "📋 Current contacts:",
        contactsRef.current?.map((c) => ({ id: c.id, name: c.name }))
      );

      const { type, partnerId, lastMessage } = data;

      if (type === "new_message") {
        // 1. CEK APAKAH KONTAK SUDAH ADA DI LIST (gunakan ref)
        const currentContacts = contactsRef.current;
        const contactExists =
          Array.isArray(currentContacts) &&
          currentContacts.some((contact) => contact.id === partnerId);

        console.log(
          `🔍 Checking contact ${partnerId}: ${contactExists ? "EXISTS" : "NOT FOUND"
          }`
        );

        if (contactExists) {
          // ✅ KONTAK SUDAH ADA: Update via Redux (TIDAK REFETCH)
          console.log(`✅ Updating existing contact: ${partnerId}`);
          const { isBuyer: currentIsBuyer } = paramsRef.current;

          // Check if the message is from me
          const isMyMessage = lastMessage?.sender_role?.toUpperCase() === role?.toUpperCase();

          // 🔥 PENTING: Hanya dispatch jika partnerId BENAR-BENAR cocok
          dispatch(
            updateContactFromSocket({
              partnerId: partnerId, // Pastikan partnerId yang tepat
              lastMessage: {
                text: lastMessage.text,
                created_at: lastMessage.created_at,
              },
              isBuyer: currentIsBuyer,
              isMyMessage: isMyMessage
            })
          );
        } else {
          // ❌ KONTAK BELUM ADA: Perlu refetch (tapi dengan debouncing)
          console.log(
            `🆕 New contact detected: ${partnerId}, scheduling refetch...`
          );
          debouncedRefetch();
        }
      }
    };

    // Handler untuk online status update
    const handleStatusUpdate = (data) => {
      console.log("🟢 User status update:", data);
      dispatch(updateUserStatus(data));
    };

    // Handler untuk bulk online users list (Init Sync)
    const handleOnlineUsersList = (onlineIds) => {
      console.log("🟢 Initial Online Users Sync:", onlineIds);
      dispatch(setOnlineUsers(onlineIds));
    };

    // Listen untuk update
    socket.on("contact_list_updated", handleContactUpdate);
    socket.on("user_status_update", handleStatusUpdate);
    socket.on("online_users_list", handleOnlineUsersList);

    // Request initial online status
    socket.emit("get_online_users");

    // Cleanup
    return () => {
      socket.off("contact_list_updated", handleContactUpdate);
      socket.off("user_status_update", handleStatusUpdate);
      socket.off("online_users_list", handleOnlineUsersList);
      socket.off("reconnect", handleReconnect);
      socket.off("connect", joinUserRoom);
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }
      console.log(`👋 Left user room: ${userRoom}`);
    };
  }, [socket, userId, role, dispatch, debouncedRefetch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current);
      }
    };
  }, []);
};

export default useContactRealtime;
