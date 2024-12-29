import { useState } from "react";
import { Card, TextField, IconButton, Drawer } from "@mui/material";
import { ThumbUp, ThumbDown, Menu, Close } from "@mui/icons-material";
import logo from "../assets/logo.png";
import edit from "../assets/edit.png";
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const QuickPrompts = () => (
    <div className="flex-1 flex flex-col h-full">
      <h2 className=" hidden text-2xl font-ubuntu text-[#9785BA] font-[700] p-3 md:block ">
        Bot AI
      </h2>
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b pb-4 from-[#F9FAFA] to-[#EDE4FF] md:bg-gradient-to-b md:from-[#D7C7F433] md:to-[#D7C7F433]">
        <div className="flex flex-col items-center mb-12 gap-2 p-14">
          <h1 className="text-3xl font-ubuntu font-bold text-center">
            How Can I Help You Today?
          </h1>
          <img
            className="w-[50px] h-[50px] rounded-full"
            src={logo}
            alt="logo"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-4">
          {[
            "Hi, what is the weather",
            "Hi, what is my location",
            "Hi, what is the temperature",
            "Hi, how are you",
          ].map((prompt, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="text-lg font-ubuntu mb-2">{prompt}</h2>
              <p className="text-gray-500 text-sm">
                Get immediate AI generated response
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Rest of the components remain the same
  const ChatMessage = ({ message, isUser }) => (
    <div className={`flex gap-4 p-4 ${!isUser ? "bg-purple-50" : ""}`}>
      <img
        src={`/api/placeholder/${isUser ? "40/40" : "40/40"}`}
        alt={isUser ? "User Avatar" : "Bot Avatar"}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="font-ubuntu mb-1">{isUser ? "You" : "Soul AI"}</div>
        <div className="text-gray-800">{message}</div>
        <div className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {!isUser && (
            <span className="ml-4">
              <IconButton size="small">
                <ThumbUp fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <ThumbDown fontSize="small" />
              </IconButton>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <div className="flex justify-between items-center p-4 md:hidden">
      <div className="flex items-center gap-1">
        <IconButton className="md:hidden " onClick={toggleSidebar}>
          <Menu className="text-[#9785BA]" />
        </IconButton>
        <h2 className="text-2xl font-ubuntu text-[#9785BA] font-[700] md:hidden">
          Bot AI
        </h2>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="w-64 bg-white h-full flex flex-col">
      <div className="p-4 flex items-center gap-2 bg-secondaryOne justify-center">
        <img src={logo} alt="logo" />
        <span className="font-ubuntu font-[500]">New Chat</span>
        <img src={edit} alt="edit" />
      </div>
      <button className="m-4 w-[calc(100%-2rem)] bg-secondaryOne text-[#414146] py-2 px-4 rounded-md font-semibold">
        Past Conversations
      </button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={toggleSidebar}
          className="md:hidden"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Sidebar />
        </Drawer>

        <main className="flex-1 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <QuickPrompts />
            ) : (
              <div className="flex-1">
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))}
              </div>
            )}
          </div>

          {/* Input box fixed at bottom */}
          <div className="p-4 border-t mt-auto bg-white">
            <div className="max-w-4xl mx-auto relative">
              <TextField
                fullWidth
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder=""
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "white",
                  },
                }}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button className="bg-[#D7C7F4]  px-4 py-1 rounded hover:bg-purple-200">
                  Ask
                </button>
                <button className="bg-[#D7C7F4]  px-4 py-1 rounded hover:bg-purple-200">
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-ubuntu flex items-center gap-2">
                <span className="text-2xl">💡</span> Provide Additional Feedback
              </h2>
              <IconButton onClick={() => setShowFeedback(false)}>
                <Close />
              </IconButton>
            </div>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Your feedback..."
              className="mb-4"
            />
            <button className="bg-purple-100 text-purple-800 px-6 py-2 rounded float-right hover:bg-purple-200">
              Submit
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
