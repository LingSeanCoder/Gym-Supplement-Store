# Demo Script — Gym & Supplement Store Management System

**Course:** MSIS207.R11.CTTT — Group 28  
**Presenter roles:**  
- **Sang** — Thao tác và thuyết trình phần **Gym** (Auth, Check-in, Membership, Admin dashboard).  
- **Quân** — Thao tác và thuyết trình phần **Store** (Sản phẩm, Giỏ hàng, Thanh toán COD).  

**Mục đích:** Thuyết trình trực tiếp luồng sử dụng chính của hệ thống trước hội đồng giảng viên.

---

## 0. Chuẩn bị trước giờ G (Checklist)

Hoàn tất các bước sau ít nhất 30 phút trước giờ demo để tránh lỗi kỹ thuật:

- [ ] **Đánh thức Render:** Truy cập Backend URL (Render) vài lần cho đến khi `/health` trả HTTP 200. Render free tier có thể "ngủ" sau một thời gian không hoạt động.
- [ ] **Kiểm tra Supabase:** Đảm bảo project Supabase **không bị pause**, DATABASE_URL hợp lệ và `DATABASE_SSL=true`.
- [ ] **Kiểm tra CORS:** `CORS_ORIGIN` trên Render phải khớp chính xác với Frontend URL (Vercel).
- [ ] **Mở sẵn các tab trình duyệt:**
  1. Trang chủ / Landing page (khách).
  2. Trang bảng giá (Pricing).
  3. Đăng nhập Admin (`/admin/login`).
  4. Admin Dashboard (`/admin/dashboard`).
  5. Quản lý gói tập (`/admin/plans`).
  6. Danh sách hội viên (`/admin/members`).
  7. Đăng nhập Staff (`/login` → chọn role staff hoặc trang staff).
  8. Màn hình Check-in (`/staff/check-in`).
  9. Màn hình Gia hạn (`/staff/renew`).
  10. Cổng hội viên (`/member`).
  11. Cửa hàng (`/store`) và chi tiết sản phẩm.
  12. Giỏ hàng (`/cart`).
- [ ] **Mở sẵn Postman:** Import collection `docs/postman/gym-supplement-store.postman_collection.json`, thiết lập biến `baseUrl = <Backend URL>`.
- [ ] **Sẵn sàng tài khoản demo:**

| Role | Email | Mật khẩu | Dùng cho |
| --- | --- | --- | --- |
| Admin | `admin@gym.local` | `Admin@123456` | Bước 2 |
| Staff | `staff@gym.local` | `Staff@123456` | Bước 3 |
| Member | `member@gym.local` | `Member@123456` | Bước 4 |

- [ ] **Sao chép script:** In hoặc mở `docs/demo-script.md` trên máy để đọc từng bước.
- [ ] **Backup:** Chụp ảnh màn hình màn hình chính để dự phòng nếu mạng/lỗi deploy.

---

## 1. Kịch bản chi tiết theo Role

### Bước 1: Guest (Khách) — Sang thao tác

| Thứ tự | Hành động | Kết quả mong đợi |
| --- | --- | --- |
| 1.1 | Mở Landing page (`/`). | Trang chủ hiển thị banner, giới thiệu phòng gym, nút "Bắt đầu". |
| 1.2 | Nhấn vào bảng giá gói tập (`/pricing`). | Hiển thị 4 gói tập: 1 tháng, 3 tháng, 6 tháng, 1 năm với giá VND. |
| 1.3 | Cuộn qua phần Store. | Hiển thị danh sách sản phẩm thực phẩm bổ sung mẫu (Whey, Creatine, Pre-workout, Phụ kiện tập gym). |

**Lời thuyết trình gợi ý:**  
"Đây là giao diện công khai. Khách không cần đăng nhập cũng có thể xem gói tập và duyệt cửa hàng. Khi khách muốn tập gym hoặc mua hàng, hệ thống sẽ yêu cầu đăng nhập."

---

### Bước 2: Admin — Sang thao tác

| Thứ tự | Hành động | Kết quả mong đợi |
| --- | --- | --- |
| 2.1 | Đăng nhập Admin: `admin@gym.local` / `Admin@123456`. | Đăng nhập thành công, nhận JWT, điều hướng đến Admin Dashboard. |
| 2.2 | Vào Admin Dashboard (`/admin/dashboard`). | Xem biểu đồ/statistik: doanh thu hôm nay/tháng, số hội viên active, gói sắp hết hạn, sản phẩm tồn kho thấp. |
| 2.3 | Vào Quản lý gói tập (`/admin/plans`). | Hiển thị bảng 4 gói tập hiện có. |
| 2.4 | Nhấn "Thêm gói mới". Nhập: Tên = "Demo 2 Tháng", Thời hạn = 60 ngày, Giá = 500000, Trạng thái = Active. | Hệ thống tạo gói mới, bảng được cập nhật, toast thông báo "Thành công!". |
| 2.5 | (Tùy chọn) Chỉnh sửa hoặc ẩn gói vừa tạo để minh chứng tính quản lý. | Gói được cập nhật/ẩn ngay lập tức. |

