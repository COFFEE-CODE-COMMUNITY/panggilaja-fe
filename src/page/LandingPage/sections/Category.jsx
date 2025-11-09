import { CategoriesService } from "../dummy/CategoryData";
import Card from "../../../components/common/Card";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryService, selectCategoryService, selectCategoryServiceStatus } from "../../../features/serviceSlice";
import { useEffect } from "react";

const Category = () => {
  const category = useSelector(selectCategoryService)
  const categoryStatus = useSelector(selectCategoryServiceStatus)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryService())
  }, [])

  let categoryMap = []

  category?.data?.map((category) => {
    CategoriesService.map((categoryDummy) => {
      if(categoryDummy.name === category.kategori){
        categoryMap.push({
          name : category.kategori,
          id : category.id,
          logo : categoryDummy.logo
        })
      }
    })
  })

  return (
    <div className="w-full flex flex-col md:gap-[10px] gap-[5px]">
      <p className="xl:text-h4 text-h5 font-semibold">Kategori jasa</p>
      <div className="grid md:grid-cols-6 grid-cols-3 xl:gap-[15px] lg:gap-[10px] gap-[5px] w-full">
        {categoryMap.map((category) => {
          const LogoItems = category.logo;
          return (
            <Card
              className="flex-1 md:rounded-[25px] rounded-[10px] flex flex-col lg:px-[25px] lg:py-[20px] md:px-[20px] md:py-[15px] px-[15px] py-[10px] cursor-pointer border-2 border-gray-100 shadow-sm hover:bg-primary hover:border-primary hover:shadow-lg hover:scale-105 group gap-[10px] transition-all duration-300 ease-in-out"
              key={category.id}
              to={`category/${category.id}`}
            >
              <LogoItems className="lg:text-4xl md:text-3xl text-2xl text-primary h-1/2 group-hover:text-white transition-colors duration-300 ease-in-out" />
              <div className="lg:leading-6 md:leading-5 leading-4">
                <h3 className="lg:text-h5 text-h6 font-medium w-full h-1/2 group-hover:text-white transition-colors duration-300 ease-in-out">
                  {category.name}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
