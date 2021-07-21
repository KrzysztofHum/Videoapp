import Search from "./components/Search";
import "./App.css";
import VideoLists from "./components/VideoLists";
import { Container, Row } from "reactstrap";

function App() {
  return (
    <Container>
      <Row>
        <Search />
        <VideoLists />
      </Row>
    </Container>
  );
}

export default App;
