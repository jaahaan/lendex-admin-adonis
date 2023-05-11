<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/satisfied_clients"
          >Satisfied Clients</BreadcrumbItem
        >
        <BreadcrumbItem>Edit Satisfied Clients</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form label-position="top">
        <Row :gutter="24">
          <Col span="12">
            <FormItem
              :error="errorMessages.company"
              :required="true"
              label="Company"
            >
              <Input v-model="formValue.company"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              :error="errorMessages.name"
              :required="true"
              label="Client Name"
            >
              <Input v-model="formValue.name"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              :error="errorMessages.designation"
              :required="true"
              label="Designation"
            >
              <Input v-model="formValue.designation"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              :error="errorMessages.rating"
              :required="true"
              label="Rating"
            >
              <Input v-model="formValue.rating"></Input>
            </FormItem>
          </Col>

          <Col span="24">
            <FormItem label="Description">
              <Input
                v-model="formValue.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write description..."
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <Button
              type="primary"
              :loading="loading"
              @click="save"
              style="margin-right: 10px"
            >
              <span v-if="!loading">Add</span>
              <span v-else>Please wait...</span>
            </Button>
            <Button @click="$router.push('/satisfied_clients')">Cancel</Button>
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
        id: 0,
        name: "",
        company: "",
        designation: "",
        rating: "",
        description: "",
      },
      errorMessages: {
        name: "",
        company: "",
        name: "",
        start_date: "",
      },
    };
  },
  methods: {
    async save() {
      let validation = true;

      this.clearErrorMessages();
      if (this.formValue.name.trim() == "") {
        this.errorMessages.name = "Name is required!";
        validation = false;
      }
      if (this.formValue.company.trim() == "") {
        this.errorMessages.company = "Company is required!";
        validation = false;
      }
      if (this.formValue.name.trim() == "") {
        this.errorMessages.name = "name is required!";
        validation = false;
      }
      if (this.formValue.start_date == "") {
        this.errorMessages.start_date = "Start Date is required!";
        validation = false;
      }
      if (validation == false) return this.$Message.error("Validation Fail!");

      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_satisfied_clients",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/satisfied_clients");
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
        name: "",
        company: "",
        designation: "",
        rating: "",
      };
    },
    async getDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_satisfied_clients/${this.$route.params.id}`
      );
      if (response.status == 200) {
        this.formValue = response.data;
      } else this.swr();
      this.loading = false;
    },
  },
  async created() {
    await this.getDetail();
  },
};
</script>
