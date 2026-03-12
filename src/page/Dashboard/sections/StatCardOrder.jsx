import React, { useEffect, useState } from 'react'
import { FaShoppingBag, FaClock, FaCheckCircle } from 'react-icons/fa'
import { useGetOrdersBySellerId } from '../../../hooks/useSellers'
import useAuthStore from '../../../../store/useAuthStore'

const StatCardOrder = () => {
  const user = useAuthStore((state) => state.user);
  const { data: ordersResponse, status } = useGetOrdersBySellerId(user?.id_seller);
  const orders = ordersResponse?.data || ordersResponse || [];

  const [isArtificialLoading, setIsArtificialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArtificialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  let lengthAllOrder = Array.isArray(orders) ? orders.length : 0;

  let lengthProggressOrder = Array.isArray(orders) ? orders.filter(order =>
    order.status === 'in_progress' || order.status === 'proses'
  ).length : 0;

  let lengthDoneOrder = Array.isArray(orders) ? orders.filter(order =>
    order.status === 'completed' || order.status === 'selesai'
  ).length : 0;

  if (status === 'pending' || isArtificialLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-3 w-full">
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-10 w-10 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Total Pesanan",
      count: lengthAllOrder,
      icon: <FaShoppingBag size={20} />,
      colors: "text-blue-600 bg-blue-50 border-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pesanan Diproses",
      count: lengthProggressOrder,
      icon: <FaClock size={20} />,
      colors: "text-orange-600 bg-orange-50 border-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Pesanan Selesai",
      count: lengthDoneOrder,
      icon: <FaCheckCircle size={20} />,
      colors: "text-green-600 bg-green-50 border-green-100",
      iconColor: "text-green-600",
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-gray-500 font-medium text-sm lg:text-base">
                {card.title}
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                {card.count}
              </h3>
            </div>
            <div className={`p-3 rounded-xl ${card.colors} group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatCardOrder