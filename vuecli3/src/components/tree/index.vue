<template>
  <div class="parent-tree">
    <el-button @click="resetChecked">清空2</el-button>
    <el-tree ref="tree"
             :data="data"
             show-checkbox
             node-key="realDataId"
             :default-checked-keys="[]"
             :default-expanded-keys="defaultExpandedKeys"
             :expand-on-click-node="false"
             @check-change="selectChange"
             @check="currentChange"
             :filter-node-method="filterNode">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          realDataId: "1",
          label: "一级",
          disabled: true,
          children: [
            {
              realDataId: "day",
              label: "日指标",
              children: [
                {
                  realDataId: "day-1",
                  label: "日-1"
                }
              ]
            },
            {
              realDataId: "week",
              label: "周指标",
              children: [
                {
                  realDataId: "week-1",
                  label: "周-1",
                  children: [
                    {
                      realDataId: "week-1-2",
                      label: "周-1-2"
                    },
                    {
                      realDataId: "week-1-3",
                      label: "周-1-3"
                    }
                  ]
                }
              ]
            },
            {
              realDataId: "month",
              label: "月指标",
              children: [
                {
                  realDataId: "month-1",
                  label: "月-1"
                }
              ]
            },
            {
              realDataId: "year",
              label: "年指标",
              children: [
                {
                  realDataId: "year-1",
                  label: "年-1"
                }
              ]
            }
          ]
        },
        {
          realDataId: "2",
          label: "二级",
          disabled: true,
          children: [
            {
              realDataId: "day",
              label: "日指标",
              children: [
                {
                  realDataId: "day-2",
                  label: "日-2"
                }
              ]
            },
            {
              realDataId: "week",
              label: "周指标",
              children: [
                {
                  realDataId: "week-2",
                  label: "周-2"
                }
              ]
            },
            {
              realDataId: "month",
              label: "月指标",
              children: [
                {
                  realDataId: "month-2",
                  label: "月-2"
                }
              ]
            },
            {
              realDataId: "year",
              label: "年指标",
              children: [
                {
                  realDataId: "year-2",
                  label: "年-2"
                }
              ]
            }
          ]
        },
        {
          realDataId: "3",
          label: "三级",
          disabled: true,
          children: [
            {
              realDataId: "day",
              label: "日指标",
              children: [
                {
                  realDataId: "day-3",
                  label: "日-3"
                }
              ]
            },
            {
              realDataId: "week",
              label: "周指标",
              children: [
                {
                  realDataId: "week-3",
                  label: "周-3"
                }
              ]
            },
            /* {
              realDataId: "month",
              label: "月指标",
              children: [
                {
                  realDataId: "month-3",
                  label: "月-3"
                }
              ]
            }, */
            {
              realDataId: "year",
              label: "年指标",
              children: [
                {
                  realDataId: "year-3",
                  label: "年-3"
                }
              ]
            }
          ]
        },
        {
          realDataId: "4",
          label: "四级",
          disabled: true,
          children: [
            {
              realDataId: "day",
              label: "日指标",
              children: [
                {
                  realDataId: "day-4",
                  label: "日-4"
                },
                {
                  realDataId: "day-4-2",
                  label: "日-4-2"
                }
              ]
            },
            /* {
              realDataId: "week",
              label: "周指标",
              children: [
                {
                  realDataId: "week-4",
                  label: "周-4"
                }
              ]
            }, */
            {
              realDataId: "month",
              label: "月指标",
              children: [
                {
                  realDataId: "month-4",
                  label: "月-4"
                }
              ]
            },
            {
              realDataId: "year",
              label: "年指标",
              children: [
                {
                  realDataId: "year-4",
                  label: "年-4"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultExpandedKeys: ["day", "week", "month", "year"],
      flag: ""
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    selectChange(obj) {
      if (!this.flag && this.defaultExpandedKeys.includes(obj.realDataId)) {
        let data = JSON.parse(JSON.stringify(this.data));
        const dfs = root => {
          console.log(root.realDataId, obj.realDataId);
          if (root.realDataId !== obj.realDataId) {
            root.disabled = true;
          }
          if (root && root.realDataId !== obj.realDataId && root.children) {
            root.children.forEach(dfs);
          }
        };
        data.forEach(node => {
          dfs(node);
        });
        this.data = data;
        setTimeout(() => {
          this.flag = obj.realDataId;
        });
      }
      const checkedNodes = this.$refs.tree.getCheckedNodes(true);
      // console.log(checkedNodes);
      if (!checkedNodes.length && this.flag) {
        // console.log(this.flag);
        let data = JSON.parse(JSON.stringify(this.data));
        const dfs = root => {
          if (root.realDataId !== obj.realDataId) {
            root.disabled = false;
          }
          if (root && root.realDataId !== obj.realDataId && root.children) {
            root.children.forEach(dfs);
          }
        };
        data.forEach(node => {
          dfs(node);
          node.disabled = true;
        });
        this.data = data;
        setTimeout(() => {
          this.flag = "";
        });
      }
    },
    filterNode(value, data, node) {
      console.log(value, data, node);
      return false;
    },
    currentChange(data, node) {
      if (!this.flag) {
        console.log(data.realDataId);
        let defaultExpandedKeys = JSON.parse(
          JSON.stringify(this.defaultExpandedKeys)
        );
        defaultExpandedKeys.push(data.realDataId);
        this.defaultExpandedKeys = defaultExpandedKeys;
        setTimeout(() => {
          defaultExpandedKeys.pop();
          this.defaultExpandedKeys = defaultExpandedKeys;
          this.$refs.tree.setCheckedKeys([data.realDataId]);
        }, 50);
        // setTimeout(() => {
        //   this.$refs.tree.setCheckedKeys([data.realDataId]);
        // }, 50);
      }
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  },
  watch: {}
};
</script>
