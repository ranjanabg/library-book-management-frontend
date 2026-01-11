import { Card, Col, Row , Input } from 'antd';
import axios from 'axios'
import { useState, useLayoutEffect, useEffect } from 'react';

const { Search } = Input;

const ViewBook = (props) => {

	const {currentBookId, setCurrentBookId} = props
	const [data, setData] = useState(null)

	async function handleSearch(e) {
		if (!e || e.length == 0) {
			setCurrentBookId(null)
		}
		setCurrentBookId(e)
		fetchBooks()
	}

	const fetchBooks = () => {
		debugger
		console.log(currentBookId)
		if (currentBookId) {
			axios.get('http://localhost:8080/api/topsis', {headers: {'book_ids': currentBookId}}).then(response => {
			if (response && response.data) {
				setData(response.data.alternativeResults)
			} else {
				setData(null)
			}
			
		})
		} else {
			axios.get('http://localhost:8080/api/topsis').then(response => {
				if (response && response.data) {
					setData(response.data.alternativeResults)
				} else {
					setData(null)
				}
			})
		}	
	}
	useEffect(() => {fetchBooks()}, [])
	
	return (
	<>
	<Search style={{marginTop: 20}} placeholder="Enter your preferred Book IDs" onSearch={handleSearch} />

	{ !data && currentBookId && <p>Book not found!</p>}
	{
		data && data.map((value, index) => {
			return <Card title={value.title} style={{ width: 300, marginTop: 10 }}>
			<p><b>ISBN</b>: {value.book.isbn}</p>
			<p><b>Title</b>: {value.book.title}</p>
			<p><b>Description</b>: {value.book.description}</p>
			<p><b>Author</b>: {value.book.authorName}</p>
			<p><b>Publisher Name</b>: {value.book.publisherName}</p>
			<p><b>Rack ID</b>: {value.book.rackId}</p>
			</Card>
		})
	}
	
	
	</>	
	)
}

export default ViewBook;
