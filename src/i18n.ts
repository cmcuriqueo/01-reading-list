interface Messages {
  [key: string]: { [key: string]: string };
}

interface I18n {
  locale: string;
  messages: Messages;
  t(key: string): string;
}

const i18n: I18n = {
  locale: 'es',
  messages: {
    es: {
      title: 'Mi biblioteca',
    },
  },
  t(key: string): string {
    if (typeof key === 'string' && key in this.messages[this.locale]) {
      return this.messages[this.locale][key];
    } else {
      return '';
    }
  }
};

export default i18n;