var liveMileage = {
    init: function () {
        var boughtDate = new Date(1480590000000);
        var now = new Date();
        var timeDifferenceInSeconds = Math.round((now.getTime() - boughtDate.getTime()) / 1000);
        var initialMileageInMeters = 132 * 1000 * 1000;

        this.currentMileageInMeters = 182 * 1000 * 1000;
        this.currentMileageDate = new Date(1594883556247);

        var differenceMileageInMeters = this.currentMileageInMeters - initialMileageInMeters;

        this.metersPerSecond = differenceMileageInMeters / timeDifferenceInSeconds * 3;

        this.dateElement = document.querySelector("#live-date");
        this.mileageElement = document.querySelector("#live-mileage");

        this.months = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];

        this.update();
        setInterval(this.update.bind(this), 50);
    },

    update: function () {
        var now = new Date();
        var timeDifferenceInSeconds = (now.getTime() - this.currentMileageDate.getTime()) / 1000;
        var theoreticalMileage = Math.round(this.currentMileageInMeters + timeDifferenceInSeconds * this.metersPerSecond);

        // this.dateElement.innerHTML = "<span>" + this.pad(now.getHours(), 2) + ":" + this.pad(now.getMinutes(), 2) + ":" + this.pad(now.getSeconds(), 2) + " "
        //     + this.pad(now.getDate(), 2) + " " + this.months[now.getMonth()] + "</span> " + now.getFullYear();

        this.dateElement.innerHTML = "<span>" + this.pad(now.getDate(), 2) + " " + this.months[now.getMonth()] + "</span> " + now.getFullYear();

        var theoreticalMileageString = theoreticalMileage + "";

        this.mileageElement.innerHTML = theoreticalMileageString.slice(0, 3) + "." + theoreticalMileageString.slice(3, 6) + "<span>," + theoreticalMileageString.slice(6, 9) + " KM</span>";
    },

    pad: function (n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
};