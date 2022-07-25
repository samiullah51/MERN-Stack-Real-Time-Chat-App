// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// function SocketTest() {
//   const socket = useRef(io("ws://localhost:8900"));
//   const [name, setName] = useState();
//   const [names, setNames] = useState([]);
//   // handle Emit
//   const handleEmit = () => {
//     socket.current.emit("name", name);
//     socket.current.on("getData", (data) => {
//       setNames(data);
//     });
//   };

//   return (
//     <div>
//       <h1>Socket.io Testing</h1>
//       {names?.map((n) => (
//         <p>{n}</p>
//       ))}
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <button onClick={handleEmit}>Add Name</button>
//     </div>
//   );
// }

// export default SocketTest;
