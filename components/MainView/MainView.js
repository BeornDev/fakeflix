import useRqTrending from "../hooks/useRqTrending";

import React, { useContext } from "react";
import MoviesContext from "../../store/movies-context";

import Loader from "../../Layout/Loader";
import Button from "../../Layout/Btn";

import styled from "styled-components";

const MainViewDiv = styled.div`
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 80vh;
  position: relative;
  /* background: url("https://images-na.ssl-images-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg"); */
  background-size: cover;
  background-position: center;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 80%);
  color: #fff;

  .genres {
    position: relative;
    text-align: center;
    font-size: 0.7rem;
  }

  .containerBtns {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }
  @media (min-width: 320px) {
  }
  @media (min-width: 480px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
`;

export default function MainView(props) {
  const [mediaRq, genresRq] = useRqTrending(props.seccionType);
  const { isLoading, windowWidth } = useContext(MoviesContext);

  const pathCover =
    windowWidth < 768
      ? `https://image.tmdb.org/t/p/w500${mediaRq[0]?.poster_path}`
      : `https://image.tmdb.org/t/p/w1280${mediaRq[0]?.backdrop_path}`;
  const genresText = mediaRq[0]?.genre_ids
    .map((g) => genresRq.find((gRq) => gRq.id === g)?.name)
    .join(" - ");

  if (isLoading) {
    return (
      <MainViewDiv style={{ alignItems: "center" }}>
        <Loader />
      </MainViewDiv>
    );
  } else {
    //TODO: se rendereiza cada que header se torna fixed
    return (
      <MainViewDiv
        style={{
          backgroundImage: `url(${pathCover})`,
        }}
      >
        <div className="details">
          <p className="genres"> {genresText} </p>
          <div className="containerBtns">
            <Button btnType="add" />
            <Button btnType="play" />
            <Button btnType="info" />
          </div>
        </div>
      </MainViewDiv>
    );
  }
}
