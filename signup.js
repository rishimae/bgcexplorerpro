document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const data = {
                action: 'signup',
                name: formData.get('name'),
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
                    alert('Account successfully created!');
                    window.location.href = 'index.html'; // Redirect to login page upon successful signup
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while signing up. Please try again later.');
            });
        });
    } else {
        console.error('Signup form not found');
    }
});
