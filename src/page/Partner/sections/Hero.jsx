import Button from "../../../components/common/Button";
import bgPartner from "../../../assets/bgPartner.jpg";
import { isiCard } from "../dummy/IsiCard";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../features/authSlice";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaRocket } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

import ModalAuth from "../../../components/modules/Modal/ModalAuth";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const token = useSelector(selectAccessToken);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollOpacity, setScrollOpacity] = useState(0.5);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const heroRef = useRef(null);
    const navigate = useNavigate();

    const handleJoinClick = () => {
        if (!token) {
            setShowAuthModal(true);
        } else {
            navigate("mitra-form");
        }
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Handle scroll for "Pasar Baru" text opacity
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const scrolled = window.scrollY;
                const heroHeight = heroRef.current.offsetHeight;

                // Calculate opacity: starts at 0.5, increases as user scrolls
                const newOpacity = Math.min(0.5 + (scrolled / heroHeight) * 2, 1);
                setScrollOpacity(newOpacity);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full">
            {/* Hero Section */}
            <div
                ref={heroRef}
                className="relative w-full min-h-[600px] md:min-h-[650px] lg:min-h-[800px] flex flex-col justify-center bg-cover bg-center bg-no-repeat pb-32 md:pb-40"
                style={{
                    backgroundImage: `url(${bgPartner})`,
                }}
            >
                {/* Gradient Overlay - Improved */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>

                {/* Hero Content */}
                <div
                    className={`relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 text-white transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                        } pt-16 md:pt-20`}
                >
                    {/* Main Heading with Scroll Effect */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4">
                        Keahlianmu,
                        <br />
                        <span
                            className="text-green-400 transition-opacity duration-300"
                            style={{ opacity: scrollOpacity }}
                        >
                            Pasar Baru.
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-base md:text-xl lg:text-2xl font-light text-gray-200 max-w-2xl leading-relaxed mb-4">
                        Perluas jangkauan pelanggan di lingkungan terdekatmu.
                        <span className="font-semibold text-white">
                            {" "}
                            Gratis biaya pendaftaran!
                        </span>
                    </p>

                    {/* Features List */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-sm">100% Gratis</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-sm">Tanpa Komisi</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <FaCheckCircle className="text-green-400" />
                            <span className="text-sm">Daftar 5 Menit</span>
                        </div>
                    </div>

                    {/* CTA Button - Now with proper z-index */}
                    <div className="relative z-30">
                        {/* <Link to={!token ? "/login" : "mitra-form"}> */}
                        <Button
                            variant="secondary"
                            className="group w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                            onClick={handleJoinClick}
                        >
                            Gabung Sekarang, GRATIS!
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                        {/* </Link> */}
                    </div>
                </div>
            </div>

            {/* Info Card Section - Fixed overlapping */}
            <div className="relative -mt-24 md:-mt-28 px-4 md:px-8 lg:px-16 xl:px-24 pb-12 md:pb-16 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
                        {/* Card Header */}
                        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 mb-8 md:mb-10">
                            {/* Left Side */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <FaRocket className="text-sm" />
                                    <span>Tumbuh Bersama Komunitas</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                                    Tingkatkan Penghasilan
                                    <br />
                                    <span className="text-primary">Tanpa Modal Promosi</span>
                                </h2>
                            </div>

                            {/* Right Side */}
                            <div className="flex-1 flex items-center">
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    <span className="font-semibold text-primary">PanggilAja</span>{" "}
                                    adalah solusi digital yang membuat keahlian Anda ditemukan,
                                    membangun reputasi, dan memberi Anda kendali penuh atas usaha
                                    Anda.
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8 md:mb-10"></div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {isiCard.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group relative p-6 rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-primary/5 hover:to-white"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Number Badge */}
                                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                                        <span className="text-2xl">{item.icon || "✨"}</span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* Hover Effect Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-8 md:mt-10 text-center p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-gray-700 text-base md:text-lg mb-4">
                                <span className="font-semibold text-primary">
                                    Siap untuk memulai?
                                </span>{" "}
                                Bergabunglah dengan ribuan profesional lainnya
                            </p>
                            {/* <Link to={!token ? "/login" : "mitra-form"}> */}
                            <Button
                                variant="primary"
                                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-white"
                                onClick={handleJoinClick}
                            >
                                Mulai Sekarang
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>

            <ModalAuth
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                title="Gabung Jadi Mitra"
                description="Untuk menjadi mitra dan mulai berjualan, Anda perlu memiliki akun terlebih dahulu. Yuk, daftar atau masuk sekarang!"
            />
        </div>
    );
}
