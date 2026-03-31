import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
// import {mainAI} from "./src/services/AI.services";
const PORT = process.env.PORT || 5000;
// mainAI(); //testing gemini API
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});