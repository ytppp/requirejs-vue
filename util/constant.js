define([], function () {
  var customers = {
    demo: 'demo',
    fhtek: 'fhtek'
  };
  var languages = {
    zh: 'zh-CN',
    en: 'en-US'
  };
  const UploadStatus = {
    ready: 'ready',
    success: 'success',
    fail: 'fail',
    uploading: 'uploading'
  };
  return {
    customers,
    languages,
    UploadStatus
  };
});
