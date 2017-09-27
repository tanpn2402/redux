# Redux - React

## Clone project
### `git clone <git-path>`

## Install Packages
### `npm install`

## Run
### `npm start`

## Cách quản lý source version bằng git
**1. Tạo branch 
Khi clone project từ git về, các bạn nên tạo branch của mình trên máy của mình bằng 
### `git branch <tên-branch>`
Sau đó bạn chuyển qua branch vừa tạo để làm việc
### `git checkout <tên-branch>`
**2. Commit
Khi code xong, bạn thêm các file đã thêm/sửa vào danh mục các file cần commit
### `git add <file-path>`
Hoặc thêm tất cả
### `git add .`
Sau đó commit
### `git commit -m"<chú thích>"`
Ở đây các bạn chỉ commit code trên local thôi, trên server vẫn chưa ảnh hưởng gì cả, tiếp theo bạn push lên git bằng:
### `git push origin <tên-branch>`
OK, vậy là xong.
**3. Update
Để update source mới nhất từ branch master:
### `git pull origin master`

Mục đích của việc làm như vậy để tránh xung đột, đồng thời giúp cho người trưởng nhóm dễ dàng quản lý hơn, trưởng nhóm sẽ sử dụng branch master để merge code từ các branch của các bạn, khi merge xong thì trưởng nhóm sẽ push code lên lại branch master.
Branch master là branch sản phẩm của chúng ta.

## Happy coding