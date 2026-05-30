import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/Components/ui/navigation-menu'
import { cn } from '@/utils'
import { router } from '@inertiajs/react'
import { Button } from '../ui/button'
// Using local wrapped NavigationMenu (supports viewport prop)

interface Props {
  selectedTopNav?: string
}
export const NAV_ITEMS = [
  {
    title: 'Products',
    value: 'Products',
    href: '/products',
    description: 'Product data and tools',
  },
  {
    title: 'Temple management',
    value: 'Temple management',
    href: '/temple-management',
    description: 'Temple management data and tools',
  },


]

export function CustomNavbar({ selectedTopNav }: Props) {
  return (
    <NavigationMenu
      viewport={false}
      className='w-full'
    >
      <NavigationMenuList className='flex gap-4 bg-white px-4 dark:border-gray-700 dark:bg-gray-900'>
        {NAV_ITEMS.map((item) => {
          const isActive = selectedTopNav === item.value

          return (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                asChild
                className='rounded-none'
              >
                <Button
                  variant='ghost'
                  onClick={() => router.get(item.href)}
                  className={cn(
                    'border-b-8 border-transparent',
                    isActive && 'border-b-kseb-bg-blue'
                  )}
                >
                  {item.title}
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
