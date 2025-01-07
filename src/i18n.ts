// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          settings: "Settings",
          language: "Language",
          english: "English",
          portuguese: "Portuguese",
          notifications: "Notifications",
          general_notifications: "General notifications",
          email_notifications: "Email notifications",
          theme: "Theme",
          light_theme: "Light theme",
          dark_theme: "Dark theme",
          rate: "Rate",
          rate_settings: "Rate settings",
          save_settings: "Save settings",
        },
      },
      pt: {
        translation: {
          settings: "Configurações",
          language: "Idioma",
          english: "Inglês",
          portuguese: "Português",
          notifications: "Notificações",
          general_notifications: "Notificações gerais",
          email_notifications: "Notificações por e-mail",
          theme: "Tema",
          light_theme: "Tema claro",
          dark_theme: "Tema escuro",
          rate: "Avaliar",
          rate_settings: "Avaliar configurações",
          save_settings: "Salvar configurações",
        },
      },
    },
    lng: 'pt', // idioma padrão
    fallbackLng: 'en', // idioma de fallback
    interpolation: {
      escapeValue: false, // React já faz o escaping
    },
  });

export default i18n;
