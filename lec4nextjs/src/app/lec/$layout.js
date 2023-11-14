import Link from "next/link";

export default function LectLayout({ children }) {
  return (
    <main className="container">
      <div className="flex justify-between items-center p-10 h-12 bg-slate-950 text-white">
        <div>리액트 수업자료</div>
        <nav>
          <ul className="flex items-center justify-between">
          <li className="w-20"><Link href="/lec/clock">Clock</Link></li>
            <li className="w-20"><Link href="/lec/lotto">Lotto</Link></li>
            <li className="w-20"><Link href="/lec">home</Link></li>
          </ul>
        </nav>
      </div>
      {children}
    </main>
  );
}
