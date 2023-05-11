<template>
  <div>
    <div class="container">
      <div>
        <Breadcrumb>
          <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="common-page-card">
        <Row>
          <Col span="24">
            <Table border :loading="loading" :columns="columns1" :data="data1">
              <template slot="loading">
                <h4 class="table-loading">
                  <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i
                  ><span style="margin-left: 10px">Loading Data...</span>
                </h4>
              </template>
            </Table>
          </Col>
        </Row>
        <div style="margin-bottom: 10px"></div>
        <Row>
          <Form ref="formInline" inline>
            <Col span="24">
              <FormItem prop="user">
                <Button
                  v-if="!isEdit"
                  type="warning"
                  icon="ios-build"
                  ghost
                  @click="showEdit"
                  >Edit</Button
                >
              </FormItem>
            </Col>
          </Form>
        </Row>
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
      listMethod: true,
      isCollapsed: false,
      visible: false,
      imgName: "",
      opening: null,
      isEdit: false,
      crfObj: {
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      columns1: [
        {
          title: "Name",
          key: "name",
          width: 200,
        },
        {
          title: "Value",
          key: "value",
          minWidth: 250,
        },
      ],
      data1: [
        {
          name: "Company Name",
          value: "-----",
        },
        {
          name: "Owner Name",
          value: "-----",
        },
        {
          name: "Owner Contact",
          value: "------",
        },
        {
          name: "Currency",
          value: "-----",
        },
        {
          name: "Referer Bonus",
          value: "-----",
        },
        {
          name: "Reference Bonus",
          value: "-----",
        },
        {
          name: "Contact",
          value: "-----",
        },
        {
          name: "Address",
          value: "------",
        },
        {
          name: "Support Email",
          value: "-----",
        },
        {
          name: "WebsiteLink",
          value: "------",
        },
        {
          name: "Support Contact",
          value: "-----",
        },
        {
          name: "Facebook",
          value: "------",
        },
        {
          name: "Company Logo",
          value: "------",
        },
        {
          name: "Favicon",
          value: "------",
        },
        {
          name: "Minimum Deposit Points",
          value: "------",
        },
        {
          name: "Membership Discount",
          value: "------",
        },
      ],
      logo: "",
    };
  },
  methods: {
    showEdit() {
      this.$router.push(`/edit_settings`);
    },
  },
  async created() {
    this.loading = true;
    const response = await this.callApi("get", "/app/setting");
    if (response.status == 200) {
      this.data1[0].value = response.data.companyName;
      this.data1[2 - 1].value = response.data.ownerName;
      this.data1[3 - 1].value = response.data.ownerContact;
      this.data1[4 - 1].value = response.data.currencyType;
      this.data1[5 - 1].value = response.data.refererBonus;
      this.data1[6 - 1].value = response.data.referenceBonus;
      this.data1[7 - 1].value = response.data.contact;
      this.data1[8 - 1].value = response.data.address;
      this.data1[9 - 1].value = response.data.supportEmail;
      this.data1[10 - 1].value = response.data.websiteLink;
      this.data1[11 - 1].value = response.data.supportContact;
      this.data1[12 - 1].value = response.data.facebookLink;
      this.data1[13 - 1].value = response.data.companyLogo;
      this.data1[14 - 1].value = response.data.favIcon;
      this.data1[15 - 1].value = response.data.min_points;
      this.data1[16 - 1].value = response.data.membership_discount;
    } else this.e("Oops!", "Something went wrong, please try again!");
    this.loading = false;
  },
};
</script>
