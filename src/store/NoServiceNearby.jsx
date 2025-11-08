import React from 'react'
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const NoServiceNearby = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12 px-6 gap-3 h-80 mb-100">
            <h2 className="text-2xl font-semibold">Belum Ada Jasa di Sekitarmu</h2>
            <p className="text-base max-w-sm">
                Ayo jadi yang pertama untuk membuka layanan dan bantu orang di sekitarmu!
            </p>
            <Link to='/partner'>
                <Button 
                    className="px-5 py-2 rounded-2xl bg-black text-white hover:opacity-90 transition"
                    variant='primary'
                >
                    Daftar Jadi Mitra
                </Button>
            </Link>
        </div>
    );
}

export default NoServiceNearby