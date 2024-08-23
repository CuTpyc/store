import React, { FC, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SubLinkItem, SubNavigation } from "./SubNavigation";


interface INavItemProps {
  children: React.ReactNode;
  href?: string;
  sublinks?: SubLinkItem[];
}

export const NavItem: FC<INavItemProps> = ({ children, href, sublinks }) => {
  const location = useLocation();

  const isActive = useMemo(() => {
    if (!href) {
      return false;
    }
    if (location.pathname.includes(href)) {
      return true;
    }
    return sublinks?.some((sublink) =>
      location.pathname.includes(sublink.href)
    );
  }, [location.pathname, href, sublinks]);

  return (
    <li className="Polaris-Navigation__ListItem">
      <div className="Polaris-Navigation__ItemWrapper">
        <div
          className={`Polaris-Navigation__ItemInnerWrapper ${
            isActive ? "Polaris-Navigation__ItemInnerWrapper--selected" : ""
          }`}
        >
          <NavLink
            to={href || "#"}
            className={({ isActive }) =>
              `Polaris-Navigation__Item ${
                isActive ? "Polaris-Navigation__Item--selected" : ""
              }`
            }
          >
            {children}
          </NavLink>
        </div>
        {isActive && sublinks && <SubNavigation sublinks={sublinks} />}
      </div>
    </li>
  );
};
