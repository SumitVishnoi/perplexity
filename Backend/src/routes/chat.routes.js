import {Router} from "express"
import { deleteChats, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"

const chatRouter = Router()

chatRouter.post("/message", authUser,sendMessage)

chatRouter.get("/", authUser, getChats)

chatRouter.get("/:chatId/messages", authUser, getMessages)

chatRouter.post("/delete/:chatId", authUser, deleteChats)


export default chatRouter