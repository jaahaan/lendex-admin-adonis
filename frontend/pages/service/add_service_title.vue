<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/service">Service</BreadcrumbItem>
        <BreadcrumbItem>Add Service Title</BreadcrumbItem>
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
            <FormItem label="Icon" :error="errorMessages.icon" :required="true">
              <Input placeholder="Icon" v-model="formValue.icon"></Input>
            </FormItem>
          </Col>

          <Col span="24">
            <Button
              type="primary"
              :loading="loading"
              @click="addTitle"
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
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sending: false,
      formValue: {
        user_id: "",
        title: "",
        icon: "",
      },
      errorMessages: {
        title: "",
        icon: "",
      },
    };
  },
  methods: {
    async addTitle() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.title.trim() == "") {
        this.errorMessages.title = "Title is required!";
        validation = false;
      }

      if (this.formValue.icon.trim() == "") {
        validation = false;
        this.errorMessages.icon = "Icon is required!";
      }

      if (validation == false) return this.$Message.error("Validation Fail!");
      this.formValue.user_id = this.authUser.id;

      this.loading = true;
      const res = await this.callApi(
        "post",
        "/app/add_service",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("New Title added successfully!");
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
  },

  async created() {},
};
</script>
