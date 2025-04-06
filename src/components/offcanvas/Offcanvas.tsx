
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import useAuth from '@/data/hook/useAuth';
import { IoLogOut } from 'react-icons/io5';

export default function PositionDemo() {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const { logout } = useAuth();

    return (
        <div className="card">
            <div className="flex gap-2 justify-center items-center w-full h-full px-2 text-white">
                <Button onClick={() => setVisibleLeft(true)} >
                    <GiHamburgerMenu className='text-3xl' />
                </Button>
            </div>

            <Sidebar visible={visibleLeft} header={"Menu"} position="left" onHide={() => setVisibleLeft(false)}>
                <button onClick={logout} className='flex items-center gap-1 text-red-600 text-2xl'>
                    <IoLogOut />
                    <p className='font-bold'>Logaut</p>
                </button>
            </Sidebar>
        </div>
    )
}
