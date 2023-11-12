import "./Carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselComponent() {
  return (
    <div className="carousel__images">
      <Carousel
        autoPlay
        infinteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <img
            className="images"
            loading="lazy"
            src="https://www.voylla.com/cdn/shop/files/Artboard_1_copy_5a6b8ddb-d5bf-458f-a4eb-cf5dc1d29586.jpg?v=1698258024"
          />
        </div>
        <div>
          <img
            className="images"
            loading="lazy"
            src="https://www.voylla.com/cdn/shop/files/Artboard_1_copy_2_ed3aba70-4348-43d8-8f12-9cb1f5ca859c.jpg?v=1697885748"
            alt=""
          />
        </div>
        <div>
          <img
            className="images"
            loading="lazy"
            src="https://www.voylla.com/cdn/shop/files/Artboard_1_copy_06831018-403d-4df1-8d71-7a2aa05c9c15.jpg?v=1697885748"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
