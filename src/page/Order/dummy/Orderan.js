import bgPartner from "../../../assets/bgPartner.jpg";
import Bannerr from "../../../assets/Bannerr.jpeg"
import bgAuth from "../../../assets/bgAuth.jpg"

const Orderan = [
    {
        id: "ORD001",
        service_id: "Cuci baju",
        seller_id: "Siti cuci baju",
        status: "proses",
        tanggal: "2025-11-08",
        pesan_tambahan: "Mohon datang jam 9 pagi",
        total_harga: 150000,
        image: bgAuth,
    },
    {
        id: "ORD002",
        service_id: "Jasa bersih tanaman",
        seller_id: "Hanum Flower",
        status: "selesai",
        tanggal: "2025-11-05",
        pesan_tambahan: "bunga saya jangan rusak",
        total_harga: 200000,
        image: Bannerr,
    },
    {
        id: "ORD003",
        service_id: "Pijat Gacor",
        seller_id: "Pijat Pak Asep",
        status: "proses",
        tanggal: "2025-11-10",
        pesan_tambahan: "",
        total_harga: 175000,
        image: bgPartner,
    },
];

export default Orderan;
