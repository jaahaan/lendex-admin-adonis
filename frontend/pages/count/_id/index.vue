<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/count">Count</BreadcrumbItem>
        <BreadcrumbItem>Edit Count</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="common-page-card">
      <Form label-position="top">
        <Row :gutter="24">
          <Col span="12">
            <FormItem label="Happy Clients">
              <Input v-model="formValue.happyClients" type="number"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Project Complete">
              <Input v-model="formValue.projectComplete" type="number"></Input>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="Years of Experience">
              <Input
                v-model="formValue.yearsOfExperience"
                type="number"
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
            <Button @click="$router.push('/count')">Cancel</Button>
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
        happyClients: "",
        projectComplete: "",
        yearsOfExperience: "",
      },
    };
  },
  methods: {
    async save() {
      this.loading = true;
      const res = await this.callApi(
        "put",
        "/app/update_count",
        this.formValue
      );
      if (res.status === 200 || res.status == 201) {
        this.loading = false;
        this.s("Updated successfully!");
        this.$router.push("/count");
      } else if (this.status == 422) {
        for (let x in response.data) {
          this.e(response.data[x]);
        }
      } else {
        this.loading = false;
        this.swr();
      }
    },

    async getDetail() {
      this.loading = true;
      const id = 1;
      const response = await this.callApi("get", `/app/get_count/${id}`);
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
