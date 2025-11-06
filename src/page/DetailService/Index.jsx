import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ImageService from "./sections/ImageService";
import {
  getServicesById,
  selectSelectedService,
  selectSelectedServiceStatus,
} from "../../features/serviceSlice";
import { useEffect } from "react";
import { InformationService } from "./sections/InformationService";

const DetailService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const service = useSelector(selectSelectedService);
  const status = useSelector(selectSelectedServiceStatus);

  useEffect(() => {
    if (id) {
      dispatch(getServicesById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:flex h-full w-full gap-[40px] mb-[50px] lg:px-[100px] md:px-[50px] pt-[20px]">
      {status === "loading" && <div className="w-full h-screen">loading</div>}
      {status === "success" && (
        <>
          <ImageService image={service.foto_product} />
          {service && (
            <InformationService
              description={service.deskripsi}
              idProvider={service.seller_id}
              idService={service.id}
              nameService={service.nama_jasa}
              totalReviewSeller={service.jumlah_rating}
              totalReview={service.jumlah_rating}
              basePrice={service.base_price}
              topPrice={service.top_price}
              foto_product={service.foto_product}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DetailService;
