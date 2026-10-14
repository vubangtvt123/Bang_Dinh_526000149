# NHẬT KÝ PROMPT ENGINEERING (VIBE CODING LOG)

- **Họ và tên:** Đinh Vũ Bằng
- **MSSV:** 526000149
- **Tên đề tài Website:** LUXE FASHION — Website cửa hàng thời trang nam và nữ
- **Công cụ AI đã sử dụng:** OpenAI Codex (ChatGPT)

## 1. Yêu cầu ban đầu (System/Initial Prompt)

> Bạn là một lập trình viên Front-end chuyên nghiệp. Hãy xây dựng website cửa hàng thời trang hiện đại mang tên LUXE FASHION bằng HTML5, CSS3 và JavaScript cơ bản. Website sử dụng giao diện tiếng Việt, phong cách tối giản, sang trọng và chuyên nghiệp; không sử dụng React, Vue, Bootstrap hoặc Tailwind CSS.
>
> Dự án cần có các file `index.html`, `style.css`, và `README.md`; sử dụng đúng các thẻ Semantic HTML5 như `header`, `nav`, `main`, `section`, `article` và `footer`. Giao diện phải có Header, Hero Banner, danh mục, tối thiểu 8 sản phẩm, banner khuyến mãi, phần giới thiệu thương hiệu, đăng ký nhận tin và Footer.
>
> CSS phải khai báo hệ thống CSS Variables, sử dụng Flexbox, Grid và responsive cho desktop, laptop, tablet, điện thoại. Tích hợp Animate.css và AOS qua CDN. JavaScript cần xử lý menu mobile, tìm kiếm sản phẩm, lọc sản phẩm, thêm vào giỏ hàng, cập nhật số lượng và kiểm tra email. Sau khi hoàn thành, hãy kiểm tra đường dẫn, CDN, responsive và các chức năng tương tác.

## 2. Quá trình tinh chỉnh & Giải quyết sự cố (Iteration Iterations)

### Lần 1: Dựng khung Semantic HTML & CSS Variable

- **Prompt đã dùng:**

  > Hãy tạo cấu trúc website LUXE FASHION bằng Semantic HTML5. Sử dụng `header`, `nav`, `main`, `section`, `article`, `aside` và `footer` đúng ngữ nghĩa; không dùng toàn bộ thẻ `div`. Tạo hệ thống biến tại `:root` cho màu sắc, font chữ, khoảng cách, kích thước container và bo góc. Dùng Flexbox cho Header, CSS Grid cho danh mục và sản phẩm.

- **Kết quả AI tạo ra:** AI tạo đầy đủ bố cục cho Header, Hero, danh mục, 8 thẻ sản phẩm, banner khuyến mãi, câu chuyện thương hiệu, biểu mẫu nhận tin, giỏ hàng dạng drawer và Footer. CSS sử dụng hệ thống 14 biến thiết kế, màu ngà–đen–vàng champagne và hai font Cormorant Garamond, Manrope.
- **Nhận xét & Tinh chỉnh của SV:** Cấu trúc đã đáp ứng yêu cầu Semantic HTML và không lạm dụng `div`. Sinh viên yêu cầu giữ phong cách “quiet luxury”, tăng khoảng trắng, giữ ảnh sản phẩm đồng đều bằng `aspect-ratio` và `object-fit: cover`, đồng thời bảo đảm các nút và liên kết có trạng thái `focus-visible`.

### Lần 2: Tích hợp thư viện Animate.css & AOS

- **Prompt đã dùng:**

  > Tích hợp Animate.css và AOS qua CDN. Dùng các hiệu ứng nhẹ như `fadeInDown`, `fadeInUp`, `fade-right` và `zoom-in` cho Hero, danh mục, sản phẩm, khuyến mãi và giới thiệu thương hiệu. Không lạm dụng chuyển động và phải hỗ trợ `prefers-reduced-motion`.

- **Kết quả AI tạo ra:** Animate.css được áp dụng cho tiêu đề, mô tả và CTA trong Hero. AOS được gắn bằng các thuộc tính `data-aos` và `data-aos-delay` cho các nội dung xuất hiện khi cuộn. AOS với thời lượng và easing nhẹ nhàng.
- **Thách thức gặp phải:** Nếu file JavaScript của AOS không tải được nhưng CSS AOS vẫn hoạt động, một số phần tử có thể bị giữ ở trạng thái ẩn.
- **Cách sửa prompt (Debug prompt):**

  > Hãy bổ sung cơ chế dự phòng để nội dung có `data-aos` vẫn hiển thị nếu CDN AOS bị lỗi. Chỉ kích hoạt trạng thái AOS sau khi thư viện khởi tạo thành công; nếu xảy ra lỗi thì xóa trạng thái này và trả nội dung về `opacity: 1`, `transform: none`.

- **Kết quả sau khi sửa:** Website sử dụng lớp `aos-ready`. Khi AOS không tồn tại hoặc khởi tạo thất bại, quy tắc `html:not(.aos-ready) [data-aos]` giúp toàn bộ nội dung vẫn hiển thị bình thường.

### Lần 3: Hoàn thiện responsive và trải nghiệm trên điện thoại

- **Prompt đã dùng:**

  > Tối ưu website cho desktop, laptop, tablet và điện thoại. Menu phải chuyển thành nút hamburger; lưới sản phẩm đổi từ 4 cột xuống 3, 2 và 1 cột theo kích thước màn hình. Không để tiêu đề, ảnh, nút hoặc nội dung tràn ngang màn hình.

