const Footer = () => {
  return (
    <div className="bg-red-100 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="text-center md:text-left">
            {" "}
            {/* Căn giữa trên mobile và căn trái trên màn hình lớn */}
            <h2 className="text-lg font-semibold mb-4">Chăm Sóc Khách Hàng</h2>
            <ul className="text-gray-800">
              <li>Trung Tâm Trợ Giúp</li>
              <li>Hướng Dẫn Mua Hàng</li>
              <li>Hướng Dẫn Bán Hàng</li>
              <li>Thanh Toán</li>
              <li>Vận Chuyển</li>
              <li>Chăm Sóc Khách Hàng</li>
              <li>Chính Sách Bảo Hành</li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            {" "}
            {/* Căn giữa trên mobile và căn trái trên màn hình lớn */}
            <h2 className="text-lg font-semibold mb-4">VỀ FOOD PTIT</h2>
            <ul className="text-gray-800">
              <li>Giới Thiệu</li>
              <li>Tuyển Dụng</li>
              <li>Điều Khoản</li>
              <li>Chính Sách Bảo Mật</li>
              <li>Chính Hãng</li>
              <li>Kênh Người Bán</li>
              <li>Liên Hệ Với Truyền Thông</li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            {" "}
            {/* Căn giữa */}
            <div className="flex justify-center items-center mt-4 md:col-span-2">
              <p className="text-gray-800 mr-4">THEO DÕI CHÚNG TÔI TRÊN</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                alt="Facebook"
                className="w-8 h-8 mr-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                alt="Instagram"
                className="w-8 h-8 mr-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </div>
            <div className="flex justify-center items-center mt-4 md:col-span-2">
              <div>
                <p className="text-gray-800 mr-4">Liên hệ: (012) 345-6789</p>
                <p className="text-gray-800 mr-2"></p>
                <p className="text-gray-800 mr-4">Email: abc@gmail.com</p>
                <p className="text-gray-800"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
