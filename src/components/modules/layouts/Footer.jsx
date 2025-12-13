import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';

const Footer = () => {
  return (
      <footer className="w-full bg-primary text-white py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* Logo & Deskripsi */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              PanggilAja
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed">
              Marketplace jasa lokal yang menghubungkan pelanggan dengan penyedia layanan profesional secara cepat dan mudah.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/about" className="hover:text-indigo-300 transition">Tentang Kami</a></li>
              <li><a href="/services" className="hover:text-indigo-300 transition">Layanan</a></li>
              <li><a href="/contact" className="hover:text-indigo-300 transition">Kontak</a></li>
              <li><a href="/faq" className="hover:text-indigo-300 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dukungan</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/privacy-policy" className="hover:text-indigo-300 transition">Kebijakan Privasi</a></li>
              <li><a href="/terms" className="hover:text-indigo-300 transition">Syarat & Ketentuan</a></li>
              <li><a href="/help" className="hover:text-indigo-300 transition">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ikuti Kami</h3>
            <div className="flex justify-center md:justify-start space-x-4 text-gray-200 text-xl">
              <a href="#" className="hover:text-indigo-300 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-indigo-300 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-indigo-300 transition"><FaXTwitter /></a>
              <a href="#" className="hover:text-indigo-300 transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Garis bawah */}
        <div className="border-t border-white mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>© 2025 <span className="font-semibold text-white">PanggilAja!</span>. All rights reserved.</p>
        </div>
      </footer>
  );
};

export default Footer;
