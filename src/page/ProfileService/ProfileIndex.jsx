import React, { useState } from "react";
import ProfileLayout from "../../components/modules/layouts/ProfileLayout";
import { useOutletContext } from "react-router-dom";
import { selectSelectedSeller } from "../../features/sellerSlice";
import { useSelector } from "react-redux";

const ProfileIndex = () => {
  const seller = useSelector(selectSelectedSeller);
  return (
    <div className="flex flex-col gap-3">
      <h1>{`${seller.deskripsi_toko}`}</h1>
    </div>
  );
};

export default ProfileIndex;
