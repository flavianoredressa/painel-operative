import { Blocks, CreditCard, HelpCircle, Home, Settings, UserRoundCog, Users, Workflow } from 'lucide-angular';

import { NavItem } from '@interfaces/nav-item';

export const SidebarItems: NavItem[] = [
  {
    icon: Home,
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    icon: UserRoundCog,
    name: 'Admins',
    url: '/admins'
  },
  {
    icon: CreditCard,
    name: 'Cartões',
    url: '/cards'
  },
  {
    icon: Workflow,
    name: 'Utils',
    url: '/utils'
  },
  {
    icon: Users,
    name: 'Usuários',
    url: '/users'
  }
];

export const SidebarOthersItems: NavItem[] = [
  {
    icon: Blocks,
    name: 'Integrations',
    url: '/integrations'
  },
  {
    icon: Settings,
    name: 'Configurações',
    url: '/configs'
  },
  {
    icon: HelpCircle,
    name: 'Get Help',
    url: '/help'
  }
];
