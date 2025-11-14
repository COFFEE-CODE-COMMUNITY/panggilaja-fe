import React from 'react'

const ProfilePhotos = () => {
  return (
    <div className='min-h-screen p-4'> 
      <div className="grid gap-x-2 gap-y-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {/* Foto 1: Teknisi AC (ID 101) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/101/600/600" 
            alt="Teknisi mitra sedang memperbaiki unit AC outdoor." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        
        {/* Foto 2: Tukang Ledeng/Plumber (ID 102) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/102/600/600" 
            alt="Mitra jasa perbaikan pipa sedang memperbaiki wastafel." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        
        {/* Foto 3: Jasa Kebersihan (ID 103) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/103/600/600" 
            alt="Tim jasa kebersihan profesional sedang membersihkan kantor." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        
        {/* Foto 4: Teknisi Listrik (ID 104) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/104/600/600" 
            alt="Seorang teknisi listrik sedang memeriksa panel sekring." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        
    
        
        {/* Foto 6: Jasa Pengecatan (ID 106) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/106/600/600" 
            alt="Jasa pengecatan profesional sedang mengecat dinding dengan rapi." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        {/* Foto 6: Jasa Pengecatan (ID 106) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/106/600/600" 
            alt="Jasa pengecatan profesional sedang mengecat dinding dengan rapi." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>

        {/* Foto 7: Jasa Taman (ID 107) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/107/600/600" 
            alt="Mitra jasa taman sedang merawat dan memotong rumput." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>
        
        {/* Foto 8: Jasa Montir Mobil (ID 108) */}
        <a href="#" className="group">
          <img 
            src="https://picsum.photos/id/108/600/600" 
            alt="Montir profesional sedang memperbaiki mesin mobil di bengkel." 
            className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
          />
        </a>

      </div>
    </div>
  )
}

export default ProfilePhotos