import { NavLink } from "@remix-run/react";
import { ComponentType } from "react";

export const NavLinkItem = ({
    url,
    label,
    IconComponent,
    isActive,
  }: {
    url: string;
    label: string;
    IconComponent: ComponentType;
    isActive: boolean;
  }) => (
  
  
    <li className={"Polaris-Navigation__ListItem"}>
      <div className={"Polaris-Navigation__ItemWrapper"}>
        <div className={`${isActive ? "Polaris-Navigation__ItemInnerWrapper--selected" : "Polaris-Navigation__ItemInnerWrapper"}`} >
          <NavLink to={url} data-polaris-unstyled="true"
            className={`${isActive ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"}`}
          >
            <div className="Polaris-Navigation__Icon">
              <span className="Polaris-Icon">
                <span className="Polaris-Icon__SvgSmScreen">
                  <IconComponent />
                </span>
              </span>
            </div>
            <span className="Polaris-Navigation__Text">
              <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--semibold">
                {label}
              </span>
            </span>
          </NavLink>
        </div>
      </div>
    </li>
  )