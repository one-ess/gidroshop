$(function () {
  $(".page__banner-slider").slick({
    arrows: true,
    autoplay: true,
    prevArrow: '<button type="button" class="banner-btn banner-arrow-prev"><img src="images/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="banner-btn banner-arrow-next"><img src="images/arrow-right.svg" alt=""></button>',
    dots: true,
    dotsClass: "banner-dots",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(".menu-burger").on("click", function () {
    $(this).toggleClass("_active");
    $(".header__menu").toggleClass("_active");
  });

  $(".tab").on("click", function (e) {
    e.preventDefault();
    $(this).siblings().removeClass("_active");
    $(this).addClass("_active");
    $(this).parent().next().find(".page__search-form").removeClass("_active");
    $(this).parent().next().find(".popular__slider").removeClass("_active");
    $(this).parent().next().find(".catalog__filter-list").removeClass("_active");
    $(this).parent().next().find(".product__tab-inner").removeClass("_active");
    $(this).parent().next().find(".product__more-tab-form").removeClass("_active");
    $($(this).attr("href")).addClass("_active");
    $(".popular__slider").slick("setPosition"); //устраняет проблему при повторной инициализации слайдера
  });

  $(".popular__slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="popular-btn popular-arrow-prev"><svg width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.9673 14.1924L14.9422 1.37269C15.2613 1.05741 15.2613 0.551755 14.9422 0.236466C14.6231 -0.0788221 14.1113 -0.0788221 13.7922 0.236466L0.239328 13.6273C-0.0797759 13.9426 -0.0797759 14.4482 0.239328 14.7635L13.7922 28.1484C13.9487 28.3031 14.1595 28.3864 14.3642 28.3864C14.5689 28.3864 14.7796 28.309 14.9362 28.1484C15.2553 27.8331 15.2553 27.3275 14.9362 27.0122L1.9673 14.1924Z" fill="black"/></svg></button>',
    nextArrow:
      '<button type="button" class="popular-btn popular-arrow-next"><svg width="17" height="29" viewBox="0 0 17 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8936 13.632L2.33608 0.236548C2.01686 -0.0788495 1.50491 -0.0788495 1.1857 0.236548C0.866485 0.551946 0.866485 1.05777 1.1857 1.37317L14.1651 14.1974L1.1857 27.0216C0.866485 27.337 0.866485 27.8428 1.1857 28.1582C1.3423 28.3129 1.5531 28.3962 1.75788 28.3962C1.96266 28.3962 2.17346 28.3189 2.33005 28.1582L15.8876 14.7627C16.2068 14.4533 16.2068 13.9415 15.8936 13.632Z" fill="black"/></svg></button>',
    infinite: true,
    responsive: [
      {
        breakpoint: 1270,
        settings: {
          arrows: false,
          dots: true,
          dotsClass: "popular-dots",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
          dotsClass: "popular-dots",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          dotsClass: "popular-dots",
        },
      },
    ],
  });

  $(".product-item__top-favourite , .product-item__cart").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("_active");
    $(".popular__slider").slick("setPosition");
  });

  $(".catalog__sort-button").on("click", function () {
    $(this).addClass("_active");
    $(".catalog__sort-button").not(this).removeClass("_active");
    if ($(this).hasClass("list")) {
      $(".catalog__products").addClass("list");
    }
    if ($(this).hasClass("grid")) {
      $(".catalog__products").removeClass("list");
    }
  });

  $(".catalog__pagination-list-link").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("_active");
    $(".catalog__pagination-list-link").not(this).removeClass("_active");
  });

  $(".catalog__filter-title , .catalog__filter-extra-settings").on("click", function () {
    $(this).toggleClass("_active");
    $(this).next().slideToggle(200);
  });

  if ($(".catalog__filter-label , .product__shop-label").hasClass("_active")) {
    $(this).find(".radio").prop("checked", true);
  }

  $(".catalog__filter-label , .product__shop-label").on("click", function () {
    if ($(this).find(".radio").attr("type") === "radio") {
      $(this).addClass("_active");
      $(".catalog__filter-label").not(this).removeClass("_active");
      $(".product__shop-label").not(this).removeClass("_active");
    }
  });

  $(".js-range-slider").ionRangeSlider({
    step: 500,
    onChange: function (data) {
      $(".irs-min").html(data.from.toString(10).replace(/(\d)(?=(\d{3})+$)/g, "$1 "));
      $(".irs-max").html(data.to.toString(10).replace(/(\d)(?=(\d{3})+$)/g, "$1 "));
    },
  });

  $(".irs-min").html($(".irs-from").text());
  $(".irs-max").html($(".irs-to").text());

  $("#rateYo").rateYo({
    starWidth: "23px",
    normalFill: "#c4c4c4",
    ratedFill: "#1C62CD",
    spacing: "7px",
  });

  $(".footer__info-title").on("click", function () {
    if ($(window).width() < 371) {
      $(this).next().slideToggle(300);
    }
  });

  $(".catalog__filter-mobile-button").on("click", function () {
    $(this).next().find(".catalog__aside").slideToggle();
  });

  $(window).on("resize", function () {
    if ($(window).width() > 870) {
      $(".catalog__aside").show();
    }
    if ($(window).width() > 371) {
      $(".footer__info-list").show();
    }
  });

  $("#email-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Заполните поле!",
        email: "Некорректный e-mail адрес!",
      },
    },
  });
  $("#popup-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Заполните поле!",
        email: "Некорректный e-mail адрес!",
      },
    },
  });
});