- **Kết quả AI tạo ra:** AI bổ sung 5 nhóm media query, menu mobile có trạng thái đóng/mở và thuộc tính `aria-expanded`, danh mục và sản phẩm tự đổi số cột. Nút thêm vào giỏ luôn hiển thị trên thiết bị cảm ứng.
- **Thách thức gặp phải:** Tiêu đề Hero có kích thước lớn nên dòng “CỦA RIÊNG BẠN” có nguy cơ tràn trên màn hình điện thoại hẹp.
- **Cách sửa prompt (Debug prompt):**

  > Hãy kiểm tra Hero ở kích thước 390 × 844 px và điều chỉnh typography bằng `clamp()` hoặc đơn vị `vw` để tiêu đề vẫn nổi bật nhưng không tràn khỏi viewport.

- **Kết quả sau khi sửa:** Cỡ chữ Hero trên mobile được giảm và giới hạn bằng `clamp(3rem, 14.5vw, 4.5rem)`. Bố cục đã được render thử ở desktop 1440 × 1000 px và mobile 390 × 844 px.

### Lần 5: Kiểm tra biểu mẫu, hình ảnh và chất lượng mã nguồn

- **Prompt đã dùng:**

  > Kiểm tra email trống và email sai định dạng, hiển thị thông báo dễ hiểu bằng tiếng Việt. Kiểm tra tất cả URL ảnh, CDN, đường dẫn CSS/JavaScript, ID HTML, liên kết neo và cú pháp JavaScript. Nếu ảnh ngoài lỗi, bố cục không được vỡ.

- **Kết quả AI tạo ra:** Biểu mẫu sử dụng HTML Validation API, `aria-invalid` và vùng thông báo `role="status"`. Ảnh có `alt`, `loading="lazy"`, kích thước ổn định và lớp dự phòng khi không tải được.
- **Thách thức gặp phải:** Một URL ảnh sản phẩm túi xách trả về lỗi HTTP 404.
- **Cách sửa prompt (Debug prompt):**

  > Hãy kiểm tra toàn bộ URL ảnh bằng HTTP, thay ảnh bị lỗi bằng một URL công khai hoạt động và kiểm tra lại trước khi bàn giao.

- **Kết quả sau khi sửa:** Ảnh lỗi được thay thế; 16/16 URL ảnh phản hồi thành công. Animate.css, AOS CSS/JS và Google Fonts đều phản hồi HTTP 200. JavaScript vượt qua kiểm tra cú pháp; không có ID trùng, liên kết nội bộ thiếu hoặc số lượng dấu ngoặc CSS không cân bằng.

## 3. Đánh giá cá nhân về quá trình Vibe Coding

### AI đã giúp bạn tiết kiệm thời gian ở phần nào nhất?

AI giúp tôi tiết kiệm nhiều thời gian nhất ở giai đoạn dựng cấu trúc ban đầu và viết các phần mã lặp lại. Thay vì tự viết từng thẻ sản phẩm, từng breakpoint và từng hàm xử lý giỏ hàng, tôi có thể mô tả rõ yêu cầu để AI tạo một phiên bản hoàn chỉnh, sau đó tập trung vào kiểm tra giao diện, trải nghiệm người dùng và phát hiện lỗi.

AI cũng hỗ trợ tốt trong việc kiểm tra chéo nhiều tiêu chí của đề bài như Semantic HTML5, CSS Variables, responsive, khả năng truy cập, hiệu ứng AOS và xử lý biểu mẫu. Tuy nhiên, kết quả vẫn cần được chạy thử vì mã đúng cú pháp chưa chắc đã có trải nghiệm sử dụng tốt.

### Bài học rút ra khi đặt câu hỏi (Prompt) cho AI trong thiết kế web?

Tôi rút ra rằng prompt càng cụ thể thì kết quả càng sát yêu cầu. Một prompt tốt nên nêu rõ:

1. Mục tiêu và đối tượng của website.
2. Công nghệ được phép và công nghệ không được sử dụng.
3. Cấu trúc từng khu vực và nội dung bắt buộc.
4. Tiêu chí responsive, accessibility và hiệu ứng.
5. Chức năng JavaScript cùng giới hạn của website tĩnh.
6. Cách kiểm tra kết quả sau khi sinh mã.

Khi gặp lỗi, tôi không chỉ yêu cầu AI “sửa lỗi” chung chung mà mô tả hiện tượng, điều kiện xảy ra, kết quả mong muốn và giới hạn cần giữ nguyên. Ví dụ, với tìm kiếm, tôi chỉ rõ hộp thoại đang đóng quá sớm và yêu cầu chuyển hành động sang phím Enter. Với AOS, tôi mô tả trường hợp CSS tải được nhưng JavaScript thất bại để AI tạo đúng cơ chế dự phòng.

Qua bài làm, tôi nhận thấy Vibe Coding không có nghĩa là chấp nhận toàn bộ kết quả AI. Sinh viên vẫn cần đọc mã, kiểm thử ở nhiều kích thước màn hình, kiểm tra liên kết bên ngoài, đánh giá tính đúng đắn và tiếp tục tinh chỉnh prompt cho đến khi sản phẩm đáp ứng yêu cầu.
