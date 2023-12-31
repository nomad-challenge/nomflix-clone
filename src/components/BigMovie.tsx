import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { IMovie, IMovieDetail, getMovieById } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const Wrapper = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0px;
  left: 0px;
  margin: 0px auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h2`
  font-size: 46px;
  padding: 20px;
  top: -80px;
  position: relative;
`;
const BigOverview = styled.p`
  padding: 20px;
  top: -80px;
  position: relative;
`;

const GenreWrapper = styled.div`
  top: -80px;
  padding: 5px 20px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;
const Genre = styled.span`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.darker};
`;
interface IBigMovie {
  layoutId: string;
  scrollY: number;
  movie?: IMovie;
}
const BigMovie: React.FC<IBigMovie> = ({ layoutId, scrollY, movie }) => {
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/", { replace: true });

  const { data, isLoading } = useQuery<IMovieDetail>(["movie", movie?.id], () =>
    getMovieById(movie?.id)
  );
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1, zIndex: 99 }}
        exit={{ opacity: 0 }}
      />
      <Wrapper
        layoutId={layoutId}
        style={{ top: scrollY + 100 }}
        animate={{ zIndex: 99 }}
      >
        {movie && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  movie.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{movie.title}</BigTitle>
            <BigOverview>{movie.overview}</BigOverview>
            <GenreWrapper>
              {data?.genres.map((genre) => (
                <Genre>{genre.name}</Genre>
              ))}
            </GenreWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default BigMovie;
