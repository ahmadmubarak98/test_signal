import React from "react";
import SlickSlider from "react-slick";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 11000,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        //dots: true,
        //arrows : false
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Slider({ itemAs, items }) {
  const Component = itemAs;

  if (items.length <= 5 && items.length > 0) {
    items = [...items, ...items, ...items, ...items, ...items, ...items];
  }
  
  return (
    <div className="custom-slider">
      <SlickSlider {...settings}>
        {items &&
          itemAs &&
          items.map((item, index) => (
            <div dir="rtl" key={index}>
              <Component {...item} />
            </div>
          ))}
      </SlickSlider>
    </div>
  );
}

export default React.memo(Slider);
