async function getLocation() {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve(pos);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

async function getOrientation() {
    if (!window.DeviceOrientationEvent) {
        console.log("Orientation not available");
        throw new Error("Orientation not available on this device");
    }

    window.addEventListener("deviceorientation", (event) => {
        console.log(
            "z : " +
            event.alpha +
            "\n x : " +
            event.beta +
            "\n y : " +
            event.gamma +
            "\n abs" +
            event.absolute
        );
        //this.orientation = Math.random();
    });
}

async function locateMe() {
    try {
        location = await this.getLocation();
        console.log(location);
    } catch (e) {
        errorStr = e.message;
        //return (errorStr);
    }
}

async function orientateMe() {
    try {
        const orientation = await getOrientation();
        console.log(orientation);
        return (orientation)
    } catch (e) {
        const errorStr = e.message;
        console.log(errorStr);
        return (errorStr);
    }
}

export { getLocation, locateMe, getOrientation, orientateMe };