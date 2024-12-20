// Initialize EmailJS (once, at the top)
emailjs.init('2fjxs_QlZqz8uskuJ');

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
    const airtableAccessToken = "patDtILaAyMMUDILi.439e0788f2738609d6249440fc11a949fda946abcb99cd2685199e49204d64c2"; // Replace with your PAT
    const airtableBaseId = "appHqKvilHZhdU2DW"; // Replace with your Base ID
    const airtableTableName = "SupportTickets"; // Replace with your table name

    // Show loading spinner and reset confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.add('active');
    confirmationMessage.textContent = "";
    confirmationMessage.style.color = "#000";

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
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ticket logged successfully in Airtable:', data);

            // Send email using EmailJS
            return emailjs.send('service_bua5s5d', 'template_63amg7s', {
                name: name,
                email: email,
                priority: priority,
                description: description,
                ticketID: ticketID,
            });
        })
        .then(() => {
            // Success: Both Airtable and EmailJS succeeded
            loadingSpinner.classList.remove('active');
            confirmationMessage.textContent = `Your ticket (ID: ${ticketID}) has been submitted successfully!`;
            confirmationMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "thank-you.html?ticketID=" + encodeURIComponent(ticketID);
            }, 3000); // 3-second delay
        })
        .catch(error => {
            // Handle any errors from Airtable or EmailJS
            console.error('Error:', error);
            loadingSpinner.classList.remove('active');
            confirmationMessage.textContent = "There was an error submitting your ticket. Please try again.";
            confirmationMessage.style.color = "red";
        });
});
