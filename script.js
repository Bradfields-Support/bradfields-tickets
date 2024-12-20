emailjs.init('2fjxs_QlZqz8uskuJ'); // Initialize EmailJS

document.getElementById('ticketForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;
    const attachment = document.getElementById('attachment').files[0]; // File input

    // Generate a unique ticket ID
    const ticketID = `TICKET-${Date.now()}`;

    // Show loading spinner and reset confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.add('active');
    confirmationMessage.textContent = "Submitting your ticket...";
    confirmationMessage.style.color = "#000";

    // Prepare EmailJS data
    const formData = new FormData();
    formData.append('service_id', 'service_bua5s5d'); // Replace with your EmailJS service ID
    formData.append('template_id', 'template_63amg7s'); // Replace with your EmailJS template ID
    formData.append('user_id', '2fjxs_QlZqz8uskuJ'); // Replace with your EmailJS user ID
    formData.append('template_params[name]', name);
    formData.append('template_params[email]', email);
    formData.append('template_params[priority]', priority);
    formData.append('template_params[description]', description);
    formData.append('template_params[ticketID]', ticketID);

    // Add attachment if available
    if (attachment) {
        formData.append('files.attachment', attachment);
    }

    // Send the email using EmailJS
    fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData,
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
