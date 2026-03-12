import { useEffect, useState, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../config/socket";

export const useChatRealtime = (partnerId, myId, isBuyer) => {
    const queryClient = useQueryClient();
    const [isPartnerTyping, setIsPartnerTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const buyerId = isBuyer ? myId : partnerId;
    const sellerId = isBuyer ? partnerId : myId;
    const roomId = (buyerId && sellerId) ? `${buyerId}_${sellerId}` : null;

    useEffect(() => {
        if (!partnerId || !myId || !roomId) return;

        const joinRoom = () => {
            socket.emit("join_room", { buyerId, sellerId });
        };

        joinRoom();

        const handleReconnect = () => joinRoom();
        socket.on("reconnect", handleReconnect);

        const handleNewMessage = (newMessage) => {
            const messagePartnerId = isBuyer ? newMessage.id_seller : newMessage.id_buyer;
            if (String(messagePartnerId) !== String(partnerId)) return;

            // Stop typing indicator
            setIsPartnerTyping(false);

            // Update TanStack Query Cache
            queryClient.setQueryData(['chatMessages', partnerId], (oldData) => {
                if (!oldData) return [newMessage];

                // Remove any optimistic message with matching text if it exists
                // This is a simple heuristic. Better would be a client_msg_id.
                const exists = oldData.some(msg => msg.id === newMessage.id);
                if (exists) return oldData;

                // Optionally filtered out the optimistic version of this message
                const filtered = oldData.filter(msg =>
                    !(msg.isOptimistic && msg.text === newMessage.text)
                );

                return [...filtered, newMessage];
            });

            // Update Contact List Cache (reset unread count)
            const contactListKey = isBuyer ? ['contactsBuyer', myId] : ['contactsSeller', myId];
            queryClient.setQueryData(contactListKey, (oldData) => {
                if (!oldData) return oldData;

                // Handle different data structures (array or { data: [...] })
                const list = Array.isArray(oldData) ? oldData : oldData.data;
                if (!Array.isArray(list)) return oldData;

                const newList = list.map(c =>
                    String(c.id).trim() === String(partnerId).trim() ? { ...c, unreadCount: 0 } : c
                );

                return Array.isArray(oldData) ? newList : { ...oldData, data: newList };
            });
        };

        const handleTyping = ({ userId, isTyping }) => {
            if (String(userId) === String(partnerId)) {
                setIsPartnerTyping(isTyping);
            }
        };

        socket.on("receive_message", handleNewMessage);
        socket.on("user_typing", handleTyping);

        return () => {
            socket.off("reconnect", handleReconnect);
            socket.off("receive_message", handleNewMessage);
            socket.off("user_typing", handleTyping);
        };
    }, [partnerId, myId, isBuyer, roomId, queryClient]);

    const sendMessage = useCallback((text) => {
        if (!text.trim() || !partnerId || !myId) return;

        // Stop typing immediately
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        socket.emit("typing", { roomId, userId: myId, isTyping: false });
        typingTimeoutRef.current = null;

        const messageData = {
            id_buyer: buyerId,
            id_seller: sellerId,
            text: text,
            sender_role: isBuyer ? "BUYER" : "SELLER",
        };

        // Optimistically update the UI
        const optimisticMessage = {
            id: 'opt-' + Date.now(),
            ...messageData,
            created_at: new Date().toISOString(),
            isOptimistic: true
        };

        queryClient.setQueryData(['chatMessages', partnerId], (oldData) => {
            if (!oldData) return [optimisticMessage];
            return [...oldData, optimisticMessage];
        });

        socket.emit("send_message", messageData);
    }, [partnerId, myId, isBuyer, buyerId, sellerId, roomId, queryClient]);

    const emitTyping = useCallback(() => {
        if (!roomId || !myId) return;

        socket.emit("typing", {
            roomId: roomId,
            userId: myId,
            isTyping: true,
        });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("typing", {
                roomId: roomId,
                userId: myId,
                isTyping: false,
            });
            typingTimeoutRef.current = null;
        }, 2000);
    }, [roomId, myId]);

    return {
        isPartnerTyping,
        sendMessage,
        emitTyping
    };
};
