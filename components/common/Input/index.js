import { Input as Inp, Form } from "antd";
import input from "./input.module.css";
export default function Input({
  lable,
  customClass,
  defaultValue,
  key,
  name,
  id,
  tooltip,
  inputGroup,
  placeholder,
  customClass1,
  placeholder1,
  defaultValue1,
  customClass2,
  placeholder2,
  defaultValue2,
  onChange,
  type,
  rules,
}) {
  return (
    <>
      {lable ? (
        <Form.Item
          label={lable}
          tooltip={tooltip ? tooltip : null}
          labelAlign={"left"}
          name={name ? name : ""}
          rules={rules ? rules : []}
        >
          {inputGroup ? (
            <Inp.Group>
              <Inp
                style={{ width: "49%", "margin-right": "3px" }}
                key={`input-${
                  key ? key : Math.random().toString(36).substring(2, 7)
                }`}
                className={customClass1 ? customClass1 : input.input}
                placeholder={placeholder1 ? placeholder1 : ""}
                defaultValue={defaultValue1 ? defaultValue1 : ""}
                name={name ? name : ""}
                id={id ? id : ""}
                type={type ? type : "text"}
                onChange={(e) => {
                  onChange ? onChange(e) : null;
                }}
              />
              <Inp
                style={{ width: "49%", "margin-left": "3px" }}
                key={`input-${
                  key ? key : Math.random().toString(36).substring(2, 7)
                }`}
                className={customClass2 ? customClass2 : input.input}
                placeholder={placeholder2 ? placeholder2 : ""}
                defaultValue={defaultValue2 ? defaultValue2 : ""}
                name={name ? name : ""}
                id={id ? id : ""}
                type={type ? type : "text"}
                onChange={(e) => {
                  onChange ? onChange(e) : null;
                }}
              />
            </Inp.Group>
          ) : (
            <Inp
              key={`input-${
                key ? key : Math.random().toString(36).substring(2, 7)
              }`}
              className={customClass ? customClass : input.input}
              placeholder={placeholder ? placeholder : ""}
              defaultValue={defaultValue ? defaultValue : ""}
              name={name ? name : ""}
              id={id ? id : ""}
              onChange={(e) => {
                onChange ? onChange(e) : null;
              }}
              type={type ? type : "text"}
            />
          )}
        </Form.Item>
      ) : (
        <>
          {inputGroup ? (
            <Inp.Group>
              <Inp
                style={{ width: "50%" }}
                key={`input-${
                  key ? key : Math.random().toString(36).substring(2, 7)
                }`}
                className={customClass1 ? customClass1 : input.input}
                placeholder={placeholder1 ? placeholder1 : ""}
                defaultValue={defaultValue1 ? defaultValue1 : ""}
                name={name ? name : ""}
                id={id ? id : ""}
                type={type ? type : "text"}
                onChange={(e) => {
                  onChange ? onChange(e) : null;
                }}
              />
              <Inp
                style={{ width: "50%" }}
                key={`input-${
                  key ? key : Math.random().toString(36).substring(2, 7)
                }`}
                className={customClass2 ? customClass2 : input.input}
                placeholder={placeholder2 ? placeholder2 : ""}
                defaultValue={defaultValue2 ? defaultValue2 : ""}
                name={name ? name : ""}
                type={type ? type : "text"}
                id={id ? id : ""}
                onChange={(e) => {
                  onChange ? onChange(e) : null;
                }}
              />
            </Inp.Group>
          ) : (
            <Inp
              key={`input-${
                key ? key : Math.random().toString(36).substring(2, 7)
              }`}
              className={customClass ? customClass : input.input}
              placeholder={placeholder ? placeholder : ""}
              defaultValue={defaultValue ? defaultValue : ""}
              name={name ? name : ""}
              type={type ? type : "text"}
              id={id ? id : ""}
              onChange={(e) => {
                onChange ? onChange(e) : null;
              }}
            />
          )}
        </>
      )}
    </>
  );
}
