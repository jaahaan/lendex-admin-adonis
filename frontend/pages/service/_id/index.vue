<template>
  <div class="container">
    <div v-if="!formValue.parent_id">
      <div>
        <Breadcrumb>
          <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem to="/service">Service</BreadcrumbItem>
          <BreadcrumbItem>Edit Service Title</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="common-page-card">
        <Form>
          <Row :gutter="16">
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                :error="errorMessages.title"
                :required="true"
                label="Title"
              >
                <Input
                  type="text"
                  placeholder="Title"
                  v-model="formValue.title"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                label="Icon"
                :error="errorMessages.icon"
                :required="true"
              >
                <Input placeholder="Icon" v-model="formValue.icon"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <Button
                type="primary"
                :loading="loading"
                @click="update"
                style="margin-right: 10px"
              >
                <span v-if="!loading">Add</span>
                <span v-else>Please wait...</span>
              </Button>
              <Button @click="$router.push('/service')">Cancel</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div v-else>
      <div>
        <Breadcrumb>
          <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
          <BreadcrumbItem to="/service">Service</BreadcrumbItem>
          <BreadcrumbItem>Edit Service Point</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="common-page-card">
        <Form>
          <Row :gutter="16">
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem label="Parent ID">
                <Select
                  v-model="formValue.parent_id"
                  placeholder="Select Parent Menu"
                  filterable
                  clearable
                  @on-change="changeParentMenu"
                >
                  <Option
                    v-for="(item, i) in parentMenu"
                    :value="item.id"
                    :key="i"
                    >{{ item.title }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem
                :error="errorMessages.title"
                :required="true"
                label="Title"
              >
                <Input
                  type="text"
                  placeholder="Title"
                  v-model="formValue.title"
                ></Input>
              </FormItem>
            </Col>

            <Col :xs="24" :sm="24" :md="12" :lg="12">
              <FormItem label="Icon">
                <Input placeholder="Icon" v-model="formValue.icon"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <Button
                type="primary"
                :loading="loading"
                @click="update"
                style="margin-right: 10px"
              >
                <span v-if="!loading">Add</span>
                <span v-else>Please wait...</span>
              </Button>
              <Button @click="$router.push('/service')">Cancel</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sending: false,
      parentMenu: [],
      formValue: {
        id: 0,
        parent_id: null,
        title: "",
        icon: "",
      },
      errorMessages: {
        title: "",
      },
    };
  },
  methods: {
    async getRoutersAfterUpdate() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/router/autorized/sidebar`
      );
      if (response.status == 200) {
        // this.data1=response.data;
        this.$store.commit("setSideBar", response.data);
        // this.newList();
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
    async update() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }

      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_service",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Service Title Updated successfully!");
        this.$router.push("/service");
      } else if (this.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
      } else {
        this.loading = false;
        this.swr();
      }
    },
    clearErrorMessages() {
      this.errorMessages = {
        title: "",
        icon: "",
      };
    },
    async getDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_service_details/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.formValue = response.data;
        this.changeParentMenu();
      } else this.swr();
      this.loading = false;
    },
    async changeParentMenu(query) {
      const response = await this.callApi("get", `/app/getServiceTitle`);
      if (response.status == 200) {
        this.parentMenu = response.data;
      } else this.swr();
    },
  },
  async created() {
    await this.getDetail();
  },
};
</script>
