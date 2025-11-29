// Hàm lấy dữ liệu từ API
async function fetchImages() {
    const mssv = 24880076;
    const page = mssv % 10 + 1;
    const limit = (mssv % 2) ? 12 : 9;
    const apiUrl = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

    try {
        const response = await fetch(apiUrl);
        const images = await response.json();
        return images;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        // Fallback: sử dụng file local nếu không có internet
        const fallbackUrl = `Nendor/data.json?page=${page}&limit=${limit}`;
        const fallbackResponse = await fetch(fallbackUrl);
        const fallbackImages = await fallbackResponse.json();
        return fallbackImages;
    }
}

// Hàm render danh sách hình ảnh sử dụng Handlebars
function renderImages(images) {
    const source = document.getElementById('image-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ images });
    document.getElementById('view').innerHTML = html;

    // Gán sự kiện cho các nút
    attachEventListeners();
}

// Hàm gán sự kiện cho các nút Grayscale, Refresh
function attachEventListeners() {
    // Grayscale (MSSV chẵn)
    document.querySelectorAll('.btn-grayscale').forEach(button => {
        button.addEventListener('click', function() {
            const img = this.closest('.image-item').querySelector('img');
            img.style.filter = 'grayscale(100%)';
        });
    });

    // Refresh
    document.querySelectorAll('.btn-refresh').forEach(button => {
        button.addEventListener('click', function() {
            const img = this.closest('.image-item').querySelector('img');
            img.style.filter = 'none';
        });
    });
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', async function() {
    const images = await fetchImages();
    renderImages(images);
});
