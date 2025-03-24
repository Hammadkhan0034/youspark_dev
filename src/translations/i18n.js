import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      discover: "Discover",
      sparkZone: "SparkZone",
      notifications: "Notifications",
      messages: "Messages",
      profile: "Profile",
      settings: "Settings",
      language: "Language",
      virtualCard: "Virtual Card",
      
      // Home Page
      whatsHappening: "What's happening?",
      post: "Post",
      menu: "Menu",
      trending: "Trending",
      tweets: "tweets",
      
      // Actions
      like: "Like",
      retweet: "Retweet",
      comment: "Comment",
      share: "Share"
    }
  },
  zh: {
    translation: {
      // Chinese translations
      home: "主页",
      discover: "发现",
      sparkZone: "火花区",
      notifications: "通知",
      messages: "消息",
      profile: "个人资料",
      settings: "设置",
      language: "语言",
      virtualCard: "虚拟卡",
      whatsHappening: "有什么新鲜事？",
      post: "发布",
      menu: "菜单",
      trending: "热门",
      tweets: "推文",
      like: "喜欢",
      retweet: "转发",
      comment: "评论",
      share: "分享"
    }
  },
  ko: {
    translation: {
      // Korean translations
      home: "홈",
      discover: "발견",
      sparkZone: "스파크존",
      notifications: "알림",
      messages: "메시지",
      profile: "프로필",
      settings: "설정",
      language: "언어",
      virtualCard: "가상 카드",
      whatsHappening: "무슨 일이 일어나고 있나요?",
      post: "게시",
      menu: "메뉴",
      trending: "트렌드",
      tweets: "트윗",
      like: "좋아요",
      retweet: "리트윗",
      comment: "댓글",
      share: "공유"
    }
  },
  es: {
    translation: {
      home: "Inicio",
      discover: "Descubrir",
      sparkZone: "Zona Spark",
      notifications: "Notificaciones",
      messages: "Mensajes",
      profile: "Perfil",
      settings: "Ajustes",
      language: "Idioma",
      virtualCard: "Tarjeta Virtual",
      whatsHappening: "¿Qué está pasando?",
      post: "Publicar",
      menu: "Menú",
      trending: "Tendencias",
      tweets: "tweets",
      like: "Me gusta",
      retweet: "Retweetear",
      comment: "Comentar",
      share: "Compartir"
    }
  },
  de: {
    translation: {
      // German translations
      home: "Startseite",
      discover: "Entdecken",
      sparkZone: "Spark-Zone",
      notifications: "Benachrichtigungen",
      messages: "Nachrichten",
      profile: "Profil",
      settings: "Einstellungen",
      language: "Sprache",
      virtualCard: "Virtuelle Karte",
      whatsHappening: "Was gibt's Neues?",
      post: "Posten",
      menu: "Menü",
      trending: "Trends",
      tweets: "Tweets",
      like: "Gefällt mir",
      retweet: "Retweeten",
      comment: "Kommentieren",
      share: "Teilen"
    }
  },
  th: {
    translation: {
      // Thai translations
      home: "หน้า",
      discover: "ค้นพบ",
      sparkZone: "โซนสปาร์ค",
      notifications: "การแจ้ง",
      messages: "ข้อความ",
      profile: "โปรไฟล์",
      settings: "ตั้งค่า",
      language: "ภาษา",
      virtualCard: "การ์ด อล",
      whatsHappening: "อะไรกำลังเกิดขึ้น?",
      post: "โพสต์",
      menu: "เมนู",
      trending: "น่าสนใจ",
      tweets: "ทีต",
      like: "ใจ",
      retweet: "แชร์",
      comment: "แสดงความเห็น",
      share: "แบ่งปัน"
    }
  },
  ja: {
    translation: {
      // Japanese translations
      home: "ホーム",
      discover: "発見",
      sparkZone: "スパーカーゾーン",
      notifications: "通知",
      messages: "メッセージ",
      profile: "プロフィール",
      settings: "設定",
      language: "言語",
      virtualCard: "バーチャルカード",
      whatsHappening: "何が起こっているの？",
      post: "投稿",
      menu: "メニュー",
      trending: "トレンド",
      tweets: "ツイート",
      like: "いいね！",
      retweet: "リツイート",
      comment: "コメント",
      share: "シェア"
    }
  },
  fr: {
    translation: {
      // French translations
      home: "Accueil",
      discover: "Découvrir",
      sparkZone: "Zone Spark",
      notifications: "Notifications",
      messages: "Messages",
      profile: "Profil",
      settings: "Paramètres",
      language: "Langue",
      virtualCard: "Carte Virtuelle",
      whatsHappening: "Quoi de neuf ?",
      post: "Publier",
      menu: "Menu",
      trending: "Tendances",
      tweets: "tweets",
      like: "J'aime",
      retweet: "Retweeter",
      comment: "Commenter",
      share: "Partager"
    }
  },
  pt: {
    translation: {
      // Portuguese translations
      home: "Início",
      discover: "Descobrir",
      sparkZone: "Zona Spark",
      notifications: "Notificações",
      messages: "Mensagens",
      profile: "Perfil",
      settings: "Configurações",
      language: "Idioma",
      virtualCard: "Cartão Virtual",
      whatsHappening: "O que está acontecendo?",
      post: "Postar",
      menu: "Menu",
      trending: "Tendências",
      tweets: "tweets",
      like: "Curtir",
      retweet: "Retweetar",
      comment: "Comentar",
      share: "Compartilhar"
    }
  },
  hi: {
    translation: {
      // Hindi translations
      home: "होम",
      discover: "खोजें",
      sparkZone: "स्पार्क जोन",
      notifications: "सूचनाएँ",
      messages: "संदेश",
      profile: "प्रोफाइल",
      settings: "सेटिंग्स",
      language: "भाषा",
      virtualCard: "वायर्चुअल कार्ड",
      whatsHappening: "क्या हो रहा है?",
      post: "पोस्ट",
      menu: "मेनू",
      trending: "ट्रेंडिंग",
      tweets: "ट्वीट",
      like: "लाइक",
      retweet: "रिट्वीट",
      comment: "कमेंट",
      share: "शेयर"
    }
  }
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
