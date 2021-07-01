export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const onSuccess = (position: GeolocationPosition) => {
        resolve(position);
      };

      const onError = (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            reject("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            reject("The request to get user location timed out.");
            break;
          // case error.UNKNOWN_ERROR:
          //   reject("An unknown error occurred.");
          //   break;
        }
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      reject("Geolocation API is not supported by browser.");
    }
  });
};
