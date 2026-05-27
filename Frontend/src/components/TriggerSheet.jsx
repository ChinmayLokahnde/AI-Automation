import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"


export function TriggerSheet({onSelect}) {
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(true);

  const NodeSelect = {
    webhook:{
      type: "trigger",
      label:"Webhook"
    },
    openai:{
      type: "ai",
      label:"OpenAi"
    },
    if:{
      type: "condition",
      label: " IF condition"
    },
    http:{
      type:"action",
      label: "HTTP"
    }
  }

const handleSelect = () =>{
  const node = NodeSelect[selected];
  if (!node) return;

  onSelect(node.type, selected);
  setOpen(false)
  
}
  return (
    <Sheet open ={ open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
         Open
         </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select Trigger Action which you need to Execute
          </SheetDescription>
        </SheetHeader>
        <Select onValueChange={(value) => setSelected(value)}>  
      <SelectTrigger className="w-full max-w-48">  
        <SelectValue placeholder="Select Tasks" />  
      </SelectTrigger> 

      <SelectContent>  
        <SelectGroup>  
          <SelectLabel>Triggers</SelectLabel>   
          <SelectItem value="webhook">Webhook</SelectItem>  
          <SelectItem value="openai">AI</SelectItem>  
          <SelectItem value="if">Condition</SelectItem>  
          <SelectItem value="http">Action</SelectItem>  
        </SelectGroup>  
      </SelectContent>  
    </Select>  
        <SheetFooter>
          <Button disabled={!selected} onClick={handleSelect}>
          {selected ? `Create ${NodeSelect[selected]?.label}` : "Select Node"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}





// export function SelectDemo() {
//   return (
//     <Select>
//       <SelectTrigger className="w-full max-w-48">
//         <SelectValue placeholder="Select a fruit" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Fruits</SelectLabel>
//           <SelectItem value="apple">Apple</SelectItem>
//           <SelectItem value="banana">Banana</SelectItem>
//           <SelectItem value="blueberry">Blueberry</SelectItem>
//           <SelectItem value="grapes">Grapes</SelectItem>
//           <SelectItem value="pineapple">Pineapple</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }
