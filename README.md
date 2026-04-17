# 🌍 Web Du Lịch (Traveloka UI Clone)

Dự án là một trang web thuần Frontend (Static Website) mô phỏng lại giao diện của nền tảng đặt phòng và vé máy bay Traveloka. Dự án tập trung vào việc xây dựng giao diện người dùng (UI) trực quan, hiện đại và thân thiện (Responsive) trên nhiều thiết bị khác nhau.

## 🚀 Các tính năng và trang giao diện chính
Hệ thống bao gồm các trang giao diện chức năng bám sát thực tế:
- **Trang chủ (`main.html`):** Giao diện tổng quan với banner lớn, các tab tìm kiếm nhanh (vé máy bay, khách sạn, hoạt động) và danh sách các mã giảm giá, ưu đãi nổi bật.
- **Trang Đặt vé máy bay (`booking-plane.html`):** Giao diện tìm kiếm chuyến bay (Một chiều/Khứ hồi), hiển thị danh sách các deal bay rẻ và các đối tác hàng không.
- **Trang Đặt phòng Khách sạn (`booking-hotel.html`):** Tích hợp bộ lọc khách sạn theo khu vực (Nội địa/Quốc tế), hệ thống popup chọn số lượng khách/phòng tuỳ chỉnh bằng JavaScript.
- **Trang Đặt vé xe khách (`booking-car.html`):** Giao diện tìm kiếm chuyến xe, quy trình các bước đặt vé trực quan và danh sách các tuyến đường phổ biến.
- **Header & Footer độc lập:** Tách biệt `header.html` và `footer.html`, sử dụng thẻ `<iframe>` để tái sử dụng trên tất cả các trang giúp mã nguồn gọn gàng và dễ bảo trì.

## 🛠️ Công nghệ sử dụng
Dự án không sử dụng Backend, hoàn toàn được xây dựng bằng các công nghệ Web Frontend cốt lõi:
- **HTML5:** Cấu trúc trang web và tích hợp thành phần qua `iframe`.
- **CSS3:** Tùy chỉnh giao diện, hiệu ứng hover, popup và layout (Flexbox/Grid).
- **JavaScript (Vanilla):** Xử lý các logic giao diện UI/UX (chuyển tab, tăng giảm số lượng hành khách, hiển thị popup lịch, copy mã giảm giá).
- **Bootstrap (v5.3.8):** Sử dụng hệ thống Grid System, Offcanvas menu cho Mobile và các component có sẵn để tối ưu tốc độ thiết kế đáp ứng (Responsive).
- **FontAwesome (v6.4.0):** Thư viện icon.

## ⚙️ Hướng dẫn cài đặt và khởi chạy
Vì dự án sử dụng thẻ `<iframe>` để nhúng Header và Footer, một số trình duyệt sẽ chặn việc tải file này nếu mở trực tiếp bằng giao thức `file://` (báo lỗi CORS). Để xem trang web hoạt động hoàn hảo nhất:

1. Clone repository về máy:
   ```bash
   git clone [https://github.com/phuochuit/WebDuLich.git](https://github.com/phuochuit/WebDuLich.git)
Mở thư mục dự án bằng Visual Studio Code (VS Code).

Cài đặt tiện ích Live Server trong VS Code.

Nhấn chuột phải vào file main.html và chọn "Open with Live Server".

Trang web sẽ tự động mở trên trình duyệt tại địa chỉ http://127.0.0.1:5500/main.html.

👥 Tác giả
Trương Tô Đình Phước (GitHub: @phuochuit)
