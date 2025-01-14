import mongoose from "mongoose";

export async function connect() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error: ", error);
    });

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw error; // Ensure the error is properly propagated
  }
}
