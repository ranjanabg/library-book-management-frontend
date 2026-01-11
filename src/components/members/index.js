import { Menu } from 'antd';
import { useState } from 'react';
import { ADD, DELETE, UPDATE, VIEW } from './constants'
import AddBook from './addMember';
import ViewBook from './viewMember'
import UpdateBook from './updateMember'
import DeleteBook from './deleteMember'

const Books = () => {
	const [currentMenu, setCurrentMenu] = useState(VIEW)
	const [currentBookId, setCurrentBookId] = useState(null)

	const handleMenuClick = e => {
		setCurrentMenu(e.key);
	}

	return (
	<div >
		<Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} mode="horizontal">
			<Menu.Item key={ADD}> ADD </Menu.Item>
			<Menu.Item key={VIEW}> VIEW </Menu.Item>
			<Menu.Item key={DELETE}> DELETE </Menu.Item>
			<Menu.Item key={UPDATE}> UPDATE </Menu.Item>
    	</Menu>

	{ currentMenu === ADD && <AddBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === VIEW && <ViewBook setCurrentBookId={setCurrentBookId} currentBookId={currentBookId}/> }
	{ currentMenu === UPDATE && <UpdateBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === DELETE && <DeleteBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	</div>
)}


export default Books
