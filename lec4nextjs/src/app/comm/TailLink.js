import Link from "next/link";
export default function TailLink({href, title}) {
  return (
    <Link href={href} className="hover:bg-slate-700 text-slate-700 hover:text-slate-50 p-2 m-2 rounded-lg">{title}</Link>
  );
}
