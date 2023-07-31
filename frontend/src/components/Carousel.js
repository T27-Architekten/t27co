import React, { useEffect, useState } from "react";
import "./scss and css/Carousel.scss";

// const Carousel = ({ items, autoPlay = true, interval = 3000 }) => {
const Carousel = (props) => {
  const [items, setItems] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (props.carousel) {
      setItems(props.carousel?.images);
      setActiveIndex(props.carousel?.imageKey);
      console.log(props?.carousel);
    }
  }, [props.carousel]);

  //   useEffect(() => {
  //     if (autoPlay) {
  //       const timer = setInterval(() => {
  //         goToNextSlide();
  //       }, interval);

  //       return () => clearInterval(timer);
  //     }
  //   }, [activeIndex, autoPlay, interval]);

  // console.log("in Carousel.js" + props.carousel?.images, 18);
  // console.log(items && items);
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    items && (
      <div className="carousel" key="carousel-1">
        {/* -------------------------------------------------------- Close button */}
        <div className="carousel-close">
          <i
            className="fa-solid fa-xmark fa-2xl"
            style={{
              color: " #d1b08f",
              cursor: "pointer",
              fontSize: "40px",
            }}
            onClick={(e) => {
              props.showCarousel(null);
            }}
          ></i>
        </div>
        <div className="carousel-slides">
          <div className="carousel-slide">
            {props?.carousel && (
              <img
                className="carousel-image"
                src={`/static/uploads/projects/${items[activeIndex]}`}
                alt=""
                key={items[activeIndex]}
              />
            )}
          </div>
        </div>

        <div className="carousel-controls">
          <span className="goToSlide goTo-Dots-padding" onClick={goToPrevSlide}>
            <i
              className="fa-solid fa-chevron-left"
              style={{ color: " #2c3337" }}
            ></i>
          </span>

          {/* ------------------------------------ Dots */}
          <div className="carousel-dots ">
            {Array.isArray(items) ? (
              items.map((_, index) =>
                activeIndex === index ? (
                  <i
                    className="fa-solid fa-circle goTo-Dots-padding"
                    style={{
                      color: " #2c3337",
                      cursor: "pointer",
                    }}
                    onClick={() => goToSlide(index)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-circle goTo-Dots-padding"
                    style={{ color: " #2c3337", cursor: "pointer" }}
                    onClick={() => goToSlide(index)}
                  ></i>
                )
              )
            ) : (
              <i
                className="fa-solid fa-circle goTo-Dots-padding"
                style={{
                  color: " #2c3337",
                  cursor: "pointer",
                }}
              ></i>
            )}
          </div>
          <span className="goToSlide goTo-Dots-padding" onClick={goToNextSlide}>
            <i
              className="fa-solid fa-chevron-right"
              style={{ color: " #2c3337" }}
            ></i>
            {/* &gt; */}
          </span>
        </div>
      </div>
    )
  );
};

export default Carousel;
