import RouterProvider from "./router";
import StoreProvider from "./store";

const App = () => {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
};

export default App;
