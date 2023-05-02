import React from 'react'

function Header() {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* <a> might be unnecessary */}
        <a href="" class="flex items-center">
            <img src="" class="h-8 mr-3" alt="Phrazel Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PHRAZEL GFont placeholder</span>
        </a>
        
      </div>
    </nav>
  )
}

export default Header