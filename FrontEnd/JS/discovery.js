const userList = document.getElementById('userList');
const searchInput = document.getElementById('search');
const roleFilter = document.getElementById('roleFilter');
const applyFiltersButton = document.getElementById('applyFilters');

// Fetch users from backend
const fetchUsers = async () => {
    const search = searchInput.value.trim();
    const role = roleFilter.value;

    const queryParams = new URLSearchParams();
    if (search) queryParams.append('search', search);
    if (role) queryParams.append('role', role);

    try {
        const response = await fetch(`http://localhost:8000/auth/getallusers`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Display users on the page
const displayUsers = (users) => {
    userList.innerHTML = ''; // Clear previous results

    if (users.length === 0) {
        userList.innerHTML = '<p>No users found.</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Role:</strong> ${user.role}</p>
            <p><strong>Skills:</strong> ${user.skills.join(', ')}</p>
            <p><strong>Interests:</strong> ${user.interests.join(', ')}</p>
            <p><strong>Bio:</strong> ${user.bio}</p>
        `;

        userList.appendChild(userCard);
    });
};

// Apply filters on button click
applyFiltersButton.addEventListener('click', fetchUsers);

// Fetch users initially
fetchUsers();
