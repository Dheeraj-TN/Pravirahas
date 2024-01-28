import "./Carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselComponent() {
  return (
    <div className="carousel__images">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
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
            src="https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2023/09_Nov/homepage/Caliesta-web.jpg"
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
