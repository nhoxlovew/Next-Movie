"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface GenrePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function GenrePagination({ currentPage, totalPages, onPageChange }: GenrePaginationProps) {
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex items-center gap-2 p-2 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/50 text-white transition-all duration-300 hover:bg-green-500/80 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:hover:bg-slate-700/50 hover:cursor-pointer hover:text-black"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Trang trước</span>
        </button>
        
        <div className="px-6 py-2">
          <span className="text-gray-300 text-sm">
            Trang <span className="font-bold text-white">{currentPage}</span> / 
            <span className="text-green-300">{totalPages}</span>
          </span>
        </div>
        
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/50 text-white transition-all duration-300 hover:bg-green-500/80 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:hover:bg-slate-700/50 hover:cursor-pointer hover:text-black"
        >
          <span className="hidden sm:inline">Trang sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
