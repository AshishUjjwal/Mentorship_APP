/* <!-- JavaScript (app.js) --> */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Perform login (mockup example)
        console.log('Logging in with:', { email, password });
    });
}

const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const profileData = {
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            skills: document.getElementById('skills').value.split(','),
            interests: document.getElementById('interests').value.split(','),
            bio: document.getElementById('bio').value,
        };
        console.log('Saving profile:', profileData);
    });
}

const applyFilters = document.getElementById('applyFilters');
if (applyFilters) {
    applyFilters.addEventListener('click', async () => {
        const search = document.getElementById('search').value;
        const role = document.getElementById('roleFilter').value;
        console.log('Applying filters:', { search, role });
    });
}
