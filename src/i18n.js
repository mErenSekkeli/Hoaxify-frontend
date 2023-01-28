import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en:{
            translation:{
                'Sign Up' : 'Sign Up',
                'Password Mismatch' : 'Password Mismatch',
                'Name' : 'Name',
                'Surname' : 'Surname',
                'User Name' : 'User Name',
                'Password' : 'Password',
                'Password Again' : 'Password Again',
                'Redirecting' : 'Redirecting...',
                'Login' : 'Login',
                'Unauthorized': 'Username or password is incorrect'
            }
        },
        tr:{
            translation:{
                'Sign Up' : 'Kayıt Ol',
                'Password Mismatch' : 'Şifreler Eşleşmiyor',
                'Name' : 'İsim',
                'Surname' : 'Soyisim',
                'User Name' : 'Kullanıcı Adı',
                'Password' : 'Şifre',
                'Password Again' : 'Şifre Tekrar',
                'Redirecting' : 'Yönlendiriliyor...',
                'Login' : 'Giriş Yap',
                'Unauthorized': 'Kullanıcı adı veya şifre hatalı'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translation'],
    defaultNS: 'translation',
    keySeparator : false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});
export default i18n;