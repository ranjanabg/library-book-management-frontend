import { Menu } from 'antd';
import { useState } from 'react';
import { VERIFY, VERIFY_BOOK, VERIFY_RACK } from './constants'
import { LIBRARIAN_ROLE } from '../../constants'
import VerfifyBook from './verifyBook';
import VerfifyRack from './verifyRack';
import VerfifyAll from './verify';


const Rack = (props) => {
    const [currentMenu, setCurrentMenu] = useState(VERIFY_BOOK)

    const { role } = props

    const handleMenuClick = e => {
        setCurrentMenu(e.key);
    }

    return (
        <div >
            <Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} mode="horizontal">
                {role == LIBRARIAN_ROLE && <Menu.Item key={VERIFY}> {VERIFY} </Menu.Item>}
                <Menu.Item key={VERIFY_BOOK}> {VERIFY_BOOK} </Menu.Item>
                {role == LIBRARIAN_ROLE && <Menu.Item key={VERIFY_RACK}> {VERIFY_RACK} </Menu.Item>}
            </Menu>

            {currentMenu === VERIFY && <VerfifyAll setCurrentMenu={setCurrentMenu} />}
            {currentMenu === VERIFY_BOOK && <VerfifyBook />}
            {currentMenu === VERIFY_RACK && <VerfifyRack setCurrentMenu={setCurrentMenu} />}
        </div>
    )
}


export default Rack
