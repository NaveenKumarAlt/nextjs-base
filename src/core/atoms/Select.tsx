import * as Select from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import DownArrow from 'core/atoms/Icons/DownArrow';

type SelectOptionProps = {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  value?: number;
  name: string;
};

const SelectOption = ({ children, onValueChange, value, name }: SelectOptionProps) => {
  return (
    <Select.Root onValueChange={onValueChange} defaultValue={value?.toString()} name={name}>
      <Select.Trigger
        className="flex h-10 w-[6.563rem] items-center justify-between border border-black ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-xxl text-black font-arial text-[0.938rem] py-[0.688rem] px-[1.563rem] bg-white focus-visible:border-mainPurple"
        aria-label="amount"
      >
        <Select.Value>{value}</Select.Value>
        <Select.Icon className="SelectIcon">
          <DownArrow fill="#39224E" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className="relative -mt-[2.563rem] -ml-[0.063rem] z-10 min-w-[6.688rem] !max-h-[200px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80"
        >
          <ScrollArea.Root className="ScrollAreaRoot" type="auto">
            <Select.Viewport className="SelectViewport !max-h-[200px]" asChild>
              <ScrollArea.Viewport className="ScrollAreaViewport" style={{ overflowY: undefined }}>
                <Select.Group>{children}</Select.Group>
              </ScrollArea.Viewport>
            </Select.Viewport>
            <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
              <ScrollArea.Thumb className="ScrollAreaThumb" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectOption;
