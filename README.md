# THE GIRLS' ARCHIVE — 20/10

Website scrapbook tương tác dành cho nhóm **stu dâm thái nguyên**.

## Có gì trong bản này?

- Responsive, chạy tĩnh trên GitHub Pages.
- Concept **THE GIRLS' ARCHIVE**, kem–hồng pastel, scrapbook/paper texture.
- Phong bì mở bằng animation; mỗi lần mở có thể nhận lời chúc ngẫu nhiên.
- Meme nội bộ “bãi dị dạng” và chữ ký “bồn lình”.
- Quiz meme/chuyện nội bộ có đáp án, chấm điểm và kết quả.
- Hoa, tim và confetti tương tác.
- Người xem tự chọn file nhạc từ thiết bị; **không dùng URL nhạc giả** và không tải nhạc lên GitHub.
- Trang cuối có lời nhắn chung.
- Nội dung đùa được giữ ở mức thân thiện; không khai thác chuyện tình cảm riêng tư.

## Chạy local

Mở `index.html` bằng trình duyệt là đủ. Nếu trình duyệt chặn một số hành vi file-local, có thể dùng server tĩnh đơn giản, ví dụ:

```bash
python -m http.server 8000
```

Sau đó mở `http://localhost:8000`.

## Đưa lên GitHub Pages

1. Tạo repository mới trên GitHub.
2. Upload `index.html`, `style.css`, `script.js`.
3. Vào **Settings → Pages**.
4. Chọn deploy từ branch chứa 3 file trên, thư mục `/root`.
5. Chờ GitHub Pages build xong rồi mở URL Pages được cung cấp.

## Chỉnh nội dung

- Lời chúc: mảng `wishes` trong `script.js`.
- Quiz: mảng `questions` trong `script.js`.
- Màu sắc/font/layout: `style.css`.
- Tên nhóm, lời nhắn cuối, meme: `index.html`.

## Nhạc

Website dùng `<input type="file" accept="audio/*">` và `URL.createObjectURL()` để phát file nhạc cục bộ. Vì vậy người xem phải tự chọn file trên thiết bị; repository không cần chứa nhạc có bản quyền.
