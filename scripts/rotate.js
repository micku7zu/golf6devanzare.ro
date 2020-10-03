function Rotate(container, img, numberOfImages) {
    this.numberOfImages = numberOfImages;
    this.imageElement = img;
    this.container = container;

    this.image = 0;
    this.difference = 0;
    this.mouseLeft = 0;
    this.mouseDown = null;
    this.containerHeight = 0;

    this.lastIntervention = new Date(0);

    this.container.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.container.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.container.addEventListener("touchstart", this.onMouseDown.bind(this));
    this.container.addEventListener("touchmove", this.onMouseMove.bind(this));
    window.addEventListener("touchend", this.onMouseUp.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("resize", this.updateSizes.bind(this));


    setInterval(this.autoRotate.bind(this), 250);

    this.container.appendChild(this.imageElement);
    this.updateSizes();
}

Rotate.prototype.autoRotate = function () {
    var now = new Date();
    var lastInterventionSeconds = (now - this.lastIntervention) / 1000;

    if (this.mouseDown === null && lastInterventionSeconds > 3) {
        this.image++;
        this.updateImage();
    }
};

Rotate.prototype.updateSizes = function () {
    this.containerHeight = this.container.getBoundingClientRect().height;
    this.imageElement.height = Math.ceil(this.containerHeight * this.numberOfImages);
    this.updateImage();
};

Rotate.prototype.onMouseDown = function (event) {
    this.mouseDown = event;
    this.container.style.cursor = "grabbing";
};

Rotate.prototype.onMouseUp = function () {
    if (this.mouseDown !== null) {
        this.lastIntervention = new Date();
    }

    this.mouseDown = null;
    this.container.style.cursor = "grab";
    this.mouseLeft = 0;
    this.image += this.difference;
    this.difference = 0;
};

Rotate.prototype.onMouseMove = function (event) {
    if (this.mouseDown !== null) {
        if (event instanceof TouchEvent) {
            this.mouseLeft -= (event.touches[0].screenX - this.mouseDown.touches[0].screenX);
        } else {
            this.mouseLeft -= (event.screenX - this.mouseDown.screenX);
        }
        this.mouseDown = event;
        this.difference = Math.round((this.mouseLeft / 25)) % this.numberOfImages;
        this.updateImage();
    }
};

Rotate.prototype.updateImage = function () {
    var image = this.image + this.difference;

    if (image < 0) {
        image = (this.numberOfImages - 1) - Math.abs(image) % this.numberOfImages;
    } else {
        image = image % this.numberOfImages;
    }

    this.imageElement.style.marginTop = `-${image * this.containerHeight}px`;
};