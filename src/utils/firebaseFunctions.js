import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import { checkOnlineStatus } from "./otherFunctions";

//A function to save items to firestore
export const saveItem = async (data, collectionName) => {
  //checking the online status
  const status = checkOnlineStatus();

  if (status === "online") {
    try {
      const ordersCollection = collection(firestore, collectionName);
      await addDoc(ordersCollection, data);

      const final = "success";
      return final;
    } catch (error) {
      return error;
    }
  } else if (status === "offline") {
    return status;
  }
};

//A function to fetch all the uploaded details from the cloud and dispplay them on the website.
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "FoodDetails"), orderBy("title", "asc"))
  );
  return items.docs.map((doc) => doc.data());
};
