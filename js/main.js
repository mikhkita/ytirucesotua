$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false;

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

        if( myWidth >= 1024 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 && myWidth < 1024 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    function initCustomNav($slider, slick) {
        if(slick.slideCount > 0){
            $slider.find(".b-slider-custom-nav-slides .count").text(slick.slideCount);
            var widthDot = (100 / slick.slideCount).toFixed(2);
            $slider.find(".b-slider-custom-nav-dots .slick-dots li").css("width", widthDot+"%");
        }
    }

    // ===== Слайдер в хедере =====

    $(".b-header-back-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        asNavFor: ".b-header-content-slider"
    });

    $(".b-header-content-slider").on("init", function(event, slick){
        initCustomNav($(".b-header-content"), slick);
    });
    $(".b-header-content-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".b-header-back-slider",
        fade: true,
        dots: true,
        arrows: true,
        appendArrows: $(".b-header-content .b-slider-custom-nav"),
        appendDots: $(".b-header-content .b-slider-custom-nav-dots"),
        prevArrow: '<div class="slick-arrow icon-arrow-left"></div>',
        nextArrow: '<div class="slick-arrow icon-arrow-right"></div>'
    });
    $(".b-header-content-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".b-header-content .b-slider-custom-nav-slides .current").text(nextSlide+1);
    });

    // ===== Слайдер с табами =====

    $(".b-tab-slider-list").on('init', function(event, slick){
        initCustomNav($(".b-tab-slider-cont"), slick);
        setSliderArrowPosition(slick);
    });

    $(document).find(".b-tab-slider-list").each(function(){
        $(this).slick({
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'ease', 
            fade: true,
            speed: 500,
            dots: true,
            arrows: true,
            appendArrows: $(".b-tab-slider-cont .b-slider-custom-nav"),
            appendDots: $(".b-tab-slider-cont .b-slider-custom-nav-dots"),
            prevArrow: '<div class="slick-arrow icon-arrow-left"></div>',
            nextArrow: '<div class="slick-arrow icon-arrow-right"></div>'
        });
    });

    function setSliderArrowPosition(slick, nextSlide = 0){
        var tabs = slick.$slider.parents('.b-tab-block').find('.b-slider-custom-nav');
        if (isMobile) {
            var bottom = slick.$slider.height() - slick.$slides.eq(nextSlide).height();
        } else {
            var bottom = slick.$slider.height() - slick.$slides.eq(nextSlide).height() + 21;
        }

        slick.$slider.parents('.b-tab-block').find('.b-slider-custom-nav').css('bottom', bottom);
    }

    $(".b-tab-slider-list").on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".b-tab-slider-cont .b-slider-custom-nav-slides .current").text(nextSlide+1);
        var tabs = slick.$slider.parents('.b-tab-block').find('.b-tab-item');
        setSliderArrowPosition(slick, nextSlide);
        tabs.removeClass('active');
        tabs.eq(nextSlide).addClass("active");
    });

    $(document).on('click', '.b-tab-item', function(){
        id = $(this).attr("id");
        $(this).parents('.b-tab-block').find(".b-tab-slider-list").slick('slickGoTo', $('.b-tab-slider-list [data-id='+id+']').attr('data-slick-index'), true);
    });

    // ===== Слайдер с отзывами =====

    $(".b-reviews-slider").on("init", function(event, slick){
        initCustomNav($(".b-reviews"), slick);
    });
    $(".b-reviews-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        appendArrows: $(".b-reviews .b-slider-custom-nav"),
        appendDots: $(".b-reviews .b-slider-custom-nav-dots"),
        prevArrow: '<div class="slick-arrow icon-arrow-left"></div>',
        nextArrow: '<div class="slick-arrow icon-arrow-right"></div>'
    });
    $(".b-reviews-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".b-reviews .b-slider-custom-nav-slides .current").text(nextSlide+1);
    });

    initialize();

    function initialize() {
        var myPlace = new google.maps.LatLng(56.5273681, 84.98542719999999);
        var myOptions = {
            zoom: 16,
            center: new google.maps.LatLng(56.5283681, 84.9855171),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true
        }

        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        addMarker(myPlace, map);

        map.addListener('drag',function(event) {
            var bubble = $(document).find('.b-map-bubble');

            if (bubble.hasClass('show')) {
                bubble.removeClass('show');
            }
        });
    }

    function addMarker(latlng,map) {
        var marker = new google.maps.Marker({
            position: latlng,
            icon: {
                url: "i/pin.svg", // url
                scaledSize: new google.maps.Size(50, 67), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(19,58) // anchor
            },
            map: map,
        });

        marker.addListener('click',function(event) {
            var bubble = $(document).find('.b-map-bubble');
            
            if (!bubble.hasClass('show')) {
                bubble.addClass('show');
            }
            
            map.panTo(new google.maps.LatLng(56.5283681, 84.9855171));
        });
    }


    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

});