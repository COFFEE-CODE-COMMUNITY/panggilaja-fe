import Button from "../../../components/common/Button";
import bgPartner from "../../../assets/bgPartner.jpg";
import { isiCard } from "../dummy/IsiCard"
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../features/authSlice";
import { Link } from "react-router-dom";

export default function Hero() {
  const token = useSelector(selectAccessToken)
  return (
    <div
      className="relative w-full min-h-[450px] md:h-[900px] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPartner})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* hero */}
      <div className="relative z-10 px-6 sm:px-10 md:px-24 text-white text left mt-16 md:mt-0">
        <h1 className="text-[36px] sm:text-[56px] md:text-[96px] font-bold leading-snug sm:leading-tight">
          Keahlianmu, Pasar<br className="hidden md:block" /> Baru.
        </h1>
        <p className="mt-3 sm:mt-4 text-[15px] sm:text-lg md:text-[20px] font-light">
          Perluas jangkauan pelanggan di lingkungan terdekatmu. Gratis biaya pendaftaran!
        </p>

        <div className="mt-6 sm:mt-8 md:mt-10">
          <Link to={!token ? '/login' : '/'}>
            <Button
              variant="secondary"
              className="w-[200px] sm:w-[240px] md:w-[250px] h-[42px] sm:h-[48px] text-white text-[13px] sm:text-[16px] font-semibold rounded-[10px]"
            >
              Gabung Sekarang, GRATIS!
            </Button>
          </Link>
        </div>
      </div>

      {/* Card*/}
      <div className="relative flex justify-center translate-y-[49%] md:translate-y-[85%] px-4 sm:px-0">
        <div className="w-full sm:w-[90%] md:w-[1200px] bg-white rounded-[15px] shadow-md p-6 sm:p-10 md:p-14">
          
          {/* text atas */}
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10 mb-10">
            <div className="flex-1 text-left md:text-left">
              <h4 className="text-gray-500 text-lg font-medium">Tumbuh Bersama Komunitas</h4>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Tingkatkan Penghasilan Tanpa Modal Promosi
              </h2>
            </div>

            <div className="flex-1 text-left">
              <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed">
                PanggilAja adalah solusi digital yang membuat keahlian Anda ditemukan,
                membangun reputasi, dan memberi Anda kendali penuh atas usaha Anda.
              </p>
            </div>
          </div>

          {/* isi card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8 text-left">
            {isiCard.map((item) => (
              <div key={item.id} className="text-gray-800">
                <h3 className="font-semibold text-lg md:text-[20px] mb-3">{item.title}</h3>
                <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
