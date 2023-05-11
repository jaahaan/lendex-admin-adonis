<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
      <BreadcrumbItem>Trusted Companies</BreadcrumbItem>
    </Breadcrumb>

    <Button
      type="primary"
      class="my-3"
      @click="$router.push('/trusted_company/add_trusted_company')"
    >
      Add Trusted Companies</Button
    >

    <Table border :loading="loading" :columns="columns1" :data="data1">
      <template slot-scope="{ index }" slot="image">
        <img :src="`${http + data1.image}`" />
      </template>
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

    <Modal v-model="viewModal" :title="detailsItem.title" :footer-hide="true">
      <div class="_item_details">
        <Table
          border
          :columns="detailsColum"
          :data="detailsItem.data"
          :show-header="false"
        ></Table>
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
      http: "http://127.0.0.1:8000/attachments/",

      UpdateValue: {
        indexNumber: null,
        id: null,
        name: "",
      },
      columns1: [
        {
          title: "Image",
          key: "image",
          minWidth: 150,
        },
        {
          title: "Name",
          key: "name",
          minWidth: 150,
        },
        {
          title: "Icon",
          key: "icon",
          minWidth: 150,
        },

        {
          title: "Moto",
          key: "moto",
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
                    type: "warning",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.showEdit(params.index);
                    },
                  },
                },
                "Edit"
              ),
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

      detailsColum: [
        {
          title: "-----",
          key: "name",
        },
        {
          title: "-----",
          key: "value",
        },
      ],
      detailsItem: {
        title: "",
        data: [
          {
            name: "Project Name",
            value: "-----",
          },
          {
            name: "Title",
            value: "-----",
          },
          {
            name: "Subtitle",
            value: "-----",
          },
          {
            name: "How To Complete",
            value: "------",
          },
          {
            name: "Idea Generate",
            value: "-----",
          },
          {
            name: "Reasearch Sketching",
            value: "-----",
          },
          {
            name: "Launced Project",
            value: "------",
          },
          {
            name: "Result Summery",
            value: "----",
          },
          {
            name: "Description",
            value: "-----",
          },
          {
            name: "Clients",
            value: "-----",
          },
          {
            name: "Budget",
            value: "-----",
          },
          {
            name: "Duration",
            value: "-----",
          },
          {
            name: "Date",
            value: "-----",
          },
        ],
      },
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
    showEdit(index) {
      this.$router.push(`/trusted_company/${this.data1[index].id}`);
    },
    showView(index) {
      this.detailsItem.data = [];
      this.detailsItem.title = this.data1[index].type;
      let ob = {
        name: "Project Name",
        value: this.data1[index].trusted_companyName,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Title",
        value: this.data1[index].title,
      };
      this.detailsItem.data.push(ob);

      ob = {
        name: "Subtitle",
        value: this.data1[index].subtitle,
      };
      this.detailsItem.data.push(ob);

      ob = {
        name: "How To Complete",
        value: this.data1[index].howToComplete,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Idea Generate",
        value: this.data1[index].idea_generate,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Reasearch Sketching",
        value: this.data1[index].reasearch_sketching,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Launced Project",
        value: this.data1[index].launced_project,
      };
      this.detailsItem.data.push(ob);
      ob = {
        name: "Result Summery",
        value: this.data1[index].result_summery,
      };
      this.detailsItem.data.push(ob);

      ob = {
        name: "Description",
        value: this.data1[index].description,
      };

      this.detailsItem.data.push(ob);
      ob = {
        name: "Clients",
        value: this.data1[index].clients,
      };

      this.detailsItem.data.push(ob);
      ob = {
        name: "Budget",
        value: this.data1[index].budget,
      };

      this.detailsItem.data.push(ob);
      ob = {
        name: "Duration",
        value: this.data1[index].duration,
      };

      this.detailsItem.data.push(ob);
      ob = {
        name: "Date",
        value: this.data1[index].date,
      };

      this.detailsItem.data.push(ob);

      this.viewModal = true;
    },
    showRemove(index) {
      this.UpdateValue.name = this.data1[index].trusted_companyName;
      this.UpdateValue.id = this.data1[index].id;
      this.UpdateValue.indexNumber = index;
      this.deleteModal = true;
    },
    async handleRemove() {
      let name;
      name = this.data1[this.UpdateValue.indexNumber].image;
      const res = await this.callApi("post", "/app/delete_image", {
        imageName: name,
      });
    },
    async remove() {
      this.sending = true;
      let id = this.UpdateValue.id;
      this.handleRemove();
      const response = await this.callApi(
        "delete",
        `/app/delete_trusted_company/${id}`
      );
      if (response.status == 200) {
        this.s("Great!", "Removed successfully!");
        this.getProjects();
      } else {
        this.e("Oops!", "Something went wrong, please try again!");
      }
      this.deleteModal = false;
      this.sending = false;
    },
    async getProjects() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_trusted_company?search=${this.search}`
      );
      if (response.status == 200) {
        this.data1 = response.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
  },

  async created() {
    await this.getProjects();
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
