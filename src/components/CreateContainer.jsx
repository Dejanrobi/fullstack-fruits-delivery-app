import React from "react";
import { useState } from "react";

//Adding the motion
import { motion } from "framer-motion";

//Importing icons
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { checkOnlineStatus } from "../utils/otherFunctions";

import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

// console.log(categories);

function CreateContainer() {
  //Adding the states required in this component
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  //Need to download the image Asset
  const [imageAsset, setImageAsset] = useState(null);
  //Boolean value to monitor whether there is any error
  //If there is any error, we need to display that particular field.
  const [fields, setField] = useState(false);

  //Incase of any error, we display the alert message
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);

  //Monitoring the loading status
  const [isLoading, setIsLoading] = useState(false);

  //Dispatching the data to the context provider
  const [{ foodItems }, dispatch] = useStateValue();

  //UPLOADING AN IMAGE
  const uploadImage = (e) => {
    //once the use clicks the upload button, we set isLoading as true
    setIsLoading(true);
    //Getting the image File
    //we are uploading a single file
    const imageFile = e.target.files[0];

    //Checking whether your are online or offline
    const status = checkOnlineStatus();
    if (status === "online") {
      //Getting the storage reference from the firebase config
      //set the folder to upload your images
      //the id of the image is Date.now(the time its created) plus the file name which is obtained from the imageFile
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

      //uploading the file to firebase by passing the location to upload and the the file
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      //Calculating the upload progress
      //once the state changes,it throws three functions (snapshot, error, download URL)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          //incase of error
          console.log(error);
          //displaying the error in the fields
          setField(true);
          setMsg(`Error while Uploading 😫: ${error.message}`);
          setAlertStatus("danger");

          //removing the alert and stopping the loading
          setTimeout(() => {
            setField(false);
            setIsLoading(false);
          }, 3000);
        },
        () => {
          //Everything is fine, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((snap) => {
            //setting the ImageAsset as the download URL
            setIsLoading(false);
            setImageAsset(snap);
            setField(true);
            setMsg("Image Uploaded Successfully 😊!!");
            setAlertStatus("success");

            setTimeout(() => {
              setField(false);
            }, 3000);
          });
        }
      );
    } else if (status === "offline") {
      setField(true);
      setMsg(`You are offline 😫!!`);
      setAlertStatus("danger");

      //removing the alert and stopping the loading
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  //DELETING AN IMAGE
  const deleteImage = () => {
    setIsLoading(true);
    //we set the storage reference via the storage and the download URL
    const deleteRef = ref(storage, imageAsset);

    //deleting the image
    deleteObject(deleteRef).then(() => {
      //returns a callback function
      //setting imageAsset as null
      setImageAsset(null);
      setIsLoading(false);
      setField(true);
      setMsg("Image Deleted Successfully 😊!!");
      setAlertStatus("success");

      setTimeout(() => {
        setField(false);
      }, 3000);
    });
  };

  //SAVING THE DETAILS (uploading the entire information)
  const saveDetails = () => {
    setIsLoading(true);

    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setField(true);
        setMsg("Required Fields Can't Be Empty !!");
        setAlertStatus("danger");

        //removing the alert and stopping the loading
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 3000);
      } else {
        //creating a data structure
        const data = {
          title: title,
          imgURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        const dataAdded = saveItem(data, "FoodDetails");

        dataAdded.then((status) => {
          if (status === "success") {
            setIsLoading(false);
            setField(true);
            setMsg(`Data saved Successfully 😊!!`);
            setAlertStatus("success");
            clearData();

            setTimeout(() => {
              setField(false);

              //calling the fetch data function to fetch the data once its saved successfullly.
              fetchData();
            }, 3000);
          } else if (status === "offline") {
            setIsLoading(false);
            setField(true);
            setMsg(`Network Error!!😫.Please Retry!`);
            setAlertStatus("danger");

            setTimeout(() => {
              setField(false);
              setIsLoading(false);
            }, 3000);
          }
        });
      }
    } catch (error) {
      //displaying the error in the fields
      setField(true);
      setMsg(`Error while Saving Details 😫: ${error.message}`);
      setAlertStatus("danger");

      //removing the alert and stopping the loading
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 3000);
    }
  };

  //CLEARING THE DATA
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("select a category");
  };

  //A FUNCTION TO CALL THE DATA RETRIEVED FROM THE DATABASE AND PASSING IT TO THE CONTEXT VARIABLE
  //TO BE ACCESSED THROGHOUT THe SYSTEM
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      //dispatching this data to the reducer state
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full h- min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:[w-75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {/* Printing any message present */}
            {msg}
          </motion.p>
        )}

        {/* Input fields to enter the title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Title"
            className="w-full h-full text-base bg-transparent focus:outline-none pl-1 placeholder:text-gray-500"
          />
        </div>

        <div className="w-full">
          <select
            name="select"
            onChange={(e) => setCategory(e.target.value)}
            required
            value={category}
            className="outline-none w-full text-base border-b border-gray-300 p-2 cursor-pointer"
          >
            <option
              value="select a category"
              className="bg-white text-base text-gray-500"
            >
              Select Category
            </option>
            {/* Rendering the options */}
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className=" cursor-pointer text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* position to upload our images */}
        <div className="rounded-lg group flex justify-center mt-2 items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer">
          {/* Bring up a loaded if its loading or not  */}
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  {/* If there is an ImageAsset, we render the image by loading the imageAsset in the image */}
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="Uploaded Image"
                      className="w-full h-full object-cover"
                    />
                    {/* Deleting and re-uploading another buton */}
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      // when the button is clicked, it deletes the image
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Calories */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-base bg-transparent outline-none border-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Price */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-base bg-transparent outline-none border-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Saving the Information */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold mt-4"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
