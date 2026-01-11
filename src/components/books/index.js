import { Menu } from 'antd';
import { useState } from 'react';
import { ADD, DELETE, UPDATE, CHECKOUT, VIEW, RENEW, RETURN, RECOMMENDED } from './constants'
import {LIBRARIAN_ROLE} from '../../constants'
import AddBook from './addBook';
import ViewBook from './viewBook'
import UpdateBook from './updateBook'
import DeleteBook from './deleteBook'
import CheckoutBook from './checkoutBook'
import RenewBook from './renewBook'
import ReturnBook from './returnBook';
import RecommendedBook from './recommendedBook';

const Books = (props) => {
	const [currentMenu, setCurrentMenu] = useState(VIEW)
	const [currentBookId, setCurrentBookId] = useState(null)

	const {role} = props

	const handleMenuClick = e => {
		setCurrentMenu(e.key);
	}

	return (
	<div >
		<Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} mode="horizontal">
			{ role == LIBRARIAN_ROLE && <Menu.Item key={ADD}> ADD </Menu.Item> }
			<Menu.Item key={VIEW}> VIEW </Menu.Item>
			{ role == LIBRARIAN_ROLE && <Menu.Item key={DELETE}> DELETE </Menu.Item>}
			{ role == LIBRARIAN_ROLE && <Menu.Item key={UPDATE}> UPDATE </Menu.Item>}
			<Menu.Item key={CHECKOUT}> CHECKOUT </Menu.Item>
			<Menu.Item key={RENEW}> RENEW </Menu.Item>
			<Menu.Item key={RETURN}> RETURN </Menu.Item>
			<Menu.Item key={RECOMMENDED}> RECOMMENDED BOOKS </Menu.Item>
    	</Menu>

	{ currentMenu === ADD && <AddBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === VIEW && <ViewBook setCurrentBookId={setCurrentBookId} currentBookId={currentBookId}/> }
	{ currentMenu === UPDATE && <UpdateBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === DELETE && <DeleteBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === CHECKOUT && <CheckoutBook role={role} setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === RENEW && <RenewBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === RETURN && <ReturnBook setCurrentMenu={setCurrentMenu} setCurrentBookId={setCurrentBookId}/> }
	{ currentMenu === RECOMMENDED && <RecommendedBook setCurrentBookId={setCurrentBookId} currentBookId={currentBookId}/> }
	</div>
)}


export default Books
