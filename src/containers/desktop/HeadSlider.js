import React, { Component } from 'react';
import Slider from 'react-slick';

class HeadSlider extends Component {
  render () {
    var settings = {
       dots: true,
       infinite: true,
       speed: 1000,
       slidesToShow: 1,
       autoplay:true,
        autoplaySpeed:3500,
        arrows:false,
        easing: 'ease-in-out',
        fade:true,
        draggable:false,    
        swipeToSlide:false,
     };
    return (
        <Slider {...settings}>
          <div><img src={require('../../assets/images/slider/banner1.jpg')} /></div>
          <div><img src={require('../../assets/images/slider/banner2.jpg')} /></div>
          <div><img src={require('../../assets/images/slider/banner3.jpg')} /></div>
        </Slider>
    );
  }
}

export default HeadSlider;