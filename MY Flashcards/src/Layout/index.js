import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/HomePage";
import CreateDeck from "../Deck/CreateDeck";
import ViewDeck from "../Deck/ViewDeck";
import StudyDeck from "../Deck/Study/StudyDeck";
import EditDeck from "../Deck/EditDeck";
import CreateCard from "../Card/CreateCard";
import EditCard from "../Card/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<ViewDeck />} />
          <Route path="/decks/:deckId/study" element={<StudyDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />          
          
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />


          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
    </>
  );
}

export default Layout;


