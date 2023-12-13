import { Environment } from "vitest";

export default <Environment>{
  name: "prisma",
  async setup() {
    console.log("Setup");

    return {
      teardown() {
        console.log("Teardown");
      },
    };
  },
};
