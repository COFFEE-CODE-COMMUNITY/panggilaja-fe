import edukasi from '../../../assets/category/edukasi.jpeg'
import Elektronik from '../../../assets/category/Elektronik.jpeg'
import gayaHidup from '../../../assets/category/gayaHidup.jpeg'
import kebersihan from '../../../assets/category/kebersihan.jpeg'
import kerajinan from '../../../assets/category/kerajinan.jpeg'
import rumahTangga from '../../../assets/category/kerajinan.jpeg'
import { FaTools, FaHome, FaPaintBrush, FaGraduationCap, FaHeartbeat, FaBroom } from 'react-icons/fa'

export const CategoriesService = [
    { id: '1', name: 'Perbaikan Rumah Tangga', iconName: 'wrench', image: rumahTangga, logo : FaHome },
    { id: '2', name: 'Teknisi & Elektronik', iconName: 'laptop', image: Elektronik, logo : FaTools },
    { id: '3', name: 'Kerajinan & Reparasi Kreatif', iconName: 'scissors', image: kerajinan, logo : FaPaintBrush },
    { id: '4', name: 'Pembersihan & Kebersihan', iconName: 'clean', image: kebersihan, logo : FaBroom },
    { id: '5', name: 'Perawatan & Gaya Hidup', iconName: 'barber', image: gayaHidup, logo : FaHeartbeat },
    { id: '6', name: 'Edukasi & Pelatihan', iconName: 'book', image: edukasi, logo : FaGraduationCap },
];