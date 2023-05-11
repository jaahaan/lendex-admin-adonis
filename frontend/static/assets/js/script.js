jQuery(function ($) {

    'use strict';

    // hero Carousel

    $('.hero-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

    // Hot Deals Carousel starts
    
    $('.hot-deals__carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            300:{
                items: 2
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })

    // New Product Carousel starts

    let newCarousel = document.querySelectorAll(".new-product__carousel");
    for (let i = 0; i < newCarousel.length; i++) {
        console.log($("#new-carousel-", i + 1));
        $(`#new-carousel-${i + 1}`).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        })
    }

    // Selection tab
    $(".new-product__section .section-header__action--tab li").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        let idAttribute = $(this).attr("data-id");
        console.log(idAttribute);
        $(".new-product__area").find(`[data-carousel='${idAttribute}']`).addClass("active").siblings().removeClass("active");
    });

});

// Trending Offers Carousel starts
$('.trending--offers__carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});

    // Featured product Carousel starts

    let featuredCarousel = document.querySelectorAll(".featured-product__carousel");
    for (let i = 0; i < featuredCarousel.length; i++) {
        console.log($("#featured-product-", i + 1));
        $(`#featured-product-${i + 1}`).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        })
    }

    // Selection tab
    $(".featured-product__section .section-header__action--tab li").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        let idAttribute = $(this).attr("data-id");
        $(".featured-product__area").find(`[data-carousel='${idAttribute}']`).addClass("active").siblings().removeClass("active");
    });

// Article Carousel starts
$('.article-category__carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 3
        },
        1000: {
            items: 3
        }
    }
});