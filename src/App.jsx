import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import { createContext, useEffect, useReducer, useRef, useState } from "react";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE":
      nextState = [action.data, ...state];
      break;

    case "UPDATE":
      nextState = state.map((data) =>
        String(data.id) === String(action.data.id) ? action.data : data
      );
      break;

    case "DELETE":
      nextState = state.filter((data) => String(data.id) !== String(action.id));
      break;

    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const [isLoading, setIsLoading] = useState(true); // 현재 로딩 중

  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false); // 로딩 완료
      return;
    }

    const parsedData = JSON.parse(storedData);

    let maxId = 0; // id 최대값 저장
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  if (isLoading) {
    return <div>데이터 로딩중...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
