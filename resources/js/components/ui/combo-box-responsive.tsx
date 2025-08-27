// @/components/ui/combo-box-responsive.tsx
import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query" // This import is correct, the error message "Cannot find module '@/hooks/use-media-query' or its corresponding type declarations." suggests a misconfiguration in the project's TypeScript setup or module resolution, not an error in the import path itself. Assuming the path is correct relative to the project root.
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Generic option type
export type ComboBoxOption = {
  value: string
  label: string
  disabled?: boolean
}

// Props interface
export interface ComboBoxResponsiveProps {
  options: ComboBoxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  buttonClassName?: string
  popoverClassName?: string
  disabled?: boolean
  // clearable?: boolean
  renderOption?: (option: ComboBoxOption) => React.ReactNode
  renderSelectedValue?: (option: ComboBoxOption | null) => React.ReactNode
}

export function ComboBoxResponsive({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  buttonVariant = "outline",
  buttonClassName = "",
  popoverClassName = "",
  disabled = false,
  // clearable = true,
  renderOption,
  renderSelectedValue,
}: ComboBoxResponsiveProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  // Find selected option
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) || null,
    [options, value]
  )

  // Handle value selection
  const handleSelect = React.useCallback((selectedValue: string) => {
    onValueChange?.(selectedValue)
    setOpen(false)
  }, [onValueChange])

  // Handle clear selection
  // const handleClear = React.useCallback((e: React.MouseEvent) => {
  //   e.stopPropagation()
  //   onValueChange?.("")
  //   setOpen(false)
  // }, [onValueChange])

  // Render button content
  const renderButtonContent = () => {
    if (renderSelectedValue) {
      return renderSelectedValue(selectedOption)
    }
    
    if (selectedOption) {
      return (
        <div className="flex items-center justify-between w-full">
          <span className="truncate">{selectedOption.label}</span>
          {/* {clearable && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
            >
              ✕
            </button>
          )} */}
        </div>
      )
    }
    
    return <span className="text-muted-foreground">{placeholder}</span>
  }

  // Desktop version with Popover
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={buttonVariant}
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "justify-between",
              !selectedOption && "text-muted-foreground",
              buttonClassName
            )}
          >
            {renderButtonContent()}
            <div className="ml-2 h-4 w-4 shrink-0 opacity-50">
              ▼
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn("w-[200px] p-0", popoverClassName)} 
          align="start"
        >
          <OptionsList
            options={options}
            selectedValue={value}
            onSelect={handleSelect}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            renderOption={renderOption}
          />
        </PopoverContent>
      </Popover>
    )
  }

  // Mobile version with Drawer
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={buttonVariant}
          disabled={disabled}
          className={cn(
            "justify-between",
            !selectedOption && "text-muted-foreground",
            buttonClassName
          )}
        >
          {renderButtonContent()}
          <div className="ml-2 h-4 w-4 shrink-0 opacity-50">
            ▼
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>Pilih opsi</DrawerTitle>
        </DrawerHeader>
        <div className="mt-4 border-t">
          <OptionsList
            options={options}
            selectedValue={value}
            onSelect={handleSelect}
            searchPlaceholder={searchPlaceholder}
            emptyMessage={emptyMessage}
            renderOption={renderOption}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Internal component for options list
interface OptionsListProps {
  options: ComboBoxOption[]
  selectedValue?: string
  onSelect: (value: string) => void
  searchPlaceholder: string
  emptyMessage: string
  renderOption?: (option: ComboBoxOption) => React.ReactNode
}

function OptionsList({
  options,
  selectedValue,
  onSelect,
  searchPlaceholder,
  emptyMessage,
  renderOption,
}: OptionsListProps) {
  return (
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              onSelect={() => onSelect(option.value)}
              className={cn(
                "cursor-pointer",
                selectedValue === option.value && "bg-accent",
                option.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {renderOption ? renderOption(option) : (
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                  {selectedValue === option.value && (
                    <div className="h-4 w-4">✓</div>
                  )}
                </div>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// Export default for easier imports
export default ComboBoxResponsive

// Preset configurations for common use cases
export const ComboBoxPresets = {
  // Status preset
  Status: (props: Partial<ComboBoxResponsiveProps>) => {
    const statusOptions: ComboBoxOption[] = [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
      { value: "suspended", label: "Suspended" },
    ]
    
    return (
      <ComboBoxResponsive
        options={statusOptions}
        placeholder="Select status..."
        searchPlaceholder="Search status..."
        {...props}
      />
    )
  },

  // Category preset
  Category: (props: Partial<ComboBoxResponsiveProps>) => {
    const categoryOptions: ComboBoxOption[] = [
      { value: "makanan-utama", label: "Makanan Utama" },
      { value: "appetizer", label: "Appetizer" },
      { value: "dessert", label: "Dessert" },
      { value: "minuman", label: "Minuman" },
      { value: "snack", label: "Snack" },
      { value: "salad", label: "Salad" },
    ]
    
    return (
      <ComboBoxResponsive
        options={categoryOptions}
        placeholder="Select category..."
        searchPlaceholder="Search category..."
        {...props}
      />
    )
  },

  // Priority preset
  Priority: (props: Partial<ComboBoxResponsiveProps>) => {
    const priorityOptions: ComboBoxOption[] = [
      { value: "low", label: "🟢 Low" },
      { value: "medium", label: "🟡 Medium" },
      { value: "high", label: "🔴 High" },
      { value: "urgent", label: "🚨 Urgent" },
    ]
    
    return (
      <ComboBoxResponsive
        options={priorityOptions}
        placeholder="Select priority..."
        searchPlaceholder="Search priority..."
        {...props}
      />
    )
  }
}