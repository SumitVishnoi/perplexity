import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import logo from "../../../../public/logo.png"
import remarkGfm from 'remark-gfm';

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) {
      return;
    }

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  return (
    // 
    <main className="min-h-screen w-full text-white">
      <section className="mx-auto flex h-screen w-full gap-4 border bg-[#07090f] md:gap-6 border-none p-2">
        <aside className="hidden relative h-full w-72 shrink-0 border-r bg-[#080b12] p-4 md:flex md:flex-col">
          <img src={logo} className="mb-5 text-3xl font-semibold tracking-tight">
            
          </img>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 hover:bg-[#2a2a2a72] px-3 py-2 rounded-xl cursor-pointer">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3V5H4V18.3851L5.76282 17H20V10H22V18C22 18.5523 21.5523 19 21 19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z"></path></svg>
              <p>New chat</p>
            </div>
            <div className="flex items-center gap-2 hover:bg-[#2a2a2a72] px-3 py-2 rounded-xl cursor-pointer">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
              <p>Search chats</p>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <h3 className="text-white/45">Your chats</h3>
            {Object.values(chats).map((chat, index) => (
              <button
                onClick={() => {
                  openChat(chat.id);
                }}
                key={index}
                type="button"
                className="w-full cursor-pointer hover:bg-[#2a2a2a72] rounded-xl px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white"
              >
                {chat.title}
              </button>
            ))}
          </div>

          <div className="absolute bottom-10 flex items-center gap-4">
            <div className="rounded-full w-10 h-10 overflow-hidden">
              <img className="w-full h-full object-cover object-center" src="https://i.pinimg.com/736x/fe/a4/56/fea4568cdabdfb5c3ade0e7fe435858d.jpg" alt="" />
            </div>
            <div>
              <p>username</p>
              <p className="text-sm text-neutral-600">free</p>
            </div>
          </div>
        </aside>

        <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
          <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
            {chats[currentChatId]?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto text-white/90"
                }`}
              >
                {message.role === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="mb-2 list-disc pl-5">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-2 list-decimal pl-5">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="rounded bg-white/10 px-1 py-0.5">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                          {children}
                        </pre>
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          <footer className=" w-full absolute bottom-2 p-4 md:p-5">
            <form
              onSubmit={handleSubmitMessage}
              className="flex flex-col gap-3 md:flex-row bg-[#171f31] rounded-full "
            >
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your message..."
                className="w-full bg-transparent px-8 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="rounded-2xl px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#010c28]/60 disabled:cursor-not-allowed disabled:opacity-0"
              >
                Send
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
