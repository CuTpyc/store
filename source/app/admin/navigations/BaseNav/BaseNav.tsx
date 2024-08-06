import { useLocation } from "react-router";
import { NavLinkItem } from "./BaseNavLinkItems";
import { navItems } from "./BaseNavItems";

export const BaseNav = () => {
  const location = useLocation();

  return (
    <nav className="Polaris-Navigation">
      <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable Polaris-Scrollable--vertical Polaris-Scrollable--horizontal Polaris-Scrollable--scrollbarWidthThin">
        <ul className={"Polaris-Navigation__Section"}>
          {navItems.map((item) => (
            <NavLinkItem
              key={item.url}
              url={item.url}
              label={item.label}
              IconComponent={item.icon}
              isActive={location.pathname === item.url}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
};
