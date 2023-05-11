<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Theme Settings</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Row>
        <Col span="24">
          <Table :loading="loading" :columns="columns1" border :data="data1">
            <template slot-scope="{ row, index }" slot="color">
              <template v-if="isEdit">
                <input
                  style="width: 120px"
                  type="color"
                  v-model="formValue[index].value"
                />
              </template>
              <div
                v-else
                :style="`width: 50%; height: 25px; background: ${row.value};`"
              ></div>
            </template>
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
              <Button
                v-if="isEdit"
                type="primary"
                icon="md-checkmark"
                @click="saveChanges"
              >
                Save
              </Button>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </div>
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
      id: "",
      editObj: {
        index: -1,
        item: null,
      },
      crfObj: {
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      columns1: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Value",
          slot: "color",
        },
      ],
      data1: [
        {
          name: "Theme Color",
          value: "-----",
        },
        {
          name: "Background Color",
          value: "----",
        },
        {
          name: "Font Color",
          value: "-----",
        },
        {
          name: "Font Hover Color",
          value: "-----",
        },
      ],
      formValue: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    showEdit(id) {
      this.formValue[0].value = this.data1[0].value;
      this.formValue[1].value = this.data1[1].value;
      this.formValue[2].value = this.data1[2].value;
      this.formValue[3].value = this.data1[3].value;
      this.isEdit = true;
    },

    async saveChanges() {
      let ob = {
        id: this.id,
        theme_colour: this.formValue[0].value,
        background_color: this.formValue[1].value,
        font_color: this.formValue[2].value,
        font_hover_color: this.formValue[3].value,
      };
      const response = await this.callApi("put", "/app/themeSettingUpdate", ob);
      if (response.status == 200) {
        this.data1[0].value = this.formValue[0].value;
        this.data1[1].value = this.formValue[1].value;
        this.data1[2].value = this.formValue[2].value;
        this.data1[3].value = this.formValue[3].value;
        this.isEdit = false;

        location.reload();
      } else if (response.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
        this.isEdit = false;
      } else this.swr();
      this.isEdit = false;
    },

    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    async getThemeSetting() {
      this.loading = true;
      const response = await this.callApi("get", "/app/getThemeSetting");
      if (response.status == 200) {
        this.id = response.data.id;
        this.data1[0].value = response.data.theme_colour;
        this.data1[1].value = response.data.background_color;
        this.data1[2].value = response.data.font_color;
        this.data1[3].value = response.data.font_hover_color;
        this.loading = false;
      } else this.e("Oops!", "Something went wrong, please try again!");
    },
  },
  async created() {
    this.$store.dispatch("updateHeader", "Theme Settings");
    console.log(typeof this.crfObj);
    await this.getThemeSetting();
  },
};
</script>
