import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constantce";
import { getStringedDate } from "../util/get-stringed-date";

const Editor = ({ initData, onSubmit }) => {
  const nav = useNavigate();

  const [input, setInput] = useState({
    createDate: new Date(),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({ ...initData, createDate: new Date(initData.createDate) });
    }
  }, [initData]);

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "createDate") {
      value = new Date(value);
    }

    setInput({
      ...input,

      [name]: value,
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h3>오늘의 날짜</h3>
        <input
          name="createDate"
          value={getStringedDate(input.createDate)}
          onChange={onChangeInput}
          type="date"
        />
      </section>

      <section className="emotion_section">
        <h3>오늘의 감정</h3>
        <div className="emotion_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                });
              }}
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      <section className="content_section">
        <h3>오늘의 일기</h3>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>

      <section className="button_section">
        <Button
          text={"취소하기"}
          onClick={() => {
            nav(-1);
          }}
        />
        <Button
          onClick={onSubmitButtonClick}
          text={"작성 완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
