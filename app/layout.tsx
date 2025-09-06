import './globals.css';
import React from 'react';

export const metadata = {
  title: 'MGI × DeepSeek — SaaS',
  description: 'Elegant multi-tenant AI chatbot SaaS by Miami Global Investments Group'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="container">
          <div className="nav">
            <div className="logo">MGI <span style={{opacity:.8}}>×</span> DeepSeek</div>
            <div style={{display:'flex',gap:12}}>
              <a href="/dashboard" className="btn" style={{padding:'8px 14px'}}>Dashboard</a>
              <a href="/admin" className="btn" style={{padding:'8px 14px'}}>Admin</a>
            </div>
          </div>
          {children}
          <footer>© {new Date().getFullYear()} MGI — DeepSeek-only. No OpenAI.</footer>
        </div>
      </body>
    </html>
  );
}
