import { NavLink, useLocation } from '@remix-run/react';

export type LinkItem = {
  label: string;
  url: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

// export interface LinkProps
//   extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
//   reloadDocument?: boolean;
//   replace?: boolean;
//   state?: any;
//   preventScrollReset?: boolean;
//   relative?: RelativeRoutingType;
//   to: To;
//   unstable_viewTransition?: boolean;
// }

export default function NavItem({ linkItem }: { linkItem: LinkItem }) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(linkItem.url)
    ? 'Polaris-Navigation__ItemInnerWrapper--selected'
    : '';

  return (
    <li className='Polaris-Navigation__ListItem'>
      <div className='Polaris-Navigation__ItemWrapper'>
        <div className={`Polaris-Navigation__ItemInnerWrapper ${isActive}`}>
          <linkItem.icon className='Polaris-Navigation__Icon' />
          <NavLink
            to={linkItem.url}
            className='Polaris-Navigation__Item Polaris-Navigation__Text'
            style={{ fontWeight: 'bold' }}
          >
            {linkItem.label}
          </NavLink>
        </div>
      </div>
    </li>
  );
}
