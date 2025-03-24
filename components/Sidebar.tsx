import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  LayoutDashboard,
  Newspaper,
  Folders,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className='bg-secondary rounded-none w-60'>
      {/* <CommandInput placeholder='Type a command or search...' /> */}
      <CommandList>
        <CommandGroup heading='Menu'>
          <CommandItem>
            <LayoutDashboard className='ml-4' />
            <Link href='/' className='mr-2 pl-4 w-20 text-base'>Dashboard</Link>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Newspaper className='ml-4' />
            <Link href='/' className='mr-2 pl-4 w-20 text-base'>Settings</Link>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Folders className='ml-4' />
            <Link href='/' className='mr-2 pl-4 w-20 text-base'>Profile</Link>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};

export default Sidebar;
