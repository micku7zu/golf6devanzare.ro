var lazyLoad = {
    init: function () {
        var lazyLoadInstance = new LazyLoad({
            elements_selector: "img:not(.not-lazy-load)"
        });

        lazyLoadInstance.update();
    }
};