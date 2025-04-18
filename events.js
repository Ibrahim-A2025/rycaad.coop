
document.addEventListener("DOMContentLoaded", async function () {
  const container = document.getElementById("events-list");

  try {
    const response = await fetch("/api/events");
    const events = await response.json();

    container.innerHTML = "";

    events.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "event-card";

      const picture = document.createElement("picture");

      const source = document.createElement("source");
      source.srcset = event.image_webp;
      source.type = "image/webp";

      const img = document.createElement("img");
      img.src = event.image_fallback;
      img.alt = event.title;
      img.className = "event-img";

      picture.appendChild(source);
      picture.appendChild(img);

      eventCard.innerHTML = `
        <div class="event-header">
          <div class="event-title-sm">${event.title}</div>
        </div>
        <div class="event-body">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-date">${event.date}</p>
          <p class="event-description">${event.description}</p>
        </div>
      `;

      eventCard.prepend(picture);
      container.appendChild(eventCard);
    });
  } catch (error) {
    console.error("فشل في تحميل الفعاليات:", error);
    container.innerHTML = "<p>حدث خطأ أثناء تحميل الفعاليات.</p>";
  }
});
