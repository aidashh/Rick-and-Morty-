import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { Container, styled } from "@mui/material";
import { CharactersList } from "../components/character/CharacterList";
import { useDebounce } from "use-debounce";

const fetchCharacters = async (search) => {
  try {
    const serachParams = search ? "?name=" + search : "";
    const reasponse = await fetch(
      "https://rickandmortyapi.com/api/character" + serachParams
    );
    const { results } = await reasponse.json();
    return results;
  } catch (error) {
    throw new Error("Somthing went wrong!");
  }
};
const CharacterPage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [searchByNameDebouce] = useDebounce(searchByName, 1000);

  useEffect(() => {
    console.log(searchByName);
    fetchCharacters(searchByNameDebouce)
      .then((data) => setCharacters(data))
      .catch((error) => console.log(error));
  }, [searchByNameDebouce]);
  const serachByNameChange = (e) => {
    setSearchByName(e.target.value);
  };
  return (
    <StyledContainer>
      <header>
        <SearchBar onChange={serachByNameChange} value={searchByName} />
        <FilterBar />
      </header>
      <main>
        <CharactersList characters={characters} />
      </main>
    </StyledContainer>
  );
};

export default CharacterPage;
const StyledContainer = styled(Container)(() => {
  return {
    padding: "1rem",
    background: "aliceblue",
  };
});
