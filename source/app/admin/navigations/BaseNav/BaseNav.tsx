import {
  HomeIcon,
  OrderIcon,
  PersonIcon,
  ProductIcon,
  WorkIcon,
  CategoriesIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { NavItem } from "../NavItem";

const linkItems = [
  {
    label: "Home",
    href: EAdminNavigation.dashboard,
    icon: HomeIcon,
  },
  {
    label: "Users",
    href: EAdminNavigation.users,
    icon: PersonIcon,
  },
  {
    label: "Customers",
    href: EAdminNavigation.customers,
    icon: WorkIcon,
  },
  {
    label: "Products",
    href: EAdminNavigation.products,
    icon: ProductIcon,
    sublinks: [
      {
        label: "Categories",
        href: EAdminNavigation.categories,
        icon: CategoriesIcon,
      },
      { label: "Reviews", href: EAdminNavigation.reviews, icon: ViewIcon },
    ],
  },
  {
    label: "Orders",
    href: EAdminNavigation.orders,
    icon: OrderIcon,
  },
];

export const BaseNav = () => {
  return (
    <nav className="Polaris-Navigation">
      <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable">
        <ul className="Polaris-Navigation__Section">
          {linkItems.map((item) => (
            <NavItem key={item.label} href={item.href} sublinks={item.sublinks}>
              <item.icon className="Polaris-Navigation__Icon" />
              {item.label}
            </NavItem>
          ))}
        </ul>
      </div>
    </nav>
  );
};
