import React from 'react'
import { Settings } from 'lucide-react'
import { HelpCircle } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import { LogOut } from 'lucide-react'
import {Button} from '@/components/ui/button'  

function Footer() {
    const option = [
        {
            name:"settings",
            icon : Settings
        },
        {
            name:"help-center",
            icon : HelpCircle,

        },
        {
            name:"Subscription",
            icon : CreditCard
        },
        {
            name:"Logout",
            icon : LogOut
        }
    ]
  return (
    <div className='p-5 '>
        {option.map((option, index) => (
            
                <Button key ={index} className="w-full flex justify-start p-5" variant="ghost">
                    <option.icon/>
                    {option.name}
                </Button>
               
            
        ))}
    </div>
  )
}

export default Footer