<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/experiences">Experiences</BreadcrumbItem>
        <BreadcrumbItem>Edit Experience</BreadcrumbItem>
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
              :error="errorMessages.designation"
              :required="true"
              label="Designation"
            >
              <Input v-model="formValue.designation"></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem
              :error="errorMessages.start_date"
              :required="true"
              label="Start Date"
            >
              <DatePicker
                type="month"
                v-model="formValue.start_date"
                placeholder="Start Date"
                class="d-block"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="End Date (or expected)">
              <DatePicker
                type="month"
                v-model="formValue.end_date"
                placeholder="End Date (or expected)"
                class="d-block"
              ></DatePicker>
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
            <Button @click="$router.push('/experiences')">Cancel</Button>
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
        company: "",
        designation: "",
        start_date: "",
        end_date: "",
        description: "",
      },
      errorMessages: {
        company: "",
        designation: "",
        start_date: "",
      },
    };
  },
  methods: {
    async save() {
      let validation = true;

      this.clearErrorMessages();

      if (this.formValue.company.trim() == "") {
        this.errorMessages.company = "Company is required!";
        validation = false;
      }
      if (this.formValue.designation.trim() == "") {
        this.errorMessages.designation = "Designation is required!";
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
        "/app/update_experience",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/experiences");
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
        institute: "",
        degree: "",
        start_date: "",
      };
    },
    async getDetail() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_experience/${this.$route.params.id}`
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
