import bannerVideo from '../../../assets/videos/banner.mp4'

const Banner = () => {
  return (
    <>
      <video autoPlay loop muted className='object-cover h-[500px]'>
        <source src={bannerVideo} type='video/mp4' />
      </video>
    </>
  )
}

export default Banner
