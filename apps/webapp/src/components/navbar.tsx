import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent } from './ui/drawer';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { config } from '@/tailwindConfig';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

type MenuItem = {
  label: React.ReactNode;
  href: string;
  icon: string;
};

const menuItems: { top: MenuItem[]; bottom: MenuItem[] } = {
  top: [
    {
      label: <FormattedMessage id="menu.home" />,
      href: '/',
      icon: 'mi:home',
    },
    {
      label: <FormattedMessage id="menu.recipes" />,
      href: '/recipes',
      icon: 'mingcute:fork-spoon-fill',
    },
    {
      label: <FormattedMessage id="menu.meal-plan" />,
      href: '/meal-plan',
      icon: 'tabler:calendar-smile',
    },
    {
      label: <FormattedMessage id="menu.shopping-list" />,
      href: '/shopping-list',
      icon: 'tabler:list-details',
    },
    {
      label: <FormattedMessage id="menu.expenses" />,
      href: '/expenses',
      icon: 'tabler:pig-money',
    },
  ],
  bottom: [
    {
      label: <FormattedMessage id="menu.logout" />,
      href: '/logout',
      icon: 'tabler:door-exit',
    },
  ],
};

export function Navbar() {
  return (
    <>
      <MobileNavbar />
      <DesktopNavbar />
    </>
  );
}

function DesktopNavbar() {
  const [open, setOpen] = useState(
    window.matchMedia(`(min-width: ${config.theme.screens.lg})`).matches,
  );

  return (
    <div className="hidden md:flex flex-col justify-between items-start h-full min-h-screen px-2 py-4 w-max border-r">
      <ul className="flex flex-col gap-4">
        {menuItems.top.map((item, i) => (
          <MenuItem key={i} variant="button" item={item} collapsed={!open} />
        ))}
      </ul>
      <ul className="flex flex-col gap-4">
        {menuItems.bottom.map((item, i) => (
          <MenuItem key={i} variant="button" item={item} collapsed={!open} />
        ))}
        <li>
          <hr />
        </li>
        <li>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setOpen(!open)}
                  align="left"
                  variant="ghost"
                  className="flex flex-row items-center gap-3"
                >
                  {open ? (
                    <Icon
                      className="text-lg"
                      icon="tabler:layout-sidebar-left-collapse"
                    />
                  ) : (
                    <Icon
                      className="text-lg"
                      icon="tabler:layout-sidebar-left-expand"
                    />
                  )}
                  {open && <FormattedMessage id="menu.collapse" />}
                </Button>
              </TooltipTrigger>
              {!open && (
                <TooltipContent side="right">
                  <FormattedMessage id="menu.expand" />
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="fixed bottom-0 right-0 rounded-tl bg-white border-l border-t py-2 px-4 md:hidden flex flex-row justify-end">
      <Drawer>
        <DrawerTrigger>
          <Icon className="text-xl" icon="mingcute:menu-fill" />
        </DrawerTrigger>
        <DrawerContent className="min-h-[70vh] flex flex-col pb-8 px-4">
          <ul className="flex flex-col justify-between h-full flex-grow gap-2 text-xl font-semibold mt-8">
            {menuItems.top.map((item, i) => (
              <MenuItem key={i} item={item} />
            ))}
            <li className="flex-grow min-h-32"></li>
            {menuItems.bottom.map((item, i) => (
              <MenuItem key={i} item={item} />
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function MenuItem({
  item: { label, href, icon },
  collapsed,
  variant,
}: {
  item: MenuItem;
  collapsed?: boolean;
  variant?: 'link' | 'button';
}) {
  return (
    <li>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-full"
              align="left"
              variant={variant === 'button' ? 'ghost' : 'link'}
            >
              <Link to={href} className="flex flex-row items-center gap-3 ">
                <Icon className="md:text-lg" icon={icon} />
                {!collapsed && <span>{label}</span>}
              </Link>
            </Button>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
}
