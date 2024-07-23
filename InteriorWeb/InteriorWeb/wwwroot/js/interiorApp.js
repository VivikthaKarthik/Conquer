$(document).ready(function () {
    fetchData();
});

// URL of your API endpoint
const apiUrl = 'https://localhost:7092/api/Project/GetAllProjects';

// Function to fetch data from the API
async function fetchData() {
    alert();
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the JSON from the response
        const data = await response.json();

        if (data != null && data.isSuccess) {
            var projects = data.result;

            if (projects != null && projects.length > 0) {
                const container = document.getElementById('projectRow');
                container.innerHTML = ''; // Clear any existing content

                projects.forEach(project => {
                    const div = document.createElement('div');
                    div.className = 'col-lg-3 col-md-5';
                    div.style.marginTop = '20px';

                    div.innerHTML = `<div class="team-member-card">
                                    <div class="content-wrapper">
                                        <div class="content">
                                            <h2 class="title">${project.name}</h2>
                                            <p class="desc" style="padding: 0 40px;">${project.status}</p>
                                        </div>
                                    </div>
                                    <div class="image">
                                        <img src="${project.imagePath}" alt="${project.name}" />
                                    </div>
                                </div>`;

                    container.appendChild(div);
                });
            }
        }

        // Log the data to the console (you can replace this with your own logic)
        console.log(data);
    } catch (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Call the function to fetch data

