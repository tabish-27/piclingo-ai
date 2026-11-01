import { useEffect, useState } from "react";

// const images = [imgwelcome, imgwelcome2, img2, img3, img1];

const Carousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(()=>{
    const interval = setInterval(()=>{
        nextSlide()
    }, 2500)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="relative w-full max-w-lg mx-auto " >
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 text-white z-10">
        &#10094;
      </button>

      <div className="flex justify-center">
        <img src={images[currentIndex]} alt="Slide" className="w-full h-full object-cover rounded-md transition-all relative lazy-loading" />
        {/* Line Indicators */}
        <div className="flex justify-center mt-3 gap-2 absolute bottom-2  " >
          {images.map((_, index) => (
            <div key={index}
              className={`h-[3px] w-20 transition-all ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 text-white z-10">
        &#10095;
      </button>

      
    </div>
  );
};

export default Carousel;




























// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import img1 from '../assets/carousel-item-1.png'
// import img2 from '../assets/carousel-item-2.jpg'
// import img3 from '../assets/carousel-item-3.png'

// const Carousel = () => {
//   return (
//     <Swiper
//       modules={[Pagination]}
//       slidesPerView={1}
//       pagination={{
//         clickable: true,
//         renderBullet: (index, className) => {
//           return `<span class="${className} custom-pagination-line"></span>`;
//         },
//       }}
//       className="mySwiper"
//     >
//       <SwiperSlide>
//         <img src={img1} alt="Slide 1" className="w-full h-60 object-cover" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={img2} alt="Slide 2" className="w-full h-60 object-cover" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={img3} alt="Slide 3" className="w-full h-60 object-cover" />
//       </SwiperSlide>
//     </Swiper>
//   );
// };

// export default Carousel;
