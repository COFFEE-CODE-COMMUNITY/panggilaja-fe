import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../utils/socket";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import {
  FaSearch,
  FaArrowLeft,
  FaPaperPlane,
  FaStar,
  FaEllipsisV,
} from "react-icons/fa";
import axiosInstance from "../../../utils/axios";
import {
  getContactForBuyer,
  getContactForSeller,
  selectContactBuyerStatus,
  selectContactSellerStatus,
  updateLastMessage,
} from "../../../../features/chatSlice";

const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Gunakan format 24 jam
  };

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("id-ID", timeOptions);
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isYesterday) {
    return "Kemarin";
  }

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  if (date > sevenDaysAgo) {
    const dayOptions = { weekday: "long" };
    return new Intl.DateTimeFormat("id-ID", dayOptions).format(date);
  }

  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", dateOptions);
};

const autoMessageRegex =
  /Halo, saya tertarik dengan layanan "(.+?)". \(Harga: Rp (.+?)\) \(Deskripsi: (.*?)\) \(Gambar: (.*?)\)/;
// Service Card Component
const ServiceCard = ({ data }) => (
  <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm">
    <div className="relative">
      <img
        src={data.image}
        alt={data.serviceName}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
        <FaStar className="text-yellow-400" size={14} />
        <span className="text-sm font-semibold">{data.rating}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg text-gray-800 mb-2">
        {data.serviceName}
      </h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {data.description}
      </p>
      {data.status && (
        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-bold text-blue-700 text-center">
            📦 {data.status}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Harga</p>
          <p className="text-xl font-bold text-primary">{data.price}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
          Lihat Detail
        </Button>
      </div>
    </div>
  </div>
);

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

  const buyerStatus = useSelector(selectContactBuyerStatus);
  const sellerStatus = useSelector(selectContactSellerStatus);
  const conversationsData = useSelector(
    (state) => state.chat.contactBuyer || state.chat.contactSeller
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
  const chatContainerRef = useRef(null);

  const listLoading = buyerStatus === "loading" || sellerStatus === "loading";

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    if (!myId) return;

    if (isBuyer && (buyerStatus === "idle" || shouldRefresh)) {
      dispatch(getContactForBuyer(myId));
    } else if (!isBuyer && (sellerStatus === "idle" || shouldRefresh)) {
      dispatch(getContactForSeller(myId));
    }

    if (shouldRefresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    dispatch,
    myId,
    isBuyer,
    buyerStatus,
    sellerStatus,
    location,
    navigate,
    shouldRefresh,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!partnerId || !token) return;

      setMessagesLoading(true);
      setMessages([]);

      try {
        const messagesResponse = await axiosInstance.get(
          `${API_BASE_URL}/chat/${partnerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("📩 Messages Response:", messagesResponse.data);

        let finalMessages = [];

        if (messagesResponse.data.success) {
          const formattedMessages = messagesResponse.data.data.map((msg) => ({
            id: msg.id,
            type: "text",
            text: msg.text,
            timestamp: formatTime(msg.created_at),
            sender:
              (isBuyer && msg.sender_role.toUpperCase() === "BUYER") ||
              (!isBuyer && msg.sender_role.toUpperCase() === "SELLER")
                ? "user"
                : "seller",
          }));
          finalMessages = [...formattedMessages];
        }

        setMessages(finalMessages);
      } catch (error) {
        console.error("❌ Error fetching messages or service card:", error);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchData();
  }, [partnerId, token, myId, isBuyer, dispatch]);

  useEffect(() => {
    console.log("ID DARI URL (partnerId):", partnerId);
    console.log("ARRAY CONVERSATIONS (yang kita cari):", conversations);
    if (partnerId && conversations.length > 0) {
      const selected = conversations.find(
        (c) => c.id.trim() === partnerId.trim()
      );

      console.log("HASIL .find():", selected);

      setSelectedChat(selected);
    } else if (!partnerId) {
      setSelectedChat(null);
    }
  }, [partnerId, conversations]);

  useEffect(() => {
    if (!myId) return;

    const handleNewMessage = (newMessage) => {
      console.log("📥 New message received (global listener):", newMessage);

      const msgPartnerId = isBuyer ? newMessage.id_seller : newMessage.id_buyer; // --- Logika untuk Sidebar List ---

      if (
        (isBuyer && newMessage.id_buyer === myId) ||
        (!isBuyer && newMessage.id_seller === myId)
      ) {
        dispatch(
          updateLastMessage({
            partnerId: msgPartnerId,
            text: newMessage.text,
            time: newMessage.created_at,
          })
        );
      } // --- Logika untuk Gelembung Chat Aktif ---

      if (partnerId && partnerId === msgPartnerId) {
        console.log("...and it's for the active chat window!");

        // --- INI DIA PERBAIKANNYA ---
        // Kita gunakan logika yang SAMA PERSIS dengan history fetch
        const isMyMessage =
          (isBuyer && newMessage.sender_role.toUpperCase() === "BUYER") ||
          (!isBuyer && newMessage.sender_role.toUpperCase() === "SELLER");

        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg.id === newMessage.id);
          if (exists) {
            console.log("⚠️ Message already exists, skipping");
            return prevMessages;
          }
          return [
            ...prevMessages,
            {
              id: newMessage.id,
              type: "text",
              Teks: newMessage.text,
              timestamp: formatTime(newMessage.created_at),
              sender: isMyMessage ? "user" : "seller", // <-- Sekarang ini akan benar
            },
          ];
        });
      }
    };

    socket.on("receive_message", handleNewMessage);

    // ... sisa socket.emit dan return ...
    socket.emit("join_user_room", {
      userId: myId,
      role: isBuyer ? "BUYER" : "SELLER",
    });

    if (partnerId) {
      const buyerId = isBuyer ? myId : partnerId;
      const sellerId = isBuyer ? partnerId : myId;
      socket.emit("join_room", { buyerId, sellerId });
      console.log(`👥 Joining specific chat room: ${buyerId}_${sellerId}`);
    }

    return () => {
      console.log("🧹 Cleaning up chat listeners...");
      socket.off("receive_message", handleNewMessage);
    };
  }, [myId, isBuyer, dispatch, partnerId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Filter conversations
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !partnerId || !myId) return;

    const messageData = {
      id_buyer: isBuyer ? myId : partnerId,
      id_seller: isBuyer ? partnerId : myId,
      text: text,
      sender_role: isBuyer ? "BUYER" : "SELLER",
    };

    console.log("📤 Emitting message via socket:", messageData);
    socket.emit("send_message", messageData);

    setText("");
  };

  const handleSelectChat = (conversation) => {
    setChatMobile(true);
    navigate(`/chat/${conversation.id}`);
  };

  const handleBackToHome = () => navigate("/");

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Sidebar - Chat List */}
      <div
        className={`h-full sm:w-80 w-full bg-white border-r border-gray-200 flex flex-col ${
          chatMobile ? "hidden sm:flex" : "flex"
        }`}
      >
        {/* Header with Back Button */}
        <div className="p-4 border-b border-gray-200">
          {/* Back Button and Title in one row */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBackToHome}
              className="p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
            >
              <FaArrowLeft size={18} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 flex-1 text-center">
              Pesan
            </h2>
            {/* Spacer untuk balance (sama lebar dengan button) */}
            <div className="w-10"></div>
          </div>

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
        <div className="flex-1 overflow-y-auto">
          {listLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectChat(conv)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedChat?.id === conv.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      conv.avatar ||
                      `https://ui-avatars.com/api/?name=${conv.name}`
                    }
                    alt={conv.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
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
        className={`flex-1 flex flex-col ${
          chatMobile ? "flex" : "hidden sm:flex"
        }`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChatMobile(false)}
                  className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {selectedChat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
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
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaEllipsisV className="text-gray-600" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                messages.map((msg) => {
                  const autoMessageMatch = autoMessageRegex.exec(msg.text);

                  if (autoMessageMatch) {
                    const serviceName = autoMessageMatch[1];
                    const price = autoMessageMatch[2];
                    const description = autoMessageMatch[3];
                    const imageUrl = autoMessageMatch[4];

                    const cardData = {
                      image: imageUrl,
                      serviceName: serviceName,
                      description: description,
                      status: "Orderan Masuk!",
                      price: `Rp ${price}`,
                      rating: 0,
                    };

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="max-w-xs lg:max-w-md">
                          <ServiceCard data={cardData} />
                          <p
                            className={`text-xs mt-1 text-gray-500 ${
                              msg.sender === "user" ? "text-right" : "text-left"
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                          msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-white text-gray-800"
                        } rounded-2xl px-4 py-3 shadow-sm`}
                      >
                        <p className="text-sm md:text-base">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === "user"
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
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-3"
              >
                <Input
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
          // Empty State
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
    </div>
  );
};

export default ChatLayout;
