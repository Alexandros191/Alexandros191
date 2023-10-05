const username = "Alexandros191";
const apiUrl = `https://api.github.com/users/${username}/events`;

// Fetch GitHub activity data
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Filter the data to get only PushEvents (code pushes)
    const pushEvents = data.filter((event) => event.type === "PushEvent");

    // Extract the number of pushes per day
    const activityData = {};
    pushEvents.forEach((event) => {
      const date = new Date(event.created_at).toLocaleDateString();
      activityData[date] = (activityData[date] || 0) + 1;
    });

    // Convert data into arrays for Chart.js
    const labels = Object.keys(activityData);
    const dataPoints = Object.values(activityData);

    // Create a chart
    const ctx = document.getElementById("github-activity").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "GitHub Activity",
            data: dataPoints,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch((error) => console.error("Error fetching GitHub data:", error));
