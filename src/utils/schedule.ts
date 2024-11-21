import schedule from "node-schedule";
import { generateContent } from "./generateContent";
import { postToApp } from "./postToApp";

const generateAndPostContent = async (batchSize: number): Promise<void> => {
  for (let i = 0; i < batchSize; i++) {
    try {
     const content = await generateContent(
       "Write a very short post on civil engineering ."
     );
     console.log(content);

      if (content) {
        console.log("Generated content:", content);
        await postToApp(content); 
      }
    } catch (error: any) {
      console.error("Error generating or posting content: from generateAndPostContent", error.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

export const scheduleAutomation = (): void => {
  console.log("Starting content automation scheduler...");

  // Morning schedule (11:03 AM)
  schedule.scheduleJob("0 8 * * *", () => generateAndPostContent(5));

  // Afternoon schedule (1:00 PM)
  schedule.scheduleJob("0 13 * * *", () => generateAndPostContent(5));

  // Night schedule (8:00 PM)
  schedule.scheduleJob("0 20 * * *", () => generateAndPostContent(10));
};

