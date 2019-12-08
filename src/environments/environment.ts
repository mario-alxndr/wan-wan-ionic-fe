// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const defaultEndpoint = 'http://25.15.132.101:1323';

export const environment = {
  production: false,
  endPointConstant: {
    registerEndPoint: defaultEndpoint+'/register',
    loginEndPoint: defaultEndpoint+'/login',
    threadPageEndPoint: defaultEndpoint+'/getThreadPage',
    threadDetailEndPoint: defaultEndpoint+'/getThreadDetail',
    createComment: defaultEndpoint+'/createComment/',
    threadCategoryEndPoint: defaultEndpoint+'/getThreadCategoryPage',
    getUserData: defaultEndpoint+'/getUserData/',
    createThread: defaultEndpoint+'/createThread/',
    searchTread: defaultEndpoint+'/searchThread/',

    eventPageEndPoint: defaultEndpoint+'/getEventHome',
    eventDetailEndPoint: defaultEndpoint+'/getEventDetail',
    eventGetMyEventEndPoint: defaultEndpoint+'/getMyEvent/',
    createEvent: defaultEndpoint+'/createEvent/',
    searchEvent: defaultEndpoint+'/searchEvent',
    saveorremoveMyEvent: defaultEndpoint+'/bookmark/',

    addUpdatePhoneNumber: defaultEndpoint+'/addUpdatePhoneNumber/',
    addUpdateProfileImage: defaultEndpoint+ '/addUpdateProfileImage/',
    addUpdateGameList: defaultEndpoint+ '/addUpdateGameList/',
    getMapAddress: 'https://maps.googleapis.com/maps/api/geocode/'
  },
  tokenStorage: {
    user_latitude: "USER_LATITUDE",
    user_longitude: "USER_LONGITUDE"
  },
  mapsAPIKey: 'AIzaSyB5km7rlUUS8THKK0OO5V9VIhCs61giBLU',
  defaultImageProfile: "assets/2157564-poring.jpg"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
