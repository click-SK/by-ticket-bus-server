import mongoose from "mongoose";

const CurrentCurrenciesSchema = new mongoose.Schema(
  {
    currencieName: String,
    currencieValue: Number,
  },
  { timestamps: true }
);

export default mongoose.model("CurrentCurrencie", CurrentCurrenciesSchema);
