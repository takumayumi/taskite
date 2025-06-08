import { Provider } from "react-redux";
import { store } from "./redux/store";
import TaskManager from "./components/TaskManager";
import "./assets/index.css";

const App = () => (
  <Provider store={store}>
    <TaskManager />
  </Provider>
);

export default App;
