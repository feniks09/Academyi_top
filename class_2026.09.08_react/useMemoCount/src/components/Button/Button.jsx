import { memo, useMemo } from "react";

const Button = memo(({ onClick, text }) => {
  console.log("Render Button");

  const buttonText = useMemo(() => {
    console.log("Текст кнопки обработан");
    return text;
  }, [text]);

  return <button onClick={onClick}>{buttonText}</button>;
});

export default Button;