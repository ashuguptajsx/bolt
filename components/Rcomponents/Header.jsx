import React from 'react'
import Image from 'next/image'
import {Button} from '../ui/button'

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src={"/icons8-bolt-100.png"} width={40} height={40} alt=''></Image>
        <div className='flex gap-4'>
            <Button variant="ghost">Sign In</Button>
            <Button className="text-white" style={{
                backgroundColor: "#0096FF",
            }}>Get Started</Button>
        </div>
    </div>
  )
}

export default Header;