import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

i18n.use(initReactI18next).init({
    resources: {
        en:{
            translation:{
                'Sign Up' : 'Sign Up',
                'Yes' : 'Yes',
                'No' : 'No',
                'Password Mismatch' : 'Password Mismatch',
                'Name' : 'Name',
                'Surname' : 'Surname',
                'User Name' : 'User Name',
                'Password' : 'Password',
                'Password Again' : 'Password Again',
                'Redirecting' : 'Redirecting...',
                'Login' : 'Login',
                'Unauthorized': 'Username or password is incorrect',
                'Logout' : 'Logout',
                'Profile' : 'My Profile',
                'Users' : 'Users',
                'Next' : 'Next',
                'Previous' : 'Previous',
                'Loading Failure': 'Loading Failure',
                'Error': 'Error',
                'User not found': 'User not found',
                'Edit': 'Edit',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'Access Forbidden': 'Access Forbidden',
                'Profile Image': 'Profile Image',
                'Invalid file type': 'Invalid file type\n (Allowed extensions: jpg, jpeg, png)',
                'Name and surname cannot be empty': 'Name and surname cannot be empty',
                'Send My Thoughts': 'Send My Thoughts',
                'Your Thoughts Are Sending': 'Your Thoughts Are Sending',
                'Your Thoughts Are Sent': 'Your Thoughts Are Sent',
                'There are no hoaxes': 'There are no hoaxes',
                'Load More': 'Load More',
                'Loading': 'Loading',
                'Something went wrong': 'Something went wrong',
                'Load New Hoaxes': 'Load New Hoaxes',
                'File is uploaded': 'File is uploaded',
                'File is deleted': 'File is deleted',
                'Delete Hoax': 'Delete Thoughts',
                'Are you sure to delete this hoax?': 'Are you sure to delete this hoax?',
                'Hoax Deleted': 'Thoughts Deleted',
                'Access Forbidden': 'Access Forbidden',
            }
        },
        tr:{
            translation:{
                'Sign Up' : 'Kayıt Ol',
                'Yes' : 'Evet',
                'No' : 'Hayır',
                'Password Mismatch' : 'Şifreler Eşleşmiyor',
                'Name' : 'İsim',
                'Surname' : 'Soyisim',
                'User Name' : 'Kullanıcı Adı',
                'Password' : 'Şifre',
                'Password Again' : 'Şifre Tekrar',
                'Redirecting' : 'Yönlendiriliyor...',
                'Login' : 'Giriş Yap',
                'Unauthorized': 'Kullanıcı adı veya şifre hatalı',
                'Logout' : 'Çıkış Yap',
                'Profile' : 'Profilim',
                'Users' : 'Kullanıcılar',
                'Next' : 'Sonraki',
                'Previous' : 'Önceki',
                'Loading Failure': 'Yüklenemedi',
                'Error': 'Hata',
                'User not found': 'Kullanıcı bulunamadı',
                'Edit': 'Düzenle',
                'Save': 'Kaydet',
                'Cancel': 'İptal',
                'Access Forbidden': 'Erişim Engellendi',
                'Profile Image': 'Profil Resmi',
                'Invalid file type': 'Geçersiz dosya türü\n (İzin verilen uzantılar: jpg, jpeg, png)',
                'Name and surname cannot be empty': 'İsim ve soyisim boş bırakılamaz',
                'Send My Thoughts': 'Düşüncemi Gönder',
                'Your Thoughts Are Sending': 'Düşünceleriniz Gönderiliyor',
                'Your Thoughts Are Sent': 'Düşünceleriniz Gönderildi',
                'There are no hoaxes': 'Henüz düşünce gönderilmedi',
                'Load More': 'Daha Fazla Yükle',
                'Loading': 'Yükleniyor',
                'Something went wrong': 'Bir şeyler ters gitti',
                'Load New Hoaxes': 'Yeni Düşünceleri Yükle',
                'File is uploaded': 'Dosya yüklendi',
                'File is deleted': 'Dosya silindi',
                'Delete Hoax': 'Düşünceyi Sil',
                'Are you sure to delete this hoax?': 'Bu düşünceyi silmek istediğinize emin misiniz?',
                'Hoax Deleted': 'Düşünce Silindi',
                'Access Forbidden': 'Erişim Engellendi',
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

const timeAgo = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }

register('tr', timeAgo);

export default i18n;