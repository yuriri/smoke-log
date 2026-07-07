import { login } from "@/app/login/actions"

// ログインページ
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;
  return (
    <div className="grid place-items-center w-full pt-10">
      {error && <p>{error}</p>}
      <form action={login} className="flex flex-col justify-center items-center gap-4 w-[90%] max-w-[450px]">
        <input className="bg-white rounded-md px-2 py-1 w-full" name="email" type="email" placeholder="mail address" required autoComplete="email" />
        <input className="bg-white rounded-md px-2 py-1 w-full" name="password" type="password" placeholder="password" required />
        <button className="text-white hover:cursor-pointer hover:underline" type="submit">Log In</button>
      </form>
    </div>
  )
}