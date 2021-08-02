import Search from "./components/Search";
import "./App.css";
import VideoLists from "./components/VideoLists";
import { Container, Row } from "reactstrap";

function App() {
  return (
    <Container className="bg-light">
      <Row>
        <h1 className="text-center mt-5 ">Wyszukiwarka filmów</h1>
        <Search />
        <VideoLists />
      </Row>
    </Container>
  );
}

export default App;
