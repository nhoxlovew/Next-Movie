import { Facebook, Youtube, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg"><Image src="/logo/logo.png" alt="Logo" width={40} height={40} /></span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">KAT-VVK</h3>
                <p className="text-gray-400 text-sm">Phim hay cả rổ</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Nền tảng xem phim trực tuyến miễn phí hàng đầu Việt Nam. Cung cấp hàng nghìn bộ phim chất lượng cao với
              phụ đề Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/hooangenh/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/_.haeng._/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Danh Mục</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Phim Lẻ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Phim Bộ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Anime
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Phim Chiếu Rạp
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Báo Lỗi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Điều Khoản
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Chính Sách
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 BLACKKAT. Tất cả quyền được bảo lưu.
            <span className="text-green-400 ml-2 ">Xem phim miễn phí chất lượng cao</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
