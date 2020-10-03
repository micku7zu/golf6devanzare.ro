var animations = (function () {
    var negotiate = null;
    var priceElement = null;

    var price = {
        price: 0,
        animated: false
    };

    return {
        setup: function () {

            anime({
                targets: '.header-logo, #top-menu a',
                translateY: [-25, 0],
                opacity: [0, 1],
                duration: 500,
                easing: "easeOutCubic",
                delay: anime.stagger(100)
            });

            anime({
                targets: '.cover h1 span',
                translateX: [25, 0],
                opacity: [0, 1],
                duration: 500,
                easing: "easeOutCubic",
                delay: anime.stagger(100, {start: 800})
            });

            anime({
                targets: '.cover img',
                translateY: [-50, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: "easeOutCubic",
                delay: anime.stagger(100, {start: 1200})
            });

            anime({
                targets: '#scroll-down',
                translateX: ["-50%", "-50%"],
                translateY: [-25, 0],
                opacity: [0, 0.8],
                duration: 500,
                easing: "easeOutCubic",
                delay: 2200
            });
        },

        animatePrice: function () {
            priceElement = document.querySelector("#price .price");

            if (price.animated) {
                return;
            }

            negotiate = document.querySelector("#negotiate");
            negotiate.addEventListener("click", this.onNegotiateClicked.bind(this));

            price.animated = true;

            anime({
                targets: price,
                price: 6699,
                //easing: 'cubicBezier(.5, .05, .1, .3)',
                easing: 'cubicBezier(.5,.05,.26,1.5)',
                duration: 6500,
                delay: 0,
                update: function () {
                    priceElement.innerHTML = Math.round(price.price) + " euro";
                }
            });

            anime({
                targets: priceElement,
                translateX: ["-40%", "-50%"],
                translateY: ["-50%", "-50%"],
                opacity: [0, 1],
                duration: 1500,
                easing: "easeOutCubic",
                delay: 0
            });

            anime({
                targets: negotiate,
                translateX: ["-50%", "-50%"],
                translateY: ["20%", "0%"],
                opacity: [0, 1],
                duration: 600,
                easing: "easeOutCubic",
                delay: 7500
            });
        },

        onNegotiateClicked: function (event) {
            event.preventDefault();

            Swal.mixin({
                confirmButtonText: "DA",
            }).queue([
                "Ați luat în considerare locația, istoricul și numărul de KM?",
                {
                    "title": "Ați luat în considerare dotările?",
                    "html": "<ul style='text-align: left;'>" +
                        "<li>Pachet Style</li>" +
                        "<li>Unitate media cu Apple carplay și Android Auto</li>" +
                        "<li>Faruri automate (schimbă faza scurtă și lungă)</li>" +
                        "<li>Volan multifuncțional</li>" +
                        "<li>Scaune alcantara încălzite</li>" +
                        "<li>Senzori parcare</li>" +
                        "</ul>"
                },
                {
                    "title": "Ați luat în considerare cu ce se vinde în plus?",
                    "html": "<ul style='text-align: left;'>" +
                        "<li>Jante aliaj 16\" + jante 15\"</li>" +
                        "<li>Cauciucuri vară - iarnă</li>" +
                        "<li>Cameră video Vico Vation 2 + card memorie 64GB Class 10</li>" +
                        "<li>Unitate media originală cu navigație - RNS 310 - 3C0 035 270 B</li>" +
                        "<li>Unitate media nouă RCD 330 cu Bluetooth și App-Connect: Android Auto, Apple Carplay și Mirrorlink</li>" +
                        "<li>Trusă medicală, extinctor, triunghiuri, roată de rezervă, compresor auto, etc</li>" +
                        "</ul>"
                },
                {
                    title: "+ Card Fill&Go prealimentat",
                    html: '<a href="https://www.rompetrol.ro/personal/fill-go/fill-go-credit" title="Card Rompetrol Fill&Go prealimentat" target="_blank"><img src="images/features/card_rompetrol.png" alt="Card Rompetrol Fill&Go" /></a>'
                },
                {
                    "title": "Ați văzut albumul mașinii?",
                    "html": "Istoric, consum, dotări, stare actuală <a href='https://photos.app.goo.gl/DnZCXGKr2MWL1CmaA' title='Album' target='_blank'>aici</a>"
                }
            ]).then(function (result) {

                anime({
                    targets: price,
                    price: 6490,
                    easing: 'cubicBezier(.5, .05, .26, 2.2)',
                    duration: 6500,
                    delay: 0,
                    update: function () {
                        priceElement.innerHTML = Math.round(price.price) + " euro";
                    }
                });

                anime({
                    targets: negotiate,
                    translateX: ["-50%", "-50%"],
                    translateY: ["0%", "20%"],
                    opacity: [1, 0],
                    duration: 800,
                    easing: "easeOutCubic",
                    delay: 500
                });

                setTimeout(function () {
                    negotiate.style.display = "none";
                }, 1300);

            });

            return false;
        }
    };
})();