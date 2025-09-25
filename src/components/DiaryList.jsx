import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ data }) => {
  const [sortType, setSortType] = useState("latest");
  const onChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((prev, next) => {
      if (sortType === "oldest") {
        return Number(prev.createDate) - Number(next.createDate);
      } else {
        return Number(next.createDate) - Number(prev.createDate);
      }
    });
  };

  const sortedData = getSortedData();

  const nav = useNavigate();

  const goNewPage = () => {
    nav("/new");
  };

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={goNewPage} text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
