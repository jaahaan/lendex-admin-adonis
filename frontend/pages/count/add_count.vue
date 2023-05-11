<template>
  <div class="container">
    <div>
      <Breadcrumb>
        <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
        <BreadcrumbItem to="/experiences">Counts</BreadcrumbItem>
        <BreadcrumbItem>Add Count</BreadcrumbItem>
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
        user_id: authUser.id,
        happyClients: "",
        projectComplete: "",
        yearsOfExperience: "",
      },
    };
  },
  methods: {
    async save() {
      this.loading = true;
      const res = await this.callApi("post", "/app/add_count", this.formValue);
      if (res.status === 201) {
        this.loading = false;
        this.s("Added successfully!");
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
  },

  async created() {},
};
</script>
