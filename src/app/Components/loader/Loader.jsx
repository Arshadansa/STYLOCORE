'use client'

import { ClipLoader } from "react-spinners";


export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClipLoader color="#ffffff" size={80} />
    </div>
  );
}
