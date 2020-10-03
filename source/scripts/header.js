var header = (function () {
    var STICKY_CLASS_NAME = "sticky";
    var SELECTED_CLASS_NAME = "selected";

    return {
        init: function () {
            var context = this;
            this.doc = document.documentElement;
            this.toggleMenuButton = document.querySelector(".toggle-menu");
            this.menuListContainer = document.querySelector(".menu-list");
            this.header = document.querySelector("header");
            this.sections = this.getAllSections();
            this.lastScrolledSection = this.header.querySelector(".selected");

            window.addEventListener("scroll", utils.throttle(this.onWindowScroll.bind(this), 100), window.supportPassive ? {passive: true} : false);
            window.addEventListener("resize", utils.throttle(this.onWindowResize.bind(this), 100));

            this.toggleMenuButton.addEventListener("click", this.onToggleMenuClicked.bind(this));

            this.menuListContainer.addEventListener("click", this.onMenuListContainerClicked.bind(this));

            this.imagesLoaded = new imagesLoaded(document.querySelectorAll("img"));
            this.imagesLoaded.on('progress', function () {
                context.sections = context.getAllSections();
            });
        },

        onMenuListContainerClicked: function (evnet) {
            this.menuListContainer.classList.remove("show");
        },

        onToggleMenuClicked: function (event) {
            this.menuListContainer.classList.toggle("show");
            event.preventDefault();
        },

        onWindowResize: function (event) {
            this.header = document.querySelector("header");
            this.sections = this.getAllSections();
            this.lastScrolledSection = this.header.querySelector(".selected");
        },

        getAllSections: function () {
            var bodyRect = document.body.getBoundingClientRect();
            var links = this.header.querySelectorAll(".menu-list a");
            var sections = {
                links: {},
                positions: []
            };

            for (var i in links) {
                if (links.hasOwnProperty(i)) {
                    var section = document.querySelector(links[i].getAttribute("href"));
                    if (section) {
                        var sectionRect = section.getBoundingClientRect();
                        var top = Math.floor(sectionRect.top - bodyRect.top);
                        sections.links[top] = links[i];
                        sections.positions.push(top);
                    }
                }
            }

            sections.positions.reverse();

            return sections;
        },

        onWindowScroll: function (event) {
            var scroll = (window.pageYOffset || this.doc.scrollTop) - (this.doc.clientTop || 0);
            var newScrolledSection = this.getScrolledSection(scroll);

            if (this.lastScrolledSection !== newScrolledSection) {
                if (this.lastScrolledSection !== null) {
                    this.lastScrolledSection.classList.remove(SELECTED_CLASS_NAME);
                }
                newScrolledSection.classList.add(SELECTED_CLASS_NAME);

                this.lastScrolledSection = newScrolledSection;
                this.pushState();
            }

            if (scroll > 0 && !this.header.classList.contains(STICKY_CLASS_NAME)) {
                this.header.classList.add(STICKY_CLASS_NAME);
            } else if (scroll === 0 && this.header.classList.contains(STICKY_CLASS_NAME)) {
                this.header.classList.remove(STICKY_CLASS_NAME);
            }

            var split = newScrolledSection.href.split("#");
            if (split.length > 0 && split[1] === "price") {
                animations.animatePrice();
            }
        },

        getScrolledSection: function (scroll) {
            for (var i in this.sections.positions) {
                var sectionPosition = this.sections.positions[i];
                if (sectionPosition <= scroll) {
                    return this.sections.links[sectionPosition];
                }
            }

            return this.sections.links[this.sections.positions[0]];
        },

        pushState: function (section) {
            if (window.history.pushState) {
                window.history.pushState(null, "", window.location.origin + window.location.pathname +
                    window.location.search + this.lastScrolledSection.getAttribute("href"));
            }
        }
    }
})();