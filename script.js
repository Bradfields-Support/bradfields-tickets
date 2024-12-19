document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;

    // Generate a unique ticket ID
    const ticketID = `TICKET-${Date.now()}`;

    // Send email using EmailJS
    emailjs.init('22_gz5VmoMZyx76R3'); // Replace with your EmailJS Public Key
    emailjs.send('service_id', 'template_id', {
        name: name,
        email: email,
        priority: priority,
        description: description,
        ticketID: ticketID,
    }).then(() => {
        document.getElementById('confirmationMessage').textContent = `Your ticket (ID: ${ticketID}) has been submitted successfully!`;
    }).catch((error) => {
        document.getElementById('confirmationMessage').textContent = 'There was an error submitting your ticket. Please try again.';
        console.error('Error:', error);
    });

    // Optionally log ticket to an external database
    // TODO: Implement Google Sheets API or another storage solution
});
