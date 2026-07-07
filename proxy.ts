import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server'

// セッション確認 → 未ログインは /login へリダイレクト
// リクエストが完了する前にプロキシを作成し、サーバー上でコードを実行
export const proxy = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )
  // セッション確認（getSession()は非推奨、getUser()を使う）
  const { data: { user } } = await supabase.auth.getUser();

  // 未ログインかつ /login 以外へのアクセス → リダイレクト
  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
};

export const config = { matcher: ['/((?!login|_next/static|favicon.ico).*)'] }