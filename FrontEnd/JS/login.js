// Select the login form element
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get user input values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Prepare the API request payload
        const requestBody = {
            email,
            password,
        };

        try {
            // Send a POST request to the login API
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',  // Include cookies in the request
            });

            // Parse the response JSON
            const data = await response.json();
            console.log(data.user);

            // Handle the response
            if (response.ok) {
                alert('Login successful!');
                // Save token to localStorage or a cookie (if included in the response)
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                document.cookie = `accessToken=${data.accessToken}; path=/; SameSite=None; Secure`;

                // Redirect to the dashboard or another page
                window.location.href = 'ProfilePage.html';
            } else {
                alert(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please check your internet connection and try again.');
        }
    });
}
