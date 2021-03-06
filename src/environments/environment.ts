// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://localhost:3000/api'
  baseUrl: 'http://localhost:10010/api',
  tinymceConfig:{
    menubar:false,
    statusbar: false,
    base_url: '/tinymce', // Root for resources
    suffix: '.min',       // Suffix to use when loading resources
    language: 'es_MX',
    plugins: 'lists advlist autoresize print table',
    min_height: 350,
    autoresize_on_init: true,
    max_height: 600,
    toolbar: 'undo redo | bold italic underline | fontselect fontsizeselect | bullist numlist outdent indent | forecolor backcolor | print | table ',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
