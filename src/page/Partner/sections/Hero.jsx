import Button from "../../../components/common/Button";
import bgPartner from "../../../assets/bgPartner.jpg";
import { isiCard } from "../dummy/IsiCard"

export default function Hero() {
  return (
    <div
      className="relative w-full h-[900px] flex flex-col justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPartner})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* hero */}
      <div className="relative z-10 px-10 md:px-25 text-white">
        <h1 className="text-[96px] font-bold leading-tight">
          Keahlianmu, Pasar<br />Baru.
        </h1>
        <p className="mt-4 text-[18px] font-light">
          Perluas jangkauan pelanggan di lingkungan terdekatmu. Gratis biaya pendaftaran!
        </p>

        <div className="mt-10">
          <Button
            variant="secondary"
            className="w-[280px] h-[50px] text-white text-[px] font-semibold rounded-[10px]"
          >
            Gabung Sekarang, GRATIS!
          </Button>
        </div>
      </div>

      {/* Card*/}
      <div className="relative flex justify-center translate-y-[85%]">
        <div className="w-[1200px] bg-white rounded-[15px] shadow-md p-14">
          
          {/* text atas */}
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
            <div className="flex-1">
              <h4 className="text-gray-500 text-lg font-medium">Tumbuh Bersama Komunitas</h4>
              <h2 className="text-3xl font-bold mt-2">
                Tingkatkan Penghasilan Tanpa Modal Promosi
              </h2>
            </div>

            <div className="flex-1">
              <p className="text-gray-600 text-[16px] leading-relaxed">
                PanggilAja! adalah solusi digital yang membuat keahlian Anda ditemukan,
                membangun reputasi, dan memberi Anda kendali penuh atas usaha Anda.
              </p>
            </div>
          </div>

          {/* isi card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isiCard.map((item) => (
              <div key={item.id} className="text-gray-800">
                <h3 className="font-semibold text-[20px] mb-2">{item.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
