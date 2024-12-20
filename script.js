document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const priority = document.getElementById('priority').value;
    const description = document.getElementById('description').value;

    // Generate a unique ticket ID
    const ticketID = `TICKET-${Date.now()}`;

    // Airtable API details
    const airtableAccessToken = "your-personal-access-token"; // Replace with your PAT
    const airtableBaseId = "your-base-id"; // Replace with your Base ID
    const airtableTableName = "SupportTickets"; // Replace with your table name

    // Show loading spinner (optional)
    document.getElementById('loadingSpinner').classList.add('active');

    // Send data to Airtable
    fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${airtableAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fields: {
                "Ticket ID": ticketID,
                "Name": name,
                "Email": email,
                "Priority": priority,
                "Description": description,
                "Submission Date": new Date().toISOString()
            }
        })
    }).then(response => response.json())
      .then(data => {
          console.log('Ticket logged successfully:', data);

          // Hide spinner and show confirmation
          document.getElementById('loadingSpinner').classList.remove('active');
          document.getElementById('confirmationMessage').textContent = `Your ticket (ID: ${ticketID}) has been submitted successfully!`;

    // Send email using EmailJS
    emailjs.init('2fjxs_QlZqz8uskuJ');
    emailjs.send('service_bua5s5d', 'template_63amg7s', {
        name: name,
        email: email,
        priority: priority,
        description: description,
        ticketID: ticketID,
    }).then(() => {
        // Display confirmation message
        document.getElementById('confirmationMessage').textContent = `Your ticket (ID: ${ticketID}) has been submitted successfully!`;

        // Redirect to thank-you page after a short delay
        setTimeout(() => {
            window.location.href = "thank-you.html?ticketID=" + ticketID;
        }, 3000); // 3000ms = 3 seconds
    }).catch((error) => {
        document.getElementById('confirmationMessage').textContent = 'There was an error submitting your ticket. Please try again.';
        console.error('Error:', error);
    });
});
