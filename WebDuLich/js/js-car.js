document.addEventListener("DOMContentLoaded", function () {

    // --- 1. KHỞI TẠO NGÀY ---
    const inpNgayDi = document.getElementById('ngayDi');
    const inpNgayVe = document.getElementById('ngayVe');
    const homNay = new Date().toISOString().split('T')[0];

    // Set ngày tối thiểu là hôm nay
    inpNgayDi.min = homNay;
    inpNgayDi.value = homNay;
    inpNgayVe.min = homNay;

    // --- 2. XỬ LÝ NÚT ĐỔI CHIỀU (SWAP) ---
    const btnDoiCho = document.getElementById('btnDoiCho');
    const inpNoiDi = document.getElementById('noiDi');
    const inpNoiDen = document.getElementById('noiDen');

    btnDoiCho.addEventListener('click', function () {
        // Hiệu ứng xoay (CSS đã làm), JS chỉ đổi giá trị
        let temp = inpNoiDi.value;
        inpNoiDi.value = inpNoiDen.value;
        inpNoiDen.value = temp;
    });

    // --- 3. XỬ LÝ CHECKBOX KHỨ HỒI ---
    const checkKhuHoi = document.getElementById('checkKhuHoi');
    const boxNgayVe = document.getElementById('boxNgayVe');

    checkKhuHoi.addEventListener('change', function () {
        if (this.checked) {
            // Xóa class 'd-none' của Bootstrap để hiện lên
            boxNgayVe.classList.remove('d-none');
            // Thêm hiệu ứng hiện dần (fade-in) nếu muốn
            boxNgayVe.classList.add('fade-in');
        } else {
            // Thêm lại class 'd-none' để ẩn đi
            boxNgayVe.classList.add('d-none');
            inpNgayVe.value = ''; // Reset ngày về
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 1. Lấy danh sách tất cả các dòng chứa bước (dựa vào class .step-item tôi đã thêm hoặc .row bên trong container)
    // Để cho chắc ăn, ta lấy các div có class 'row' nằm trong id 'danhSachCacBuoc'
    const steps = document.querySelectorAll('#danhSachCacBuoc .row');
    const btn = document.getElementById('btnToggleSteps');

    // Số lượng bước muốn hiện ban đầu
    const hienThiBanDau = 2;

    // 2. Hàm ẩn các bước thừa
    function khoiTao() {
        for (let i = 0; i < steps.length; i++) {
            if (i >= hienThiBanDau) {
                steps[i].style.display = 'none'; // Ẩn đi
            }
        }
    }

    // Chạy hàm khởi tạo ngay khi web tải xong
    khoiTao();

    // 3. Xử lý khi bấm nút
    btn.addEventListener('click', function () {
        // Kiểm tra xem bước thứ 3 (index = 2) đang ẩn hay hiện
        // Nếu đang ẩn (none) -> Nghĩa là người dùng muốn XEM THÊM
        const dangAn = steps[hienThiBanDau].style.display === 'none';

        if (dangAn) {
            // Hiện tất cả ra
            for (let i = hienThiBanDau; i < steps.length; i++) {
                steps[i].style.display = 'flex'; // Trả về 'flex' vì class .row của Bootstrap là flexbox
            }
            // Đổi chữ nút bấm
            btn.innerHTML = 'Thu gọn';
        } else {
            // Ẩn bớt đi (quay về ban đầu)
            for (let i = hienThiBanDau; i < steps.length; i++) {
                steps[i].style.display = 'none';
            }
            // Đổi chữ nút bấm
            btn.innerHTML = 'Xem thêm';
        }
    });
});