// ===== NAVIGATION SETUP =====
const homeLink = document.getElementById("homeLink");
const bookLink = document.getElementById("bookLink");
const aboutLink = document.getElementById("aboutLink");
const contactLink = document.getElementById("contactLink");
const mainContent = document.getElementById("mainContent");

homeLink.addEventListener("click", loadHome);
bookLink.addEventListener("click", loadBooking);
aboutLink.addEventListener("click", loadAbout);
contactLink.addEventListener("click", loadContact);

function setActiveLink(id) {
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ===== HOME PAGE =====
function loadHome() {
  mainContent.innerHTML = `
    <section class="home-section">
      <h2>Welcome to Tikit Master</h2>
      <p>Your one-stop platform for booking movie, concert, and sports tickets with ease.</p>
      
      <div class="hero-image"></div>

      <div class="features">
        <h3>🎟 Why Choose Us?</h3>
        <ul>
          <li>✔ Fast and easy booking process</li>
          <li>✔ Secure payments and instant confirmations</li>
          <li>✔ 24/7 customer support</li>
          <li>✔ Access to exclusive events and early tickets</li>
        </ul>
      </div>

      <div class="how-it-works">
        <h3>🪄 How It Works</h3>
        <div class="steps">
          <div class="step">
            <h4>1️⃣ Browse Events</h4>
            <p>Explore trending movies, concerts, and shows in your city.</p>
          </div>
          <div class="step">
            <h4>2️⃣ Select Seats</h4>
            <p>Pick your favorite seats and number of tickets in seconds.</p>
          </div>
          <div class="step">
            <h4>3️⃣ Confirm & Enjoy</h4>
            <p>Instant confirmation and secure digital tickets on your phone.</p>
          </div>
        </div>
      </div>

      <div class="cta">
        <button onclick="loadBooking()">🎫 Book Now</button>
      </div>
    </section>
  `;
  setActiveLink("homeLink");
}

// ===== ABOUT PAGE =====
function loadAbout() {
  mainContent.innerHTML = `
    <section class="about-section">
      <h2>About Tikit Master</h2>
      <p>
        Tikit Master was founded with a simple goal — to make event booking fast, fun, and secure.
        We provide a seamless experience for users to browse, book, and manage their tickets for 
        thousands of events worldwide.
      </p>
      <p>
        Our platform connects event organizers and audiences by offering a smooth, secure, 
        and reliable ticketing system. Whether you're looking for concerts, movies, or sports,
        Tikit Master is your trusted companion.
      </p>

      <div class="team">
        <div class="team-member">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" width="100" height="100" style="border-radius:50%">
          <h4>John Carter</h4>
          <p>Founder & CEO</p>
        </div>
        <div class="team-member">
          <img src="https://randomuser.me/api/portraits/women/45.jpg" width="100" height="100" style="border-radius:50%">
          <h4>Sarah Lee</h4>
          <p>Marketing Manager</p>
        </div>
        <div class="team-member">
          <img src="https://randomuser.me/api/portraits/men/55.jpg" width="100" height="100" style="border-radius:50%">
          <h4>Michael Brown</h4>
          <p>Lead Developer</p>
        </div>
      </div>
    </section>
  `;
  setActiveLink("aboutLink");
}

// ===== BOOKING PAGE =====
function loadBooking() {
  mainContent.innerHTML = `
    <section>
      <h2>Book Your Tickets</h2>
      <div class="booking-form">
        <select id="eventSelect">
          <option value="">Select Event</option>
          <option value="Movie">🎬 Movie</option>
          <option value="Concert">🎤 Concert</option>
          <option value="Theater">🎭 Theater Play</option>
          <option value="Sports">🏆 Sports Event</option>
        </select>
        <input type="text" id="nameInput" placeholder="Your Name">
        <input type="number" id="ticketsInput" placeholder="Number of Tickets">
        <input type="date" id="dateInput">
        <button id="bookBtn">Book Ticket</button>
      </div>

      <h3 style="text-align:center;">🎟 Your Booked Tickets</h3>
      <div id="ticketsContainer"></div>
    </section>
  `;

  setActiveLink("bookLink");
  document.getElementById("bookBtn").addEventListener("click", addTicket);
  displayTickets();
}

// ===== CONTACT PAGE =====
function loadContact() {
  mainContent.innerHTML = `
    <section>
      <h2>Contact Us</h2>
      <p>We’re here to help you 24/7!</p>
      <p><b>Phone:</b> 123456</p>
      <p><b>Email:</b> support@tikitmaster.com</p>
      <p><b>Address:</b> 12 Main Street, City Center, India</p>
    </section>
  `;
  setActiveLink("contactLink");
}

// ===== LOCAL STORAGE FUNCTIONS =====
function getTickets() {
  const t = localStorage.getItem("tickets");
  return t ? JSON.parse(t) : [];
}
function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// ===== ADD TICKET =====
function addTicket() {
  const event = document.getElementById("eventSelect").value;
  const name = document.getElementById("nameInput").value.trim();
  const tickets = document.getElementById("ticketsInput").value;
  const date = document.getElementById("dateInput").value;

  if (!event || !name || !tickets || !date) {
    showAlert("⚠️ Please fill all fields before booking!");
    return;
  }

  const ticket = { id: Date.now(), event, name, tickets, date };
  const allTickets = getTickets();
  allTickets.push(ticket);
  saveTickets(allTickets);
  showAlert("✅ Ticket booked successfully!");
  displayTickets();

  document.getElementById("eventSelect").value = "";
  document.getElementById("nameInput").value = "";
  document.getElementById("ticketsInput").value = "";
  document.getElementById("dateInput").value = "";
}

// ===== DISPLAY TICKETS =====
function displayTickets() {
  const container = document.getElementById("ticketsContainer");
  container.innerHTML = "";
  const allTickets = getTickets();

  if (allTickets.length === 0) {
    container.innerHTML = `<p>No tickets booked yet.</p>`;
    return;
  }

  allTickets.forEach((t) => {
    const card = document.createElement("div");
    card.classList.add("ticket-card");
    card.innerHTML = `
      <div>
        <strong>${t.event}</strong> — ${t.tickets} ticket(s)<br>
        👤 ${t.name} | 📅 ${t.date}
      </div>
      <button>Cancel</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      const updated = getTickets().filter(ticket => ticket.id !== t.id);
      saveTickets(updated);
      showAlert("❌ Ticket cancelled.");
      displayTickets();
    });
    container.appendChild(card);
  });
}

// ===== ALERT FUNCTION =====
function showAlert(msg) {
  const alertBox = document.createElement('div');
  alertBox.className = 'alert';
  alertBox.innerText = msg;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 2000);
}

// Load home by default
loadHome();
