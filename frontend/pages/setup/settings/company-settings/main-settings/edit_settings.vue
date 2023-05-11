<template>
  <div>
    <div class="container">
      <div>
        <Breadcrumb>
          <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem to="/settings">Settings</BreadcrumbItem>
          <BreadcrumbItem>Edit</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="common-page-card">
        <Form ref="formValue" :model="formValue" label-position="top">
          <Row :gutter="16">
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Company Name"
                :error="errorMessages.companyName"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="Company Name"
                  v-model="formValue.companyName"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Owner Name"
                :error="errorMessages.ownerName"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="Owner Name"
                  v-model="formValue.ownerName"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Contact"
                :error="errorMessages.contact"
                :required="true"
              >
                <Input
                  type="number"
                  placeholder="Contact Number"
                  v-model="formValue.contact"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Owner Contact"
                :error="errorMessages.ownerContact"
                :required="true"
              >
                <Input
                  type="number"
                  placeholder="Owner Contact Number"
                  v-model="formValue.ownerContact"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Company Address"
                :error="errorMessages.address"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="Company Address"
                  v-model="formValue.address"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Openning Date"
                :error="errorMessages.opening_date"
                :required="true"
              >
                <DatePicker
                  size="large"
                  v-model="formValue.opening_date"
                  type="date"
                  format="yyyy-MM-dd"
                  @on-change="handleDateChange"
                  placeholder="Enter Start Date"
                  style="width: 100%"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Support Email"
                :error="errorMessages.supportEmail"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="supportEmail"
                  v-model="formValue.supportEmail"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Support Contact"
                :error="errorMessages.supportContact"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="supportContact"
                  v-model="formValue.supportContact"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Website Link"
                :error="errorMessages.websiteLink"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="website Link"
                  v-model="formValue.websiteLink"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Facebook Link"
                :error="errorMessages.facebookLink"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="facebook Link"
                  v-model="formValue.facebookLink"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Currency Type"
                :error="errorMessages.currencyType"
                :required="true"
              >
                <Select
                  v-model="formValue.currencyType"
                  placeholder="Select Currency"
                  filterable
                >
                  <Option
                    v-for="(item, index) in currencyList"
                    :value="item.cc"
                    :key="index"
                    >{{ item.name }} - {{ item.symbol }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Invoice Tag"
                :error="errorMessages.invoiceTag"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="invoiceTag"
                  v-model="formValue.invoiceTag"
                ></Input>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Reference Bonus"
                :error="errorMessages.referenceBonus"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="Reference Bonus"
                  v-model="formValue.referenceBonus"
                  :max="100"
                  :min="0"
                  :formatter="(value) => `${value}%`"
                  :parser="(value) => value.replace('%', '')"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Referer Bonus"
                :error="errorMessages.refererBonus"
                :required="true"
              >
                <Input
                  type="text"
                  placeholder="Bonus Amount"
                  v-model="formValue.refererBonus"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem label="Minimum Deposit Point">
                <Input
                  type="number"
                  placeholder="Minimum Deposit Point"
                  v-model="formValue.min_points"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem label="Membership Discount">
                <Input
                  type="number"
                  placeholder="Membership Discount"
                  v-model="formValue.membership_discount"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem label="Free Shipping">
                <Checkbox
                  v-model="formValue.isShippingFree"
                  :true-value="1"
                  :false-value="0"
                  >Free Shipping</Checkbox
                >
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <template v-if="!formValue.isShippingFree">
                <FormItem label="Free Shipping After">
                  <InputNumber
                    :min="0"
                    v-model="formValue.shippingFreeAfter"
                  ></InputNumber>
                </FormItem>
              </template>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Company Logo"
                :error="errorMessages.companyLogo"
                :required="true"
              >
                <div>
                  <div class="demo-upload-list" v-for="item in logoUploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove('logo')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :headers="crfObj"
                    name="img"
                    :show-upload-list="false"
                    :default-file-list="[]"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png', 'webp']"
                    :max-size="2048"
                    :data="{ type: 'gallery' }"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    type="drag"
                    action="/app/setting/upload"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                </div>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Favicon"
                :error="errorMessages.favIcon"
                :required="true"
              >
                <div>
                  <div
                    class="demo-upload-list"
                    v-for="item in faviconUploadList"
                  >
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove('Favicon')"
                        ></Icon>
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                  <Upload
                    ref="upload"
                    :headers="crfObj"
                    name="img"
                    :show-upload-list="false"
                    :default-file-list="[]"
                    :on-success="handleIconSuccess"
                    :format="['png', 'ico']"
                    :max-size="2048"
                    :data="{ type: 'gallery' }"
                    :on-format-error="handleIconFormatError"
                    :on-exceeded-size="handleIconMaxSize"
                    type="drag"
                    action="/app/setting/upload"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                </div>
              </FormItem>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span="24">
              <Button
                type="primary"
                :loading="loading"
                @click="settingSave"
                style="margin-right: 10px"
              >
                <span v-if="!loading">Save</span>
                <span v-else>Please Wait...</span>
              </Button>
              <Button @click="$router.push('/settings')">
                <span>Cancel</span>
              </Button>
            </Col>

            <div style="text-align: center"></div>
          </Row>
        </Form>
      </div>
    </div>
    <Modal title="View Image" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      imgName: "",
      opening: null,

      formValue: {
        id: "",
        companyName: "",
        ownerName: "",
        contact: "",
        ownerContact: "",
        address: "",
        facebookLink: "",
        companyLogo: "",
        favIcon: "",
        opening_date: "",

        currencyType: "",
        referenceBonus: "",
        refererBonus: "",
        companyInfo: "",
        vat_no: "",
        extraAddress: "",
        isShippingFree: "",
        shippingFreeAfter: 1000,
        supportEmail: "",
        websiteLink: "",
        supportContact: "",
        invoiceTag: "",
        isAmountUpdate: false,
      },
      errorMessages: {
        companyName: "",
        ownerName: "",
        contact: "",
        ownerContact: "",
        address: "",
        facebookLink: "",
        companyLogo: "",
        favIcon: "",
        opening_date: "",

        currencyType: "",
        referenceBonus: "",
        refererBonus: "",
        companyInfo: "",
        vat_no: "",
        extraAddress: "",
        supportEmail: "",
        websiteLink: "",
        supportContact: "",
        invoiceTag: "",
        isAmountUpdate: false,
      },
      logo: "",
      logoUploadList: [],
      faviconUploadList: [],
    };
  },
  methods: {
    handleDateChange(date) {
      this.formValue.opening_date = date;
    },
    handleSuccess(res, file) {
      this.formValue.companyLogo = res.imageUrl;
      file.url = res.imageUrl;
      file.name = res.imageUrl;
      this.logoUploadList = [];
      this.logoUploadList.push(file);
      console.log(file);
    },

    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png.",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },
    handleIconSuccess(res, file) {
      this.formValue.favIcon = res.imageUrl;
      file.url = res.imageUrl;
      file.name = res.imageUrl;
      this.faviconUploadList = [];
      this.faviconUploadList.push(file);
      console.log(file);
    },

    handleIconFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select png or ico.",
      });
    },
    handleIconMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M.",
      });
    },

    handleView(item, index) {
      this.imgName = item;
      this.visible = true;
    },
    handleRemove(value) {
      if (value == "logo") {
        this.formValue.companyLogo = "";
        this.logoUploadList = [];
      } else {
        this.formValue.favIcon = "";
        this.faviconUploadList = [];
      }
    },

    async settingSave() {
      let validation = true;
      this.clearErrorMessages();

      if (
        this.formValue.companyName == "" ||
        this.formValue.companyName.trim() == ""
      ) {
        this.errorMessages.companyName = "Company Name is required!";
        validation = false;
      }
      if (
        this.formValue.ownerName == "" ||
        this.formValue.ownerName.trim() == ""
      ) {
        this.errorMessages.ownerName = "Owner Name is required!";
        validation = false;
      }
      if (this.formValue.contact == "") {
        validation = false;
        this.errorMessages.contact = "Contact is required!";
      }
      if (this.formValue.ownerContact == "") {
        validation = false;
        this.errorMessages.ownerContact = "Owner Contact is required!";
      }
      if (this.formValue.address == "" || this.formValue.address.trim() == "") {
        validation = false;
        this.errorMessages.address = "Company Address is required!";
      }
      if (this.formValue.opening_date == "") {
        validation = false;
        this.errorMessages.opening_date = "Opening Date is required!";
      }
      if (
        this.formValue.facebookLink == "" ||
        this.formValue.facebookLink.trim() == ""
      ) {
        validation = false;
        this.errorMessages.facebookLink = "Facebook is required!";
      }
      if (this.formValue.companyLogo == "") {
        validation = false;
        this.errorMessages.companyLogo = "Company Logo is required!";
      }
      if (this.formValue.favIcon == "") {
        validation = false;
        this.errorMessages.favIcon = "FavIcon is required!";
      }
      if (this.formValue.currencyType == "") {
        this.errorMessages.currencyType = "Currency Type is required!";
      }
      if (
        this.formValue.referenceBonus == "" ||
        this.formValue.referenceBonus.trim() == ""
      ) {
        validation = false;
        this.errorMessages.referenceBonus = "Reference Bonus is required!";
      }
      if (
        this.formValue.refererBonus == "" ||
        this.formValue.refererBonus.trim() == ""
      ) {
        validation = false;
        this.errorMessages.refererBonus = "Referer Bonus is required!";
      }
      if (this.formValue.companyInfo == "") {
        validation = false;
        this.errorMessages.companyInfo = "Company Info is required!";
      }

      if (
        this.formValue.supportEmail == "" ||
        this.formValue.supportEmail.trim() == ""
      ) {
        validation = false;
        this.errorMessages.supportEmail = "Support Email is required!";
      }
      if (
        this.formValue.websiteLink == "" ||
        this.formValue.websiteLink.trim() == ""
      ) {
        validation = false;
        this.errorMessages.websiteLink = "Website is required!";
      }
      if (this.formValue.supportContact == "") {
        validation = false;
        this.errorMessages.supportContact = "Support Contact is required!";
      }
      if (this.formValue.invoiceTag == "") {
        validation = false;
        this.errorMessages.invoiceTag = "Invoice Tag is required!";
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;

      const response = await this.callApi(
        "put",
        "/app/setting",
        this.formValue
      );
      if (response.status == 200) {
        this.s("Great!", "Settings information has been added successfully!");
        setTimeout(() => {
          window.location = "/settings";
        }, 2000);
      } else if (response.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
        this.loading = false;
      } else {
        this.e("Oops!", "Something went wrong, please try again!");
      }
      this.loading = false;
    },
    clearErrorMessages() {
      this.errorMessages = {
        companyName: "",
        ownerName: "",
        contact: "",
        ownerContact: "",
        address: "",
        facebookLink: "",
        companyLogo: "",
        favIcon: "",
        opening_date: "",

        currencyTypeType: "",
        referenceBonus: "",
        refererBonus: "",
        companyInfo: "",
        vat_no: "",
        extraAddress: "",
        supportEmail: "",
        websiteLink: "",
        supportContact: "",
        invoiceTag: "",
        isAmountUpdate: false,
      };
    },
  },
  async created() {
    const response = await this.callApi("get", "/app/setting");
    if ((response.status = 200)) {
      this.formValue = response.data;
      this.logoUploadList = [];
      let file = {
        url: response.data.companyLogo,
        name: response.data.companyLogo,
        status: "finished",
      };
      this.logoUploadList.push(file);

      this.faviconUploadList = [];
      file = {
        url: response.data.favIcon,
        name: response.data.favIcon,
        status: "finished",
      };
      this.faviconUploadList.push(file);
    } else this.swr();
  },
};
</script>
