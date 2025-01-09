  // Initialize Thumbnails
  const thumbsSwiper = new Swiper('.cta__flex-thumbnails', {
    loop: false,
    slidesPerView: 4,
    watchSlidesProgress: true,
    direction: 'vertical',
    autoplay: false,
    breakpoints: {
      320: {
        direction: 'horizontal',
        slidesPerView: 4,
      },
      600: {
        direction: 'horizontal',
        slidesPerView: 4,
      },
      900: {
        direction: 'horizontal',
      },
    },
  });
// Initialize Main Slider
const mainSwiper = new Swiper('.cta__flex-main', {
    loop: false,
    thumbs: {
        swiper: thumbsSwiper,
    },
  });
  
  // Connect Thumbnails to Main Slider
  mainSwiper.thumbs.swiper = thumbsSwiper;
  
  // For another carousel later down the page
  const secondSwiper = new Swiper('.reviews__swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: false,
    rewind: true,
    initialSlide: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        initialSlide: 0,
      },
      600: {
        slidesPerView: 1,
        initialSlide: 0,
      },
      800: {
        slidesPerView: 2,
        initialSlide: 0,
      },
      1080: {
        slidesPerView: 3,
        initialSlide: 1,
      },
    },
    
  });
  