import Image1 from "../../assets/hero/women.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 2,
    img: Image2,
    title: "All Men's Wear",
    description:
      "MEN'S FALL FAVORITES : Step into the cooler months in style.",
  },
  {
    id: 1,
    img: Image1,
    title: "All Women's Wear",
    description:
      "we believe that more than a look, we deliver a feeling. This feeling has become our mission: to make every woman and every moment feel special. We understand that every woman is truly different, and seeks to enhance and reveal her own unique beauty to both herself and the world. To us, there is nothing more alluring than a woman who feels beautiful.",
  },
  {
    id: 3,
    img: Image3,
    title: "All Products ",
    description:
      "REVE D'ELEGANCE is committed to designing clothing that conforms to your body, allowing you to move through life freely.",
  },
];

const Hero = ({ handleOrderPopup }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-950 dark:text-white duration-200 ">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>
      {/* hero section */}
      <div className=" pb-8 sm:pb-0 mt-20 pl-10 z-10 " >
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-sm"
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="300"
                  >

                  </div>
                </div>
                {/* image section */}
                <div className="order-1 sm:order-2  ">
                  <div
                    data-aos="zoom-in"
                    data-aos-once="true"
                    className="relative z-10 "
                  >
                    <img
                      src={data.img}
                      alt=""
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;