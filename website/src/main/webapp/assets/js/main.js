/*
 Forty by HTML5 UP
 html5up.net | @ajlkn
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $banner = $('#banner');

        // Fix: Enable IE-only tweaks.
        if (skel.vars.browser == 'ie' || skel.vars.browser == 'edge')
            $body.addClass('is-ie');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function () {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        $('.hljs').each(function(i, block) {
            hljs.highlightBlock(block);
        });

        var $typed = $("#typed");

        if ($typed.length) {
            // on intro page

            $typed.typed({
                strings: ["Ing. Vojtěch Hordějčuk", "Hi! My name is Vojta Hordějčuk."],
                loop: true,
                typeSpeed: 100
            });

            particlesJS("banner", {
                "particles": {
                    "number": {
                        "value": 130,
                        "density": {
                            "enable": false,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#515670"
                    },
                    "shape": {
                        "type": "edge",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 0,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 200,
                        "color": "#ffffff",
                        "opacity": 0.15,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 300,
                            "rotateY": 300
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "window",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 10,
                            "duration": 5,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 100,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }

        // Header.
        if (skel.vars.IEVersion < 9)
            $header.removeClass('alt');

        if ($banner.length > 0
            && $header.hasClass('alt')) {

            $window.on('resize', function () {
                $window.trigger('scroll');
            });

            $window.on('load', function () {
                window.setTimeout(function () {
                    $window.triggerHandler('scroll');
                }, 100);

            });
        }

        // Menu.
        var $menu = $('#menu'),
            $menuInner;

        $menu.wrapInner('<div class="inner"></div>');
        $menuInner = $menu.children('.inner');
        $menu._locked = false;

        $menu._lock = function () {

            if ($menu._locked)
                return false;

            $menu._locked = true;

            window.setTimeout(function () {
                $menu._locked = false;
            }, 350);

            return true;

        };

        $menu._show = function () {

            if ($menu._lock())
                $body.addClass('is-menu-visible');

        };

        $menu._hide = function () {

            if ($menu._lock())
                $body.removeClass('is-menu-visible');

        };

        $menu._toggle = function () {

            if ($menu._lock())
                $body.toggleClass('is-menu-visible');

        };

        $menuInner
            .on('click', function (event) {
                event.stopPropagation();
            })
            .on('click', 'a', function (event) {

                var href = $(this).attr('href');

                event.preventDefault();
                event.stopPropagation();

                // Hide.
                $menu._hide();

                // Redirect.
                window.setTimeout(function () {
                    window.location.href = href;
                }, 250);

            });

        $menu
            .appendTo($body)
            .on('click', function (event) {

                event.stopPropagation();
                event.preventDefault();

                $body.removeClass('is-menu-visible');

            })
            .append('<a class="close" href="#menu">Close</a>');

        $body
            .on('click', 'a[href="#menu"]', function (event) {

                event.stopPropagation();
                event.preventDefault();

                // Toggle.
                $menu._toggle();

            })
            .on('click', function (event) {

                // Hide.
                $menu._hide();

            })
            .on('keydown', function (event) {

                // Hide on escape.
                if (event.keyCode == 27)
                    $menu._hide();

            });

    });

})(jQuery);