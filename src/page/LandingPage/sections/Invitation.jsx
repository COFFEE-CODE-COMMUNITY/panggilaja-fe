import InvitationCard from "../../../components/modules/Cards/InvitationCard";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaHandshake,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Invitation = () => {
  return (
    <div className="w-full md:my-[40px] my-[50px]">
      {/* Section Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
          Pilih Peran Anda
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pengguna yang telah mempercayai platform
          kami
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[20px] gap-[10px] w-full">
        {/* Card 1: Cari Jasa */}
        <InvitationCard className="gap-[15px] md:gap-[20px] group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

          {/* Icon */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 group-hover:bg-white/30 transition-all duration-300">
            <FaSearch className="text-white text-xl md:text-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="font-bold lg:text-h1 md:text-h2 text-h3 text-white mb-3 md:mb-4 leading-tight">
              Saya Ingin Mencari Jasa Terbaik
            </h1>
            <p className="lg:text-h5 md:text-h6 text-[14px] text-white/90 leading-relaxed mb-4">
              Temukan ahli di radius 3 KM Anda, lihat ulasan tepercaya, dan
              segera mulai negosiasi harga.
            </p>

            {/* Feature List */}
            <div className="space-y-2 mb-6 md:mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Ribuan mitra terpercaya
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Ulasan real dari pelanggan
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Proses booking mudah & cepat
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <Link to="/all-service-result" className="relative z-10 w-full">
            <Button
              variant="primary"
              className="w-full text-white rounded-full lg:h-[52px] md:h-[45px] h-[40px] lg:text-h4 md:text-h5 text-h6 font-semibold flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn"
            >
              <span>Mulai cari jasa terdekat</span>
              <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </InvitationCard>

        {/* Card 2: Jadi Mitra */}
        <InvitationCard className="gap-[15px] md:gap-[20px] group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
          {/* Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

          {/* Icon */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 group-hover:bg-white/30 transition-all duration-300">
            <FaHandshake className="text-white text-xl md:text-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="font-bold lg:text-h1 md:text-h2 text-h3 text-white mb-3 md:mb-4 leading-tight">
              Saya Ingin Menjadi Mitra & Berpenghasilan
            </h1>
            <p className="lg:text-h5 md:text-h6 text-[14px] text-white/90 leading-relaxed mb-4">
              Ubah keahlian Anda menjadi penghasilan stabil. Proses pendaftaran
              mudah, GRATIS, dan sepenuhnya transparan.
            </p>

            {/* Feature List */}
            <div className="space-y-2 mb-6 md:mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  100% GRATIS tanpa biaya tersembunyi
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Kelola jadwal & harga sendiri
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FaCheckCircle className="text-sm flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  Dapatkan pelanggan potensial
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <Link to="/partner" className="relative z-10 w-full">
            <Button
              variant="primary"
              className="w-full text-white rounded-full lg:h-[52px] md:h-[45px] h-[40px] lg:text-h4 md:text-h5 text-h6 font-semibold flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn"
            >
              <span>Daftar & Raih Peluang GRATIS</span>
              <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </InvitationCard>
      </div>

      {/* Bottom Stats - Optional */}
      <div className="grid grid-cols-3 gap-4 mt-8 md:mt-12 text-center">
        <div className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
          <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
            10K+
          </p>
          <p className="text-xs md:text-sm text-gray-600">Mitra Aktif</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
          <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
            50K+
          </p>
          <p className="text-xs md:text-sm text-gray-600">Pengguna</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
          <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
            4.8
          </p>
          <p className="text-xs md:text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
