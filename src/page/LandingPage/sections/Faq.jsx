import React, { useState, useRef, useEffect } from "react";
import { dataFaq } from "../dummy/DataFaq";
import { FaChevronDown, FaQuestionCircle, FaCheckCircle } from "react-icons/fa";

export default function Faq() {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 md:py-20 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 md:gap-16">
          {/* Left Side - Header Section */}
          <div className="flex-1 lg:sticky lg:top-24 lg:self-start">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
      <FaQuestionCircle className="text-sm" />
      <span>Pusat Bantuan Pelanggan</span>
    </div>

    {/* Title */}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
      Panduan Mudah
      <br />
      <span className="text-primary">Memesan Jasa</span>
    </h2>

    {/* Description */}
    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
      Temukan semua informasi yang Anda butuhkan tentang alur pemesanan, negosiasi harga, dan cara mendapatkan Mitra terbaik.
    </p>

    {/* Featured Question */}
    <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-6">
      <p className="text-sm font-semibold text-primary mb-2">
        Proses Penting
      </p>
      <p className="text-gray-800 font-medium">
        Bagaimana alur pemesanan dan negosiasi harga di PanggilAja?
      </p>
      <p className="text-gray-600 text-sm mt-2">
        Lihat panduan lengkapnya di daftar pertanyaan →
      </p>
    </div>

    {/* Contact Info */}
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <p className="text-sm text-gray-600 mb-3">
        Perlu bantuan mendesak seputar pesanan Anda?
      </p>
      <p className="text-gray-800 font-semibold mb-4">
        Tim Customer Service kami siap membantu Anda.
      </p>
      <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
        Hubungi Customer Service
      </button>
    </div>
</div>

          {/* Right Side - FAQ Accordion */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {dataFaq.map((item, index) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-300 ${
                      openId === item.id ? "bg-primary/5" : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Question Button */}
                    <button
                      className="w-full flex items-start gap-4 p-6 text-left cursor-pointer group"
                      onClick={() => toggleFaq(item.id)}
                    >
                      {/* Number Badge */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          openId === item.id
                            ? "bg-primary text-white scale-110"
                            : "bg-gray-100 text-gray-600 group-hover:bg-primary/20 group-hover:text-primary"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Question Text */}
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-base md:text-lg leading-relaxed transition-colors duration-300 ${
                            openId === item.id
                              ? "text-primary"
                              : "text-gray-900 group-hover:text-primary"
                          }`}
                        >
                          {item.question}
                        </h3>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <FaChevronDown
                          className={`text-gray-400 transition-all duration-300 ${
                            openId === item.id
                              ? "rotate-180 text-primary"
                              : "group-hover:text-primary"
                          }`}
                          size={20}
                        />
                      </div>
                    </button>

                    {/* Answer - Smooth Collapse/Expand */}
                    <div
                      ref={(el) => (contentRefs.current[item.id] = el)}
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight:
                          openId === item.id
                            ? `${contentRefs.current[item.id]?.scrollHeight}px`
                            : "0px",
                      }}
                    >
                      <div className="px-6 pb-6 pl-[72px]">
                        <div className="bg-white rounded-lg p-4 border-l-2 border-primary/30">
                          <div className="flex items-start gap-3">
                            <FaCheckCircle
                              className="text-green-500 mt-1 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Tidak menemukan jawaban yang Anda cari?{" "}
                <button className="text-primary font-semibold hover:underline">
                  Ajukan Pertanyaan
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
