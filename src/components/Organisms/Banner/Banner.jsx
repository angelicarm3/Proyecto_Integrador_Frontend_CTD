import './banner.css'
import bannerVideo from '../../../assets/videos/banner.mp4'

const Banner = () => {
  return (
    <video autoPlay loop muted className='video-container mt-[68px]'>
      <source src={bannerVideo} type='video/mp4' />
    </video>
  )
}

export default Banner
