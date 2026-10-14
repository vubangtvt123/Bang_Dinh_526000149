# LUXE FASHION

Website cửa hàng thời trang nam và nữ được xây dựng cho bài tập môn Thiết kế Website. Giao diện sử dụng phong cách **quiet luxury**: tối giản, hiện đại, nhiều khoảng trắng và tập trung vào hình ảnh sản phẩm.

## Cách chạy website

### Cách 1: VS Code Live Server (khuyên dùng)

1. Mở thư mục dự án bằng Visual Studio Code.
2. Cài extension **Live Server** của Ritwick Dey nếu máy chưa có.
3. Nhấp chuột phải vào file `index.html`.
4. Chọn **Open with Live Server**.
5. Website sẽ mở tại địa chỉ dạng `http://127.0.0.1:5500/`.

### Cách 2: Mở trực tiếp

Nhấp đúp vào `index.html` để mở bằng trình duyệt. Các chức năng phía trình duyệt vẫn hoạt động, nhưng Live Server cho trải nghiệm phát triển ổn định hơn.

> Cần có kết nối Internet để tải font chữ, ảnh thời trang, Animate.css và AOS từ CDN.

## Cấu trúc dự án

```text
.
├── assets/
│   ├── icons/
│   │   └── favicon.svg       # Biểu tượng thương hiệu trên tab trình duyệt
│   ├── images/
│   │   └── README.md         # Hướng dẫn quản lý ảnh cục bộ
│   └── README.md             # Mô tả thư mục tài nguyên
├── index.html                # Cấu trúc Semantic HTML5 và nội dung
├── style.css                 # Thiết kế, hiệu ứng và responsive
├── PROMPT_LOG.md             # Nhật ký Prompt Engineering
└── README.md                 # Hướng dẫn dự án
```

## Công nghệ sử dụng

- HTML5 Semantic: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- CSS3: CSS Variables, Flexbox, Grid, transitions, responsive media queries.
- [Animate.css](https://animate.style/) qua CDN cho hiệu ứng ở Hero và tiêu đề.
- [AOS](https://michalsnik.github.io/aos/) qua CDN cho hiệu ứng khi cuộn trang.
- Google Fonts: Cormorant Garamond và Manrope.
- Ảnh minh họa từ [Unsplash](https://unsplash.com/).

## Chức năng đã triển khai

- Header cố định khi cuộn và menu responsive trên điện thoại.
- Lọc sản phẩm theo Nam, Nữ và Phụ kiện.
- Tìm kiếm sản phẩm theo tên, hỗ trợ tìm không dấu.
- Thêm sản phẩm vào giỏ, tăng/giảm số lượng, xóa sản phẩm và tính tạm tính.
- Cập nhật số lượng trên biểu tượng giỏ hàng.
- Hiển thị thông báo khi thêm sản phẩm hoặc dùng chức năng minh họa.
- Kiểm tra email trống/sai định dạng khi đăng ký nhận tin.
- Thông báo rõ khi không tìm thấy sản phẩm.
- Hiệu ứng hover, `focus-visible`, hỗ trợ `prefers-reduced-motion`.
- Bố cục responsive cho desktop, laptop, tablet và mobile.
- Xử lý dự phòng để ảnh lỗi không làm vỡ bố cục.

## Giới hạn

Đây là website tĩnh phục vụ học tập, không có backend hoặc cơ sở dữ liệu. Giỏ hàng chỉ tồn tại trong phiên trang hiện tại; tài khoản, đặt hàng và thanh toán trực tuyến là chức năng minh họa và chưa được kết nối dịch vụ thực tế.
