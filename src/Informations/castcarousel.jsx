import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class CastCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: []
    };
    this.apiKey = this.apiKey = process.env.REACT_APP_API;
  }
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=${this.apiKey}
          `
    )
      .then(data => data.json())
      .then(data => {
        this.setState({ cast: data.cast.slice(0, 20) });
        console.log(this.state.cast);
      });
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="castCarouselContainer">
        <Slider {...settings}>
          {this.state.cast.map((cast, index) => (
            <div className="castCardContainer" key={index}>
              <a
                href={`/people/${cast.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.history.push(`/people/${cast.id}`);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                  alt="this is the card pic"
                ></img>
                <p>{cast.name}</p>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default CastCarousel;