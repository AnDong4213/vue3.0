<template>
  <Menu :selectedKeys="selectedKeys" @update:selectedKeys="updateSelectedKeys" mode="inline" :openKeys="openKeys"
    @update:openKeys="updateOpenKeys">
    <template v-for="item in menuList" :key="item.key">
      <template v-if="!item.children">
        <MenuItem :key="item.key" @click="menuItemClick(item)">
        <template #icon>
          <SettingOutlined />
        </template>
        {{ item.title }}
        </MenuItem>
      </template>
      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" @menuItemClick="menuItemClick"></sub-menu>
      </template>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { Button, Menu, MenuItem, LayoutSider } from 'ant-design-vue';
import SubMenu from './SubMenu2.vue';
import { VueElement, h, reactive, ref, onMounted } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, CalendarOutlined } from '@ant-design/icons-vue';


interface MenuItem {
  key: string;
  title: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

interface Props {
  menuList: Array<MenuItem>;
  selectedKeys: string[];
  openKeys: string[];
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
  menuList: [
    {
      key: '1',
      icon: () => h(MailOutlined),
      label: 'Navigation One',
      title: 'Navigation One',
    },
    {
      key: '2',
      icon: () => h(CalendarOutlined),
      label: 'Navigation Two',
      title: 'Navigation Two',
    },
    {
      key: 'sub1',
      icon: () => h(AppstoreOutlined),
      label: 'Navigation Three',
      title: 'Navigation Three',
      children: [
        {
          key: '3',
          label: 'Option 3',
          title: 'Option 3',
        },
        {
          key: '4',
          label: 'Option 4',
          title: 'Option 4',
        },
        {
          key: 'sub1-2',
          label: 'Submenu',
          title: 'Submenu',
          children: [
            {
              key: '5',
              label: 'Option 5',
              title: 'Option 5',
            },
            {
              key: '6',
              label: 'Option 6',
              title: 'Option 6',
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: () => h(SettingOutlined),
      label: 'Navigation Four',
      title: 'Navigation Four',
      children: [
        {
          key: '7',
          label: 'Option 7',
          title: 'Option 7',
        },
        {
          key: '8',
          label: 'Option 8',
          title: 'Option 8',
        },
        {
          key: '9',
          label: 'Option 9',
          title: 'Option 9',
        },
        {
          key: '10',
          label: 'Option 10',
          title: 'Option 10',
        },
      ],
    },
  ]
});

const emit = defineEmits([
  'menuItemClick',
  'update:selectedKeys',
  'update:openKeys'
]);

const updateSelectedKeys = (...res: string[][]) => {
  emit('update:selectedKeys', ...res);
};

const updateOpenKeys = (...res: string[][]) => {
  emit('update:openKeys', ...res);
};

const menuItemClick = (item: MenuItem) => {
  emit('menuItemClick', item);
};
</script>