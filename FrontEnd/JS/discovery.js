const userList = document.getElementById('userList');
const searchInput = document.getElementById('search');
const roleFilter = document.getElementById('roleFilter');
const applyFiltersButton = document.getElementById('applyFilters');

// Fetch users from backend
const fetchUsers = async () => {
    const search = searchInput.value.trim();
    console.log(`Search value: ${search}`);
    const role = roleFilter.value.trim();
    console.log(`Role value: ${role}`);

    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (role) queryParams.append('role', role);

    console.log(`Query Parameters: ${queryParams.toString()}`);

    try {
        const response = await fetch(`http://localhost:8000/auth/getallusers?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include token for protected routes
            },
            credentials: 'include', // Include cookies if used for authentication
        });
        console.log(response);
        const users = await response.json();
        console.log(users);
        displayUsers(users);
    } catch (error) {
        console.log('Error fetching users:', error);
    }
};

// Display users on the page
const displayUsers = (users) => {
    // Assuming `users` is an object containing an array of user data, e.g., { users: [...] }
    const userArray = Array.isArray(users) ? users : users.users || []; // Extract users array or use empty array

    // Clear previous results
    userList.innerHTML = '';

    if (userArray.length === 0) {
        userList.innerHTML = '<p>No users found.</p>';
        return;
    }

    userArray.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <h2>${user.email || 'Unknown Name'}</h2>
            <p><strong>Role:</strong> ${user.role || 'N/A'}</p>
            <p><strong>Skills:</strong> ${Array.isArray(user.skills) ? user.skills.join(', ') : 'N/A'}</p>
            <p><strong>Interests:</strong> ${Array.isArray(user.interests) ? user.interests.join(', ') : 'N/A'}</p>
            <p><strong>Bio:</strong> ${user.bio || 'No bio available.'}</p>
        `;

        userList.appendChild(userCard);
    });
};


// Apply filters on button click
applyFiltersButton.addEventListener('click', fetchUsers);

// Fetch users initially
fetchUsers();
