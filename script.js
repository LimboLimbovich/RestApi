const userList = document.getElementById('userList')
const refreshButton = document.getElementById('refreshButton')
const sortSelect = document.getElementById('sortSelect')
const filterInput = document.getElementById('filterInput')

let usersData = []

refreshButton.addEventListener('click', () => {
	fetchUsers()
})

sortSelect.addEventListener('change', () => {
	sortUsers(sortSelect.value)
})

filterInput.addEventListener('input', () => {
	filterUsers(filterInput.value)
})

function fetchUsers() {
	fetch('https://randomuser.me/api/?results=20')
		.then(response => response.json())
		.then(data => {
			usersData = data.results
			displayUsers(usersData)
		})
		.catch(error => {
			console.error('Error:', error)
			userList.innerHTML = 'Failed to fetch users. Please try again later.'
		})
}

function displayUsers(users) {
	userList.innerHTML = ''
	users.forEach(user => {
		const userCard = document.createElement('div')
		userCard.classList.add('userCard')
		userCard.innerHTML = `
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
        `
		userList.appendChild(userCard)
	})
}

function sortUsers(criteria) {
	const sortedUsers = [...usersData]
	sortedUsers.sort((a, b) => {
		const valueA = getValueForSorting(a, criteria)
		const valueB = getValueForSorting(b, criteria)
		return valueA.localeCompare(valueB)
	})
	displayUsers(sortedUsers)
}

function filterUsers(filterValue) {
	const filteredUsers = usersData.filter(user => {
		const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
		const phoneNumber = user.phone
		return (
			fullName.includes(filterValue.toLowerCase()) ||
			phoneNumber.includes(filterValue)
		)
	})
	displayUsers(filteredUsers)
}

function filterUsers(filterValue) {
	const filteredUsers = usersData.filter(user => {
		const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
		const phoneNumber = user.phone
		return (
			fullName.includes(filterValue.toLowerCase()) ||
			phoneNumber.includes(filterValue)
		)
	})
	displayUsers(filteredUsers)
}

fetchUsers()
