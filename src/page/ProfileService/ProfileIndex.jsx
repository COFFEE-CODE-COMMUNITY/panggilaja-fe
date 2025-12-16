import React, { useState } from "react";
import ProfileLayout from "../../components/modules/layouts/ProfileLayout";
import { useOutletContext } from "react-router-dom";
import { selectSelectedSeller } from "../../features/sellerSlice";
import { useSelector } from "react-redux";

const ProfileIndex = () => {
<<<<<<< HEAD
  const seller = useSelector(selectSelectedSeller)

=======
  const seller = useSelector(selectSelectedSeller);
  console.log("Ini isi dari sellernya :", seller);
>>>>>>> 077907d9b6e67c1712e5a2ae1a0d8a3626f12a20
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[30%_70%] border-1 border-gray-100 border-solid p-15 rounded-md">
        <h1>Deskripsi Toko</h1>
        <h1>{`${seller.deskripsi_toko}`}</h1>
      </div>
      <div className="grid grid-cols-[30%_70%] border-1 border-gray-100 border-solid p-15 rounded-md">
        <h1>Alamat</h1>
        <h1>{`${seller?.address?.alamat}, ${seller?.address?.kecamatan}, ${seller?.address?.kota}, ${seller?.address?.provinsi}`}</h1>
      </div>
    </div>
  );
};

export default ProfileIndex;
