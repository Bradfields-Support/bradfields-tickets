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
    emailjs.init('2fjxs_QlZqz8uskuJ');
    emailjs.send('service_bua5s5d', 'template_63amg7s', {
        name: name,
        email: email,
        priority: priority,
        description: description,
        ticketID: ticketID,
    }).then(() => {
        document.getElementById('confirmationMessage').innerHTML = `
            <p>Your ticket has been submitted successfully!</p>
            <p><strong>Ticket ID:</strong> ${ticketID}</p>
        `;

        // Clear the form fields
        document.getElementById('ticketForm').reset();
    }).catch((error) => {
        document.getElementById('confirmationMessage').textContent = 'There was an error submitting your ticket. Please try again.';
        console.error('Error:', error);
    });
});
