import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SimplePeer from "simple-peer";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import "./index.css";

function QuickMeet() {
  const [chatStarted, setChatStarted] = useState(false);
  const [partnerFound, setPartnerFound] = useState(false);
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("english");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const userVideoRef = useRef();
  const partnerVideoRef = useRef();
  const ws = useRef(null);
  const navigate = useNavigate();

  const inappropriateWords = ["badword1", "badword2", "badword3"];

  useEffect(() => {
    ws.current = new WebSocket("wss://localhost:8080/ws/video-chat");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "partner-found") {
        setPartnerFound(true);
        initWebRTC(data.initiator);
      } else if (data.type === "signal" && peer) {
        peer.signal(data.signal);
      } else if (data.type === "message") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    return () => ws.current?.close();
  }, [peer]);

  const startChat = async () => {
    if (!interest || !language) {
      alert("Please select an interest and language before starting the chat.");
      return;
    }

    setChatStarted(true);
    setShowLogout(false);

    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      if (userVideoRef.current) userVideoRef.current.srcObject = userStream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Error accessing camera. Check permissions.");
      return;
    }

    ws.current.send(JSON.stringify({ type: "find-partner", interest, language }));
  };

  const initWebRTC = (initiator) => {
    if (!stream) return;

    const newPeer = new SimplePeer({
      initiator,
      trickle: false,
      stream,
    });

    newPeer.on("signal", (data) => {
      ws.current.send(JSON.stringify({ type: "signal", signal: data }));
    });

    newPeer.on("stream", (partnerStream) => {
      if (partnerVideoRef.current) {
        partnerVideoRef.current.srcObject = partnerStream;
      }
    });

    setPeer(newPeer);
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsCamOn((prev) => !prev);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMicOn((prev) => !prev);
    }
  };

  const endChat = () => {
    if (peer) peer.destroy();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setPeer(null);
    setStream(null);
    setPartnerFound(false);
    setChatStarted(false);
    ws.current.send(JSON.stringify({ type: "end-chat" }));
    setShowLogout(true); // show logout only now
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const containsInappropriateWord = inappropriateWords.some((word) =>
      newMessage.toLowerCase().includes(word)
    );

    if (containsInappropriateWord) {
      alert("Your message contains inappropriate content.");
      return;
    }

    ws.current.send(JSON.stringify({ type: "message", message: newMessage }));
    setMessages((prev) => [...prev, `You: ${newMessage}`]);
    setNewMessage("");
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/homepage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 p-6">
      {showLogout && (
  <div className="fixed top-4 right-4 z-50">
    <button
      className="bg-red-500 text-white font-semibold px-4 py-2 rounded hover:bg-red-600 transition shadow-lg"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
)}


      <h1 className="text-white text-6xl font-bold mb-6">Quick Meet</h1>
      <p className="text-white text-2xl mb-6">Meet random people via video chat!</p>

      {!chatStarted ? (
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Interest</label>
            <select
              className="w-full p-2 border rounded"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="">Select an interest</option>
              <option value="tech">Technology</option>
              <option value="art">Art</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Language</label>
            <select
              className="w-full p-2 border rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={startChat}
          >
            Start Chat
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 bg-black rounded-lg overflow-hidden">
              <video ref={userVideoRef} autoPlay muted className="w-full h-64 object-cover" />
              <div className="bg-gray-800 p-2 text-white text-center">You</div>
            </div>
            {partnerFound ? (
              <div className="flex-1 bg-black rounded-lg overflow-hidden">
                <video ref={partnerVideoRef} autoPlay className="w-full h-64 object-cover" />
                <div className="bg-gray-800 p-2 text-white text-center">Partner</div>
              </div>
            ) : (
              <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center h-64">
                <p className="text-white text-xl">Finding a partner...</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
            <div className="h-48 overflow-y-auto mb-4 p-2 border rounded">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-l"
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-r"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className={`p-4 rounded-full ${isCamOn ? "bg-blue-600" : "bg-red-600"} text-white`}
              onClick={toggleCamera}
            >
              {isCamOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
            </button>
            <button
              className={`p-4 rounded-full ${isMicOn ? "bg-blue-600" : "bg-red-600"} text-white`}
              onClick={toggleMic}
            >
              {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
            </button>
            <button className="p-4 rounded-full bg-red-600 text-white" onClick={endChat}>
              <FaPhoneSlash size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickMeet;
