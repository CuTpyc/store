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
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { FC, PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { hasAdminRole } from "~/admin/utils/access.util";

const linkItems = [
  {
    label: "home",
    href: EAdminNavigation.dashboard,
    icon: HomeIcon,
  },
  {
    label: "users",
    href: EAdminNavigation.users,
    icon: PersonIcon,
    roles: ['ADMIN']
  },
  {
    label: "customers",
    href: EAdminNavigation.customers,
    icon: WorkIcon,
    roles: ['ADMIN']
  },
  {
    label: "products",
    href: EAdminNavigation.products,
    icon: ProductIcon,
    sublinks: [
      {
        label: "categories",
        href: EAdminNavigation.categories,
        icon: CategoriesIcon,
        roles: ['ADMIN']
      },
      { label: "reviews",
        href: EAdminNavigation.reviews,
        icon: ViewIcon,
        roles: ['ADMIN'] },
    ],
  },
  {
    label: "orders",
    href: EAdminNavigation.orders,
    icon: OrderIcon,
  },
];

export type BaseNavProps = PropsWithChildren<{
  user: TUserDto;
}>

export const BaseNav: FC<BaseNavProps>= ({ user }) => {
  const { t } = useTranslation()


  const lng = navigator.language
  return (
    <nav className="Polaris-Navigation">
      <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable">
        <ul className="Polaris-Navigation__Section">
          {linkItems.map((item) => (
            (hasAdminRole(user) && (
            <NavItem key={item.label} href={item.href} sublinks=
              {item.sublinks?.filter(
                sublink => !sublink.roles || sublink.roles.includes(user.role)
              )}>
              <item.icon className="Polaris-Navigation__Icon" />
              {t(`navigation.${item.label}`)}
            </NavItem>
            )
          )))}
        </ul>
      </div>
    </nav>
  );
};
