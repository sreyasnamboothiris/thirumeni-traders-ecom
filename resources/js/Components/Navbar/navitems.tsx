export interface navItem {
  title: string
  href: string
  icon?: React.ReactNode
  children?: navItem[]
}

export interface MainNav {
  label: string
  items: navItem[]
}

export const settingsOffices: MainNav = {
  label: 'Settings',
  items: [
    {
      title: 'Offices',
      href: '/offices',
      icon: '',
    },
  ],
}


export const productManagementNavItems: MainNav = {
  label: '',
  items: [
    {
      title: 'Product Management',
      icon: '',
      href: '/connections',
      children: [
        {
          title: 'Products',
          href: '/products',
          icon: '',
        },
        {
          title: 'Product Categories',
          href: '/product-categories',
          icon: '',
        },
      ],
    },
  ],
}

export const meterReadingNavItems: MainNav = {
  label: 'Meter Readings',
  items: [
    {
      title: 'Meter Readings',
      href: '/meter-reading',
      icon: '',
    },
  ],
}

export const tariffNavItems: MainNav = {
  label: 'Tariffs',
  items: [
    {
      title: 'Tariff Order',
      href: '/tariff-orders',
      icon: '',
    },
  ],
}

export const billingNavItems: MainNav = {
  label: 'Revenue Operations',
  items: [
    {
      title: 'Billing',
      href: '/billing-groups',
      icon: '',
      children: [
        {
          title: 'Billing Groups',
          href: '/billing-groups',
        },
        {
          title: 'Bill Runs',
          href: '/bills/job-status',
        },
        {
          title: 'Generated Bills',
          href: '/bills',
        },
      ],
    },
    {
      title: 'Security Deposit',
      href: '/security-deposit',
      icon: '',
      children: [
        {
          title: 'Consumer Deposits',
          href: '/consumer-sd',
        },
        {
          title: 'SD Assessment Jobs',
          href: '/sd-assessment-jobs',
        },
        {
          title: 'SD Register',
          href: '/sd-register',
        },
      ],
    },
    {
      title: 'Payment Operations',
      href: '/collections',
      icon: '',
      children: [
        {
          title: 'Collection Register',
          href: '/collections',
        },
        {
          title: 'Bulk Collections',
          href: '/bulk-collection',
        },
        {
          title: 'Advances',
          href: '/advance-register',
        },
      ],
    },
  ],
}

export const metadataNavItems: MainNav = {
  label: 'Manage Metadata',
  items: [
    {
      title: 'System Parameters',
      href: '/parameter-domain',
      icon: '',
      children: [
        {
          title: 'Domains',
          href: '/parameter-domain',
          icon: '',
        },
        {
          title: 'Definitions',
          href: '/parameter-definition',
          icon: '',
        },
        {
          title: 'Parameter Values',
          href: '/parameter-value',
          icon: '',
        },
      ],
    },
    {
      title: 'Offices',
      href: '/offices',
      icon: '',
      children: [
        {
          title: 'Office Details',
          href: '/offices',
          icon: '',
        },
      ],
    },
    {
      title: 'Configuration',
      href: '/system-modules',
      icon: '',
      children: [
        {
          title: 'System Modules',
          href: '/system-module',
          icon: '',
        },
      ],
    },
    {
      title: 'Calendar Management',
      href: '/calendar',
      icon: '',
      children: [
        {
          title: 'Calendar',
          href: '/calendar',
          icon: '',
        },
      ],
    },
  ],
}

export const meteringBillingNavItems: MainNav = {
  label: 'Metering & Billing Configurations',
  items: [
    {
      title: 'Timezone Groups',
      href: '/timezone-groups',
      icon: '',
    },
    {
      title: 'Metering Profiles',
      href: '/meter-profile',
      icon: '',
    },
    {
      title: 'Tariffs',
      href: '/tariff-orders',
      icon: '',
    },
    {
      title: 'Meters',
      href: '/meters',
      icon: '',
    },
    {
      title: 'CTPTs',
      href: '/meter-ctpt',
      icon: '',
    },
    {
      title: 'Billing Rules',
      href: '/billing-rules',
      icon: '',
    },
    {
      title: 'Variable Rates',
      href: '/variable-rates',
      icon: '',
    },
    {
      title: 'Tariff Mappings',
      href: '/tariff-mappings',
      icon: '',
    },
    {
      title: 'Charge Heads',
      href: '/charge-head-definition',
      icon: '',
    },
  ],
}
