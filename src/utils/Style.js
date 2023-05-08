export class Style {
  constructor() {
    throw new Error('Static class cannot be instantiated.')
  }
  static primary = '#FAE44C'
  static onPrimary = '#000000'
  static dark = '#000000'
  static onDark = '#FFFFFF'
  static fontFamily = 'Arial, sans-serif'
  static fontSizes = {
    title: '32px',
    body: '22px',
    small: '16px',
  }
  static padding = {
    default: 8,
    small: 4,
  }

  static body() {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.title,
      backgroundColor: Style.primary,
      color: Style.onPrimary,
      align: 'center',
      padding: Style.textPadding,
      fixedWidth: 0,
    }
  }
}
