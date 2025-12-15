import { useSelector } from "react-redux";
import Card from "../../common/Card";
import Stars from "../../common/Stars";
import { selectCurrentUser } from "../../../features/authSlice";

const ServiceCard = ({
  image,
  idService,
  serviceName,
  basePrice,
  topPrice,
}) => {
  const user = useSelector(selectCurrentUser)
  const role = user?.active_role
  console.log(user)
  return (
    <>

      {role === 'buyer' ? (
        <Card
          className="group hover:scale-101 z-10 transition-all duration-200 relative block overflow-hidden rounded-lg"
          to={`/service/${idService}`}
        >
          <img
            src={image}
            alt=""
            className="h-64 w-full object-cover transition duration-500 sm:h-72 relative z-0"
          />

          <div className="relative border border-gray-100 bg-white lg:p-4 md:p-3 p-2 flex flex-col gap-2">
            <p className="mt-1.5 font-medium text-gray-900 text-h5">
              {serviceName}
            </p>

            <Stars many={4} variant="star" />

            <p className="text-gray-700 md:text-h5 text-h6">
              Rp {basePrice} - {topPrice}
            </p>
          </div>
        </Card>
      ) : (
        <Card
          className="group hover:scale-101 z-10 transition-all duration-200 relative block overflow-hidden rounded-lg"
          to={`/dashboard/service/${idService}`}
        >
          <img
            src={image}
            alt=""
            className="h-64 w-full object-cover transition duration-500 sm:h-72 relative z-0"
          />

          <div className="relative border border-gray-100 bg-white lg:p-4 md:p-3 p-2 flex flex-col gap-2">
            <p className="mt-1.5 font-medium text-gray-900 text-h5">
              {serviceName}
            </p>

            <Stars many={4} variant="star" />

            <p className="text-gray-700 md:text-h5 text-h6">
              Rp {basePrice} - {topPrice}
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default ServiceCard;
