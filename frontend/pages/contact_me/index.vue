<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
      <BreadcrumbItem>Experiences</BreadcrumbItem>
    </Breadcrumb>

    <Table
      border
      :loading="loading"
      :columns="columns1"
      :data="data1"
      class="my-3"
    >
      <template slot="loading">
        <h4 class="table-loading">
          <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i
          ><span style="margin-left: 10px">Loading Data...</span>
        </h4>
      </template>
    </Table>

    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="close"></Icon>
        <span> Delete {{ UpdateValue.name }}</span>
      </p>
      <div>
        <div style="margin-bottom: 20px">
          Are you sure you want delete {{ UpdateValue.name }}
        </div>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="sending"
          @click="remove"
        >
          <span v-if="!loading">Delete</span>
          <span v-else>Deleting...</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      viewModal: false,
      deleteModal: false,
      loading: false,
      sending: false,
      isCollapsed: false,
      UpdateValue: {
        indexNumber: null,
        id: null,
        name: "",
      },
      columns1: [
        {
          title: "Name",
          key: "name",
          minWidth: 150,
        },
        {
          title: "Email",
          key: "email",
          minWidth: 150,
        },

        {
          title: "Contact",
          key: "contact",
          minWidth: 150,
        },
        {
          title: "Subject",
          key: "subject",
          minWidth: 150,
        },
        {
          title: "Description",
          key: "comment",
          minWidth: 150,
        },

        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    ghost: true,
                  },
                  on: {
                    click: () => {
                      this.showRemove(params.index);
                    },
                  },
                },
                "Delete"
              ),
            ]);
          },
        },
      ],

      data1: [],
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
    showRemove(index) {
      this.UpdateValue.name = this.data1[index].name;
      this.UpdateValue.id = this.data1[index].id;
      this.UpdateValue.indexNumber = index;
      this.deleteModal = true;
    },

    async remove() {
      this.sending = true;
      let ob = {
        id: this.UpdateValue.id,
      };
      const response = await this.callApi(
        "delete",
        `/app/delete_contact_me`,
        ob
      );
      if (response.status == 200) {
        this.s("Great!", "Removed successfully!");
        this.deleteModal = false;
        this.getExperiences();
      } else {
        this.e("Oops!", "Something went wrong, please try again!");
      }
      this.sending = false;
    },
    async getExperiences() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_contact_me?search=${this.search}`
      );
      if (response.status == 200) {
        this.data1 = response.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
  },

  async created() {
    await this.getExperiences();
  },
};
</script>
<style scoped>
.account_details_p {
  width: 100%;
  display: inline-block;
  text-align: start;
  font-size: 16px;
  font-weight: 600;
}
</style>
