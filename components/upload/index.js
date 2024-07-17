define(function (require) {
  require('fh-upload-dragger');
  require('fh-button');
  var Vue = require('vue');
  var { UploadStatus } = require('constant');
  var { toLocaleNumber } = require('i18n/index');
  let { getFileExtendName } = require('tool');
  Vue.component('FhUpload', {
    template: require('text!./components/upload/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      onSuccess: { type: Function },
      onError: { type: Function },
      onChange: { Function },
      onCancel: { type: Function },
      label: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: '.bin'
      },
      request: { type: Function },
      beforeUpload: { type: Function },
      packageInfo: {},
      dragable: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: 50 * 1000 * 1000
      },
      isFormUpload: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: String
    },
    data() {
      return {
        files: [],
        draggerFiles: [],
        percentage: 0,
        status: UploadStatus.ready,
        err: ''
      };
    },
    computed: {
      uploadDisabled() {
        return this.disabled || (this.form || {}).disabled || this.uploadLoading
      },
      uploadSuccess() {
        return this.status === UploadStatus.success;
      },
      uploadLoading() {
        return this.status === UploadStatus.uploading;
      },
      uploadFail() {
        return this.status === UploadStatus.fail;
      },
      percent() {
        return Math.min(this.percentage, 100);
      },
      width() {
        return `${this.percent}%`;
      },
      fileIcon() {
        return this.uploadFail ? 'ic_folder_error' : 'ic_folder';
      },
      labelText() {
        return this.label ? this.label : this.$t('trans0209').format(this.accept)
      }
    },
    methods: {
      uploadDragFiles(files) {
        if (files && !files.length) return;
        this.draggerFiles = files;
        let postFiles = [].slice.call(files);
        if (!this.multiple) {
          postFiles = postFiles.slice(0, 1);
        }
        this.files = postFiles;
        this.validateFileFormat();
      },
      getSize(file) {
        return `${toLocaleNumber(
          file.size / 1000 / 1000,
          this.$i18n.locale,
          2,
          2
        )}MB`;
      },
      click() {
        this.initUploadStatus();
        this.$refs.upload.click();
      },
      initUploadStatus() {
        this.files = [];
        this.err = '';
        this.percentage = 0;
        this.status = UploadStatus.ready;
        this.$refs.upload.value = null;
        this.onChange && this.onChange();
      },
      validateFileFormat() {
        const isZeroSize = !!this.files.find(file => file.size === 0);
        let flag = true;
        if (isZeroSize) {
          this.status = UploadStatus.fail;
          this.err = this.$t('trans0206');
          flag = false;
        }
        const isLimitOver = !!this.files.find(file => file.size >= this.limit);
        if (isLimitOver) {
          this.status = UploadStatus.fail;
          this.err = this.$t('trans0211');
          flag = false;
        }
        const reg = new RegExp(`^${this.accept.slice(1)}$`, 'i');
        const isInvalidFile = !!this.files.find(file => {
          const entendName = getFileExtendName(file);
          return !reg.test(entendName);
        });
        if (isInvalidFile) {
          this.status = UploadStatus.fail;
          this.err = this.$t('trans0208').format(this.accept);
          flag = false;
        }
        if (this.beforeUpload && !this.beforeUpload(this.files)) {
          this.status = UploadStatus.fail;
          flag = false;
        }
        if (!flag && this.onError) {
          this.onError();
          return;
        }
        if (this.isFormUpload) {
          this.status = UploadStatus.success;
          if (this.onSuccess) {
            this.onSuccess();
          }
        } else {
          this.upload();
        }
      },
      handleChange(ev) {
        const { files } = ev.target;
        if (files && !files.length) return;
        let postFiles = Array.prototype.slice.call(files);
        if (!this.multiple) {
          postFiles = postFiles.slice(0, 1);
        }
        this.files = postFiles;
        this.validateFileFormat();
      },
      upload() {
        if (!this.request) {
          // 组件内部实现自己的上传逻辑
        } else {
          // 外部上传
          this.request(this.files);
        }
        return true;
      },
      cancel(file) {
        // 组件内部的取消逻辑
        this.files = this.files.filter(v => v.name !== file.name);
        this.$refs.upload.value = null;
        this.status = UploadStatus.ready;
        this.onCancel && this.onCancel(file);
      }
    }
  });
});
