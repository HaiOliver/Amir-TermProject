const form = document.querySelector('form')
form.addEventListener('submit', event => {
  // submit event detected
        event.preventDefault()

        let email = document.getElementById("email").value
        let promo = document.getElementById("promo").value

        const data = { email, promo };
        // POST request
        fetch('http://localhost:3000/user', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success, data return from server:', data);
            document.getElementById("APIKey").textContent = data.token
        })
        .catch((error) => {
          console.error('Error:', error);
        });
})