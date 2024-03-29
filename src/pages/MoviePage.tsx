import axios from "axios"
import { useEffect, useState } from "react"
import {CaretLeft, CaretRight, Star, TrendDown, TrendUp, UsersThree, VideoCamera} from 'phosphor-react'
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Carousel } from "@mantine/carousel"

interface GenreTypes{
    id: number,
    name: string
}

interface MoviesDataType {
    number_of_seasons: number,
    first_air_date: string,
    tagline: string,
    backdrop_path: string,
    budget: number,
    genres: Array<GenreTypes>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    title: string,
    vote_average: number,
    vote_count: number,
    name: string
  }

interface CastTypes{
    name: string
}

interface CrewTypes{
    name: string
}

  const imageURL = "https://image.tmdb.org/t/p/w500/"

const MoviePage = () => {
  const [data, setData] = useState<MoviesDataType>({
    number_of_seasons: 0,
    first_air_date: '',
    tagline: '', 
    backdrop_path:'', 
    budget: 0,
    genres: [{id:0 ,name: ''}], 
    id: 77, 
    original_language: '', 
    original_title: '', 
    overview: '', 
    popularity: 0, 
    poster_path: '', 
    release_date: '',
    revenue: 0,
    runtime: 0,
    title: '',
    vote_average: 0,
    vote_count: 0,
    name: ''
}) 


const [hover, setHover] = useState(false)
const [recomendedMovies, setRecomendedMovies] = useState(Array<MoviesDataType>)
const [cast, setCast] = useState<CastTypes[]>([{name: ''}, {name: ''}, {name: ''}])
const [crew, setCrew] = useState<CrewTypes[]>([{name:''}])
const params = useParams()

  useEffect(()=> {
    window.scrollTo(0, 0)
  }, [data.title])

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/${params.description}/${params.id}?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US`)
    .then(response => {
        setData(response.data)
    })
  }, [params.id])

 

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/recommendations?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1`)
    .then((response) => {
        setRecomendedMovies(response.data.results)
    })
  }, [data])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1`)
    .then((response) => {
        setCast(response.data.cast)
        setCrew(response.data.crew)
    })
  }, [data])


  return (

    <div
    className="flex flex-col items-center gap-14 xl:gap-28 mt-10 h-auto w-full text-white">
        <motion.div 
            className="flex text-center justify-center min-h-full w-full"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7}}
        >
            {data.title && (
                <h1 className="font-extrabold text-3xl md:text-4xl xl:text-6xl">{data.title}</h1>
            )}
            {data.name && (
                <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl">{data.name}</h1>
            )}
        </motion.div>
        <div className="flex flex-col gap-5  md:flex-row items-center md:items-start justify-between w-full md:w-5/6 lg:w-4/5 xl:w-2/3 h-96 md:h-80 lg:h-96">
            <div className="h-full w-72 mb-10 text-center flex flex-col gap-5">
                <motion.img 
                    src= {imageURL + data.poster_path} 
                    alt="" 
                    className="h-full md:h-5/6 lg:h-[333px] xl:h-full w-full"
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.7}}
                />
                <motion.div 
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="flex gap-5 items-center justify-around box-border"
                >
                    {data.genres.map((genre, i)=> i < 3 && (
                        <p key={genre.id} className="text-center px-2">{genre.name}</p>
                    ))}
                </motion.div>
            </div>
            <div className="h-full w-auto text-center flex-col gap-5 hidden md:flex">
                <motion.img 
                    src= {imageURL + data.backdrop_path} 
                    alt="" 
                    className="h-full w-full"
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.7}}
                />
                <div className="flex justify-around ">
                    <div className="flex items-center justify-between gap-2">
                        <Star size={32} weight='fill' fill="yellow"/>
                        <p>{(data.vote_average).toFixed(1)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2 ">
                        <UsersThree size={32} weight='fill' fill="#fa601e"/>
                        <p>{data.popularity}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full md:w-5/6 lg:w-4/5 xl:w-2/3 gap-10 p-4 rounded-xl">
                    {data.tagline && (<p className="text-3xl italic text-bold" >"{data.tagline}"</p>)}
                    {data.overview && (
                        <p className="text-lg">{data.overview}</p>
                    )}
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        {data.runtime && (<p className="text-lg">Duration: {data.runtime} min</p>)}
                        {data.release_date && (
                            <div className="flex items-center gap-4">
                            <VideoCamera size={32} weight='fill' fill="#fa0505"/>
                            <p className="text-lg">Release date: {data.release_date.slice(0,4)}</p>
                        </div>
                        )}
                        {data.first_air_date && (
                            <div className="flex items-center gap-4">
                                <VideoCamera size={32} weight='fill' fill="#fa0505"/>
                                <p className="text-lg">First live: {data.first_air_date.slice(0,4)}</p>
                            </div>
                        )}
                        {data.number_of_seasons && (<p className="text-lg">Seasons: {data.number_of_seasons}</p>)}
                        
                    </div>
                    <div className="flex flex-col justify-between gap-10">
                        <div className="flex flex-col md:flex-row gap-10 justify-between">
                            {crew.length > 0 && (<p className="text-lg">Directed by: {crew[0].name}</p>)}
                            {typeof data.budget === 'number' && (
                                <div className="hidden md:flex">
                                    {(data.revenue - data.budget < 0)? (
                                        <div className="flex items-center justify-start gap-2">
                                            <TrendDown size={32} weight='fill' fill="red"/>
                                            <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                                        </div>
                                    ):(
                                        <div className="flex items-center justify-start gap-2">
                                            <TrendUp size={32} weight='fill' fill="green"/>
                                            <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {cast.length>2 && (<p className="text-lg">Actors: {cast[0].name}, {cast[1].name}, {cast[2].name}</p>)}
                        {cast.length===1 && (<p className="text-lg">Actors: {cast[0].name}</p>)}
                        {cast.length<3 && cast.length > 1 && (<p className="text-lg">Actors: {cast[0].name}, {cast[1].name}</p>)}
                        {typeof data.budget === 'number' && (
                                <div className="flex md:hidden">
                                    {(data.revenue - data.budget < 0)? (
                                        <div className="flex items-center justify-start gap-2">
                                            <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                                            <TrendDown size={32} weight='fill' fill="red"/>
                                        </div>
                                    ):(
                                        <div className="flex items-center justify-start gap-2">
                                            <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                                            <TrendUp size={32} weight='fill' fill="green"/>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
                <div className="h-full w-full xl:w-3/4 flex flex-col gap-4 mb-10">
                    {recomendedMovies.length>0 && (<h1 className="text-3xl w-full text-center text-bold">More like this</h1>)}
                    {<Carousel
                        withIndicators
                        slideSize="8%"
                        slideGap="lg"
                        containScroll= "trimSnaps"
                        previousControlIcon={ hover && (
                            <motion.div
                              initial={{ opacity: 0}}
                              animate={{ opacity: 1}}
                              transition={{ duration: 1}}
                            >
                              <CaretLeft size={50} weight='regular' color='#ffffff'/>
                            </motion.div>
                          )}
                          nextControlIcon={hover && (
                            <motion.div
                              initial={{ opacity: 0}}
                              animate={{ opacity: 1}}
                              transition={{ duration: 1}}
                  
                            >
                              <CaretRight size={50} weight='regular' color='#ffffff'/>
                            </motion.div>
                          )}
                        align="start"  
                        className="flex h-full px-4 lg:px-14 xl:px-16 py-4"
                        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                    >
                        {recomendedMovies.map((movie)=>(
                            <Carousel.Slide
                            className="w-full xl:w-5/6 h-3/5 mt-6 flex gap-3 z-0 justify-center items-center md:px-4 pt-2" 
                            >
                                <div className="h-96 w-[300px] md:w-[250px] shadow-xl bg-zinc-300/5 text-white font-extrabold hover:brightness-50 hover:scale-95 hover:z-2 cursor-pointer transition-all duration-500">
                                <Link 
                                    key={movie.id}
                                    to={'/movie/' + movie.id}
                                >
                                    <img src= {imageURL + movie.poster_path} alt="movie-poster" className="h-5/6 w-full"/>
                                    <div className="h-1/5 flex items-center justify-center gap-2">
                                        <Star weight="fill" fill='yellow'/>
                                        <p>{(movie.vote_average).toFixed(1)}</p>
                                    </div>
                                </Link>
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>}
                </div>
        </div>
    )
}
export default MoviePage