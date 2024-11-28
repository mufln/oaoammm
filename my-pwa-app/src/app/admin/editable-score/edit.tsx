"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

enum Attendance {
    Plus, Minus, Other
}

interface EditProps {
    _value: number, 
    _absent: Attendance
}

export function Edit({_value, _absent}: EditProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useState(_value); // Initial value
  const [absent, setAbsent] = useState(_absent);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start border-0 shadow-none">
            {absent === Attendance.Minus ? ("Н") : (absent === Attendance.Other ? "У" : ((value == 0) ? "+" : value))}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 space-y-2" align="start">
            <Tabs>
                <TabsList>
                    <TabsTrigger value="Minus" onClick={() => setAbsent(Attendance.Minus)}>Н</TabsTrigger>
                    <TabsTrigger value="other" onClick={() => setAbsent(Attendance.Other)}>У</TabsTrigger>
                    <TabsTrigger value="Plus" onClick={() => setAbsent(Attendance.Plus)}>+</TabsTrigger>
                </TabsList>
                <TabsContent value="Plus">
                <div className="flex items-center space-x-2">
                    <input
                        className="max-w-[48px] rounded-md block bg-transparent text-center ring-1 ring-gray-300 text-gray-500 placeholder:text-gray-400 focus:text-black focus:outline-none sm:text-sm/6"
                        type="text"
                        id="number-input"
                        placeholder="0"
                        value={value}
                        onChange={handleChange}
                    />
                    <Label> баллов</Label>
                </div>
                </TabsContent>
            </Tabs>
        </PopoverContent>
      </Popover>
    )
  }

