import {
  HomeIcon,
  OrderIcon,
  PersonIcon,
  ProductIcon,
  AlertBubbleIcon,
  WorkIcon,
} from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { useLocation } from "react-router";
import { matchPath, NavLink, useMatches } from "@remix-run/react";
import { BlockStack, Divider, InlineStack, Text } from "@shopify/polaris";

export const BaseNav = () => {
  const location = useLocation();

  let matches = useMatches()
  const checkIsActiveRoute = (link: string):boolean => {
    return (
      Boolean(matchPath(
        { path: location.pathname},
        link)
      )
    )
  
} 

  const Placeholder = ({
    link = '',
    text = '',
    icon = <AlertBubbleIcon/>,
  }) => {
    const isActiveRoute = checkIsActiveRoute(link)
    console.log(isActiveRoute)

    return (
      <div
        className={(isActiveRoute ? 'Polaris-Navigation__Item ' : 'Polaris-Navigation__Item--selected')}
      >
        <InlineStack>
        <NavLink
          to={link}
          className={

            "Polaris-Navigation__Item"}
        >
          <div className="Polaris-Navigation__Icon Polaris-Icon">{icon}</div>
          <span className="Polaris-Navigation__Text">
            <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--semibold">
            {text}
            </span>
            </span>
        </NavLink>
          
        </InlineStack>
      </div>
    );
  };

  return (
    <nav className="Polaris-Navigation">
        <BlockStack>
          <Placeholder link={EAdminNavigation.dashboard} icon={<HomeIcon/>} text="Home" />
          <Placeholder link={EAdminNavigation.users} icon={<WorkIcon/>} text="Users" />
          <Placeholder link={EAdminNavigation.customers} icon={<PersonIcon/>} text="Customers" />
          <Placeholder link={EAdminNavigation.dashboard}  icon={<ProductIcon/>} text="Products"/>
          <Placeholder link={EAdminNavigation.dashboard}  icon={<OrderIcon/>} text="Orders"/>
        </BlockStack>
    </nav>
      
      // <nav className="Polaris-Navigation">
      //   <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable Polaris-Scrollable--vertical Polaris-Scrollable--horizontal Polaris-Scrollable--scrollbarWidthThin"> 
        
      //   <ul className="Polaris-Navigation__Section">
      //     <li className="Polaris-Navigation__ListItem">
      //     <NavLink
      //     to={EAdminNavigation.dashboard}
      //     className="Polaris-Navigation__ItemWrapper"
      //   >
      //     <HomeIcon className="Polaris-Navigation__Icon"/>
      //     <span className="Polaris-Navigation__Text">
      //       <span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--semibold">
      //       Home
      //       </span>
      //       </span>
      //   </NavLink>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
    
    
  );
};
