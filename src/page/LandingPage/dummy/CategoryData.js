import edukasi from '../../../assets/category/edukasi.jpeg'
import Elektronik from '../../../assets/category/Elektronik.jpeg'
import gayaHidup from '../../../assets/category/gayaHidup.jpeg'
import kebersihan from '../../../assets/category/kebersihan.jpeg'
import kerajinan from '../../../assets/category/kerajinan.jpeg'
import rumahTangga from '../../../assets/category/kerajinan.jpeg'

export const CategoriesService = [
    { id: '1', name: 'Perbaikan Rumah Tangga', iconName: 'wrench', image: rumahTangga },
    { id: '2', name: 'Teknisi & Elektronik', iconName: 'laptop', image: Elektronik },
    { id: '3', name: 'Kerajinan & Reparasi Kreatif', iconName: 'scissors', image: kerajinan },
    { id: '4', name: 'Pembersihan & Kebersihan', iconName: 'clean', image: kebersihan },
    { id: '5', name: 'Perawatan & Gaya Hidup', iconName: 'barber', image: gayaHidup },
    { id: '6', name: 'Edukasi & Pelatihan', iconName: 'book', image: edukasi },
];