import {
  MenuFoldOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  BarcodeOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  ShopOutlined,
  SelectOutlined,
  ExportOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {Button, Drawer, Menu} from "antd";
import {useState} from "react";
import './MenuJS.css'
import {useNavigate} from "react-router-dom";
import {
  RouteProducts,
  RouteProductsAdd,
  RouteProductsDelete, RouteSale, RouteSignIN,
  RouteStore,
  RouteStoreAdd,
  RouteStoreDelete
} from "../../../App";
import {deleteLocalStorage} from "../../../Redux/WorkWithLocalStorage";

// Создание элементов меню
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

  const [open, setOpen] = useState(false) // Режим выпадающей панели
  const navigate = useNavigate() // Навигатор по страницам

  // Открытие панели
  const showDrawer = () => {
    setOpen(true);
  };

  // Закрытие панели
  const onCloseDrawer = () => {
    setOpen(false);
  };

  // Элементы панели
  const items = [
    getItem('Хранилище', 'sub1', <ShopOutlined />, [
      getItem('Продать', 'sale',<ShoppingOutlined />),
      getItem('Показать все', 'store', <ShoppingCartOutlined />),
      getItem('Принять продукт', 'store-add', <SelectOutlined />),
      getItem('Списание', 'store-delete',<BarcodeOutlined />),
    ]),
    getItem('Продукты', 'sub2', <DatabaseOutlined />, [
      getItem('Показать все', 'products', <AppstoreOutlined />),
      getItem('Создать карточку продукта', 'products-add', <AppstoreAddOutlined />),
    ]),
    getItem('Выход', 'log-out', <ExportOutlined />)
  ]

  // Переход по страницам
  const onClick = (e) => {
    onCloseDrawer()
    switch(e.key){
      case 'store':
        navigate(RouteStore)
        break
      case 'sale':
        navigate(RouteSale)
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
