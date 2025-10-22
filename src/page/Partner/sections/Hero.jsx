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
      className="relative w-full h-[1000px] md:h-[750px] lg:h-[900px] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPartner})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* hero */}
      <div className="relative z-10 px-6 md:px-18 lg:px-24 text-white text left mt-16 md:mt-39 lg:mt-23">
        <h1 className="text-[46px] md:text-[64px] lg:text-[96px] font-bold leading-snug sm:leading-tight">
          Keahlianmu, Pasar<br className="hidden md:block" /> Baru.
        </h1>
        <p className="mt-3 text-[14px] md:text-[20px] lg:text-[24px] font-light">
          Perluas jangkauan pelanggan di lingkungan terdekatmu. Gratis biaya pendaftaran!
        </p>

        <div className="mt-5 md:mt-6 lg:mt-8">
          <Link to={!token ? '/login' : '/'}>
            <Button
              variant="secondary"
              className="w-[190px] h-[40px] text-[13px] md:w-[220px] md:h-[46px] md:text-[15px] lg:w-[240px] lg:h-[50px] lg:text-[16px] font-semibold rounded-[10px]"
            >
              Gabung Sekarang, GRATIS!
            </Button>
          </Link>
        </div>
      </div>

      {/* Card*/}
      <div className="relative flex justify-center translate-y-[52%] md:translate-y-[67%] lg:translate-y-[77%] px-8 md:px-15 lg:px-4">
        <div className="w-[97%] md:w-[94%] lg:w-[90%] bg-white rounded-[15px] shadow-md p-5 md:p-7 lg:p-15">
          
          {/* text atas */}
          <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-10 mb-10">
            <div className="flex-1 text-left md:text-left">
              <h4 className="text-gray-500 text-lg font-medium">Tumbuh Bersama Komunitas</h4>
              <h2 className="text-[24px] md:text-[28px] lg:text-[35px] font-bold mt-2">
                Tingkatkan Penghasilan Tanpa Modal Promosi
              </h2>
            </div>

            <div className="flex-1 text-left">
              <p className="text-gray-600 text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed">
                PanggilAja adalah solusi digital yang membuat keahlian Anda ditemukan,
                membangun reputasi, dan memberi Anda kendali penuh atas usaha Anda.
              </p>
            </div>
          </div>

          {/* isi card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left gap-8 text-left">
            {isiCard.map((item) => (
              <div key={item.id} className="text-gray-800">
                <h3 className="font-semibold mb-3 text-[20px] md:text-[19px] lg:text-[23px]">{item.title}</h3>
                <p className="text-[14px] md:text-[14px] lg:text-[16px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
