![taytrongbantay banner](./images/ttbt_cover.jpg)

- [1. Giới thiệu dự án](#1-giới-thiệu-dự-án)
  - [1.1. <a name='Cngngh'></a>Công nghệ](#11-công-nghệ)
    - [1.1.1. <a name='Backend'></a>Backend](#111-backend)
    - [1.1.2. <a name='Frontend'></a>Frontend](#112-frontend)
- [2. Chức năng](#2-chức-năng)
  - [2.1. <a name='Chcnnghinc'></a>Chức năng hiện có](#21-chức-năng-hiện-có)
    - [2.1.1. <a name='ngnhp-ngk'></a>Đăng nhập - Đăng ký](#211-đăng-nhập---đăng-ký)
    - [2.1.2. <a name='ngbisabixabi'></a>Đăng bài, sửa bài, xóa bài](#212-đăng-bài-sửa-bài-xóa-bài)
    - [2.1.3. <a name='AdminPanel'></a>Admin Panel](#213-admin-panel)
  - [2.2. <a name='Chcnngcnhonthin'></a>Chức năng cần hoàn thiện](#22-chức-năng-cần-hoàn-thiện)
- [3. Hướng dẫn cài đặt](#3-hướng-dẫn-cài-đặt)

# 1. Giới thiệu dự án

Website live: https://taytrongbantay.vercel.app

## 1.1. <a name='Cngngh'></a>Công nghệ

Taytrongbantay sử dụng nextjs để có thể chạy frontend và backend trên cùng một máy, hỗ trợ trang tĩnh, server rendering cho các bài blog nhằm cải thiện SEO.

### 1.1.1. <a name='Backend'></a>Backend

- [x] Nextjs
- [x] Mongodb

### 1.1.2. <a name='Frontend'></a>Frontend

- [x] Nextjs

# 2. Chức năng

## 2.1. <a name='Chcnnghinc'></a>Chức năng hiện có

### 2.1.1. <a name='ngnhp-ngk'></a>Đăng nhập - Đăng ký

![taytrongbantay banner](./images/register.png)
![taytrongbantay banner](./images/login.png)

### 2.1.2. <a name='ngbisabixabi'></a>Đăng bài, sửa bài, xóa bài

![taytrongbantay banner](./images/card.png)
![taytrongbantay banner](./images/singlepost.png)
![taytrongbantay banner](./images/edit-post.png)
![taytrongbantay banner](./images/delete-post.png)

### 2.1.3. <a name='AdminPanel'></a>Admin Panel

![taytrongbantay banner](./images/admin-panel.png)
![taytrongbantay banner](./images/edit-cat.png)

## 2.2. <a name='Chcnngcnhonthin'></a>Chức năng cần hoàn thiện

- [x] Đăng nhập - Đăng ký
- [x] Đăng bài - Sửa bài - Xoá bài
- [ ] Admin Panel
- [ ] Bình luận
- [ ] React
- [ ] Xếp hạng thành viên

# 3. Hướng dẫn cài đặt

Chạy một trong hai lệnh bên dưới:

```bash
npm install
# or
yarn install
```

Tạo file `.env.local` với nội dung:

```
mongodburl=<url database mongodb>
JWT_SECRET=<JWT Secret>
baseUrl=<ex: https://taytrongbantay.vercel.app>
```

Chởi chạy server:

```
npm run dev
#or
yarn dev
```
