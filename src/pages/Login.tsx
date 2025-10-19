import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          providers={[]} // You can add 'google', 'github', etc. here if you configure them in Supabase
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(222.2 47.4% 11.2%)', // Primary color
                  brandAccent: 'hsl(217.2 91.2% 59.8%)', // Accent color
                },
              },
            },
          }}
          theme="light" // Or "dark" if you prefer
          redirectTo={window.location.origin} // Redirect to the current origin after login
        />
      </div>
    </div>
  );
}

export default Login;