**Lời thuyết trình gợi ý:**  
"Quyền Admin có quyền truy cập toàn bộ chức năng quản trị: dashboard thống kê, quản lý gói tập, quản lý hội viên. Tất cả thao tác ghi được bảo vệ bởi JWT và kiểm tra role ở phía backend."

---

### Bước 3: Staff — Sang thao tác

| Thứ tự | Hành động | Kết quả mong đợi |
| --- | --- | --- |
| 3.1 | Đăng xuất Admin, đăng nhập Staff: `staff@gym.local` / `Staff@123456`. | Đăng nhập thành công, role `staff`. |
| 3.2 | Vào màn hình Check-in (`/staff/check-in`). | Hiển thị form nhập User ID và danh sách check-in hôm nay. |
| 3.3 | Nhập User ID của hội viên có gói **Active** (ví dụ `member@gym.local`). | Hệ thống kiểm tra gói Active, hiển thị ô User ID màu **Xanh**, ghi nhận check-in thành công. |
| 3.4 | Nhập User ID của hội viên có gói **Expired** (ví dụ `david.pham@gmail.com`). | Hệ thống từ chối check-in, hiển thị ô màu **Đỏ**, thông báo gói đã hết hạn. |
| 3.5 | Vào màn hình Gia hạn (`/staff/renew`). | Form chọn hội viên, chọn gói tập, nhập ngày bắt đầu. |
| 3.6 | Gia hạn gói cho một hội viên hết hạn. | Hệ thống tạo bản ghi membership mới, toast "Thành công!", hội viên giờ có gói Active. |

**Lời thuyết trình gợi ý:**  
"Staff phụ trách tiếp đón tại quầy gym. Khi thành viên về tập, Staff quét/nhập mã hội viên. Hệ thống tự kiểm tra gói tập còn hiệu lực không: Active thì xanh cho check-in, Expired thì đỏ và khuyến khích gia hạn. Màn hình Gia hạn cho phép Staff verläng gói cho hội viên ngay tại quầy."

---

### Bước 4: Member — Sang thao tác

| Thứ tự | Hành động | Kết quả mong đợi |
| --- | --- | --- |
| 4.1 | Đăng xuất Staff, đăng nhập Member: `member@gym.local` / `Member@123456`. | Đăng nhập thành công, điều hướng đến Cổng hội viên (`/member`). |
| 4.2 | Vào trang Cổng hội viên (`/member/dashboard`). | Xem thông tin cá nhân, gói tập hiện tại (tên gói, ngày bắt đầu, ngày hết hạn, trạng thái). |
| 4.3 | Xem Lịch sử check-in. | Bảng hiển thị thời gian các lần check-in trước đó của chính thành viên đó. |
| 4.4 | (Tùy chọn) Vào cửa hàng và xem sản phẩm. | Member có thể duyệt sản phẩm, nhưng thanh toán yêu cầu đăng nhập (đã đăng nhập). |

**Lời thuyết trình gợi ý:**  
"Mỗi hội viên chỉ thấy dữ liệu của chính mình. Backend lấy `user_id` từ JWT, không tin cậy tham số từ client, do đó một hội viên không thể xem hồ sơ hay lịch sử check-in của người khác (chống IDOR)."

---

### Bước 5: Phần Store (Dành cho Quân)

> Quân sẽ demo luồng thêm vào giỏ hàng và thanh toán COD tại đây. Chi tiết script sẽ được bổ sung trước giờ demo.

| Thứ tự | Hành động (dự kiến) | Kết quả mong đợi |
| --- | --- | --- |
| 5.1 | Truy cập cửa hàng (`/store`). | Xem danh sách sản phẩm, lọc theo danh mục, tìm kiếm. |
| 5.2 | Xem chi tiết sản phẩm. | Hiển thị mô tả, giá, biến thể, nút "Thêm vào giỏ". |
| 5.3 | Thêm sản phẩm vào giỏ hàng. | Toast thông báo, số lượng trong giỏ tăng. |
| 5.4 | Vào giỏ hàng (`/cart`). | Xem danh sách sản phẩm đã chọn, tổng tiền. |
| 5.5 | Thanh toán COD (Thanh toán khi nhận hàng). | Tạo đơn hàng, trừ kho, giỏ hàng được xóa, hiển thị xác nhận đơn hàng. |

---

## 2. Câu hỏi phản biện dự kiến (Q&A)

