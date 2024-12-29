const button = document.getElementById('click-me');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const toggleForm = document.querySelectorAll('.toggle');

toggleForm.forEach((toggleLink) => {
    toggleLink.addEventListener('click', function(event) {
        event.preventDefault();
        const signInContainer = document.querySelectorAll('.container')[0];
        const signUpContainer = document.querySelectorAll('.container')[1];
        signInContainer.style.display = signInContainer.style.display === 'none' ? 'block' : 'none';
        signUpContainer.style.display = signUpContainer.style.display === 'none' ? 'block' : 'none';
    });
});

document.getElementById('signUpButton').addEventListener('click', async () => {
    try {
        const username = document.getElementById('SignUpUsername').value;
        const email = document.getElementById('SignUpEmail').value;
        const password = document.getElementById('SignUpPassword"').value;

        const response = await fetch('/api/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const html = await response.text();
        document.open();
        document.write(html);
        document.close();
    }
    catch (error) {
        console.error(error);
    }
});

document.getElementById('signInButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
        const email = document.getElementById('SignInEmail').value;
        const password = document.getElementById('SignInPassword').value;

        // Send credentials to the sign-in endpoint
        const response = await fetch('/api/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            const username = result.data.username;

            // Pass data via query parameters to the /welcome route
            const htmlRes = await fetch(`/welcome?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const html = await htmlRes.text();

            // Replace the current document with the new HTML
            document.open();
            document.write(html);
            document.close();
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error('Error during sign-in:', err);
    }
});
