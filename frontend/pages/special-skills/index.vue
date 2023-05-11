<template>
  <div class="container">
    <Breadcrumb>
      <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
      <BreadcrumbItem>Secial Skill</BreadcrumbItem>
    </Breadcrumb>
    <Button
      type="primary"
      @click="$router.push('/special-skills/add_skill')"
      class="my-3"
      >Add Secial Skill</Button
    >
    <Table border :loading="loading" :columns="columns1" :data="data1">
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
import draggable from "vuedraggable";
export default {
  components: {
    name: "simple",
    display: "Simple",
    order: 0,
    draggable,
  },
  data() {
    return {
      enabled: true,
      search: "",
      page: 1,
      pageOption: [5, 10, 20, 50, 100],
      pageSize: 20,
      addModal: false,
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
          title: "Title",
          key: "title",
          minWidth: 150,
        },
        {
          title: "Percentage",
          key: "percentage",
          minWidth: 150,
        },

        {
          title: "Action",
          key: "action",
          minWidth: 150,
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

      data1: [],
      newData: [],
      detailsColum: [
        {
          title: "-----",
          key: "name",
        },
        {
          title: "-----",
          slot: "value",
        },
      ],

      new_list: [],
    };
  },
  computed: {},
  methods: {
    newList() {
      this.new_list = [];
      return this.data1.forEach((data, i) => {
        this.new_list.push(data.order_no);
      });
    },
    onSortChange() {
      // this.type = this.sortData.value
      this.page = 1;
      this.getService();
    },
    log: function (e) {
      this.newData = [];
      this.data1.forEach((data, i) => {
        let obj = {
          id: data.id,
          order_no: this.new_list[i],
        };
        this.newData.push(obj);
        // this.newList[i].order=data.id
      });
      this.resetRoutePosition();
    },

    async resetRoutePosition() {
      // return;
      this.data1 = [];
      const response = await this.callApi(
        "put",
        "/app/resetSkillPosition",
        this.newData
      );
      if (response.status == 200) {
        this.s("Updated Successfully");
        this.getService();
      } else this.swr();
    },

    clearFilters() {
      this.filter = {
        name: "",
        contact: "",
        city: "",
        zone: "",
      };
    },

    getSearchCustomer() {
      this.page = 1;
      this.getService();
    },
    showEdit(index) {
      this.$router.push(`/special-skills/${this.data1[index].id}`);
    },
    showRemove(index) {
      this.UpdateValue.name = this.data1[index].title;
      // this.UpdateValue.type=this.data1[index].type
      this.UpdateValue.id = this.data1[index].id;
      this.UpdateValue.indexNumber = index;
      this.deleteModal = true;
    },

    async remove() {
      this.sending = true;
      let id = this.UpdateValue.id;

      const response = await this.callApi("delete", `/app/delete_skill/${id}`);
      if (response.status == 200) {
        this.s("Great!", "Removed successfully!");

        this.deleteModal = false;
        this.UpdateValue.password = "";
        this.getService();
      } else {
        this.e("Oops!", "Something went wrong, please try again!");
      }
      this.sending = false;
    },
    async getService() {
      this.loading = true;
      const response = await this.callApi(
        "get",
        `/app/get_skills?search=${this.search}`
      );
      if (response.status == 200) {
        this.data1 = response.data;
        // this.prevData = response.data
        this.newList();
        // this.data1=response.data.data;
        // this.pagination=response.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.loading = false;
    },
  },
  async created() {
    await this.getService();
  },
};
</script>

<style scoped>
.tr {
  background-color: rgb(48, 46, 46);
  color: rgb(223, 219, 219);
}
.li {
  list-style-type: none;
  /* width: 100%; */
  display: flex;
  border: 1px solid rgb(85, 82, 82);
  justify-content: space-around;
  align-items: center;
  /* flex:1; */
  gap: 15px;
  text-align: center;
  padding: 5px;
  margin: 8px auto;
}
.li:hover {
  cursor: move;
}
.li p {
  font-size: 16px;
  flex-basis: 180px;
  width: 150px;
  word-break: break-all;
  /* min-width: 150px; */
}
/* .li div{
        margin-right: 0;
        justify-self: flex-end;
    } */
.li p Button {
  margin: 0 3px 2px 0;
}
.li p Button:hover {
  cursor: pointer;
}
.active:active {
  background-color: #021e27 !important;
  color: #fff;
  width: 100%;
  cursor: move;
  border: 1px solid black;
}
</style>
