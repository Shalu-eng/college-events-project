function loadEvents() {
  const today = new Date().toISOString().split('T')[0];
  let storedEvents = JSON.parse(localStorage.getItem('events')) || [];

  // Filter out past events
  storedEvents = storedEvents.filter(event => event.date >= today);
  localStorage.setItem('events', JSON.stringify(storedEvents));

  const upcomingContainer = document.getElementById("upcomingEvents");
  upcomingContainer.innerHTML = "";

  storedEvents.forEach(event => {
    const eventHTML = `
      <div class="event-item">
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <img src="${event.poster}" alt="Poster">
      </div>
    `;
    upcomingContainer.innerHTML += eventHTML;
  });
}

function addEvent() {
  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventTime = document.getElementById("eventTime").value;
  const eventPoster = document.getElementById("eventPoster").files[0];

  if (eventName && eventDate && eventTime && eventPoster) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newEvent = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        poster: e.target.result,
      };

      const events = JSON.parse(localStorage.getItem("events")) || [];
      events.push(newEvent);
      localStorage.setItem("events", JSON.stringify(events));

      loadEvents();
    };
    reader.readAsDataURL(eventPoster);
  } else {
    alert("Please fill in all fields and upload a poster.");
  }
}

// Load events when page loads
window.onload = loadEvents;