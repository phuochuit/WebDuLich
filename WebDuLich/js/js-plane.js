// Tab chuyến đi
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('returnDateBox').classList.toggle('d-none', btn.dataset.trip !== 'round');
    });
});

// Swap sân bay
document.querySelector('.swap-btn').addEventListener('click', function() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const from = inputs[0];
    const to = inputs[1];
    [from.value, to.value] = [to.value, from.value];
});

// Copy mã
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        navigator.clipboard.writeText(input.value).then(() => {
            this.textContent = 'Đã copy';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            setTimeout(() => {
                this.textContent = 'Copy';
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 1500);
        }).catch(err => {
            // Fallback cho trình duyệt cũ
            input.select();
            document.execCommand('copy');
            this.textContent = 'Đã copy';
            setTimeout(() => {
                this.textContent = 'Copy';
            }, 1500);
        });
    });
});

// Tìm chuyến bay - SỬA LẠI PHẦN NÀY
document.getElementById('searchBtn').addEventListener('click', function() {
    const fromInput = document.querySelectorAll('input[type="text"]')[0];
    const toInput = document.querySelectorAll('input[type="text"]')[1];
    
    const from = fromInput.value;
    const to = toInput.value;
    
    // Validation cơ bản
    if (!from || !to) {
        alert('Vui lòng nhập đầy đủ điểm đi và điểm đến');
        return;
    }
    
    if (from === to) {
        alert('Điểm đi và điểm đến không được trùng nhau');
        return;
    }
    
    const resultDiv = document.getElementById('flightResult');
    resultDiv.innerHTML = `
        <div class="alert alert-info mt-3">
            <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            Đang tìm chuyến bay từ ${from} đến ${to}...
        </div>
    `;
    
    // Giả lập tìm kiếm
    setTimeout(() => {
        const flights = [
            {
                airline: "Vietnam Airlines",
                time: "06:00 - 07:30 • 1h30m",
                price: "1.250.000 VNĐ"
            },
            {
                airline: "VietJet Air", 
                time: "08:15 - 09:45 • 1h30m",
                price: "890.000 VNĐ"
            },
            {
                airline: "Bamboo Airways",
                time: "14:20 - 15:50 • 1h30m", 
                price: "1.150.000 VNĐ"
            }
        ];
        
        let flightsHTML = '<h5 class="mt-3">Kết quả tìm kiếm:</h5>';
        
        flights.forEach(flight => {
            flightsHTML += `
                <div class="card mt-3">
                    <div class="card-body">
                        <h5>${flight.airline}</h5>
                        <p>${from} → ${to}</p>
                        <p>${flight.time}</p>
                        <h4 class="text-danger">${flight.price}</h4>
                        <button class="btn btn-primary">Chọn chuyến bay</button>
                    </div>
                </div>
            `;
        });
        
        resultDiv.innerHTML = flightsHTML;
    }, 2000);
});

// FAQ
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('active');
    });
});

// Khởi tạo ngày về
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const returnDateInput = document.getElementById('returnDateBox').querySelector('input');
    if (returnDateInput) {
        returnDateInput.valueAsDate = nextWeek;
    }
    
    console.log('Website đã được khởi tạo thành công!');
});