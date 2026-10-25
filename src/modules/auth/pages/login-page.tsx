import LoginForm from "@/modules/auth/components/login-form";

export default function LoginPage() {
  return (
    <main dir="rtl" className="min-h-screen p-8">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-2 text-2xl font-bold">تسجيل الدخول</h1>

        <p className="mb-6 text-sm text-muted-foreground">
          سجّل الدخول إلى بوابة إدارة BaytFolio.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
