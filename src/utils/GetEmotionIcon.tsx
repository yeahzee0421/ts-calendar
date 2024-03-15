import s from '../components/EmotionList/EmotionList.module.css';

interface EmotionIconProps {
  type: number;
}

function GetEmotionIcon({ type }: EmotionIconProps): JSX.Element {
  const getEmotionIcon = (emotion: number): string => {
    switch (emotion) {
      case 1:
        return 'happy';
      case 2:
        return 'sad';
      case 3:
        return 'angry';
      case 4:
        return 'upset';
      case 5:
        return 'simsim';
      case 6:
        return 'tired';
      default:
        return '';
    }
  };
  return (
    <img
      src={`/src/assets/moodIcons/${getEmotionIcon(type)}.svg`}
      alt={`${getEmotionIcon(type)}`}
      className={s.button}
    />
  );
}
export default GetEmotionIcon;
