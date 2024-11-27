'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "cmdk"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const browsers = [
  { value: "chrome", label: "Chrome" },
  { value: "firefox", label: "Firefox" },
  { value: "safari", label: "Safari" },
  { value: "edge", label: "Microsoft Edge" },
  { value: "opera", label: "Opera" },
]

export function CustomAutocomplete() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? browsers.find((browser) => browser.value === value)?.label
            : "Select browser..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search browser..." />
          <CommandEmpty>No browser found.</CommandEmpty>
          <CommandGroup>
            {browsers.map((browser) => (
              <CommandItem
                key={browser.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === browser.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {browser.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}