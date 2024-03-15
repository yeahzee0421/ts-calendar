const getThemeColor = (emotionType: number): string => {
  switch (emotionType) {
    case 1:
      return 'themeHappy';
    case 2:
      return 'themeSad';
    case 3:
      return 'themeAngry';
    case 4:
      return 'themeUpset';
    case 5:
      return 'themeSimsim';
    case 6:
      return 'themeTired';
    default:
      return 'themeHappy';
  }
};

export default getThemeColor;
