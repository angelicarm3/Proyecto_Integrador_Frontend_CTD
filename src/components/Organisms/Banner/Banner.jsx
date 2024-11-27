import bannerVideo from '../../../assets/videos/banner2.mp4'
import './banner.css'

const Banner = () => {
  return (
    <video autoPlay loop muted className='video-container'>
      <source src={bannerVideo} type='video/mp4' />
    </video>
  )
}

export default Banner
