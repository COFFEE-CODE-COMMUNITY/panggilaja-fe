// FILE: src/components/modules/service/FaqService.jsx (PERBAIKAN)
import React, { useState } from 'react'; // <--- Import useState

const FaqService = () => {
    // State untuk mengelola FAQ yang sedang aktif/terbuka
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Data FAQ
    const faqsData = [
        {
            question: "Bagaimana alur pemesanan jasa di PanggilAja?",
            answer: `Alur pemesanan di PanggilAja sedikit berbeda dari e-commerce biasa. Pertama, Anda wajib menghubungi Mitra melalui tombol "Hubungi Sekarang" untuk menjelaskan detail masalah/kebutuhan Anda. Mitra akan memberikan estimasi harga awal. Setelah itu, jika Anda ingin bernegosiasi atau melanjutkan pesanan, Anda bisa menekan tombol "Nego-in Aja" untuk memulai proses negosiasi harga dan detail pesanan yang lebih lanjut.`
        },
        {
            question: "Apa arti 'Harga Terendah' dan 'Harga Tertinggi' di Detail Jasa?",
            answer: `Harga Terendah dan Harga Tertinggi adalah kisaran harga estimasi untuk berbagai jenis pekerjaan yang bisa ditawarkan oleh Mitra ini. Misalnya, untuk 'Tukang Bangunan', harga terendah mungkin untuk perbaikan kecil seperti retakan tembok, sedangkan harga tertinggi untuk pembangunan ulang sebagian. Ini berfungsi sebagai panduan awal agar Anda memiliki gambaran biaya, namun harga final akan disepakati setelah Anda berkomunikasi langsung dengan Mitra.`
        },
        {
            question: "Bagaimana proses negosiasi harga di PanggilAja?",
            answer: `Setelah Mitra memberikan estimasi harga di chat, Anda dapat memulai negosiasi dengan menekan tombol "Nego-in Aja". Ini akan mengirim pesan negosiasi otomatis ke Mitra. Mitra kemudian bisa memilih untuk: **1) Terima tawaran Anda**, **2) Tolak tawaran Anda**, atau **3) Nego-in Lagi** dengan harga baru. Jika Mitra memilih 'Nego-in Lagi', Anda akan mendapatkan notifikasi dan dapat membalas dengan 'Nego Balik', 'Terima', atau 'Tolak'. Proses ini berlanjut hingga ada kesepakatan.`
        },
        {
            question: "Kapan saya harus menekan tombol 'Nego-in Aja'?",
            answer: `Anda dapat menekan tombol "Nego-in Aja" setelah Anda dan Mitra selesai berkomunikasi di chat dan Mitra sudah memberikan estimasi harga awal atau detail pekerjaan. Tombol ini menginisiasi proses resmi negosiasi harga atau konfirmasi pesanan dengan detail yang lebih terstruktur. Jadi, pastikan Anda sudah cukup berdiskusi di chat terlebih dahulu!`
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="mt-1 flex w-full max-w-4xl flex-col">
            {faqsData.map((faq, index) => (
                <div 
                    key={index} 
                    className={`relative w-full rounded-md border border-gray-300 lg:px-6 lg:py-5 md:px-5 md:py-4 px-4 py-3 cursor-pointer ${index > 0 ? 'my-3' : ''}`} // Tambahkan margin kecuali untuk FAQ pertama
                    onClick={() => toggleFaq(index)}
                >
                    <div className="max-w-3xl">
                        <h2 className="text-black text-h5">
                            {faq.question}
                        </h2>
                        {/* Tampilkan jawaban hanya jika FAQ ini sedang terbuka */}
                        {openFaqIndex === index && (
                            <p className="font-inter mt-4 md:text-h5 text-h6 font-light text-gray-500">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                    {/* Icon Plus/Minus */}
                    <div className="absolute right-5 top-5"> {/* Mengubah <a> menjadi <div> */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="white"></circle>
                            <path d="M7.04688 11.9999H16.9469" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            {/* Tampilkan garis vertikal hanya jika FAQ sedang tertutup */}
                            {openFaqIndex !== index && (
                                <path d="M12 7.05005V16.95" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            )}
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FaqService;