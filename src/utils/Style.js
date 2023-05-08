export class Style {
  constructor() {
    throw new Error('Static class cannot be instantiated.')
  }
  static primary = '#FAE44C'
  static onPrimary = '#000000'
  static dark = '#000000'
  static onDark = '#FFFFFF'
  static light = '#FFFFFF'
  static fontFamily = 'Arial, sans-serif'
  static fontSizes = {
    title: '32px',
    body: '24px',
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
    }
  }

  static title(hasBackground = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.title,
      backgroundColor: hasBackground ? Style.primary : null,
      color: hasBackground ? Style.onPrimary : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.default : 0,
    }
  }

  static subtitle(hasBackground = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      backgroundColor: hasBackground ? Style.primary : null,
      color: hasBackground ? Style.onPrimary : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.default : 0,
    }
  }

  static instruction(hasBackground = true) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.small,
      backgroundColor: hasBackground ? Style.dark : null,
      color: hasBackground ? Style.onDark : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.small : 0,
    }
  }

  static highscoreItem(selected = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      backgroundColor: selected ? Style.dark : null,
      color: selected ? Style.onDark : Style.light,
      align: 'center',
      padding: Style.padding.small,
    }
  }
}
