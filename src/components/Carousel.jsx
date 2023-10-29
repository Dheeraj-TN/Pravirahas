import "./Carousel.css"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Carousel1() {
  return (
    <div className="images">
      <Carousel
          autoPlay
          infinteLoop
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img
              className="home__image"
              loading="lazy"
              src="https://learnaboutgold.com/wp-content/uploads/2021/04/different-gold-jewelries.jpg"
            />
          </div>
          <div>
            <img
              className="home__image"
              loading="lazy"
              src="http://3.bp.blogspot.com/-H99-JTlbNVg/TfDM6h-SENI/AAAAAAAABKo/IsrdBnBwxKs/s1600/bridal-jewelry.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="home__image"
              loading="lazy"
              src="https://c.pxhere.com/photos/1c/a4/diamond_ring_engagement_ring_jewelry_wedding_ring-145599.jpg!d"
              alt=""
            />
          </div>      
        </Carousel>
    </div>
  )
}

export default Carousel1
