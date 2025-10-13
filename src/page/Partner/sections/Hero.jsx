import Button from "../../../components/common/Button";
import bgPartner from "../../../assets/bgPartner.jpg";

export default function Hero() {
  return (
    <div
      className="relative w-full h-[780px] flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgPartner})`,
      }}
    >

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 px-10 md:px-25 text-white">
        <h1 className="text-[96px] font-bold leading-tight"> Keahlianmu, Pasar<br />Baru. </h1>
        <p className="mt-4 text-[18px] font-light">
          Perluas jangkauan pelanggan di lingkungan terdekatmu. Gratis biaya pendaftaran!
        </p>

        <div className="mt-6">
          <Button variant="secondary" className="w-[240px] h-[50px] text-white text-[16px] font-semibold rounded-[10px] ">
            Gabung Sekarang, GRATIS!
          </Button>
        </div>

      </div>
    </div>
  );
}
