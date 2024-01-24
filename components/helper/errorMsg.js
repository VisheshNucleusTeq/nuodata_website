import { message } from "antd"

export const showError = (error) => {
    message.error(error ? error : "Something went wrong")
}