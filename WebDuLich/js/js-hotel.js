


//Tính ngày trả phòng
function updateCheckout() {
    let checkin = document.getElementById("checkin").value;
    let nights = parseInt(document.getElementById("nights").value);

    if (!checkin) return;

    let date = new Date(checkin);
    date.setDate(date.getDate() + nights);

    let d = date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });

    document.getElementById("checkout").innerText = d;
}
window.onload = function() {
document.getElementById("checkin").onchange = updateCheckout;
document.getElementById("nights").onchange = updateCheckout;
}
//Số lượng khách
const guestDisplay = document.getElementById("guestDisplay");
const guestPopup = document.getElementById("guestPopup");
const doneBtn = document.getElementById("doneBtn");

const adult = document.getElementById("adult");
const child = document.getElementById("child");
const room = document.getElementById("room");
const guestText = document.getElementById("guestText");

// Mở popup
guestDisplay.onclick = () => {
    guestPopup.style.display = "block";
};

// Đóng popup
doneBtn.onclick = () => {
    guestPopup.style.display = "none";
};

// Xử lý nút + và −
document.querySelectorAll(".plus").forEach(btn => {
    btn.onclick = () => {
        let type = btn.dataset.type;
        let el = document.getElementById(type);
        el.innerText = parseInt(el.innerText) + 1;
        updateText();
    };
});

document.querySelectorAll(".minus").forEach(btn => {
    btn.onclick = () => {
        let type = btn.dataset.type;
        let el = document.getElementById(type);
        if (parseInt(el.innerText) > 0) {
            el.innerText = parseInt(el.innerText) - 1;
            updateText();
        }
    };
});

// Cập nhật hiển thị chính
function updateText() {
    guestText.innerText = 
        `${adult.innerText} người lớn, ${child.innerText} Trẻ em, ${room.innerText} phòng`;
}

//Tab coupon
// Copy mã
function copyCode(code) {
    navigator.clipboard.writeText(code);
    alert("Đã copy mã: " + code);
}

// Xử lý chuyển tab
const tabs = document.querySelectorAll(".tab");
const lists = document.querySelectorAll(".coupon-list");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Xóa active tab cũ
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // Ẩn tất cả danh sách
        lists.forEach(list => list.classList.remove("active"));

        // Hiện đúng danh sách tab
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});


//chuyển tab khách sạn nội địa
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll("#hotelCityTabsND .coupon-filter-btn");
    const hotelCards = document.querySelectorAll("#hotelListND .hotel-card, #hotelListND .hotels-card");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // 1. Bỏ active khỏi tất cả nút
            tabButtons.forEach(b => {
                b.classList.remove("active", "btn-primary");
                b.classList.add("btn-outline-secondary");
            });

            // 2. Gán active cho nút được bấm
            this.classList.add("active", "btn-primary");
            this.classList.remove("btn-outline-secondary");

            // 3. Lấy tên city
            const city = this.getAttribute("data-city");

            // 4. Ẩn/hiện hotel-card theo city
            hotelCards.forEach(card => {
                if (card.getAttribute("data-city") === city) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});


//Chuyển tab khách sạn quốc tế
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll("#hotelCityTabsQT .coupon-filter-btn");
  const hotelCards = document.querySelectorAll("#hotelListQT .hotel-card");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", function () {

      // Bỏ active khỏi tất cả nút
      tabButtons.forEach(b => {
        b.classList.remove("active", "btn-primary");
        b.classList.add("btn-outline-secondary");
      });

      // Active nút hiện tại
      this.classList.add("active", "btn-primary");
      this.classList.remove("btn-outline-secondary");

      // Lấy city
      const city = this.getAttribute("data-city");

      // Hiển thị đúng danh sách KS
      hotelCards.forEach(card => {
        card.style.display = (card.dataset.city === city) ? "block" : "none";
      });

    });
  });
});

