
let currentEvent = null;

function openModal(event = null) {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('eventModal').style.display = 'block';
  document.getElementById('modalTitle').textContent = event ? 'تعديل المناسبة' : 'إضافة مناسبة';
  document.getElementById('eventTitle').value = event ? event.title : '';
  document.getElementById('eventDate').value = event ? event.startStr || event.start : '';
  document.getElementById('deleteBtn').style.display = event ? 'inline-block' : 'none';
  currentEvent = event;
}

function closeModal() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('eventModal').style.display = 'none';
}

function saveEvent() {
  const title = document.getElementById('eventTitle').value;
  const date = document.getElementById('eventDate').value;

  if (!title || !date) return alert("يرجى إدخال العنوان والتاريخ");

  const eventData = { title: title, date: date };

  if (currentEvent) {
    currentEvent.setProp('title', title);
    currentEvent.setStart(date);
    fetch(scriptURL + "?action=edit", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" }
    });
  } else {
    calendar.addEvent(eventData);
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" }
    });
  }

  closeModal();
}

function deleteEvent() {
  if (!currentEvent) return;
  fetch(scriptURL + "?action=delete&title=" + encodeURIComponent(currentEvent.title));
  currentEvent.remove();
  closeModal();
}

const scriptURL = "https://script.google.com/macros/s/AKfycbzrnP45x6_YDkFYz8KjBmsEFfm0d25E7Tv6tGyNviFxL3QchChlmMyRZP9fz0H45JtHhg/exec";

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  window.calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'ar',
    selectable: true,
    editable: true,
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: 'dayGridMonth,timeGridWeek,listWeek'
    },
    eventClick: function(info) {
      openModal(info.event);
    },
    select: function(info) {
      openModal();
    },
    events: async function (info, successCallback, failureCallback) {
      try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        const events = data.map(row => ({
          title: row.title,
          start: row.date,
          end: row.end || row.date
        }));
        successCallback(events);
      } catch (error) {
        failureCallback(error);
      }
    }
  });

  calendar.render();
});
