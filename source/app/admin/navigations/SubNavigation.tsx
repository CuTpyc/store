import React, { FC } from "react";
import { NavLink } from "react-router-dom";

export interface SubLinkItem {
  href: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

interface SubNavigationProps {
  sublinks: SubLinkItem[];
}

export const SubNavigation: FC<SubNavigationProps> = ({ sublinks }) => {
  return (
    <ul className="Polaris-Navigation__Section Polaris-Navigation__SubNavigation">
      {sublinks.map((sublink) => (
        <li
          key={sublink.href}
          className="Polaris-Navigation__ListItem"
          style={{ paddingLeft: "20px" }} // Смещение вправо
        >
          <NavLink to={sublink.href} className="Polaris-Navigation__Item">
            <sublink.icon className="Polaris-Navigation__Icon" />
            {sublink.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
