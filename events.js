let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
  displayEvents();
}

function displayEvents() {
  const tableBody = document.querySelector("#eventsTable tbody");
  tableBody.innerHTML = "";

  events.forEach((event, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.date}</td>
      <td>${event.desc}</td>
      <td>
        <button onclick="editEvent(${index})">تعديل</button>
        <button onclick="deleteEvent(${index})">حذف</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editEvent(index) {
  const event = events[index];
  document.getElementById("eventId").value = index;
  document.getElementById("eventName").value = event.name;
  document.getElementById("eventDate").value = event.date;
  document.getElementById("eventDesc").value = event.desc;
}

function deleteEvent(index) {
  if (confirm("هل أنت متأكد من حذف المناسبة؟")) {
    events.splice(index, 1);
    saveEvents();
  }
}

document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("eventId").value;
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const desc = document.getElementById("eventDesc").value;

  const newEvent = { name, date, desc };

  if (id === "") {
    events.push(newEvent);
  } else {
    events[parseInt(id)] = newEvent;
  }

  this.reset();
  document.getElementById("eventId").value = "";
  saveEvents();
});

displayEvents();