Dưới đây là 5 câu hỏi giảng viên có thể hỏi và gợi ý câu trả lời:

### Câu 1: "Tại sao nhóm dùng SQL thuần (pg / node-postgres) thay vì ORM như Prisma hoặc TypeORM?"

**Gợi ý trả lời:**  
- Dự án yêu cầu kiểm soát rõ ràng từng truy vấn, giúp học sinh hiểu sâu về SQL parameterized và phòng chống SQL injection.  
- SQL thuần nhẹ hơn, không phụ thuộc phiên bản ORM, dễ tối ưu hóa truy vấn phức tạp (JOIN, aggregation cho dashboard).  
- Với quy mô gym + cửa hàng vừa và nhỏ, ORM không mang lại lợi ích lớn về tốc độ phát triển mà lại làm dày thêm tầng trừu tượng.

### Câu 2: "Làm sao hệ thống chặn Member truy cập vào trang Admin?"

**Gợi ý trả lời:**  
- Backend sử dụng **JWT** chứa `user_id` và `role`. Middleware `authenticate` xác thực token, middleware `authorize('admin')` chỉ cho phép role `admin`.  
- Frontend cũng dùng `ProtectedRoute` để che các route admin, nhưng **bảo vệ thực sự ở backend**: API `/api/admin/*` và `/api/plans` (POST/PUT/DELETE) đều kiểm tra role trước khi thực thi.  
- Nếu Member cố gắng gọi API admin, backend trả `403 Forbidden`.

### Câu 3: "Xử lý transaction khi thanh toán COD thế nào?"

**Gợi ý trả lời:**  
- Luồng checkout COD được gói trong **database transaction**: tạo đơn hàng → trừ số lượng tồn kho của variant → tạo bản ghi thanh toán trạng thái pending → xóa giỏ hàng.  
- Nếu bất kỳ bước nào thất bại (ví dụ sản phẩm hết kho giữa chừng), toàn bộ transaction được rollback, đơn hàng không được tạo và giỏ hàng vẫn giữ nguyên.  
- Hội viên đủ điều kiện nhận giảm 10% được tính trước khi lưu đơn.

### Câu 4: "Hệ thống chống brute-force đăng nhập như thế nào?"

**Gợi ý tính bảo mật:**  
- Sử dụng **express-rate-limit** trên `POST /api/auth/login`: tối đa **5 lần thử trong 15 phút** trên mỗi IP.  
- Vượt giới hạn nhận HTTP `429 Too Many Requests` với JSON contract đồng nhất, kèm header `RateLimit-*` (draft-8).  
- Kết hợp Helmet cho các header bảo mật (CSP, X-Content-Type-Options, v.v.).

### Câu 5: "Nếu một thành viên cố gắng sửa `user_id` trong URL hay query parameters để xem dữ liệu người khác, hệ thống xử lý ra sao?"

**Gợi ý trả lời:**  
- Các endpoint `/api/me/*` (profile, memberships, check-ins) chỉ lấy `user_id` từ **JWT qua `req.user.user_id`**, không đọc `req.query` hay `req.params`.  
- Repository `meRepository` luôn thêm điều kiện `WHERE user_id = $1` (hoặc `WHERE id = $1` cho bảng users PK), giá trị $1 chỉ đến từ token.  
- Do đó, thao tác đổi `user_id` trên client không ảnh hưởng đến dữ liệu được trả về (chống IDOR).

---

## 3. Lưu ý khi demo

- Nếu Render "đang khởi động lại" (cold start), bước đầu có thể chậm 10–20 giây — hãy đợi và giải thích với hội đồng.
- Không ghi mật khẩu thật vào slide hay chat nhóm; chỉ dùng tài khoản demo đã có trong seed.
- Nếu API trả lỗi, kiểm tra trước Console trình duyệt và tab Network (xem status 400/401/403/500).
- Nếu màn hình trắng trên frontend, kiểm tra `VITE_API_URL` đã trỏ đúng Backend URL trên Vercel chưa.

---

## 4. Tóm tắt luồng demo (tham khảo时间)

| Phần | Người trình diễn | Thời gian dự kiến |
| --- | --- | --- |
| Khởi động & kiểm tra hệ thống | Sang + Quân | 3 phút |
| Bước 1: Guest xem trang chủ & bảng giá | Sang | 2 phút |
| Bước 2: Admin dashboard + quản lý gói tập | Sang | 4 phút |
| Bước 3: Staff check-in & gia hạn | Sang | 4 phút |
| Bước 4: Member cổng hội viên | Sang | 3 phút |
| Bước 5: Store thêm giỏ & thanh toán COD | Quân | 4 phút |
| Câu hỏi & phản biện | Sang + Quân | 5 phút |
| **Tổng cộng** | | **25 phút** |
