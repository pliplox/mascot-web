import React from "react";
import { Navbar } from "./components/shared/navbar";
import { Fed } from "./components/fed/";

import Container from "@material-ui/core/Container";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <Container maxWidth="xl">
          <Fed />
        </Container>
      </div>
    </>
  );
}

export default App;
