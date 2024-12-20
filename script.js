emailjs.init('2fjxs_QlZqz8uskuJ'); // Initialize EmailJS

document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;

    // Generate a unique ticket ID
    const ticketID = `TICKET-${Date.now()}`;

    // Show loading spinner and reset confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.add('active');
    confirmationMessage.textContent = "Submitting your ticket...";
    confirmationMessage.style.color = "#000";

    // Send email using EmailJS
    emailjs.send('service_bua5s5d', 'template_63amg7s', {
        name: name,
        email: email,
        priority: priority,
        description: description,
        ticketID: ticketID
    })
        .then(() => {
            // Success: Email sent
            loadingSpinner.classList.remove('active');
            confirmationMessage.textContent = `Your ticket (ID: ${ticketID}) has been submitted successfully!`;
            confirmationMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "thank-you.html?ticketID=" + encodeURIComponent(ticketID);
            }, 3000); // 3-second delay
        })
        .catch((error) => {
            // Handle EmailJS errors
            loadingSpinner.classList.remove('active');
            console.error('Error sending email:', error);
            confirmationMessage.textContent = "There was an error submitting your ticket. Please try again.";
            confirmationMessage.style.color = "red";
        });
});
