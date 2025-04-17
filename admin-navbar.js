
const adminLinks = [
  { text: "لوحة تحكم المشرف", href: "admin-dashboard.html" },
  { text: "لوحة البيانات (إحصائيات)", href: "admin-stats.html" },
  { text: "تقويم المناسبات", href: "admin-calendar.html" },
  { text: "إضافة خبر / فعالية", href: "admin-add-news.html" },
  { text: "إدارة الأعضاء", href: "admin-members.html" },
  { text: "الرسائل / التنبيهات", href: "admin-messages.html" },
  { text: "تسجيل الخروج", href: "logout.html" }
];

const nav = document.getElementById("admin-navbar");

adminLinks.forEach(link => {
  const a = document.createElement("a");
  a.textContent = link.text;
  a.href = link.href;
  a.style.margin = "0 10px";
  a.style.color = "white";
  nav.appendChild(a);
});

nav.style.background = "#388e3c";
nav.style.padding = "15px";
nav.style.textAlign = "center";
