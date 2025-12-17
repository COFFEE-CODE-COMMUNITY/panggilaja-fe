import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../../../config/socket";
import { API_BASE_URL } from "../../../../api/api";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import {
  FaSearch,
  FaArrowLeft,
  FaPaperPlane,
  FaEllipsisV,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import axiosInstance from "../../../utils/axios";
import Modal from "../../../common/Modal";
import {
  getContactForBuyer,
  getContactForSeller,
  selectContactBuyerStatus,
  selectContactSellerStatus,
  markChatAsRead,
} from "../../../../features/chatSlice";

// SECTIONS
import AcceptNegoCard from "./sections/AcceptNegoCard";
import ServiceNegoCard from "./sections/ServiceNegoCard";
import ServiceCard from "./sections/ServiceCard";
import TypingIndicator from "./TypingIndicator";

// UTILS
import {
  formatTime,
  autoMessageRegex,
  negoMessageRegex,
  acceptNegoRegex,
} from "./utils/chatUtils";

const ChatLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { partnerId } = useParams();
  const location = useLocation();

  const shouldRefresh = location.state?.shouldRefreshList;

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.accessToken);
  const isBuyer = user?.active_role?.toUpperCase() === "BUYER";
  const myId = isBuyer ? user?.id_buyer : user?.id_seller;
  const role = user?.active_role?.toLowerCase();

  const buyerId = isBuyer ? myId : partnerId;
  const sellerId = isBuyer ? partnerId : myId;
  // Ensure roomId is consistent and stable
  const roomId = useMemo(() => {
    if (!buyerId || !sellerId) return null;
    return `${buyerId}_${sellerId}`;
  }, [buyerId, sellerId]);

  const buyerStatus = useSelector(selectContactBuyerStatus);
  const sellerStatus = useSelector(selectContactSellerStatus);
  const conversationsData = useSelector((state) =>
    isBuyer ? state.chat.contactBuyer : state.chat.contactSeller
  );
  const conversations = useMemo(
    () => conversationsData || [],
    [conversationsData]
  );

  const [chatMobile, setChatMobile] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [confirmedMessageIds, setConfirmedMessageIds] = useState([]);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const listLoading = buyerStatus === "loading" || sellerStatus === "loading";

  // USEEFFECT: AUTO FOCUS INPUT ON CHAT SELECTION
  useEffect(() => {
    if (selectedChat && inputRef.current) {
      // Checking window.innerWidth to avoid auto-focus on mobile which might trigger keyboard
      if (window.innerWidth > 768) {
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      }
    }
  }, [selectedChat]);

  // USEEFFECT #1: LOAD CONTACTS
  useEffect(() => {
    if (!myId) return;

    if (isBuyer && (buyerStatus === "idle" || shouldRefresh)) {
      dispatch(getContactForBuyer(myId));
    } else if (!isBuyer && (sellerStatus === "idle" || shouldRefresh)) {
      dispatch(getContactForSeller(myId));
    }

    if (shouldRefresh) {
      // Preserve other state (like service) when clearing shouldRefreshList
      const { shouldRefreshList, ...restState } = location.state || {};
      navigate(location.pathname, { replace: true, state: restState });
    }
  }, [
    dispatch,
    myId,
    isBuyer,
    buyerStatus,
    sellerStatus,
    shouldRefresh,
    navigate,
    location.pathname,
  ]);

  // USEEFFECT #2: FETCH MESSAGES & MARK AS READ
  useEffect(() => {
    const fetchData = async () => {
      if (!partnerId || !token) return;
      setMessagesLoading(true);
      setMessages([]);

      // Mark as read when entering chat
      dispatch(markChatAsRead({ partnerId, isBuyer }));

      try {
        const messagesResponse = await axiosInstance.get(
          `${API_BASE_URL}/chat/${partnerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (messagesResponse.data.success) {
          const formattedMessages = messagesResponse.data.data.map((msg) => ({
            id: msg.id,
            type: "text",
            text: msg.text,
            timestamp: formatTime(msg.created_at),
            sender:
              (isBuyer && msg.sender_role?.toUpperCase() === "BUYER") ||
                (!isBuyer && msg.sender_role?.toUpperCase() === "SELLER")
                ? "user"
                : "seller",
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchData();
  }, [partnerId, token, isBuyer, dispatch]);

  // USEEFFECT #3: UPDATE SELECTED CHAT
  useEffect(() => {
    if (partnerId && conversations.length > 0) {
      const selected = conversations.find(
        (c) => c.id.trim() === partnerId.trim()
      );
      setSelectedChat(selected);
    } else if (!partnerId) {
      setSelectedChat(null);
    }
  }, [partnerId, conversations]);

  // USEEFFECT #4: JOIN CHAT ROOM & RECONNECTION HANDLING
  useEffect(() => {
    if (!partnerId || !myId || !roomId) return;

    const joinRoom = () => {
      socket.emit("join_room", { buyerId, sellerId });
    };

    // Join immediately
    joinRoom();

    // Re-join on reconnection
    const handleReconnect = () => {
      joinRoom();
    };

    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("reconnect", handleReconnect);
    };
  }, [partnerId, myId, isBuyer]);

  // USEEFFECT #5: LISTEN TO MESSAGES IN ACTIVE CHAT
  useEffect(() => {
    if (!partnerId || !myId) return;

    const handleNewMessage = (newMessage) => {
      const messagePartnerId = isBuyer
        ? newMessage.id_seller
        : newMessage.id_buyer;

      if (messagePartnerId !== partnerId) {
        return;
      }

      const isMyMessage =
        (isBuyer && newMessage.sender_role?.toUpperCase() === "BUYER") ||
        (!isBuyer && newMessage.sender_role?.toUpperCase() === "SELLER");

      setMessages((prevMessages) => {
        const exists = prevMessages.some((msg) => msg.id === newMessage.id);
        if (exists) {
          return prevMessages;
        }

        // Stop typing indicator when message received
        setIsPartnerTyping(false);

        return [
          ...prevMessages,
          {
            id: newMessage.id,
            type: "text",
            text: newMessage.text,
            timestamp: formatTime(newMessage.created_at),
            sender: isMyMessage ? "user" : "seller",
          },
        ];
      });

      // Mark as read immediately to keep unread count at 0
      dispatch(markChatAsRead({ partnerId, isBuyer }));
    };

    const handleUserTyping = ({ userId, isTyping }) => {
      // Only show typing if it's from the current partner
      if (String(userId) === String(partnerId)) {
        setIsPartnerTyping(isTyping);
      }
    };

    const handleErrorMessage = (data) => {
      console.error("❌ Socket Error:", data);
      alert(`Gagal mengirim pesan: ${data.error}`);
    };

    socket.on("receive_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("error_message", handleErrorMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("error_message", handleErrorMessage);
    };
  }, [partnerId, myId, isBuyer]);

  // USEEFFECT #6: AUTO SCROLL
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isPartnerTyping]);

  const filteredConversations = conversations.filter((conv) =>
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    setText(e.target.value);

    // Emit typing event
    if (socket && roomId && myId) {
      if (!typingTimeoutRef.current) {
        socket.emit("typing", {
          roomId: roomId,
          userId: myId,
          isTyping: true,
        });
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      // Set timeout to stop typing
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("typing", {
          roomId: roomId,
          userId: myId,
          isTyping: false,
        });
        typingTimeoutRef.current = null;
      }, 2000);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !partnerId || !myId) return;

    // Stop typing immediately
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (roomId) {
      socket.emit("typing", {
        roomId: roomId,
        userId: myId,
        isTyping: false,
      });
    }
    typingTimeoutRef.current = null;

    const messageData = {
      id_buyer: isBuyer ? myId : partnerId,
      id_seller: isBuyer ? partnerId : myId,
      text: text,
      sender_role: isBuyer ? "BUYER" : "SELLER",
    };

    // --- DEFERRED AUTO-MESSAGE LOGIC (User Request: Send only when buyer chats) ---
    // --- DEFERRED AUTO-MESSAGE LOGIC (Context-Aware) ---
    if (isBuyer && location.state?.service) {
      const service = location.state.service;

      // Keys
      const contextKey = `last_context_service_buyer_${myId}`;
      const timestampKey = `chat_inquiry_time_${myId}_${service.id}`;

      // Data
      const lastContextId = localStorage.getItem(contextKey);
      const lastInquiryTime = localStorage.getItem(timestampKey);
      const now = Date.now();

      // Conditions
      const isContextSwitch = lastContextId !== service.id;
      const cooldownDuration = 5 * 60 * 1000; // 5 Minutes (if same context)
      const isCooldownPassed = !lastInquiryTime || (now - parseInt(lastInquiryTime)) > cooldownDuration;

      let shouldSendContext = false;

      // Logic: Send if we switched context OR if enough time specifically passed for this service (refresh protection)
      if (isContextSwitch) {
        shouldSendContext = true;
      } else if (isCooldownPassed) {
        shouldSendContext = true;
      }

      if (shouldSendContext) {
        const autoMessage = `Halo, saya tertarik dengan layanan "${service.name}". (ServiceID: ${service.id}) (Harga: ${service.price}) (Deskripsi: ${service.description || ''}) (Gambar: ${service.image})`;

        socket.emit("send_message", {
          id_buyer: myId,
          id_seller: partnerId,
          text: autoMessage,
          sender_role: "BUYER"
        });

        // Update State
        localStorage.setItem(contextKey, service.id);
        localStorage.setItem(timestampKey, now.toString());
      }
    }
    // ------------------------------------

    // ------------------------------------

    // Force a small delay for the user's text message to ensure the Auto-Message (Card) arrives first
    setTimeout(() => {
      socket.emit("send_message", messageData);
      setText("");
    }, 500);
  };

  const handleSelectChat = (conversation) => {
    setChatMobile(true);
    dispatch(markChatAsRead({ partnerId: conversation.id, isBuyer }));
    user?.active_role === "buyer"
      ? navigate(`/chat/${conversation.id}`)
      : navigate(`/dashboard/chat/${conversation.id}`);
  };

  const handleBackToHome = () => navigate("/");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState(null);

  const handleCreateOrder = async (orderData, messageId) => {
    setIsCreatingOrder(true);

    // Mark as confirmed immediately for better UX
    setConfirmedMessageIds((prev) => [...prev, messageId]);

    try {
      const agreedPriceFormatted =
        orderData.agreedPrice.toLocaleString("id-ID");

      const response = await axiosInstance.post(
        `${API_BASE_URL}/orders`,
        {
          id_service: orderData.serviceId,
          pesan_tambahan: `Negosiasi melalui chat. Harga disepakati: Rp ${agreedPriceFormatted}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "success") {
        const orderId = response.data.data.id;
        setOrderSuccessId(orderId);

        // Send confirmation to chat
        const confirmMessage = `✅ Pesanan telah dibuat! Order ID: #${orderId}`;
        socket.emit("send_message", {
          id_buyer: isBuyer ? myId : partnerId,
          id_seller: isBuyer ? partnerId : myId,
          text: confirmMessage,
          sender_role: "BUYER",
        });

        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("❌ Error creating order:", error);
      alert(error.response?.data?.message || "Gagal membuat pesanan");
      // Remove from confirmed on error
      setConfirmedMessageIds((prev) => prev.filter((id) => id !== messageId));
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-gray-50/60">
      <div
        className={`h-full sm:w-80 w-full bg-white border-r border-gray-200 flex flex-col ${chatMobile ? "hidden sm:flex" : "flex"
          }`}
      >
        <div className="p-4 border-b border-gray-200">
          {location.pathname.includes("dashboard") ? (
            <div className="flex items-center gap-3 mb-4 sm:block hidden">
              {role === "buyer" && (
                <button
                  onClick={handleBackToHome}
                  className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  <FaArrowLeft size={18} />
                </button>
              )}
              <h2 className="text-xl font-bold text-gray-800 flex-1 text-center">
                Pesan
              </h2>
              <div className="w-10"></div>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-4">
              {role === "buyer" && (
                <button
                  onClick={handleBackToHome}
                  className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  <FaArrowLeft size={18} />
                </button>
              )}
              <h2 className="text-xl font-bold text-gray-800 flex-1 text-center">
                Pesan
              </h2>
              <div className="w-10"></div>
            </div>
          )}

          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Cari percakapan..."
              className="bg-gray-50 w-full rounded-xl pl-10 pr-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {listLoading ? (
            // Chat Sidebar Skeleton
            <div className="divide-y divide-gray-100 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectChat(conv)}
                className={`cursor-pointer w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${selectedChat?.id === conv.id ? "bg-primary/5" : ""
                  }`}
              >
                <div className="relative flex-shrink-0">
                  {conv.avatar ? (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <FaUser className="text-gray-400 text-xl" />
                    </div>
                  )}
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 truncate">
                      {conv.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatTime(conv.lastMessage?.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.lastMessage?.text || "Tidak ada pesan"}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {conv.unreadCount}
                    </span>
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FaSearch size={48} className="mb-4" />
              <p>Tidak ada percakapan ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col ${chatMobile ? "flex" : "hidden sm:flex"
          }`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              {isBuyer ? (
                <Link
                  to={`/profile-service/${selectedChat.id}`}
                  className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 transition-colors group"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setChatMobile(false);
                      navigate("/chat");
                    }}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaArrowLeft className="text-gray-600" />
                  </button>
                  <div className="relative">
                    {selectedChat.avatar ? (
                      <>
                        <img
                          src={selectedChat.avatar}
                          className="w-10 h-10 rounded-full bg-amber-500 object-cover border border-gray-100 group-hover:border-primary transition-colors"
                        />
                        {selectedChat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border-1 border-gray-200 group-hover:border-primary transition-colors">
                        <FaUser size={25} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {selectedChat.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedChat.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setChatMobile(false);
                      navigate("/dashboard/chat");
                    }}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaArrowLeft className="text-gray-600" />
                  </button>
                  <div className="relative">
                    {selectedChat.avatar ? (
                      <>
                        <img
                          src={selectedChat.avatar}
                          className="w-10 h-10 rounded-full bg-amber-500"
                        />
                        {selectedChat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </>
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border-1 border-gray-200">
                        <FaUser size={25} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {selectedChat.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedChat.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              )}

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaEllipsisV className="text-gray-600" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {location.state?.service && (
                <ServiceCard
                  service={location.state.service}
                  onClose={() => {
                    navigate(location.pathname, { replace: true, state: { ...location.state, service: null } });
                  }}
                />
              )}
              <div
                ref={chatContainerRef}
                className={`flex-1 overflow-auto p-4 space-y-4 scrollbar-hide`}
              >
                {messagesLoading ? (
                  // Chat Room Skeleton
                  <div className="space-y-4 animate-pulse pt-10">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                        max-w-[70%] rounded-2xl p-4 
                        ${i % 2 === 0 ? 'bg-primary/10 rounded-tr-sm' : 'bg-gray-100 rounded-tl-sm'}
                      `}>
                          <div className="h-3 bg-gray-200 rounded w-48 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    // Check for Accept Nego message
                    const acceptNegoMatch = acceptNegoRegex.exec(msg.text);

                    if (acceptNegoMatch && isBuyer) {
                      const agreedPrice = acceptNegoMatch[1];
                      const serviceName = acceptNegoMatch[2];

                      // Check if already confirmed
                      let isAlreadyConfirmed = false;
                      for (let i = index + 1; i < messages.length; i++) {
                        const nextMsg = messages[i];
                        if (
                          nextMsg.sender === "user" &&
                          nextMsg.text.includes("✅ Pesanan telah dibuat!")
                        ) {
                          isAlreadyConfirmed = true;
                          break;
                        }
                      }

                      // Also check confirmedMessageIds state
                      if (confirmedMessageIds.includes(msg.id)) {
                        isAlreadyConfirmed = true;
                      }

                      const handleConfirmOrder = () => {


                        // Find the last nego message for this service
                        const lastNegoMessage = [...messages]
                          .reverse()
                          .find((m) => {
                            const match = negoMessageRegex.exec(m.text);
                            return match && match[1] === serviceName;
                          });

                        if (lastNegoMessage) {
                          const negoMatch = negoMessageRegex.exec(
                            lastNegoMessage.text
                          );

                          const orderData = {
                            serviceId: negoMatch[2],
                            agreedPrice: parseFloat(
                              agreedPrice.replace(/\./g, "").replace(",", ".")
                            ),
                          };


                          handleCreateOrder(orderData, msg.id);
                        } else {
                          alert(
                            "Data layanan tidak ditemukan. Silakan coba lagi."
                          );
                        }
                      };

                      return (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                        >
                          <div className="max-w-xs lg:max-w-md">
                            <AcceptNegoCard
                              serviceName={serviceName}
                              agreedPrice={agreedPrice}
                              onConfirm={handleConfirmOrder}
                              isConfirmed={isAlreadyConfirmed}
                            />
                            <p
                              className={`text-xs mt-1 text-gray-500 ${msg.sender === "user" ? "text-right" : "text-left"
                                }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Check for Nego message
                    const negoMessageMatch = negoMessageRegex.exec(msg.text);

                    if (negoMessageMatch) {
                      const serviceName = negoMessageMatch[1];
                      const serviceId = negoMessageMatch[2];
                      const originalPrice = negoMessageMatch[3];
                      const negoPrice = negoMessageMatch[4];
                      const pesanBuyer = negoMessageMatch[5];
                      const description = negoMessageMatch[6];
                      const imageUrl = negoMessageMatch[7];
                      // Capture rating if present (Index 8), default to 0.0 if not found (or keep 4.5 if you prefer a 'new' default)
                      const parsedRating = negoMessageMatch[8]
                        ? parseFloat(negoMessageMatch[8])
                        : 0;

                      const negoCardData = {
                        image: imageUrl,
                        serviceName: serviceName,
                        serviceId: serviceId,
                        description: pesanBuyer || description,
                        originalPrice: `Rp ${originalPrice}`,
                        negoPrice: `Rp ${negoPrice}`,
                        rating: parsedRating,
                      };

                      const messageSenderRole =
                        msg.sender === "user"
                          ? isBuyer
                            ? "BUYER"
                            : "SELLER"
                          : isBuyer
                            ? "SELLER"
                            : "BUYER";

                      const currentUserRole = isBuyer ? "BUYER" : "SELLER";

                      const handleAcceptNego = () => {

                        const acceptMessage = `Penawaran Anda sebesar Rp ${negoPrice} untuk layanan "${serviceName}" DITERIMA! 🎉`;
                        socket.emit("send_message", {
                          id_buyer: isBuyer ? myId : partnerId,
                          id_seller: isBuyer ? partnerId : myId,
                          text: acceptMessage,
                          sender_role: currentUserRole,
                        });
                      };

                      const handleRejectNego = () => {

                        const rejectMessage = `Maaf, penawaran Anda sebesar Rp ${negoPrice} untuk layanan "${serviceName}" tidak dapat kami terima. Terima kasih atas pengertiannya.`;
                        socket.emit("send_message", {
                          id_buyer: isBuyer ? myId : partnerId,
                          id_seller: isBuyer ? partnerId : myId,
                          text: rejectMessage,
                          sender_role: currentUserRole,
                        });
                      };

                      const handleCounterOffer = (newPrice) => {


                        const formattedOriginalPrice = originalPrice.replace(
                          /\./g,
                          ""
                        );
                        const formattedNewPrice =
                          newPrice.toLocaleString("id-ID");

                        const counterNegoMessage = `Halo, saya tertarik dengan layanan "${serviceName}". (ServiceID: ${serviceId}) (Harga: Rp ${formattedOriginalPrice}) (Nego: Rp ${formattedNewPrice}) (Pesan: ${pesanBuyer || description
                          }) (Deskripsi: ${description}) (Gambar: ${imageUrl})`;

                        socket.emit("send_message", {
                          id_buyer: isBuyer ? myId : partnerId,
                          id_seller: isBuyer ? partnerId : myId,
                          text: counterNegoMessage,
                          sender_role: currentUserRole,
                        });
                      };

                      return (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                        >
                          <div className="max-w-xs lg:max-w-md">
                            <ServiceNegoCard
                              data={negoCardData}
                              onAccept={handleAcceptNego}
                              onReject={handleRejectNego}
                              onCounterOffer={handleCounterOffer}
                              isSeller={!isBuyer}
                              senderRole={messageSenderRole}
                              myRole={currentUserRole}
                            />
                            <p
                              className={`text-xs mt-1 text-gray-500 ${msg.sender === "user" ? "text-right" : "text-left"
                                }`}
                            >
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    // Check for Auto message
                    let autoMessageMatch = autoMessageRegex.exec(msg.text);

                    // Fallback: If regex fails but it looks like an auto-message, force it (Safety Net)
                    // We check for unique structural markers instead of just the prefix to be more robust
                    const isLikelyAutoMessage = !autoMessageMatch && (
                      msg.text.includes("(ServiceID:") &&
                      msg.text.includes("(Harga:")
                    );

                    if (isLikelyAutoMessage) {
                      // Attempt to extract at least the service name roughly
                      const nameMatch = msg.text.match(/layanan "([\s\S]+?)"/);
                      const fallbackName = nameMatch ? nameMatch[1] : "Layanan";

                      autoMessageMatch = [
                        msg.text,
                        fallbackName, // 1: Name
                        "", // 2: ID
                        "", // 3: Price
                        "", // 4: Desc
                        ""  // 5: Image
                      ];
                    }

                    if (autoMessageMatch) {
                      const serviceName = autoMessageMatch[1];
                      const serviceId = autoMessageMatch[2] || "unknown";
                      const price = autoMessageMatch[3] || "-";
                      const description = autoMessageMatch[4] || "";
                      const imageUrl = autoMessageMatch[5] || "https://placehold.co/100?text=Service"; // Fallback image

                      const cardData = {
                        image: imageUrl,
                        serviceName: serviceName,
                        serviceId: serviceId,
                        description: description,
                        status: "Tanya produk ini!",
                        price: price.startsWith("Rp") ? price : `Rp ${price}`,
                        rating: 4.5,
                      };

                      // BUYER & SELLER POV: Show "Inquiry Notification"
                      return (
                        <div key={msg.id} className="w-full my-6 flex flex-col items-center animate-in fade-in duration-500">
                          {/* Subtle Context Separator */}
                          <div className="w-1/3 h-px bg-gray-200 mb-6"></div>

                          <div className="w-full max-w-lg bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                            <p className="text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
                              {isBuyer ? "Anda menanyakan jasa ini" : "Pembeli menanyakan jasa ini"}
                            </p>

                            <div className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                              <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                <img
                                  src={imageUrl}
                                  alt={serviceName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.target.src = "https://placehold.co/100?text=IMG"; }}
                                />
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <h4 className="font-bold text-gray-800 text-sm truncate">{serviceName}</h4>
                                <p className="text-primary font-bold text-sm mt-0.5">{cardData.price}</p>
                              </div>
                              {serviceId !== "unknown" && (
                                <Link to={`/service/${serviceId}`}>
                                  <Button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors shadow-sm">
                                    Lihat
                                  </Button>
                                </Link>
                              )}
                            </div>

                            <div className="flex justify-center items-center gap-2">
                              <div className="h-px w-8 bg-gray-200"></div>
                              <p className="text-[10px] text-gray-400">
                                {msg.timestamp}
                              </p>
                              <div className="h-px w-8 bg-gray-200"></div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Regular text message
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md xl:max-w-lg ${msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-white text-gray-800"
                            } rounded-2xl px-4 py-3 shadow-sm`}
                        >
                          <p className="text-sm md:text-base">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${msg.sender === "user"
                              ? "text-white/70"
                              : "text-gray-500"
                              }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                {isPartnerTyping && (
                  <div className="flex justify-start transition-all duration-300">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm rounded-bl-none">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>

            </div>
            {/* Input Area */}
            <div
              className={`bg-white border-t border-gray-200 p-4 ${location.pathname.includes("dashboard") ? "" : ""
                }`}
            >
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <Input
                  ref={inputRef}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={text}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all hover:scale-105 flex items-center justify-center"
                >
                  <FaPaperPlane size={18} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-2">Pilih Percakapan</p>
            <p className="text-sm">
              Pilih chat dari daftar untuk memulai percakapan
            </p>
          </div>
        )}
      </div>

      {/* SUCCESS MODAL */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        width="max-w-sm"
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <FaCheckCircle className="text-green-500 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Pesanan Berhasil Dibuat!
          </h3>
          <p className="text-gray-600 mb-6">
            Pesanan Anda telah diteruskan ke penjual. Silakan cek status pesanan
            di halaman Dashboard.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full justify-center py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              onClick={() =>
                navigate(
                  isBuyer
                    ? "/setting/order"
                    : "/dashboard/manage-order/process-order"
                )
              }
            >
              Lihat Status Pesanan
            </Button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatLayout;
