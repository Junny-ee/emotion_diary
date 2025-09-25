import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);

  const nav = useNavigate();

  const [curDiaryItem, setcurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기에요 😓");
      nav("/", { replace: true });
    }
    setcurDiaryItem(currentDiaryItem);
  }, [id]);
  return curDiaryItem;
};

export default useDiary;
