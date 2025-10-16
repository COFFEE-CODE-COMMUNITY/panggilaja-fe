import React, { useState } from 'react';
import { dataFaq } from "../dummy/DataFaq"; 

export default function Faq() {
    const [openId, setOpenId] = useState(null); 
    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="relative bg-white mt-[300px] px-10 md:px-40 py-20">
        <div className="flex flex-col md:flex-row justify-between gap-16">

            {/* judul gaq */}
            <div className="flex-1">
            <h2 className="text-[38px] font-bold text-gray-900">
                Pertanyaan Seputar Mitra
            </h2>
            <p className="mt-2 text-gray-600 text-[16px] leading-relaxed">
                Berapa biaya untuk mendaftar dan menjadi mitra PanggilAja!?
            </p>
            </div>

            {/* pertanyaan faq */}
            <div className="flex-1 flex flex-col divide-y divide-gray-200">
            {dataFaq.map((item) => (
                <div key={item.id} className="py-4">
                
                {/* onclick faq */}
                <div 
                    className="flex items-start cursor-pointer group"
                    onClick={() => toggleFaq(item.id)}
                >
                    
                    {/* icon jwb pertanyaan faq */}
                    <div 
                    className={`
                        mr-4 mt-1 text-xl font-bold text-gray-800 transition-transform duration-300
                        ${openId === item.id ? 'rotate-0' : 'rotate-[-90deg]'} // 👈 Rotasi Ikon
                    `}
                    >
                    &#x25BE; 
                    </div>

                    {/* text faq */}
                    <div className="flex-1">
                    <h3 className="font-semibold text-[18px] text-gray-900 leading-relaxed">
                        {item.question}
                    </h3>
                    </div>
                </div>

                {/* Teks Jawaban  */}
                {openId === item.id && (
                    <p className="mt-3 ml-10 pl-1 text-gray-700 text-[16px]">
                    {item.answer}
                    </p>
                )}
        
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}