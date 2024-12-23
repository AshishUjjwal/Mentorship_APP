const profileForm = document.getElementById('profileForm');
const responseMessage = document.getElementById('profileResponseMessage'); // Add a div to display response messages

if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const profileData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value, // Fetch the email from the form input field
            role: document.getElementById('role').value,
            skills: document.getElementById('skills').value.split(','),
            interests: document.getElementById('interests').value.split(','),
            bio: document.getElementById('bio').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData),
            });
            console.log(response);

            const data = await response.json();
            if (response.ok) {
                responseMessage.textContent = data.message;
                responseMessage.style.color = 'green';
            } else {
                responseMessage.textContent = data.error;
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            responseMessage.textContent = 'An error occurred. Please try again.';
            responseMessage.style.color = 'red';
        }
    });
}
