import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../../../config/socket";
import { API_BASE_URL } from "../../../../api/api";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import { useContactRealtime } from "../../../../hooks/contactRealtime";
import {
  FaSearch,
  FaArrowLeft,
  FaPaperPlane,
  FaStar,
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaExchangeAlt,
} from "react-icons/fa";
import axiosInstance from "../../../utils/axios";
import {
  getContactForBuyer,
  getContactForSeller,
  selectContactBuyerStatus,
  selectContactSellerStatus,
} from "../../../../features/chatSlice";

const formatTime = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  const now = new Date();

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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

// REGEX PATTERNS
const autoMessageRegex =
  /Halo, saya tertarik dengan layanan "(.+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Deskripsi: ([^\)]+)\) \(Gambar: (.+?)\)/;

const negoMessageRegex =
  /Halo, saya tertarik dengan layanan "(.+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Nego: Rp ([^\)]+)\) \(Pesan: (.*?)\) \(Deskripsi: ([^\)]+)\) \(Gambar: (.+?)\)/;

const acceptNegoRegex =
  /Penawaran Anda sebesar Rp (.+?) untuk layanan "(.+?)" DITERIMA! 🎉/;

// ACCEPT NEGO CONFIRMATION CARD
const AcceptNegoCard = ({
  serviceName,
  agreedPrice,
  onConfirm,
  isConfirmed,
}) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 overflow-hidden shadow-lg max-w-sm">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 p-3 rounded-full">
            <FaCheck className="text-white text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-green-800">
              🎉 Penawaran Diterima!
            </h3>
            <p className="text-sm text-green-600">Selamat, nego berhasil!</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
          <p className="text-xs text-gray-500 mb-1">Layanan</p>
          <p className="font-semibold text-gray-800 mb-3">{serviceName}</p>

          <p className="text-xs text-gray-500 mb-1">Harga yang Disepakati</p>
          <p className="text-2xl font-bold text-green-600">Rp {agreedPrice}</p>
        </div>

        {!isConfirmed ? (
          <>
            <button
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <FaCheck size={16} />
              Konfirmasi & Lanjutkan Pemesanan
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              💡 Klik untuk melanjutkan ke halaman pemesanan
            </p>
          </>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
              <FaCheck className="text-green-600" />
              Pesanan telah dibuat
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// SERVICE NEGO CARD COMPONENT
const ServiceNegoCard = ({
  data,
  onAccept,
  onReject,
  onCounterOffer,
  isSeller,
  senderRole,
  myRole,
}) => {
  const [showNegoInput, setShowNegoInput] = useState(false);
  const [counterPrice, setCounterPrice] = useState("");

  const canTakeAction = senderRole !== myRole;

  const handleCounterOffer = () => {
    if (counterPrice && parseInt(counterPrice) > 0) {
      onCounterOffer(parseInt(counterPrice));
      setShowNegoInput(false);
      setCounterPrice("");
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-sm">
      {/* Image Section */}
      <div className="relative">
        <img
          src={data.image}
          alt={data.serviceName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <FaStar className="text-yellow-400" size={14} />
          <span className="text-sm font-semibold">{data.rating || 4.5}</span>
        </div>
        <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          💰 PENAWARAN NEGO
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {data.serviceName}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          Ket: {data.description || "Tidak ada detail kebutuhan"}
        </p>

        {/* Price Section with Strike-through */}
        <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Harga Normal</p>
              <p className="text-lg text-gray-400 line-through font-semibold">
                {data.originalPrice}
              </p>
            </div>
            <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              NEGO!
            </div>
          </div>
          <div className="pt-2 border-t border-orange-200">
            <p className="text-xs text-gray-600 mb-1">Harga Penawaran</p>
            <p className="text-2xl font-bold text-orange-600">
              {data.negoPrice}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {canTakeAction ? (
          !showNegoInput ? (
            <div className="flex gap-2">
              <button
                onClick={onAccept}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
              >
                <FaCheck size={14} />
                Terima
              </button>
              <button
                onClick={onReject}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
              >
                <FaTimes size={14} />
                Tolak
              </button>
              <button
                onClick={() => setShowNegoInput(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 flex items-center justify-center gap-1 shadow-md"
              >
                <FaExchangeAlt size={14} />
                Nego
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  placeholder="Masukkan harga balasan"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCounterOffer}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-bold transition-all"
                >
                  Kirim Nego
                </button>
                <button
                  onClick={() => {
                    setShowNegoInput(false);
                    setCounterPrice("");
                  }}
                  className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl text-sm font-bold transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-sm text-gray-600 font-medium flex items-center justify-center gap-2">
              <span className="animate-pulse">⏳</span>
              Menunggu respons {isSeller ? "buyer" : "penjual"}
            </p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            {canTakeAction
              ? "💡 Giliran Anda untuk merespons penawaran"
              : "💡 Menunggu respons dari pihak lain"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ data }) => {
  return (
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
              💬 {data.status}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Harga</p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-primary">{data.price}</p>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg text-sm font-semibold">
            Lihat Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

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

  useContactRealtime(socket, myId, role, isBuyer);

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
  const chatContainerRef = useRef(null);

  const listLoading = buyerStatus === "loading" || sellerStatus === "loading";

  // USEEFFECT #1: LOAD CONTACTS
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
    shouldRefresh,
    navigate,
    location.pathname,
  ]);

  // USEEFFECT #2: FETCH MESSAGES
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
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchData();
  }, [partnerId, token, isBuyer]);

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

  // USEEFFECT #4: JOIN CHAT ROOM
  useEffect(() => {
    if (!partnerId || !myId) return;

    const buyerId = isBuyer ? myId : partnerId;
    const sellerId = isBuyer ? partnerId : myId;
    const roomId = `${buyerId}_${sellerId}`;

    socket.emit("join_room", { buyerId, sellerId });
    console.log(`👥 Joining chat room: ${roomId}`);

    return () => {
      console.log(`👋 Leaving chat room: ${roomId}`);
    };
  }, [partnerId, myId, isBuyer]);

  // USEEFFECT #5: LISTEN TO MESSAGES IN ACTIVE CHAT
  useEffect(() => {
    if (!partnerId || !myId) return;

    const handleNewMessage = (newMessage) => {
      console.log("💬 New message in active chat:", newMessage);

      const messagePartnerId = isBuyer
        ? newMessage.id_seller
        : newMessage.id_buyer;

      if (messagePartnerId !== partnerId) {
        console.log("⏭️ Message not for this chat, skipping");
        return;
      }

      const isMyMessage =
        (isBuyer && newMessage.sender_role?.toUpperCase() === "BUYER") ||
        (!isBuyer && newMessage.sender_role?.toUpperCase() === "SELLER");

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
            text: newMessage.text,
            timestamp: formatTime(newMessage.created_at),
            sender: isMyMessage ? "user" : "seller",
          },
        ];
      });
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [partnerId, myId, isBuyer]);

  // USEEFFECT #6: AUTO SCROLL
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const filteredConversations = conversations.filter((conv) =>
    conv.name?.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleCreateOrder = async (orderData, messageId) => {
    setIsCreatingOrder(true);

    // Mark as confirmed immediately for better UX
    setConfirmedMessageIds((prev) => [...prev, messageId]);

    try {
      console.log("📦 Creating order with data:", orderData);

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

      console.log("✅ Order created successfully:", response.data);

      if (response.data.status === "success") {
        const orderId = response.data.data.id;

        // Send confirmation to chat
        const confirmMessage = `✅ Pesanan telah dibuat! Order ID: #${orderId}`;
        socket.emit("send_message", {
          id_buyer: isBuyer ? myId : partnerId,
          id_seller: isBuyer ? partnerId : myId,
          text: confirmMessage,
          sender_role: "BUYER",
        });

        alert("Pesanan berhasil dibuat!");
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
    <div className="h-screen w-full flex bg-gray-50">
      <div
        className={`h-full sm:w-80 w-full bg-white border-r border-gray-200 flex flex-col ${
          chatMobile ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-gray-200">
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
                      console.log("✅ Buyer mengkonfirmasi pesanan");

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

                        console.log("📦 Creating order:", orderData);
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
                        className={`flex ${
                          msg.sender === "user"
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

                    const negoCardData = {
                      image: imageUrl,
                      serviceName: serviceName,
                      serviceId: serviceId,
                      description: pesanBuyer || description,
                      originalPrice: `Rp ${originalPrice}`,
                      negoPrice: `Rp ${negoPrice}`,
                      rating: 4.5,
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
                      console.log("✅ Nego diterima");
                      const acceptMessage = `Penawaran Anda sebesar Rp ${negoPrice} untuk layanan "${serviceName}" DITERIMA! 🎉`;
                      socket.emit("send_message", {
                        id_buyer: isBuyer ? myId : partnerId,
                        id_seller: isBuyer ? partnerId : myId,
                        text: acceptMessage,
                        sender_role: currentUserRole,
                      });
                    };

                    const handleRejectNego = () => {
                      console.log("❌ Nego ditolak");
                      const rejectMessage = `Maaf, penawaran Anda sebesar Rp ${negoPrice} untuk layanan "${serviceName}" tidak dapat kami terima. Terima kasih atas pengertiannya.`;
                      socket.emit("send_message", {
                        id_buyer: isBuyer ? myId : partnerId,
                        id_seller: isBuyer ? partnerId : myId,
                        text: rejectMessage,
                        sender_role: currentUserRole,
                      });
                    };

                    const handleCounterOffer = (newPrice) => {
                      console.log("🔄 Counter offer:", newPrice);

                      const formattedOriginalPrice = originalPrice.replace(
                        /\./g,
                        ""
                      );
                      const formattedNewPrice =
                        newPrice.toLocaleString("id-ID");

                      const counterNegoMessage = `Halo, saya tertarik dengan layanan "${serviceName}". (ServiceID: ${serviceId}) (Harga: Rp ${formattedOriginalPrice}) (Nego: Rp ${formattedNewPrice}) (Pesan: ${
                        pesanBuyer || description
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
                        className={`flex ${
                          msg.sender === "user"
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

                  // Check for Auto message
                  const autoMessageMatch = autoMessageRegex.exec(msg.text);

                  if (autoMessageMatch) {
                    const serviceName = autoMessageMatch[1];
                    const serviceId = autoMessageMatch[2];
                    const price = autoMessageMatch[3];
                    const description = autoMessageMatch[4];
                    const imageUrl = autoMessageMatch[5];

                    const cardData = {
                      image: imageUrl,
                      serviceName: serviceName,
                      serviceId: serviceId,
                      description: description,
                      status: "Tanya produk ini!",
                      price: `Rp ${price}`,
                      rating: 4.5,
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

                  // Regular text message
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
