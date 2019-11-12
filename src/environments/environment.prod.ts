export const environment = {
  production: true,
  baseUrl: 'http://localhost:3000/api',
  tinymceConfig:{
    menubar:false,
    statusbar: false,
    base_url: '/tinymce', // Root for resources
    suffix: '.min',       // Suffix to use when loading resources
    language: 'es_MX',
    plugins: 'lists advlist autoresize',
    min_height: 350,
    autoresize_on_init: true,
    max_height: 600,
    toolbar: 'undo redo | bold italic | bullist numlist outdent indent | forecolor backcolor'
  }
};
