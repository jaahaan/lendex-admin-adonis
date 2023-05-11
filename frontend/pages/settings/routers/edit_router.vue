<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/routers">Routers</BreadcrumbItem>
        <BreadcrumbItem>Add Router</BreadcrumbItem>
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
            <FormItem :error="errorMessages.type" :required="true" label="Type">
              <!-- <Input type="text" placeholder="Type"  v-model="formValue.type"></Input> -->
              <Select v-model="formValue.type" placeholder="Type">
                <Option value="submenu">Submenu</Option>
                <Option value="menu">Menu</Option>
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
            <FormItem :error="errorMessages.name" :required="true" label="Name">
              <Input
                type="text"
                placeholder="Name"
                v-model="formValue.name"
              ></Input>
            </FormItem>
          </Col>

          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem :error="errorMessages.path" label="Path">
              <Input placeholder="Path" v-model="formValue.path"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="Icon">
              <Input placeholder="Icon" v-model="formValue.icon"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24" :md="12" :lg="12">
            <FormItem label="Include In SideMenu : ">
              <Checkbox
                border
                :value="formValue.is_show == 1 ? true : false"
                @on-change="
                  formValue.is_show == 1
                    ? (formValue.is_show = 0)
                    : (formValue.is_show = 1)
                "
              ></Checkbox>
            </FormItem>
          </Col>
          <Col span="24">
            <Button
              type="primary"
              :loading="loading"
              @click="addRouter"
              style="margin-right: 10px"
            >
              <span v-if="!loading">Add</span>
              <span v-else>Please wait...</span>
            </Button>
            <Button @click="$router.push('/routers')">Cancel</Button>
          </Col>
        </Row>
      </Form>
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
        type: "",
        title: "",
        name: "",
        path: "",
        parent_id: "",
        icon: "",
        is_show: 1,
      },
      errorMessages: {
        type: "",
        title: "",
        name: "",
        path: "",
        icon: "",
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
    async addRouter() {
      let validation = true;

      this.clearErrorMessages();
      if (this.formValue.type == "") {
        this.errorMessages.type = "Type is required!";
        validation = false;
      }
      if (this.formValue.parent_id == undefined) {
        this.formValue.parent_id = "";
      }
      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }

      if (this.formValue.name.trim() == "") {
        validation = false;
        this.errorMessages.name = "Name is required!";
      }
      if (this.formValue.type == "menu" && !this.formValue.path) {
        this.errorMessages.path = "Path is required!";
        validation = false;
      }

      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_router",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Router Updated successfully!");
        this.getRoutersAfterUpdate();
        this.$router.push("/routers");
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
        type: "",
        title: "",
        name: "",
        path: "",
        icon: "",
      };
    },
    async getRouterDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_router/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.changeParentMenu();
        this.formValue = response.data;
      } else this.swr();
      this.loading = false;
    },
    async changeParentMenu(query) {
      const response = await this.callApi("get", `/app/getParentMenu`);
      if (response.status == 200) {
        this.parentMenu = response.data;
      } else this.swr();
    },
  },
  async created() {
    await this.getRouterDetail();
  },
};
</script>
