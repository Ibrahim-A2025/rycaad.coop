
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const role = localStorage.getItem("role");

  const linksByRole = {
    visitor: [
      { href: "event.html", text: "الرئيسية" },
      { href: "news.html", text: "الأخبار والفعاليات" },
      { href: "projects.html", text: "المشاريع" },
      { href: "store.html", text: "المتجر" },
      { href: "about.html", text: "من نحن" },
      { href: "login.html", text: "تسجيل الدخول" }
    ],
    member: [
      { href: "event.html", text: "الرئيسية" },
      { href: "news.html", text: "الفعاليات" },
      { href: "projects.html", text: "المشاريع" },
      { href: "news.html", text: "الأخبار" },
      { href: "store.html", text: "المتجر" },
      { href: "subscribe.html", text: "الاشتراك" },
      { href: "donate.html", text: "تبرع" },
      { href: "contact.html", text: "تواصل معنا" },
      { href: "logout.html", text: "تسجيل الخروج" }
    ],
    admin: [
      { href: "event.html", text: "الرئيسية" },
      { href: "admin-dashboard.html", text: "لوحة التحكم" },
      { href: "news.html", text: "الأخبار" },
      { href: "projects.html", text: "المشاريع" },
      { href: "store.html", text: "المتجر" },
      { href: "about.html", text: "من نحن" },
      { href: "subscribe.html", text: "الاشتراك" },
      { href: "donate.html", text: "تبرع" },
      { href: "contact.html", text: "تواصل معنا" },
      { href: "logout.html", text: "تسجيل الخروج" }
    ]
  };

  const links = linksByRole[role] || linksByRole.visitor;

  if (navbar) {
    links.forEach(link => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      li.appendChild(a);
      navbar.appendChild(li);
    });
  }
});
