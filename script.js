// Basic dynamic page loading for navigation
const mainContent = document.getElementById("mainContent");
const links = document.querySelectorAll("nav a");
const bookNowBtn = document.getElementById("bookNowBtn");

// Handle navigation clicks
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const id = link.id;
    if (id === "homeLink") loadHome();
    if (id === "bookLink") loadBooking();
    if (id === "aboutLink") loadAbout();
    if (id === "contactLink") loadContact();
  });
});

if (bookNowBtn) {
  bookNowBtn.addEventListener("click", () => {
    document.getElementById("bookLink").click();
  });
}

// Page content loaders
function loadHome() {
  mainContent.innerHTML = document.querySelector(".home-section").outerHTML;
}

function loadBooking() {
  mainContent.innerHTML = `
    <section>
      <h2>Book Your Tickets 🎟️</h2>
      <form class="booking-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <select required>
          <option value="">Select Event</option>
          <option>Concert</option>
          <option>Movie</option>
          <option>Sports</option>
        </select>
        <input type="number" placeholder="No. of Tickets" min="1" max="10" required />
        <button type="submit">Confirm Booking</button>
      </form>
      <div id="ticketsContainer"></div>
    </section>
  `;

  const form = document.querySelector(".booking-form");
  const container = document.getElementById("ticketsContainer");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("input[type=text]").value;
    const event = form.querySelector("select").value;
    const count = form.querySelector("input[type=number]").value;

    const ticket = document.createElement("div");
    ticket.className = "ticket-card";
    ticket.innerHTML = `
      <p><strong>${name}</strong> - ${event} (${count} ticket${count > 1 ? "s" : ""})</p>
      <button>Cancel</button>
    `;
    ticket.querySelector("button").addEventListener("click", () => ticket.remove());
    container.appendChild(ticket);

    form.reset();
    showAlert("🎫 Ticket booked successfully!");
  });
}

function loadAbout() {
  mainContent.innerHTML = `
    <section class="about-section">
      <h2>About Tikit Master</h2>
      <p>Tikit Master is your trusted partner for booking tickets online. We provide seamless access to concerts, movies, and sports events — all in one place!</p>
      <div class="team">
        <div class="team-member">
          <h3>Priya</h3>
          <p>Founder & CEO</p>
        </div>
        <div class="team-member">
          <h3>Rupesh</h3>
          <p>Lead Developer</p>
        </div>
      </div>
    </section>
  `;
}

function loadContact() {
  mainContent.innerHTML = `
    <section>
      <h2>Contact Us 📞</h2>
      <p>Email: support@tikitmaster.com</p>
      <p>Phone: 123456</p>
      <p>We’ll get back to you within 24 hours.</p>
    </section>
  `;
}

// Alert helper
function showAlert(message) {
  const alert = document.createElement("div");
  alert.className = "alert";
  alert.textContent = message;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 2000);
}
