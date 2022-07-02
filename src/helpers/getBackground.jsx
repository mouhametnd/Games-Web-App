import { noBackgroundSrc } from '../constants/no-backgroundSrc';

const getBackground = ({ imgSrc, videoSrc, videoProps = {} }) => {
  const isMobile = matchMedia('(max-width: 768px)').matches;
  const img = imgSrc || noBackgroundSrc;
  if (isMobile) return <img src={img} alt="background" />;

  const source = videoSrc || img;
  return source === videoSrc ? (
    <video {...videoProps}>
      <source src={source} type="video/mp4" />
    </video>
  ) : (
    <img src={source} alt="background" />
  );
};

export default getBackground;
