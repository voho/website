(function ($) {
    skel.breakpoints({
        xlarge: "(max-width: 1680px)",
        large: "(max-width: 1280px)",
        medium: "(max-width: 980px)",
        small: "(max-width: 736px)",
        xsmall: "(max-width: 480px)"
    });

    skel.layout({
        reset: false,
        grid: true,
        containers: true
    });

    $('.hljs').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    var $typed = $("#typed");

    if ($typed.length) {
        $typed.typed({
            strings: ["Ing. Vojta Hordějčuk", "Hi! My name is Vojta."],
            loop: true,
            typeSpeed: 100
        });

        particlesJS("banner", {
            "particles": {
                "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
                "color": {"value": "#666666"},
                "shape": {
                    "type": "circle",
                    "stroke": {"width": 0, "color": "#ddd"},
                    "polygon": {"nb_sides": 5},
                    "image": {"src": "img/github.svg", "width": 100, "height": 100}
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}
                },
                "line_linked": {
                    "enable": true,
                    "distance": 160.3412060865523,
                    "color": "#666666",
                    "opacity": 0.3447335930860874,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {"enable": true, "mode": "repulse"},
                    "onclick": {"enable": true, "mode": "push"},
                    "resize": true
                },
                "modes": {
                    "grab": {"distance": 400, "line_linked": {"opacity": 1}},
                    "bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
                    "repulse": {"distance": 200, "duration": 0.4},
                    "push": {"particles_nb": 4},
                    "remove": {"particles_nb": 2}
                }
            },
            "retina_detect": true
        });
    }
})(jQuery);