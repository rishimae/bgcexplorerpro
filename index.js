document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                action: 'login',
                email: formData.get('email'),
                password: formData.get('password'),
            };

            // Send POST request via CORS Anywhere proxy
            fetch('http://localhost:8080/https://script.google.com/macros/s/AKfycbzVQVfL_rYN1XKAJs6qYtvkQKheyln_8jOij9a40Pbs7MZOHZ2cEi2dyP2WxdAO4jZG/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.status === 'success') {
                    window.location.href = 'dashboard.html'; // Redirect to dashboard upon successful login
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in. Please try again later.');
            });
        });
    } else {
        console.error('Login form not found');
    }
});
