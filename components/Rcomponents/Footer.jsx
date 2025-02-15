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
    <div className='flex flex-col items-center justify-center gap-2'>
        {option.map((item, index) => (
            <div key={index} className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-700">
                <Button>
                <item.icon className="w-6 h-6 mr-2"/>
                </Button>
                <p>{item.name}</p>
            </div>
        ))}
    </div>
  )
}

export default Footer