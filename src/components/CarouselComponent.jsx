import "./Carousel.css";
//import carousel from "/carousel-jewel.png";
import carousel2 from "/carousel-jewel2.png";
import carousel3 from "/carousel-jewel3.png";
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
            // src="https://static.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2023/09_Nov/homepage/Caliesta-web.jpg"
            src={carousel2}
            alt=""
          />
        </div>
        <div>
          <img className="images" loading="lazy" src={carousel3} alt="" />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
