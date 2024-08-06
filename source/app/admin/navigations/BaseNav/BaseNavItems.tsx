import {
    HomeIcon,
    OrderIcon,
    PersonIcon,
    ProductIcon,
    AlertBubbleIcon,
    WorkIcon,
  } from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export const navItems = [
    {
      url: EAdminNavigation.dashboard,
      label: "Home",
      icon: HomeIcon,
      matchPath: [EAdminNavigation.dashboard]
    },
    {
      url: EAdminNavigation.users,
      label: "Users",
      icon: WorkIcon,
      matchPath: [EAdminNavigation.users]
    },
    {
      url: EAdminNavigation.customers,
      label: "Customers",
      icon: PersonIcon,
      matchPath: [EAdminNavigation.dashboard]
    },
    {
      url: EAdminNavigation.products,
      label: "Products",
      icon: ProductIcon,
      matchPath: [EAdminNavigation.products],
      subNavigationItem: [
        {
          url: EAdminNavigation.categories,
          disable: false,
          label: "Categories"
        }
      ]
    },
    {
      url: EAdminNavigation.orders,
      label: "Orders",
      icon: OrderIcon,
      matchPath: [EAdminNavigation.orders],
      subNavigationItem: [
        {
          url: EAdminNavigation.carts,
          disable: false,
          label: "Carts"
        }
      ]
    },
  ]
  