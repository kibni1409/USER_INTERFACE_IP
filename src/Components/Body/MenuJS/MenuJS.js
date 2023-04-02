import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DatabaseOutlined,
  BarcodeOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  ShopOutlined,
  SelectOutlined,
  ExportOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {Button, Drawer, Menu, Space} from "antd";
import {useState} from "react";
import './MenuJS.css'
import {useNavigate} from "react-router-dom";
import {
  RouteProducts,
  RouteProductsAdd,
  RouteProductsDelete, RouteSignIN,
  RouteStore,
  RouteStoreAdd,
  RouteStoreDelete
} from "../../../App";
import {deleteLocalStorage} from "../../../Redux/WorkWithLocalStorage";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const MenuJS = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const showDrawer = () => {
    setOpen(true);
  };
  const onCloseDrawer = () => {
    setOpen(false);
  };

  const items = [
    getItem('Store', 'sub1', <ShopOutlined />, [
      getItem('Show All', 'store', <ShoppingCartOutlined />),
      getItem('Accept the product', 'store-add', <SelectOutlined />),
      getItem('Discard', 'store-delete',<BarcodeOutlined />),
    ]),
    getItem('Products', 'sub2', <DatabaseOutlined />, [
      getItem('Show All', 'products', <AppstoreOutlined />),
      getItem('Add new products', 'products-add', <AppstoreAddOutlined />),
    ]),
    getItem('LogOut', 'log-out', <ExportOutlined />)
  ]
  const onClick = (e) => {
    onCloseDrawer()
    switch(e.key){
      case 'store':
        navigate(RouteStore)
        break
      case 'store-add':
        navigate(RouteStoreAdd)
        break
      case 'store-delete':
        navigate(RouteStoreDelete)
        break
      case 'products':
        navigate(RouteProducts)
        break
      case 'products-add':
        navigate(RouteProductsAdd)
        break
      case 'products-delete':
        navigate(RouteProductsDelete)
        break
      case 'log-out':
        deleteLocalStorage('user')
        navigate(RouteSignIN)
        break
      case 'sign-in':
        navigate(RouteSignIN)
        break
      default:
        break
    }
  };

  return (
    <div className='MenuJS'>
      <Button type="primary" onClick={showDrawer} className='ButtonMenuJS'>
        <MenuFoldOutlined className='ButtonMenuJS' />
      </Button>
      <Drawer
        className='DrawerMenuJS'
        size={'default'}
        title="Drawer with extra actions"
        placement={'left'}
        onClose={onCloseDrawer}
        open={open}
      >
        <Menu
          onClick={onClick}
          className='MenuList'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          inlineCollapsed={false}
          mode="inline"
          items={items}
        />
      </Drawer>

    </div>
  )
}

export default MenuJS
