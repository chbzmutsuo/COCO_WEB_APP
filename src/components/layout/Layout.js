import React from 'react';

export default function Layout({ children }) {
  const headerFooterHeight = 32;
  return (
    <div className=''>
      <header className={`h-${headerFooterHeight} w-full text-center z-10 bg-green-700`}>
        <nav className='h-full'>Navigation</nav>
      </header>

      <main className={`min-h-screen h-full my-${headerFooterHeight}`}>{children}</main>

      <footer className={`h-${headerFooterHeight}  w-full text-center z-10 bg-green-700`}>Footer</footer>
    </div>
  );
}
