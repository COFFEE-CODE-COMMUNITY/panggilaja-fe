import React from "react";
import Card from "../../common/Card";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({
  image,
  idService,
  serviceName,
  basePrice,
  topPrice,
  sellerName,
}) => {
  return (
    <Card
      className="hover:scale-102 hover:shadow-sm transition-all duration-300 rounded-md"
      to={`service/${idService}`}
    >
      <img
        src={image}
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <div className="px-3 pb-4">
        <h3 className="mt-4 md:text-h5 text-h6 text-gray-700">{serviceName}</h3>
        <p className="mt-1 md:text-h5 text-h6 font-medium text-gray-900">
          Rp {basePrice} - {topPrice}
        </p>
        <div className="flex gap-[5px] py-[5px]">
          <FaStar className="text-star lg:text-[12px] md:text-[10px] text-[8px]" />
          <FaStar className="text-star lg:text-[12px] md:text-[10px] text-[8px]" />
          <FaStar className="text-star lg:text-[12px] md:text-[10px] text-[8px]" />
          <FaStar className="text-star lg:text-[12px] md:text-[10px] text-[8px]" />
          <FaStar className="text-star lg:text-[12px] md:text-[10px] text-[8px]" />
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
